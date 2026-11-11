import React from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/story/hero-section";
import { StoryTimeline } from "@/components/story/story-timeline";
import { WeeklyPoll } from "@/components/community/weekly-poll";
import { AnonymousBox } from "@/components/community/anonymous-box";
import { SupportNetwork } from "@/components/crisis/support-network";
import { CrisisChatbot } from "@/components/chat/crisis-chatbot";
import { SiteFooter } from "@/components/layout/site-footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#FDF0B5] via-[#FFFDF7] to-[#FDE897] text-zinc-950 flex flex-col font-sans">
      {/* 1. Header Oficial */}
      <SiteHeader />

      <main className="flex-1">
        {/* 2. Hero Editorial */}
        <HeroSection />

        {/* 3. Serie Testimonial */}
        <StoryTimeline />

        {/* 4. Módulo Participá */}
        <section id="participa" className="py-20 border-t border-[#F0DE9C]/60">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7">
                <WeeklyPoll />
              </div>
              <div className="lg:col-span-5">
                <AnonymousBox />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Red Territorial y Nacional */}
        <SupportNetwork />
      </main>

      {/* 6. Chatbot Asistente con Protocolo de Crisis */}
      <CrisisChatbot />

      {/* 7. Footer Oficial */}
      <SiteFooter />
    </div>
  );
}