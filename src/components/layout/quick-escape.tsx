"use client";

import React, { useEffect, useRef } from "react";
import { LogOut } from "lucide-react";

export function QuickEscape() {
  const lastPressTimeRef = useRef<number>(0);

  const triggerEscape = () => {
    window.location.replace("https://es.wikipedia.org/wiki/Portal:Comunidad");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const now = Date.now();
        // Si se presiona ESC dos veces en menos de 1.2 segundos
        if (now - lastPressTimeRef.current < 1200) {
          triggerEscape();
        } else {
          lastPressTimeRef.current = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed top-3 right-4 z-50">
      <button
        type="button"
        onClick={triggerEscape}
        title="Salir rápido (o presiona tecla Escape dos veces)"
        className="flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-zinc-700 shadow-md backdrop-blur-md transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:border-red-600 dark:hover:bg-red-950/60 dark:hover:text-red-300"
        aria-label="Salida segura inmediata"
      >
        <LogOut className="h-3.5 w-3.5 text-red-500" />
        <span>Salida rápida</span>
        <kbd className="hidden rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] font-mono text-zinc-500 sm:inline-block dark:bg-zinc-800 dark:text-zinc-400">
          ESC x2
        </kbd>
      </button>
    </div>
  );
}