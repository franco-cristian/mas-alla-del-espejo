"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, HeartHandshake, ShieldAlert, Crown, Sparkles, Play } from "lucide-react";
import { BrandRibbonIcon } from "@/components/common/brand-logo";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Columna Narrativa (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Badge Institucional */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F0DE9C] bg-white px-4 py-1.5 shadow-xs">
              <Crown className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-xs font-bold tracking-widest uppercase text-zinc-900">
                Belleza con Propósito · Miss World
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="mt-6 font-serif text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl leading-[1.08]">
              No somos perfectas. <br />
              <span className="italic font-normal text-[#D4AF37] underline decoration-[#F0DE9C] underline-offset-8">
                Somos reales.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-700 max-w-2xl font-normal">
              Como sociedad solemos esperar a que un problema se haga visible para recién prestarle atención. Pero, ¿qué pasa con todo lo que atraviesa una persona antes de que alguien se dé cuenta? La presión, las expectativas y el silencio también duelen.
            </p>

            {/* Botones de Acción */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#historia"
                className="inline-flex items-center gap-2.5 rounded-full bg-zinc-950 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#FEF9E7] shadow-md transition-all hover:bg-zinc-800 hover:scale-102"
              >
                <span>Conocer la Historia</span>
                <ArrowDown className="h-4 w-4 text-[#D4AF37]" />
              </a>

              <a
                href="#red-apoyo"
                className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-950 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-xs transition-colors hover:bg-zinc-50"
              >
                <HeartHandshake className="h-4 w-4 text-[#D4AF37]" />
                <span>Pedir Contención</span>
              </a>
            </div>

            {/* Banner Estadístico Oficial OMS */}
            <div className="mt-10 rounded-2xl border border-[#F0DE9C] bg-white p-5 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="rounded-xl bg-[#FEF3C7] p-2 text-zinc-950 shrink-0">
                  <ShieldAlert className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                  <strong className="text-zinc-950 font-bold">
                    «Cada año, más de 720 mil personas mueren por suicidio en el mundo.»
                  </strong>{" "}
                  — Organización Mundial de la Salud. Este proyecto nace para abrir espacios de escucha antes de que el dolor se vuelva invisible.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Columna Visual: Tarjeta Audrey con Lazo Visible */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-sm flex flex-col gap-3">
              {/* Marco Fotográfico Editorial */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#F0DE9C] bg-white p-3 shadow-xl">
                <div className="relative aspect-4/5 w-full rounded-2xl border border-[#F0DE9C]/60 bg-linear-to-t from-zinc-950 via-zinc-900/60 to-zinc-800 flex flex-col justify-between p-6 text-white overflow-hidden">
                  
                  {/* Header de la tarjeta con Lazo Destacado */}
                  <div className="flex items-center justify-between z-10">
                    <span className="rounded-full bg-[#FEF3C7] border border-[#F0DE9C] px-3.5 py-1 text-[10px] font-black tracking-widest uppercase text-zinc-950 shadow-xs">
                      Miss Mundo Formosa 2026
                    </span>
                    <BrandRibbonIcon size={38} />
                  </div>

                  {/* Centro: Botón de Video */}
                  <div className="my-auto flex flex-col items-center justify-center text-center z-10">
                    <a
                      href="#historia"
                      className="group/btn flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-md transition-all hover:scale-110 hover:bg-[#D4AF37] hover:border-zinc-950"
                      aria-label="Ver video presentación"
                    >
                      <Play className="h-7 w-7 text-white fill-white group-hover/btn:text-zinc-950 group-hover/btn:fill-zinc-950 transition-colors ml-1" />
                    </a>
                    <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-zinc-200">
                      Video Presentación Oficial
                    </span>
                  </div>

                  {/* Pie de la tarjeta */}
                  <div className="z-10 rounded-xl border border-white/20 bg-black/60 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      <Sparkles className="h-3 w-3" />
                      Audrey Valentina Caballero
                    </div>
                    <p className="mt-1 font-serif italic text-xs text-zinc-200 leading-snug">
                      «Mirar más allá de lo evidente y dar lugar a aquello que muchas veces queda en silencio.»
                    </p>
                  </div>
                </div>
              </div>

              {/* Badge "4 Capítulos Reales" Integrado Limpiamente */}
              <div className="rounded-2xl border border-[#F0DE9C] bg-white p-3.5 shadow-xs flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3C7] border border-[#F0DE9C] text-zinc-950 font-serif font-black text-lg">
                  4
                </div>
                <div>
                  <div className="text-xs font-black text-zinc-950 uppercase tracking-wider">
                    Capítulos Reales
                  </div>
                  <div className="text-[11px] text-[#B45309] font-medium">
                    Serie «Mi Historia»
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}