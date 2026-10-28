"use client";

import { motion } from "framer-motion";
import { Download, Video, Trophy, GraduationCap } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { TextScramble } from "@/components/ui/text-scramble";
import { SectionReveal } from "@/components/ui/SectionReveal";

export const ResumeSection = () => {
  const stats = [
    { 
      label: "Videos edited",
      value: "70+", 
      context: "DigiChowk social channels",
      icon: Video,
    },
    { 
      label: "First-place awards",
      value: "2", 
      context: "EXPLORA and TECHSRIJAN",
      icon: Trophy,
    },
    { 
      label: "Expected graduation",
      value: "2027", 
      context: "B.Tech, Electrical Engineering",
      icon: GraduationCap,
    },
  ];

  return (
    <section id="resume" className="py-24 bg-[#0c0c0c]">
      <div className="max-w-[1300px] mx-auto px-6">
        <div 
          className="p-8 md:p-12 rounded-[3rem] border border-white/10 bg-[#111] overflow-hidden relative"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            {/* Left: Content */}
            <SectionReveal variant="fade-up" className="flex flex-col gap-6 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit mx-auto lg:mx-0">
                <span className="text-[10px] text-white">⊙</span>
                <TextScramble 
                  className="text-[10px] uppercase tracking-widest text-white/40 font-bold"
                  duration={1}
                  characterSet="01"
                >
                  Resume
                </TextScramble>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.1]">
                Resume
              </h2>
              <p className="text-white/40 text-lg leading-relaxed">
                View my experience, education, and key skills in one place.
              </p>
              <div className="flex justify-center lg:justify-start mt-4">
                <a 
                  href="/Abhishek-Kumar-Resume.pdf" 
                  download="Abhishek-Kumar-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <LiquidButton 
                    size="lg" 
                    className="group"
                  >
                    <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Download Resume
                  </LiquidButton>
                </a>
              </div>
            </SectionReveal>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full lg:flex-1">
              {stats.map((stat, i) => (
                <SectionReveal 
                  key={i}
                  variant="fade-up"
                  delay={i * 0.08}
                  className="w-full"
                >
                  <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/[0.03] flex flex-col items-center gap-4 hover:bg-white/[0.06] transition-all group w-full relative overflow-hidden text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-500">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="flex w-full min-w-0 flex-col items-center gap-1">
                      <span className="text-4xl font-bold text-white tracking-tight">{stat.value}</span>
                      <TextScramble 
                        className="w-full max-w-full whitespace-normal break-words text-center text-[9px] md:text-[10px] uppercase leading-tight tracking-[0.12em] sm:tracking-[0.16em] text-white/40 font-bold"
                        duration={1.2}
                      >
                        {stat.label}
                      </TextScramble>
                    </div>
                    <p className="text-[11px] text-white/30 leading-snug">
                      {stat.context}
                    </p>
                    
                    {/* Subtle card glow */}
                    <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/5 blur-2xl group-hover:bg-white/10 transition-all" />
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
