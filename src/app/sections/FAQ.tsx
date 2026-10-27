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
      question: "What work can you take on?",
      answer: "Video editing, talking-head videos, short ads, Reels, motion graphics, and graphic design."
    },
    {
      question: "How do I get in touch?",
      answer: "Use the contact form or email me at abhishekkumardev57@gmail.com. A short project description and timeline are helpful."
    },
    {
      question: "Which editing and design tools do you use?",
      answer: "I use Adobe After Effects, Premiere Pro, Photoshop, and Canva."
    },
    {
      question: "Which AI tools do you use?",
      answer: "Veo 3, Nano Banana, Runway, Higgsfield AI, ChatGPT, ElevenLabs, and OpenArt. The project determines which ones I use."
    },
    {
      question: "What projects have you worked on?",
      answer: "Video ads for FRND, social videos at DigiChowk, talking-head videos for Askul Global, graphics at Pixelo Digital, and the ELECTRA 2024 teaser."
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
                <RandomLetterSwapPingPong label="Common questions" />
              </h2>
              <p className="text-white/40 text-lg leading-relaxed">
                Details about my work and the contact process.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <LiquidButton 
                onClick={() => scrollToTarget('projects')}
                size="lg"
              >
                See my work
              </LiquidButton>
              <LiquidButton 
                onClick={() => scrollToTarget('contact')}
                size="lg"
              >
                Contact me
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
