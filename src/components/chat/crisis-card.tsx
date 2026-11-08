import React from "react";
import { PhoneCall, ShieldAlert, HeartHandshake } from "lucide-react";
import { CRISIS_HOTLINES } from "@/config/crisis-hotlines";

interface CrisisCardProps {
  onDismiss?: () => void;
}

export function CrisisCard({ onDismiss }: CrisisCardProps) {
  return (
    <div className="my-3 overflow-hidden rounded-xl border-2 border-red-300 bg-red-50/95 p-4 text-slate-800 shadow-lg backdrop-blur-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-100">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-900/40 dark:text-red-400">
          <ShieldAlert className="h-6 w-6 shrink-0" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-ping rounded-full bg-red-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-red-800 dark:text-red-300">
              Estamos con vos · Ayuda Gratuita e Inmediata
            </h4>
          </div>
          <p className="mt-1 text-xs text-red-700 dark:text-red-200">
            No tenés que atravesar esto en soledad. En Argentina contás con líneas oficiales, anónimas y gratuitas disponibles las 24 horas [1, 2]:
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {CRISIS_HOTLINES.slice(0, 2).map((hotline) => (
              <a
                key={hotline.id}
                href={`tel:${hotline.shortNumber.replace(/\D/g, "")}`}
                className="flex items-center justify-between rounded-lg border border-red-200 bg-white p-2.5 text-slate-900 shadow-sm transition-all hover:border-red-400 hover:bg-red-50 dark:border-red-900/50 dark:bg-slate-900 dark:text-slate-100"
              >
                <div>
                  <div className="text-xs font-semibold">{hotline.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {hotline.schedule}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                  <PhoneCall className="h-3 w-3" />
                  {hotline.shortNumber}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-red-200/60 pt-2 text-[11px] text-red-700 dark:border-red-900/40 dark:text-red-300">
            <span className="flex items-center gap-1">
              <HeartHandshake className="h-3.5 w-3.5" /> Formosa: Hospital Central (0370) 442-6232
            </span>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="text-[11px] font-medium underline hover:text-red-950 dark:hover:text-white"
              >
                Cerrar aviso
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}