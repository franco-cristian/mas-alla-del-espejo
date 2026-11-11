"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, ChevronRight, X, Heart } from "lucide-react";

interface Episode {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  quote: string;
  summary: string;
  content: string;
  readTime: string;
}

const EPISODES: Episode[] = [
  {
    number: 1,
    slug: "cuando-empece",
    title: "Cuando Empecé",
    subtitle: "La vocación temprana y la mirada externa",
    quote: "Detrás de cada escenario hay una chica aprendiendo a creer en sí misma.",
    summary:
      "El inicio en el modelaje y los certámenes estuvo marcado por sueños genuinos, pero también por el primer choque con expectativas ajenas que priorizaban la apariencia sobre la esencia.",
    content:
      "Cuando comencé en este camino, mi mayor deseo era expresarme y aprender. Sin embargo, pronto descubrí que muchas veces la sociedad fija su mirada exclusivamente en lo superficial. Detrás de una sonrisa ensayada o una pasarela, casi nunca se pregunta qué emociones, miedos o dudas habita la persona. Ese fue el primer aprendizaje: entender que el valor propio nunca puede depender de un aplauso externo.",
    readTime: "3 min de lectura",
  },
  {
    number: 2,
    slug: "cuando-hacer-lo-que-amaba-dolia",
    title: "Cuando Hacer lo que Amaba Dolía",
    subtitle: "El impacto del bullying, las redes y las críticas",
    quote: "Las palabras no se las lleva el viento; a veces se quedan grabadas en el espejo.",
    summary:
      "Comentarios desmedidos, exigencias físicas y la soledad que muchas veces se esconde tras una pantalla. El momento donde mirarse al espejo dolía.",
    content:
      "Hubo una etapa donde aquello que amaba comenzó a pesar demasiado. Las críticas destructivas, el hostigamiento escolar y los comentarios malintencionados en redes sociales fueron socavando mi seguridad. Sentía que hagas lo que hagas nunca alcanzaba: siempre había algo que criticar sobre mi cuerpo, mi forma de hablar o mis decisiones. El bullying silencioso te aísla y te hace creer que estás sola en el mundo.",
    readTime: "4 min de lectura",
  },
  {
    number: 3,
    slug: "decidi-seguir",
    title: "Decidí Seguir",
    subtitle: "La resiliencia y el valor de pedir ayuda",
    quote: "La verdadera corona no se pone sobre la cabeza, se construye en el valor de levantarse.",
    summary:
      "Aprender a poner límites, buscar apoyo en el entorno íntimo y transformar las cicatrices en herramientas de superación.",
    content:
      "Tocar fondo me enseñó que la vulnerabilidad no es debilidad. Decidí hablar, pedir ayuda y apoyarme en mi familia. Comprendí que no tenía que complacer las expectativas de nadie más que las mías. Seguir adelante no significó que las críticas desaparecieran mágicamente, sino que su poder sobre mi tranquilidad se desvaneció. Cuando aprendés a habitar tu propia verdad, nadie puede usar tu reflejo en tu contra.",
    readTime: "3 min de lectura",
  },
  {
    number: 4,
    slug: "por-que-nacio-mas-alla-del-espejo",
    title: "Por Qué Nació Más Allá del Espejo",
    subtitle: "Belleza con Propósito: una causa colectiva",
    quote: "No somos perfectas. Somos reales.",
    summary:
      "Transformar la experiencia personal en una política de impacto social y salud mental juvenil para Formosa y Argentina.",
    content:
      "Más Allá del Espejo no es un lema publicitario; es un compromiso de vida. Como Miss Mundo Formosa 2026, mi vocación dentro del programa Belleza con Propósito es utilizar este certamen como un altavoz social. Si una sola chica o chico en nuestra provincia se siente acompañado/a, si logramos que una persona pida ayuda a tiempo y sepa que su vida vale, entonces cada paso habrá tenido sentido. Este espacio es de ustedes.",
    readTime: "4 min de lectura",
  },
];

export function StoryTimeline() {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  return (
    <section id="historia" className="py-20 border-t border-[#F0DE9C]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F0DE9C] bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-zinc-900">
            <BookOpen className="h-3.5 w-3.5 text-[#D4AF37]" />
            Serie Testimonial Exclusiva
          </div>
          <h2 className="mt-4 font-serif text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl">
            Mi Historia: Cuatro Capítulos Reales
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600">
            Un recorrido honesto desde los inicios hasta la creación de este proyecto. Porque para ayudar a otros, primero hay que animarse a contar la verdad sin filtros.
          </p>
        </div>

        {/* Grilla de Capítulos */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EPISODES.map((ep) => (
            <div
              key={ep.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#F0DE9C] bg-white p-6 shadow-xs transition-all hover:border-[#D4AF37] hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-black text-[#D4AF37]">
                    0{ep.number}
                  </span>
                  <span className="text-[11px] font-medium text-zinc-400">
                    {ep.readTime}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-lg font-bold text-zinc-900 group-hover:text-[#D4AF37] transition-colors">
                  {ep.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-zinc-500">
                  {ep.subtitle}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-zinc-600 line-clamp-3">
                  «{ep.quote}»
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0DE9C]/60">
                <button
                  type="button"
                  onClick={() => setSelectedEpisode(ep)}
                  className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-900 group-hover:text-[#D4AF37] transition-colors"
                >
                  <span>Leer capítulo</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Lectura */}
        <AnimatePresence>
          {selectedEpisode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#F0DE9C] bg-[#FEF9E7] p-6 sm:p-8 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setSelectedEpisode(null)}
                  className="absolute top-5 right-5 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-200"
                  aria-label="Cerrar modal"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#D4AF37]">
                  <Sparkles className="h-4 w-4" />
                  Capítulo 0{selectedEpisode.number} · Audrey Caballero
                </div>

                <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-zinc-900">
                  {selectedEpisode.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  {selectedEpisode.subtitle} · {selectedEpisode.readTime}
                </p>

                <blockquote className="my-6 border-l-4 border-[#D4AF37] pl-4 py-1 italic font-serif text-sm sm:text-base text-zinc-800">
                  «{selectedEpisode.quote}»
                </blockquote>

                <div className="text-sm leading-relaxed text-zinc-700 space-y-4 font-normal">
                  <p>{selectedEpisode.content}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#F0DE9C] flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5 font-bold text-zinc-800">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    Belleza con Propósito
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedEpisode(null)}
                    className="rounded-full bg-zinc-950 px-5 py-2 text-xs font-bold text-white hover:bg-zinc-800"
                  >
                    Entendido
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}