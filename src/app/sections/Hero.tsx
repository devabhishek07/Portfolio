"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { TextEffect } from "@/components/ui/text-effect";
import { Spotlight } from "@/components/ui/spotlight";
import { RandomLetterSwapPingPong } from "@/components/ui/random-letter-swap";

import { TextScramble } from "@/components/ui/text-scramble";
import { scrollToTarget } from "@/lib/scroll";

const FloatingShapes = dynamic(
  () => import("@/components/ui/FloatingShapes").then(m => ({ default: m.FloatingShapes })),
  { ssr: false }
);

export const Hero = () => {
  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden pt-32 pb-24">
      <Spotlight
        className="-top-40 left-0 md:left-[15%] md:-top-32"
        fill="white"
      />
      <FloatingShapes />
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#646464]/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-8 md:gap-12 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit max-w-full"
          >
            <span className="text-[10px] text-white shrink-0">⊙</span>
            <TextScramble 
              className="text-[9px] md:text-xs font-medium uppercase tracking-widest text-white/80 whitespace-nowrap overflow-hidden text-ellipsis"
              duration={1.5}
              characterSet="01"
            >
              Video Editor | Graphic Designer | AI Video Creator
            </TextScramble>
          </motion.div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-7xl font-serif tracking-tight leading-tight flex items-center gap-x-2 md:gap-x-4 flex-wrap">
                <div className="flex items-center gap-x-2 md:gap-x-4">
                  <RandomLetterSwapPingPong
                    label="Abhishek"
                    className="text-white"
                    staggerDuration={0.03}
                  />
                  <RandomLetterSwapPingPong
                    label="Kumar"
                    className="text-white/30"
                    staggerDuration={0.03}
                  />
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    onClick={() => scrollToTarget('contact')}
                    className="flex items-center justify-center w-8 h-8 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/5 align-middle hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer"
                  >
                    <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5" />
                  </motion.button>
                </div>
              </h1>
            </div>

            <TextEffect 
              preset="blur"
              per="word"
              delay={0.8}
              className="text-base md:text-xl text-white/60 max-w-2xl leading-relaxed text-justify"
            >
              I edit talking-head videos, social clips, and paid ads. I also create campaign graphics and use AI tools for video projects.
            </TextEffect>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 md:gap-6 mt-4"
          >
            <LiquidButton 
              onClick={() => scrollToTarget('projects')}
              size="lg"
            >
              See my work
            </LiquidButton>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToTarget('contact')}
              className="flex items-center justify-center bg-white text-[#0c0c0c] px-8 h-10 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Contact me
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column — Highlights Cluster */}
        <div className="relative h-[400px] md:h-[500px] hidden lg:flex items-center justify-center lg:justify-end lg:col-span-5">
          {/* Card 1 */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [-8, -8, -8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-4 w-72 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md z-20"
          >
            <h4 className="text-white font-serif text-lg mb-2">70+ talking-head videos</h4>
            <p className="text-white/70 text-xs leading-relaxed">
              Edited for DigiChowk&apos;s social channels during my internship.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [5, 5, 5]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-4 right-[-40px] w-72 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md z-10"
          >
            <h4 className="text-white font-serif text-lg mb-2">Video ads for FRND</h4>
            <p className="text-white/70 text-xs leading-relaxed">
              Made video ads for FRND&apos;s Meta and Google campaigns and social channels.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            animate={{ y: [8, -8, 8], rotate: [-3, -3, -3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[38%] left-0 w-64 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md z-10"
          >
            <h4 className="text-white font-serif text-lg mb-2">DTC video ads</h4>
            <p className="text-white/70 text-xs leading-relaxed">
              Short product ads with a clear offer and call to action.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
