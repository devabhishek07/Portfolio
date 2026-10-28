"use client";

import { motion } from "framer-motion";
import { MessageSquare, CreditCard, Layers, Zap, Scissors, CircleCheck } from "lucide-react";
import { RandomLetterSwapPingPong } from "@/components/ui/random-letter-swap";
import { TextScramble } from "@/components/ui/text-scramble";
import { TextEffect } from "@/components/ui/text-effect";
import { SectionReveal } from "@/components/ui/SectionReveal";

export const Process = () => {
  const services = [
    {
      number: "01",
      title: "Client Meeting",
      description: "I connect with clients via online Meet to understand their vision and collaboratively build a project roadmap. I also contribute my own creative input to help the client see the bigger picture and enhance the final outcome. Payment terms are discussed and agreed upon during this call.",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "Advance Payment & Project Kickoff",
      description: "Once the client makes an advance payment of 30% of the total project fee, work officially begins. A deadline is also fixed at this stage to keep the project on track.",
      icon: CreditCard,
    },
    {
      number: "03",
      title: "Storyboard",
      description: "The first step in production is building a storyboard. I manually curate references and inspiration relevant to the project, and for scenes that need to be created from scratch, I sketch them out directly on the storyboard - bringing my own creative direction to life visually.",
      icon: Layers,
    },
    {
      number: "04",
      title: "Production",
      description: "Drawing on my experience across various ad campaigns, I apply my understanding of the target audience and campaign objectives to craft fast, punchy, and visually compelling hook scenes that grab attention from the first frame.",
      icon: Zap,
    },
    {
      number: "05",
      title: "AI-Assisted Editing & Post-Production",
      description: "Scene analysis is conducted using AI tools (Claude and ChatGPT) to craft catchy hooks and keep the narrative sharp. Visual enhancement is then applied to each scene to refine colour grading, tone, and aesthetics to match the desired mood. SFX and background music are layered in to elevate the emotional impact, using industry-standard tools including Adobe Premiere Pro, After Effects, and Photoshop.",
      icon: Scissors,
    },
    {
      number: "06",
      title: "Delivery & Final Polishing",
      description: "The completed video is delivered with a watermark applied. The package includes 3 complimentary revision rounds for any adjustments. Should revisions exceed this limit, each additional change will be billed individually, with the cost determined by the complexity of the requested modification.",
      icon: CircleCheck,
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
              How I can help
            </TextScramble>
          </div>
          <h2 className="max-w-full text-4xl md:text-7xl font-serif text-white flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4">
            <RandomLetterSwapPingPong label="Video & motion" />
            <RandomLetterSwapPingPong label="design" className="text-white/45" />
          </h2>
          <p className="text-white/40 text-lg max-w-md">
            From campaign creative to final polish, I make content for social feeds, paid ads, and brand stories.
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
                id={service.number === "03" ? "designs" : undefined}
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
                  <p className="text-white/40 text-sm leading-relaxed text-justify">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <span className="inline-flex rounded-full bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-wide text-white/40">
                    Step {Number(service.number)}
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

