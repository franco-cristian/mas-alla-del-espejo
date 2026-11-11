"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  HeartHandshake,
  ShieldAlert,
  Crown,
  Play,
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { BrandRibbonIcon } from "@/components/common/brand-logo";

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

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

          {/* Columna Visual: Reproductor Vertical 9:16 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-77.5 sm:max-w-85 flex flex-col gap-3">
              {/* Marco Editorial Tipo Smartphone */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#F0DE9C] bg-white p-2.5 shadow-2xl">
                <div
                  onClick={togglePlay}
                  className="group relative aspect-9/16 w-full cursor-pointer rounded-2xl bg-zinc-950 overflow-hidden shadow-inner"
                >
                  {/* Video Vertical Nativo */}
                  <video
                    ref={videoRef}
                    src="/videos/audrey-presentacion.mp4"
                    playsInline
                    preload="metadata"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnded}
                    className="h-full w-full object-cover"
                  />

                  {/* Header Superior: Badge + Lazo + Control de Audio */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
                    <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[9px] font-black tracking-widest uppercase text-[#FEF3C7]">
                      Miss Mundo Formosa
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white transition-transform hover:scale-105"
                        aria-label={isMuted ? "Activar audio" : "Silenciar"}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4 text-red-400" />
                        ) : (
                          <Volume2 className="h-4 w-4 text-[#D4AF37]" />
                        )}
                      </button>

                      <BrandRibbonIcon size={34} />
                    </div>
                  </div>

                  {/* Botón Central de Play/Pause */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all z-10">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/90 bg-[#D4AF37]/90 text-zinc-950 shadow-2xl transition-transform hover:scale-110">
                        {progress > 95 ? (
                          <RotateCcw className="h-7 w-7" />
                        ) : (
                          <Play className="h-7 w-7 fill-zinc-950 ml-1" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Barra Delgada de Progreso Dorado al Pie */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-20">
                    <div
                      className="h-full bg-[#D4AF37] transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Botón Interactivo: Acceso Directo a los 4 Capítulos */}
              <a
                href="#historia"
                className="group flex items-center justify-between rounded-2xl border border-[#F0DE9C] bg-white p-3.5 shadow-xs transition-all hover:border-[#D4AF37] hover:bg-[#FEF3C7]/40 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] border border-[#F0DE9C] text-zinc-950 font-serif font-black text-base shrink-0 transition-transform group-hover:scale-105">
                    4
                  </div>
                  <div>
                    <div className="text-xs font-black text-zinc-950 uppercase tracking-wider group-hover:text-[#B45309] transition-colors">
                      Capítulos Reales
                    </div>
                    <div className="text-[11px] text-zinc-600 font-medium leading-tight">
                      Serie «Mi Historia» · Audrey Caballero
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-zinc-100 p-1.5 text-zinc-400 group-hover:bg-[#D4AF37] group-hover:text-zinc-950 transition-colors">
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}