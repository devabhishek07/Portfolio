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
      title: "AI video ads",
      description: "Turn a campaign brief into short ads with generated footage, product visuals, and a clear call to action.",
      icon: Sparkles,
    },
    {
      number: "02",
      title: "Talking-head videos",
      description: "Keep interviews and presenter videos clear with considered cuts, readable captions, and supporting graphics.",
      icon: MessageSquare,
    },
    {
      number: "03",
      title: "Promos and Reels",
      description: "Shape footage into concise videos for launches, events, and social feeds.",
      icon: Film,
    },
    {
      number: "04",
      title: "Motion graphics",
      description: "Add animated titles, product callouts, and 3D camera movement to your video.",
      icon: Layers,
    },
    {
      number: "05",
      title: "Graphic design",
      description: "Create a consistent set of campaign graphics, social posts, presentations, and brand materials.",
      icon: Palette,
    },
    {
      number: "06",
      title: "Video finishing",
      description: "Finish the cut with color grading, balanced audio, precise speed changes, and clean masks.",
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
            <RandomLetterSwapPingPong label="Services" />
          </h2>
          <p className="text-white/40 text-lg max-w-md">
            Video editing and design for social content, paid campaigns, and brand stories.
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
                id={service.number === "05" ? "designs" : undefined}
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

              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
