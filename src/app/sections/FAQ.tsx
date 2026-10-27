"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { RandomLetterSwapPingPong } from "@/components/ui/random-letter-swap";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { scrollToTarget } from "@/lib/scroll";

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "I work on video editing, AI-generated video ads, talking-head content, promotional videos, reels, motion graphics, and graphic design."
    },
    {
      question: "How can I discuss a project with you?",
      answer: "Email me at abhishekkumardev57@gmail.com with your brief, references, deliverables, and preferred timeline."
    },
    {
      question: "Which editing and design tools do you use?",
      answer: "My toolkit includes Adobe After Effects, Adobe Premiere Pro, Adobe Photoshop, and Canva."
    },
    {
      question: "Which AI tools do you work with?",
      answer: "I use Veo 3, Nano Banana, Runway, Higgsfield AI, ChatGPT, ElevenLabs, and OpenArt as part of my creative workflow."
    },
    {
      question: "What types of projects have you worked on?",
      answer: "My experience includes AI-generated advertisements for FRND, talking-head videos at DigiChowk and for Askul Global, design work at Pixelo Digital, freelance campaigns and reels, and the ELECTRA 2024 teaser."
    }
  ];

  return (
    <section id="faq" className="py-32 bg-[#0c0c0c]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left Side: Info */}
          <SectionReveal variant="fade-up" delay={0.1} className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 flex items-center gap-2 w-fit">
                <span className="text-[10px] text-white">⊙</span>
                <span className="text-xs font-medium uppercase tracking-widest text-white/80">FAQ</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-white flex flex-wrap gap-x-4">
                <RandomLetterSwapPingPong label="Questions &" />
                <RandomLetterSwapPingPong label="Answers" className="text-white/40 italic" />
              </h2>
              <p className="text-white/40 text-lg leading-relaxed">
                A quick overview of my services and creative background.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
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

          {/* Right Side: Accordion */}
          <SectionReveal variant="fade-up" delay={0.2} className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-xl font-serif transition-colors duration-500 ${activeIndex === i ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 shrink-0 ml-4 ${activeIndex === i ? 'bg-white text-black border-white' : 'text-white/40 group-hover:text-white'}`}>
                    {activeIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-white/50 leading-relaxed max-w-2xl font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </SectionReveal>

        </div>
      </div>
    </section>
  );
};
