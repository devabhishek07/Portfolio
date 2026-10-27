"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare, Film, Layers, Palette, Scissors } from "lucide-react";
import { RandomLetterSwapPingPong } from "@/components/ui/random-letter-swap";
import { TextScramble } from "@/components/ui/text-scramble";
import { TextEffect } from "@/components/ui/text-effect";
import { SectionReveal } from "@/components/ui/SectionReveal";

export const Process = () => {
  const services = [
    {
      number: "01",
      title: "AI Video Advertising",
      description: "Create AI-generated video ads with attention to visual realism, narrative consistency, and platform-focused creative execution.",
      icon: Sparkles,
    },
    {
      number: "02",
      title: "Talking-Head Video Editing",
      description: "Shape spoken content into engaging videos through clear pacing, purposeful cuts, and polished visual presentation.",
      icon: MessageSquare,
    },
    {
      number: "03",
      title: "Promotional Videos & Reels",
      description: "Turn footage and concepts into promotional videos and social reels with a clear message and engaging storytelling.",
      icon: Film,
    },
    {
      number: "04",
      title: "Motion Graphics",
      description: "Use animation, typography, and 3D camera techniques to support the story and bring visual elements to life.",
      icon: Layers,
    },
    {
      number: "05",
      title: "Graphic Design",
      description: "Design campaign assets, social media posts, presentations, and branding materials with consistent visual communication.",
      icon: Palette,
    },
    {
      number: "06",
      title: "Post-Production",
      description: "Refine videos through color grading, audio mixing, speed ramping, and rotoscoping.",
      icon: Scissors,
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0c0c0c] scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <SectionReveal variant="fade-up" className="flex flex-col items-center gap-6 mb-20 text-center">
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 flex items-center gap-2">
            <span className="text-[10px] text-white">⊙</span>
            <TextScramble 
              className="text-xs font-medium uppercase tracking-widest text-white/80"
              duration={1}
              characterSet="01"
            >
              What I Do
            </TextScramble>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4">
            <RandomLetterSwapPingPong label="Creative" />
            <RandomLetterSwapPingPong label="Services" className="text-white/40 italic" />
          </h2>
          <p className="text-white/40 text-lg max-w-md">
            Video editing, AI-assisted visuals, and design for brands, creators, and digital platforms.
          </p>
        </SectionReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <SectionReveal
              key={service.number}
              variant="fade-up"
              delay={i * 0.08}
            >
              <motion.div
                className="p-8 rounded-[2rem] border border-white/10 bg-[#111] relative group overflow-hidden h-full flex flex-col"
              >
                {/* Number Badge */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 group-hover:text-white group-hover:border-white/30 transition-all">
                  {service.number}
                </div>

                {/* Icon */}
                <div className="mb-8 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 group-hover:text-white group-hover:scale-110 transition-all">
                  <service.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4 flex-1">
                  <h3 className="text-xl font-serif text-white group-hover:translate-x-1 transition-transform">
                    <TextEffect preset="blur">{service.title}</TextEffect>
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Service Label */}
                <div className="mt-8 pt-8 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold bg-white/5 px-4 py-1.5 rounded-full">
                    Service {service.number}
                  </span>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
