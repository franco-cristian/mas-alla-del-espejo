import React from "react";
import { PhoneCall, ShieldAlert, HeartHandshake } from "lucide-react";
import { CRISIS_HOTLINES } from "@/config/crisis-hotlines";

interface CrisisCardProps {
  onDismiss?: () => void;
}

export function CrisisCard({ onDismiss }: CrisisCardProps) {
  return (
    <div className="my-2.5 overflow-hidden rounded-2xl border-2 border-red-400 bg-red-50 p-4 text-zinc-900 shadow-md">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-red-100 p-2 text-red-600 shrink-0">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-ping rounded-full bg-red-600" />
            <h4 className="text-xs font-black uppercase tracking-wider text-red-900">
              Estamos con vos · Ayuda Gratuita e Inmediata
            </h4>
          </div>
          <p className="mt-1 text-xs text-red-800 leading-snug">
            No tenés que atravesar esto en soledad. En Argentina contás con líneas oficiales, anónimas y gratuitas las 24 horas [1, 2]:
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {CRISIS_HOTLINES.slice(0, 2).map((hotline) => (
              <a
                key={hotline.id}
                href={`tel:${hotline.shortNumber.replace(/\D/g, "")}`}
                className="flex items-center justify-between rounded-xl border border-red-300 bg-white p-2.5 text-zinc-900 shadow-xs transition-transform hover:scale-[1.02]"
              >
                <div>
                  <div className="text-[11px] font-bold text-zinc-900">{hotline.name}</div>
                  <div className="text-[10px] text-zinc-500">
                    {hotline.schedule}
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-red-600 px-2 py-1 text-xs font-extrabold text-white">
                  <PhoneCall className="h-3 w-3" />
                  {hotline.shortNumber}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-red-200 pt-2 text-[10px] text-red-800">
            <span className="flex items-center gap-1 font-semibold">
              <HeartHandshake className="h-3.5 w-3.5" /> Formosa: Hospital Central (0370) 442-6232
            </span>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="text-[10px] font-bold underline hover:text-red-950"
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