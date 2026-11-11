"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, RotateCcw } from "lucide-react";
import { CrisisCard } from "./crisis-card";
import { detectCrisisIntent } from "@/lib/security/crisis-detector";

const QUICK_PROMPTS = [
  "Me siento abrumada/o por la mirada de los demás",
  "¿Cómo puedo afrontar el bullying en la escuela?",
  "Me comparo todo el tiempo con lo que veo en redes",
  "No sé cómo pedir ayuda sin sentir vergüenza",
];

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "welcome-msg",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hola, soy la **Guía Espejo** del proyecto «Más Allá del Espejo». Estoy acá para escucharte, compartir las reflexiones de Audrey y orientarte si estás viviendo un momento difícil. ¿Qué tenés en el corazón hoy?",
      },
    ],
  },
];

function extractMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return "";
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { type: "text"; text: string }).text)
    .join("");
}

// Renderizador liviano de negritas y párrafos sin dependencias pesadas
function renderFormattedMessage(rawText: string) {
  return rawText.split("\n").map((line, lineIdx) => {
    if (!line.trim()) return <div key={lineIdx} className="h-1.5" />;

    // Detecta partes en **negrita**
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={lineIdx} className="mb-1 leading-relaxed">
        {parts.map((part, partIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={partIdx} className="font-bold text-zinc-950">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={partIdx}>{part}</span>;
        })}
      </p>
    );
  });
}

export function CrisisChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    []
  );

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
    messages: INITIAL_MESSAGES,
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleCustomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    if (detectCrisisIntent(trimmed).isCrisis) {
      setShowCrisisBanner(true);
    }

    setInput("");
    sendMessage({ text: trimmed });
  };

  const handlePromptClick = (promptText: string) => {
    if (isLoading) return;

    if (detectCrisisIntent(promptText).isCrisis) {
      setShowCrisisBanner(true);
    }

    sendMessage({ text: promptText });
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setShowCrisisBanner(false);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón Flotante de Activación */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 rounded-full border-2 border-[#F0DE9C] bg-[#FEF9E7] px-4 py-3 text-zinc-950 shadow-2xl backdrop-blur-md transition-all hover:border-[#D4AF37] hover:shadow-[#FDE68A]/60"
          aria-label="Abrir asistente Guía Espejo"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-zinc-950 shadow-xs">
            <Sparkles className="h-4 w-4 fill-zinc-950" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-black tracking-wide text-zinc-950">Guía Espejo</div>
            <div className="text-[10px] text-[#B45309] font-semibold">
              ¿Hablamos un momento?
            </div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5DE91] opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#D4AF37]" />
          </span>
        </motion.button>
      )}

      {/* Ventana de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex h-140 w-[92vw] max-w-100 flex-col overflow-hidden rounded-3xl border-2 border-[#F0DE9C] bg-[#FEF9E7] shadow-2xl"
          >
            {/* Header Editorial Cálido */}
            <div className="flex items-center justify-between border-b border-[#F0DE9C] bg-linear-to-r from-[#FEF3C7] via-[#FFFDF7] to-[#FDE68A] px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-zinc-950 shadow-xs">
                  <Sparkles className="h-4 w-4 fill-zinc-950" />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-wider uppercase text-zinc-950">
                    Guía Espejo
                  </h3>
                  <p className="text-[10px] text-[#B45309] font-medium leading-tight">
                    Más Allá del Espejo · Audrey Caballero
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reiniciar conversación"
                  className="rounded-lg p-1.5 text-zinc-600 transition-colors hover:bg-white hover:text-zinc-950"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-zinc-600 transition-colors hover:bg-white hover:text-zinc-950"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Aviso de Confidencialidad */}
            <div className="border-b border-[#F0DE9C]/60 bg-[#FEF3C7]/40 px-3 py-1.5 text-center text-[10px] text-zinc-600 font-medium">
              Espacio empático y confidencial. No reemplaza atención médica o psicológica.
            </div>

            {/* Lista de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
              {showCrisisBanner && (
                <CrisisCard onDismiss={() => setShowCrisisBanner(false)} />
              )}

              {messages.map((m) => {
                const textContent = extractMessageText(m);
                if (!textContent) return null;

                const isUser = m.role === "user";

                return (
                  <div
                    key={m.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                        isUser
                          ? "bg-zinc-950 text-[#FEF9E7] font-medium rounded-br-xs"
                          : "border border-[#F0DE9C] bg-white text-zinc-800 rounded-bl-xs"
                      }`}
                    >
                      {isUser ? textContent : renderFormattedMessage(textContent)}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-[#F0DE9C] bg-white px-3.5 py-2 text-xs text-zinc-400">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D4AF37]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D4AF37] [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D4AF37] [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              {/* Sugerencias Rápidas Iniciales */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2">
                  <p className="mb-2 text-[11px] font-bold text-zinc-700">
                    Podés comenzar haciendo clic en una opción:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePromptClick(prompt)}
                        className="rounded-xl border border-[#F0DE9C] bg-white p-2.5 text-left text-[11px] font-medium text-zinc-800 transition-all hover:border-[#D4AF37] hover:bg-[#FEF3C7] shadow-2xs"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Formulario de Entrada */}
            <form
              onSubmit={handleCustomSubmit}
              className="border-t border-[#F0DE9C] bg-white p-3"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribí lo que sentís..."
                  disabled={isLoading}
                  className="w-full rounded-full border border-[#F0DE9C] bg-[#FEF9E7]/40 py-2.5 pl-4 pr-11 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#D4AF37] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#D4AF37] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#D4AF37] text-zinc-950 transition-transform hover:scale-105 disabled:opacity-30 disabled:scale-100 shadow-xs"
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}