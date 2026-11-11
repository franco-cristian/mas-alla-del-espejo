import React from "react";
import { HeartHandshake, Crown } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#F0DE9C] bg-[#FEF9E7] py-14 text-zinc-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="w-56">
            <BrandLogo width={200} height={69} />
            <div className="mt-3 text-xs font-bold text-zinc-800 flex items-center gap-1.5">
              <Crown className="h-3.5 w-3.5 text-[#D4AF37]" />
              Audrey Valentina Caballero · Miss Mundo Formosa 2026
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs font-bold text-zinc-900">
              Iniciativa social vinculada a{" "}
              <span className="underline decoration-[#D4AF37]">
                Belleza con Propósito (Miss World)
              </span>
              .
            </p>
            <p className="mt-1.5 text-xs text-zinc-600 flex items-center justify-center md:justify-end gap-1.5 font-medium">
              <HeartHandshake className="h-4 w-4 text-[#D4AF37]" /> Hecho con compromiso para la juventud formoseña y de todo el país.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}