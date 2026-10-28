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
      question: "What can you help with?",
      answer: "I edit presenter-led videos, Reels, promotional videos, and paid ads. I also create motion graphics and campaign design."
    },
    {
      question: "What should I include in a project brief?",
      answer: "Share the goal, audience, deliverables, reference links, and deadline. If you already have footage or brand assets, mention those too."
    },
    {
      question: "Which editing and design tools do you use?",
      answer: "My main tools are Adobe After Effects, Premiere Pro, Photoshop, and Canva. The project and deliverables guide the setup."
    },
    {
      question: "How do AI tools fit into your process?",
      answer: "I use Veo 3, Nano Banana, Runway, Higgsfield AI, ChatGPT, ElevenLabs, and OpenArt when generated footage, imagery, voice, or ideas suit the brief."
    },
    {
      question: "What experience do you bring?",
      answer: "My work includes campaign ads for FRND, more than 70 social videos for DigiChowk, editing for Askul Global, design work for Pixelo Digital, and the ELECTRA 2024 teaser."
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
              <h2 className="text-4xl md:text-6xl font-serif text-white flex flex-wrap gap-x-4">
                <RandomLetterSwapPingPong label="Frequently asked questions" />
              </h2>
              <p className="text-white/40 text-lg leading-relaxed">
                A few details about the work, tools, and getting started.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <LiquidButton 
                onClick={() => scrollToTarget('projects')}
                size="lg"
              >
                Explore selected work
              </LiquidButton>
              <LiquidButton 
                onClick={() => scrollToTarget('contact')}
                size="lg"
              >
                Discuss a project
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
