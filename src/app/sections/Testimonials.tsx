"use client";

import { motion } from "framer-motion";
import { Trophy, Sparkles, Award } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { RandomLetterSwapPingPong } from "@/components/ui/random-letter-swap";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { scrollToTarget } from "@/lib/scroll";

const milestones = [
  {
    title: "First-Prize Recognition",
    category: "Competition Awards",
    description: "Won first prize as a video editor in two college-level competitions held during EXPLORA and TECHSRIJAN.",
    icon: Trophy,
  },
  {
    title: "AI-Assisted Creative Workflow",
    category: "Workflow Innovation",
    description: "Integrated Veo 3, Nano Banana, and ChatGPT into the creative workflow to accelerate production and enhance ad quality.",
    icon: Sparkles,
  }
];

export const Testimonials = () => {
  return (
    <section id="achievements" className="py-24 md:py-32 relative overflow-hidden bg-transparent scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column — Info & Description */}
          <SectionReveal variant="fade-up" delay={0.1} className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-32">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit">
                <span className="text-[10px] text-white">⊙</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Achievements</span>
              </div>
              
              <div className="flex flex-col gap-4">
                <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight flex flex-wrap gap-x-3 md:gap-x-4">
                  <RandomLetterSwapPingPong label="Creative" />
                  <RandomLetterSwapPingPong label="Milestones" className="text-white/30" />
                </h2>
                <p className="text-white/40 text-lg leading-relaxed">
                  Recognition and practical experience that shape my creative work.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <LiquidButton 
                onClick={() => scrollToTarget('projects')}
                size="lg"
              >
                Explore My Work
              </LiquidButton>
              <LiquidButton 
                onClick={() => scrollToTarget('contact')}
                size="lg"
              >
                Let&apos;s Talk
              </LiquidButton>
            </div>
          </SectionReveal>

          {/* Right Column — Milestones Feed */}
          <SectionReveal variant="fade-up" delay={0.25} className="lg:col-span-7 flex flex-col gap-6">
            {milestones.map((m, i) => (
              <div 
                key={i} 
                className="bg-[#0f0f0f]/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col gap-6 hover:border-white/15 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                    <m.icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white tracking-tight">{m.title}</span>
                    <span className="text-xs text-white/30 uppercase tracking-[0.2em] font-medium">{m.category}</span>
                  </div>
                </div>

                <p className="text-lg text-white/60 leading-relaxed font-sans">
                  {m.description}
                </p>
              </div>
            ))}
          </SectionReveal>

        </div>
      </div>
    </section>
  );
};
