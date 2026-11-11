"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Vote, CheckCircle2, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export function WeeklyPoll() {
  const pollId = "semanal-redes-autoimagen";
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const [options, setOptions] = useState<PollOption[]>([
    { id: "opt-1", text: "Sí, casi todos los días siento esa presión", votes: 142 },
    { id: "opt-2", text: "A veces, depende de cómo me sienta ese día", votes: 218 },
    { id: "opt-3", text: "No, he aprendido a filtrar las redes que consumo", votes: 64 },
    { id: "opt-4", text: "Me cuesta identificarlo o prefiero no opinar", votes: 29 },
  ]);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      try {
        const savedVote = window.localStorage?.getItem(`mas-alla-del-espejo-poll-${pollId}`);
        if (savedVote) {
          setHasVoted(true);
          setSelectedOptionId(savedVote);
        }
      } catch {
        // Ignora silenciosamente accesos a storage en modo estricto
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [pollId]);

  const totalVotes = options.reduce((acc, curr) => acc + curr.votes, 0);

  const handleVote = async (optionId: string) => {
    if (hasVoted) return;

    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
    setHasVoted(true);
    setSelectedOptionId(optionId);

    try {
      window.localStorage?.setItem(`mas-alla-del-espejo-poll-${pollId}`, optionId);
    } catch {
      // Local storage seguro
    }

    // Persistencia silenciosa con Supabase si está disponible
    try {
      const supabase = createClient();
      await (supabase.rpc as unknown as (fn: string, args: Record<string, string>) => Promise<unknown>)(
        "increment_poll_vote",
        {
          p_poll_id: pollId,
          p_option_id: optionId,
        }
      );
    } catch {
      // Fallback local garantizado sin romper la consola del navegador
    }
  };

  return (
    <div className="rounded-3xl border border-[#F0DE9C] bg-white p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-bold text-zinc-900 border border-[#F0DE9C]">
          <Vote className="h-3.5 w-3.5 text-[#D4AF37]" />
          Voz Comunitaria · Anónima
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Users className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>{totalVotes} participantes</span>
        </div>
      </div>

      <h3 className="mt-4 font-serif text-xl sm:text-2xl font-bold text-zinc-950">
        ¿Sentís que las redes sociales afectan la forma en que ves tu cuerpo y tu valor personal?
      </h3>
      <p className="mt-2 text-xs text-zinc-500">
        Tu voto es 100% anónimo y ayuda a Audrey y al equipo a enfocar los talleres provinciales.
      </p>

      {/* Opciones */}
      <div className="mt-6 space-y-3">
        {options.map((option) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          const isSelected = selectedOptionId === option.id;

          return (
            <div
              key={option.id}
              onClick={() => !hasVoted && handleVote(option.id)}
              className={`relative overflow-hidden rounded-2xl border p-4 transition-all ${
                hasVoted
                  ? "cursor-default border-[#F0DE9C]/70"
                  : "cursor-pointer border-zinc-200 hover:border-[#D4AF37] hover:bg-[#FEF9E7]"
              } ${isSelected ? "border-[#D4AF37] bg-[#FEF3C7]/40" : "bg-[#FEF9E7]/40"}`}
            >
              {hasVoted && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 -z-10 bg-[#FDE68A]/50"
                />
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                  {option.text}
                </span>
                {hasVoted ? (
                  <span className="text-xs font-bold text-[#B45309]">
                    {percentage}%
                  </span>
                ) : (
                  <div className="h-4 w-4 rounded-full border border-zinc-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hasVoted && (
        <div className="mt-5 flex items-center gap-2 text-xs font-bold text-emerald-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>¡Gracias por participar! Tu respuesta fue registrada de forma segura.</span>
        </div>
      )}
    </div>
  );
}