"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, HeartHandshake, Crown, LogOut } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerEscape = () => {
    window.location.replace("https://es.wikipedia.org/wiki/Portal:Comunidad");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F0DE9C] bg-[#FEF9E7]/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 sm:h-22 items-center justify-between px-3 sm:px-6">
        
        {/* Identidad de Marca: Visible en Móvil y Desktop */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3.5 group shrink-0">
          <BrandLogo width={180} height={60} />
          
          {/* Nombre y Título Visible en Todas las Pantallas */}
          <div className="flex flex-col border-l border-zinc-900/15 pl-2 sm:pl-3">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1 leading-tight">
              <Crown className="h-3 w-3 text-[#D4AF37] shrink-0" />
              Audrey Caballero
            </span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-zinc-600 font-medium leading-tight">
              Miss Mundo Formosa 2026
            </span>
          </div>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-zinc-700">
          <a href="#historia" className="transition-colors hover:text-[#D4AF37]">
            Mi Historia
          </a>
          <a href="#participa" className="transition-colors hover:text-[#D4AF37]">
            Participá
          </a>
          <a
            href="#red-apoyo"
            className="flex items-center gap-2 rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-[#FEF9E7] shadow-xs transition-all hover:bg-zinc-800"
          >
            <HeartHandshake className="h-4 w-4 text-[#D4AF37]" />
            <span>Líneas de Ayuda</span>
          </a>
          
          {/* Botón Salida Rápida Desktop */}
          <button
            type="button"
            onClick={triggerEscape}
            title="Salir rápido (Escape)"
            className="flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-zinc-700 shadow-xs hover:border-red-400 hover:text-red-700 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5 text-red-500" />
            <span>Salida rápida</span>
          </button>
        </nav>

        {/* Acciones en Mobile: Salida Rápida + Menú Ordenados */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={triggerEscape}
            className="flex items-center gap-1 rounded-full border border-red-300 bg-white px-2.5 py-1 text-[10px] font-bold text-red-700 shadow-xs"
            aria-label="Salida segura"
          >
            <LogOut className="h-3 w-3 text-red-600" />
            <span>Salir</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-zinc-300 bg-white p-1.5 text-zinc-900 hover:bg-white"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile Desplegable */}
      {mobileMenuOpen && (
        <div className="border-t border-[#F0DE9C] bg-[#FEF9E7] px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-bold text-zinc-900">
            <a
              href="#historia"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D4AF37]"
            >
              Mi Historia (4 Capítulos)
            </a>
            <a
              href="#participa"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D4AF37]"
            >
              Encuesta Comunitaria
            </a>
            <a
              href="#red-apoyo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-zinc-900"
            >
              <HeartHandshake className="h-4 w-4 text-[#D4AF37]" /> Líneas de Ayuda 135 / 102
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}