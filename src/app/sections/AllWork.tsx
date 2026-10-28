"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { cn } from "@/lib/utils";
import { GlowCard } from '@/components/ui/spotlight-card';
import { RandomLetterSwapPingPong } from '@/components/ui/random-letter-swap';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { MacbookShowcase } from '@/components/ui/MacbookShowcase';
import { TextScramble } from '@/components/ui/text-scramble';
import { startSmoothScroll, stopSmoothScroll, scrollToTarget } from '@/lib/scroll';
interface WorkItem {
  id: string;
  title: string;
  tag: string;
  type: 'drive' | 'image';
  driveId?: string;
  src?: string;
  poster?: string;
  isVertical?: boolean;
  isSquare?: boolean;
}



const MediaContent = React.memo(({ item }: { item: WorkItem }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || item.type !== "drive" || !item.driveId) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    }, { rootMargin: "80px" });

    observer.observe(video);
    return () => observer.disconnect();
  }, [item.driveId, item.type]);

  return (
    <div data-cursor="video" className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0a0a] cursor-pointer">
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}
      />
      {item.type === "drive" && item.driveId && (
        <video
          ref={videoRef}
          src={`https://drive.google.com/uc?export=download&id=${item.driveId}`}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setPlaying(false)}
          aria-label={item.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {!playing && item.type === "drive" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <span className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <Play size={26} className="ml-1" fill="currentColor" />
          </span>
        </div>
      )}
    </div>
  );
});
MediaContent.displayName = "MediaContent";

const optimizeCloudinaryUrl = (url: string) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  if (url.includes('upload/')) {
    return url.replace('upload/', 'upload/q_auto,f_auto,w_800/');
  }
  return url;
};

const workSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Quick-jump menu shown under the showreel. Each button scrolls straight to
// its part of the archive (accounts for the fixed navbar).
const JUMP_GROUPS = [
  {
    label: 'Videos',
    links: [
      { label: 'DTC campaigns', id: `work-sub-${workSlug('DTC Ads')}` },
      { label: 'AI films & microdramas', id: `work-sub-${workSlug('AI Films & Microdramas')}` },
      { label: 'AI storytelling', id: `work-sub-${workSlug('AI Storytelling')}` },
      { label: 'Animated ads', id: `work-sub-${workSlug('Cartoon Advertisements')}` },
      { label: 'Motion graphics', id: `work-sub-${workSlug('Motion Graphics')}` },
      { label: 'Explainer videos', id: `work-sub-${workSlug('Story Explainer')}` },
      { label: 'Event films', id: `work-sub-${workSlug('Launch Video')}` },
    ],
  },
];

// Sections fade/slide in the first time they appear, so their position shifts
// slightly while the page is gliding there. Scroll, then correct once after
// the glide finishes so the heading always ends up just under the navbar.
const jumpTo = (id: string) => {
  scrollToTarget(id, -110);
  window.setTimeout(() => scrollToTarget(id, -110), 1400);
};

const WorkJumpNav = () => (
  <nav aria-label="Jump to a work category" className="mb-32 flex flex-col items-center gap-8">
    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
      Explore a category
    </p>
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-0">
      {JUMP_GROUPS.map((group, gIdx) => (
        <div
          key={group.label}
          className={cn(
            "flex flex-col items-center gap-4 md:px-10",
            gIdx > 0 && "md:border-l md:border-white/10"
          )}
        >
          <span className="text-xl md:text-2xl font-serif italic text-white/60">{group.label}</span>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-[560px]">
            {group.links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => jumpTo(link.id)}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white active:scale-95"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </nav>
);

const AllWork = () => {
  const [selectedVideo, setSelectedVideo] = useState<WorkItem | null>(null);


  const categories = useMemo(() => [
    {
      index: "01",
      name: "AI Videos",
      badge: "Series",
      accent: "#f5a623",
      cardType: "card-amber",
      subcategories: [
        {
          name: "DTC Ads",
          items: [
            { id: "dtc-ZaoHmk7s1S8", title: "DTC campaign 02", tag: "DTC Ads", type: "drive", driveId: "1Y7tkMwg3TCaJAlVCfu4BmG7m3qZw0RVu", src: "https://drive.google.com/thumbnail?id=1Y7tkMwg3TCaJAlVCfu4BmG7m3qZw0RVu&sz=w1000", isVertical: true },
            { id: "dtc-ehvAu9tJiGU", title: "DTC campaign 03", tag: "DTC Ads", type: "drive", driveId: "1_rHWaCGGBLoHPg339Sl5m2firzFLJMZn", src: "https://drive.google.com/thumbnail?id=1_rHWaCGGBLoHPg339Sl5m2firzFLJMZn&sz=w1000", isVertical: true },
            { id: "dtc-fqcKu8v7jbI", title: "DTC campaign 04", tag: "DTC Ads", type: "drive", driveId: "193SRUiweDc5UHXuVEeXkDJmzvTS23kqX", src: "https://drive.google.com/thumbnail?id=193SRUiweDc5UHXuVEeXkDJmzvTS23kqX&sz=w1000", isVertical: true },
            { id: "dtc-dc4KmxCgTSw", title: "DTC campaign 05", tag: "DTC Ads", type: "drive", driveId: "15hMD8Mr53iwN8Lgy5uNXewmR_8yM_dLl", src: "https://drive.google.com/thumbnail?id=15hMD8Mr53iwN8Lgy5uNXewmR_8yM_dLl&sz=w1000", isVertical: true },
            { id: "dtc-pGWFuT_57Bs", title: "DTC campaign 06", tag: "DTC Ads", type: "drive", driveId: "1Xi-6bE7GnNZc3rOvjmlwnINkjvtiUoQq", src: "https://drive.google.com/thumbnail?id=1Xi-6bE7GnNZc3rOvjmlwnINkjvtiUoQq&sz=w1000", isVertical: true },
          ]
        },
        {
          name: "AI Films & Microdramas",
          items: [
            { id: "ai-film-ONJkfWwlXg4", title: "AI short film 01", tag: "AI Films & Microdramas", type: "drive", driveId: "1NFuTg1ujkA5nPe-_mXB0ItPXny0j3VFd", src: "https://drive.google.com/thumbnail?id=1NFuTg1ujkA5nPe-_mXB0ItPXny0j3VFd&sz=w1000" },
            { id: "ai-film-w4eaCtA0yxc", title: "AI short film 02", tag: "AI Films & Microdramas", type: "drive", driveId: "1mjbzWsS7d57KDsJSfAL3ncVXMTUcuC2S", src: "https://drive.google.com/thumbnail?id=1mjbzWsS7d57KDsJSfAL3ncVXMTUcuC2S&sz=w1000" },
          ]
        },
        {
          name: "AI Storytelling",
          items: [
            { id: "ai-story-SPQJ5s6bWyk", title: "AI story 01", tag: "AI Storytelling", type: "drive", driveId: "1rT3OErEBgzJKUp8krCxql-IgtzK3CnVn", src: "https://drive.google.com/thumbnail?id=1rT3OErEBgzJKUp8krCxql-IgtzK3CnVn&sz=w1000", isVertical: true },
            { id: "ai-story-qF2oUtdswVI", title: "AI story 02", tag: "AI Storytelling", type: "drive", driveId: "13mFbUfkABrmz4WgkNWYjU3CVbbFuzXYt", src: "https://drive.google.com/thumbnail?id=13mFbUfkABrmz4WgkNWYjU3CVbbFuzXYt&sz=w1000", isVertical: true },
          ]
        },
        {
          name: "Cartoon Advertisements",
          items: [
            { id: "cartoon-hxsKre4FbgI", title: "Cartoon ad 01", tag: "Cartoon Advertisements", type: "drive", driveId: "16VTW-DKWoh2PZSt1zhbjP1Iusc9guCc9", src: "https://drive.google.com/thumbnail?id=16VTW-DKWoh2PZSt1zhbjP1Iusc9guCc9&sz=w1000", isVertical: true },
          ]
        },
      ]
    },
    {
      index: "02",
      name: "Motion Graphics",
      accent: "#ff6b4a",
      cardType: "card-coral",
      subcategories: [
        {
          name: "Motion Graphics",
          items: [
            { id: "motion-UWUybnqWsQk", title: "Amazon motion ad", tag: "Motion Graphics", type: "drive", driveId: "1aFYeXZG2_iuw2ZUo0KOtBzI-RSvOgCmR", src: "https://drive.google.com/thumbnail?id=1aFYeXZG2_iuw2ZUo0KOtBzI-RSvOgCmR&sz=w1000", isVertical: true },
            { id: "motion-UMvPrUM4hHo", title: "Motion graphic 02", tag: "Motion Graphics", type: "drive", driveId: "1kD1W4oBrdA-tdTCPgvZwCh7CLOEijct3", src: "https://drive.google.com/thumbnail?id=1kD1W4oBrdA-tdTCPgvZwCh7CLOEijct3&sz=w1000", isVertical: true },
            { id: "motion-FA0pcZJoDl0", title: "Motion graphic preview", tag: "Motion Graphics", type: "drive", driveId: "1_LKSKLVz4SuiBDU82g08JJB6aQnnK0ra", src: "https://drive.google.com/thumbnail?id=1_LKSKLVz4SuiBDU82g08JJB6aQnnK0ra&sz=w1000" },
            { id: "motion-01H1TOQ6uuk", title: "Motion graphic 03", tag: "Motion Graphics", type: "drive", driveId: "1Bh9nzs2xbodr3nFLAZUb7KmqIEoMl1Ym", src: "https://drive.google.com/thumbnail?id=1Bh9nzs2xbodr3nFLAZUb7KmqIEoMl1Ym&sz=w1000" },
          ]
        },
        {
          name: "Story Explainer",
          items: [
            { id: "explainer-n5ZzpteMsOs", title: "Origin of Clea (Hindi explainer)", tag: "Story Explainer", type: "drive", driveId: "1EbnIsemnbB9_oisC49048O0Vvi7kbHpQ", src: "https://drive.google.com/thumbnail?id=1EbnIsemnbB9_oisC49048O0Vvi7kbHpQ&sz=w1000" },
            { id: "explainer-duFUqDAfSW4", title: "Doctor Strange’s Third Eye (Hindi explainer)", tag: "Story Explainer", type: "drive", driveId: "1Dl3SERv6BGCExSIp7LNOLuMbE6GgAIik", src: "https://drive.google.com/thumbnail?id=1Dl3SERv6BGCExSIp7LNOLuMbE6GgAIik&sz=w1000" },
          ]
        },
        {
          name: "Launch Video",
          items: [
            { id: "launch-UDl-ZE4k2so", title: "Aftermovie", tag: "Launch Video", type: "drive", driveId: "1ii5sMmy2sKM_T9ZMTrg7f7S4ITBVjJYZ", src: "https://drive.google.com/thumbnail?id=1ii5sMmy2sKM_T9ZMTrg7f7S4ITBVjJYZ&sz=w1000" },
          ]
        },
      ]
    },
  ], []);

  React.useEffect(() => {
    if (!selectedVideo) return;

    stopSmoothScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      startSmoothScroll();
    };
  }, [selectedVideo]);

  return (
    <section id="projects" className="projects-section pt-28 pb-24 md:pt-36 md:pb-28 bg-[#080808] relative overflow-hidden font-sans">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section header */}
        <SectionReveal variant="fade-up" className="flex flex-col items-center text-center gap-4 mb-12 md:mb-14">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Selected projects</span>
          </div>
          <h2 className="max-w-full text-4xl md:text-7xl font-serif text-white tracking-tight flex flex-wrap justify-center gap-x-3 md:gap-x-4">
            <RandomLetterSwapPingPong label="Selected" />
            <RandomLetterSwapPingPong label="Work" className="text-white/40 italic" />
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl">
            A selection of video edits, campaign ads, motion graphics, and design. See how I bring each brief to the screen.
          </p>
        </SectionReveal>

        {/* Verified Projects Highlights */}
        <div id="work-video-edits" className="grid scroll-mt-28 grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-20 max-w-4xl mx-auto">
          <div className="p-7 rounded-[2rem] border border-white/10 bg-[#111] flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Video editing</span>
                <span className="text-xs font-mono text-white/20">26 Feb 2026</span>
              </div>
              <h3 className="text-xl font-serif text-white mb-2">Talking-Head Video — Askul Global</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Presenter-led videos edited for Askul Global in Adobe After Effects.
              </p>
            </div>
            <div>
              <a 
                href="https://www.instagram.com/reel/DVNlgCgET7b/?igsh=MWIxY3c1Y2JwZTRi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/80 hover:bg-white hover:text-black hover:border-white transition-all"
              >
                <span>View video</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>

          <div className="p-7 rounded-[2rem] border border-white/10 bg-[#111] flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Event Teaser</span>
                <span className="text-xs font-mono text-white/20">Mar 2024 - Apr 2024</span>
              </div>
              <h3 className="text-xl font-serif text-white mb-2">ELECTRA Teaser 2024</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Edited the teaser for ELECTRA 2024, the festival organized by EEL at MMMUT.
              </p>
            </div>
            <div>
              <a 
                href="https://drive.google.com/file/d/1BmuzeK3ira3XV4P2o3Niikl1bIlfZJ9M/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/80 hover:bg-white hover:text-black hover:border-white transition-all"
              >
                <span>View teaser</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Featured Showreel — MacBook Showcase */}
        <SectionReveal variant="fade-up" className="flex flex-col items-center text-center gap-4 mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20" />
              <TextScramble
                className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30"
                duration={1.2}
                characterSet="⊹⊡⊞⊟◈◇◆"
              >
              Featured showreel
              </TextScramble>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20" />
            </div>
            <h3 className="max-w-full text-xl sm:text-2xl md:text-4xl font-serif text-white tracking-tight flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3">
              <RandomLetterSwapPingPong label="Click to explore" className="text-white/90" />
              <RandomLetterSwapPingPong label="my best work" className="text-white/40" />
            </h3>
            <p className="text-sm text-white/30 max-w-md">
              A handpicked mix of edits, ads, and AI-assisted videos. Select a thumbnail to bring that project into focus.
            </p>
          </motion.div>
        </SectionReveal>

        <MacbookShowcase />

        <WorkJumpNav />

        {categories.map((category) => (
          <SectionReveal 
            key={category.index} 
            id={`work-${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
            variant="fade-up"
            className="mb-24 md:mb-28 relative scroll-mt-28"
          >
            {/* Category Header */}
            <div className="flex flex-col gap-4 mb-12">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-white/20 tracking-widest uppercase">0{category.index}</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <div className="flex min-w-0 items-baseline gap-4">
                  <h3 className="min-w-0 max-w-full text-3xl sm:text-4xl md:text-6xl font-serif text-white tracking-tight flex flex-wrap gap-x-3">
                    <RandomLetterSwapPingPong label={category.name.split(' ')[0]} />
                    {category.name.split(' ').length > 1 && (
                      <RandomLetterSwapPingPong 
                        label={category.name.split(' ').slice(1).join(' ')} 
                        className="text-white/40 italic" 
                      />
                    )}
                  </h3>
                </div>
              </div>

            {category.subcategories.map((sub, sIdx) => {
              const landscapeItems = sub.items.filter(item => !((item as any).isVertical) && !((item as any).isSquare));
              const portraitItems = sub.items.filter(item => (item as any).isVertical && !((item as any).isSquare));
              const squareItems = sub.items.filter(item => (item as any).isSquare);

              return (
                <div key={sub.name} id={`work-sub-${workSlug(sub.name)}`} className={cn(sIdx === 0 ? "mt-0" : "mt-20 md:mt-24", "scroll-mt-28")}>
                  {sub.name !== "Advertisements" && (
                    <div className="mb-8 flex w-full min-w-0 items-center gap-3 sm:gap-4">
                      <h4 className="min-w-0 max-w-full text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-white/70">
                        {sub.name}
                      </h4>
                      <div aria-hidden="true" className="hidden h-px min-w-8 flex-1 bg-white/10 sm:block" />
                    </div>
                  )}

                  <div className="flex flex-col gap-8">
                      {/* Landscape Row */}
                      {landscapeItems.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-6">
                          {landscapeItems.map((item: any, idx) => {
                            const isSaasVideos = sub.name === "Launch Video";
                            const widthClass = isSaasVideos
                              ? "w-full sm:w-[calc(50%-12px)]"
                              : landscapeItems.length === 4
                                ? "w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                                : "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]";
                            return (
                              <div key={item.id} className={cn(widthClass, isSaasVideos ? "max-w-[560px]" : "max-w-[420px]")}>
                                <motion.div 
                                  className="aspect-video rounded-[1.8rem] overflow-hidden relative group cursor-pointer p-0 border border-white/5 bg-[#111]"
                                >
                                  <div className="w-full h-full" onClick={() => {
                                    setSelectedVideo(item);

                                  }}>
                                    <MediaContent item={item} />

                                  </div>
                                </motion.div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {/* Portrait Row */}
                      {portraitItems.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-6">
                          {portraitItems.map((item: any, idx) => {
                            const widthClass = portraitItems.length === 5
                              ? "w-[calc(50%-12px)] sm:w-[calc(33.33%-16px)] lg:w-[calc(20%-20px)]"
                              : "w-[calc(50%-12px)] sm:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)]";
                            return (
                              <div key={item.id} className={cn(widthClass, "max-w-[280px]")}>
                                <motion.div 
                                  className="aspect-[9/16] rounded-[1.8rem] overflow-hidden relative group cursor-pointer p-0 border border-white/5 bg-[#111]"
                                >
                                  <div className="w-full h-full" onClick={() => {
                                    setSelectedVideo(item);

                                  }}>
                                    <MediaContent item={item} />

                                  </div>
                                </motion.div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Square Row */}
                      {squareItems.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-6">
                          {squareItems.map((item: any, idx) => (
                            <div key={item.id} className="w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] max-w-[340px]">
                              <motion.div 
                                className="aspect-square rounded-[1.8rem] overflow-hidden relative group cursor-pointer p-0 border border-white/5 bg-[#111]"
                              >
                                <div className="w-full h-full" onClick={() => {
                                  setSelectedVideo(item);

                                }}>
                                  <MediaContent item={item} />

                                </div>
                              </motion.div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </SectionReveal>
        ))}
      </div>

      {/* Cinema Mode Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
          >
            <button
              onClick={() => {
                setSelectedVideo(null);
              }}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[120]"
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black"
            >
              {selectedVideo.type === 'drive' ? (
                <iframe
                  src={`https://drive.google.com/file/d/${selectedVideo.driveId}/preview`}
                  className="w-full h-full border-none"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              ) : (
                <img src={selectedVideo.src} className="w-full h-full object-contain" alt={selectedVideo.title} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AllWork;

