"use client";

import React, { useState } from "react";
import { PhoneCall, Clock, Heart } from "lucide-react";
import { CRISIS_HOTLINES } from "@/config/crisis-hotlines";

export function SupportNetwork() {
  const [filter, setFilter] = useState<"todos" | "Nacional" | "Formosa">("todos");

  const filteredHotlines =
    filter === "todos"
      ? CRISIS_HOTLINES
      : CRISIS_HOTLINES.filter((h) => h.scope === filter);

  return (
    <section id="red-apoyo" className="py-20 border-t border-[#F0DE9C]/70">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-300 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-700 shadow-xs">
            <Heart className="h-3.5 w-3.5 text-red-600 fill-red-600" />
            Canales Gratuitos y Confidenciales
          </div>
          <h2 className="mt-4 font-serif text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl">
            Red de Apoyo Territorial y Nacional
          </h2>
          <p className="mt-3 text-sm text-zinc-700 font-normal">
            Pedir ayuda es un acto de valentía. Si vos o alguien que conocés está atravesando una situación de dolor o crisis, comunicate de inmediato con estos dispositivos oficiales [1, 2].
          </p>

          {/* Filtros */}
          <div className="mt-6 flex justify-center gap-2">
            {(["todos", "Nacional", "Formosa"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === tab
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "border border-[#F0DE9C] bg-white text-zinc-700 hover:bg-[#FEF3C7]"
                }`}
              >
                {tab === "todos" ? "Todas las líneas" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Líneas */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredHotlines.map((hotline) => (
            <div
              key={hotline.id}
              className="flex flex-col justify-between rounded-2xl border border-[#F0DE9C] bg-white p-6 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#FEF3C7] border border-[#F0DE9C] px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-zinc-900">
                    {hotline.scope}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">
                    100% Gratuito
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-base font-bold text-zinc-950">
                  {hotline.name}
                </h3>
                <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                  {hotline.description}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>{hotline.schedule}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0DE9C]/60">
                <a
                  href={`tel:${hotline.fullPhone.replace(/\D/g, "")}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90 shadow-xs"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>Llamar al {hotline.shortNumber}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}