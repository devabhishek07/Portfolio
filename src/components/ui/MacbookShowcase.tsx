"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedVideo {
  id: string;
  title: string;
  category: string;
  driveId: string;
}

const featuredVideos: FeaturedVideo[] = [
  { id: "showreel", title: "Selected work", category: "Showreel", driveId: "1ii5sMmy2sKM_T9ZMTrg7f7S4ITBVjJYZ" },
  { id: "clea", title: "Origin of Clea", category: "AI storytelling", driveId: "1EbnIsemnbB9_oisC49048O0Vvi7kbHpQ" },
  { id: "drakkon", title: "Lord Drakkon", category: "AI storytelling", driveId: "1rT3OErEBgzJKUp8krCxql-IgtzK3CnVn" },
  { id: "film-one", title: "Short film 01", category: "AI short films", driveId: "1NFuTg1ujkA5nPe-_mXB0ItPXny0j3VFd" },
  { id: "film-two", title: "Short film 02", category: "AI short films", driveId: "1mjbzWsS7d57KDsJSfAL3ncVXMTUcuC2S" },
];

export const MacbookShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = featuredVideos[activeIndex];
  const goTo = (index: number) => setActiveIndex((index + featuredVideos.length) % featuredVideos.length);

  return (
    <div className="w-full flex flex-col items-center mb-20 md:mb-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
      <div className="relative w-full max-w-[960px] mx-auto flex items-center justify-center">
        <button onClick={() => goTo(activeIndex - 1)} aria-label="Previous featured video" className="absolute left-2 md:-left-14 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/75 backdrop-blur-md transition hover:bg-white hover:text-black md:flex">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => goTo(activeIndex + 1)} aria-label="Next featured video" className="absolute right-2 md:-right-14 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/75 backdrop-blur-md transition hover:bg-white hover:text-black md:flex">
          <ChevronRight size={20} />
        </button>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative w-full aspect-[1536/1024]" style={{ perspective: "2000px" }}>
          <div className="absolute inset-0" style={{ transform: "rotateX(4deg)" }}>
            <div className="absolute inset-0 z-20 pointer-events-none">
              <img src="/images/macbook-frame.png" alt="MacBook frame" className="w-full h-full object-contain drop-shadow-2xl" />
            </div>
            <div className="absolute z-10 overflow-hidden bg-black" style={{ top: "11.2%", left: "14%", right: "14%", bottom: "17%", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
              <iframe
                key={activeVideo.driveId}
                src={`https://drive.google.com/file/d/${activeVideo.driveId}/preview`}
                title={activeVideo.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="relative z-30 mt-3 grid w-full max-w-4xl grid-cols-2 gap-3 px-5 sm:grid-cols-3 md:grid-cols-5 md:gap-4 md:px-0">
        {featuredVideos.map((video, index) => (
          <button key={video.id} onClick={() => goTo(index)} aria-pressed={activeIndex === index} className={`group overflow-hidden rounded-xl border text-left transition ${activeIndex === index ? "border-white/60 bg-white/[0.08]" : "border-white/10 bg-white/[0.025] hover:border-white/30"}`}>
            <img src={`https://drive.google.com/thumbnail?id=${video.driveId}&sz=w800`} alt="" className="aspect-video w-full object-cover opacity-75 transition group-hover:opacity-100" loading="lazy" />
            <span className="block whitespace-normal break-words px-3 pt-2 text-[9px] font-mono leading-snug tracking-[0.08em] text-white/45">{video.category}</span>
            <span className="block whitespace-normal break-words px-3 pb-2 text-xs font-medium leading-snug text-white/80">{video.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
