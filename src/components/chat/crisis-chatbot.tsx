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
        text: "Hola, soy la Guía Espejo del proyecto «Más Allá del Espejo». Estoy acá para escucharte, compartir las reflexiones de Audrey y orientarte si estás viviendo un momento difícil. ¿Qué tenés en el corazón hoy?",
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
          className="group relative flex items-center gap-2.5 rounded-full border border-mirror-gold-300 bg-white/95 px-4 py-3 text-slate-800 shadow-2xl backdrop-blur-md transition-all hover:border-mirror-gold-500 hover:shadow-mirror-gold-200/50 dark:bg-zinc-900/95 dark:text-zinc-100"
          aria-label="Abrir asistente Guía Espejo"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-mirror-gold-600 to-mirror-gold-300 text-white shadow-inner">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold tracking-wide">Guía Espejo</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
              ¿Hablamos un momento?
            </div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mirror-gold-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-mirror-gold-500" />
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
            className="flex h-140 w-[92vw] max-w-100 flex-col overflow-hidden rounded-2xl border border-mirror-gold-200/80 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            {/* Header Editorial */}
            <div className="flex items-center justify-between border-b border-mirror-gold-100 bg-linear-to-r from-mirror-gold-50/70 via-white to-mirror-gold-50/40 px-4 py-3 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mirror-gold-500 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-wider uppercase text-slate-800 dark:text-zinc-100">
                    Guía Espejo
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                    Más Allá del Espejo · Audrey Caballero
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reiniciar conversación"
                  className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Aviso de Confidencialidad */}
            <div className="border-b border-zinc-100 bg-zinc-50/80 px-3 py-1.5 text-center text-[10px] text-zinc-500 dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:text-zinc-400">
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

                return (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        m.role === "user"
                          ? "bg-mirror-gold-500 text-white shadow-sm"
                          : "border border-zinc-100 bg-zinc-50 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                      }`}
                    >
                      {textContent}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-mirror-gold-500" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-mirror-gold-500 [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-mirror-gold-500 [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              {/* Sugerencias Rápidas Iniciales */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2">
                  <p className="mb-2 text-[11px] font-medium text-zinc-400">
                    Podés comenzar haciendo clic en una opción:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePromptClick(prompt)}
                        className="rounded-xl border border-mirror-gold-200/60 bg-mirror-gold-50/40 p-2 text-left text-[11px] text-zinc-700 transition-all hover:border-mirror-gold-400 hover:bg-mirror-gold-100/60 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300"
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
              className="border-t border-zinc-100 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribí lo que sentís..."
                  disabled={isLoading}
                  className="w-full rounded-full border border-zinc-200 bg-zinc-50/60 py-2 pl-3.5 pr-10 text-xs text-zinc-900 placeholder-zinc-400 focus:border-mirror-gold-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-mirror-gold-400 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-mirror-gold-500 text-white transition-opacity hover:opacity-90 disabled:opacity-30"
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