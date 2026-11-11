"use client";

import React from "react";
import { Lock, Sparkles } from "lucide-react";

export function AnonymousBox() {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_ANONYMOUS_BOX === "true";

  if (!isEnabled) {
    return (
      <div className="rounded-3xl border border-dashed border-mirror-gold-300/80 bg-[#FAF8F5] p-6 sm:p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-mirror-gold-100 text-mirror-gold-700 dark:bg-mirror-gold-950 dark:text-mirror-gold-400">
          <Lock className="h-6 w-6" />
        </div>
        <h4 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Casillero Anónimo de Escucha
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-zinc-600 max-w-md mx-auto dark:text-zinc-400">
          Estamos estructurando este canal junto a especialistas en salud mental y protocolos de confidencialidad para brindarte un buzón de desahogo y derivación profesional segura.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-[11px] font-semibold text-mirror-gold-800 border border-mirror-gold-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-mirror-gold-300">
          <Sparkles className="h-3 w-3" />
          Próximamente disponible
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-mirror-gold-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h4 className="font-serif text-lg font-bold">Casillero Activo</h4>
    </div>
  );
}