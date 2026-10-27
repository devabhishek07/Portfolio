"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Volume2, VolumeX } from 'lucide-react';
import { cn } from "@/lib/utils";
import { GlowCard } from '@/components/ui/spotlight-card';
import { RandomLetterSwapPingPong } from '@/components/ui/random-letter-swap';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { MacbookShowcase } from '@/components/ui/MacbookShowcase';
import { TextScramble } from '@/components/ui/text-scramble';
import { startSmoothScroll, stopSmoothScroll, scrollToTarget } from '@/lib/scroll';
import { useYouTubePlayer, isMousePointer, ytThumb, onThumbLoad } from '@/lib/youtube';
interface WorkItem {
  id: string;
  title: string;
  tag: string;
  type: 'youtube' | 'cloudinary' | 'image';
  videoId?: string;
  src?: string;
  poster?: string;
  isVertical?: boolean;
  isSquare?: boolean;
}

const PAUSE_PREVIEWS_EVENT = 'allwork:pause-previews';

// Gallery card media. Nothing plays on its own:
//  - mouse: the video plays (muted) only while the cursor is over the card
//  - touch: tapping the card opens the full player (handled by the parent)
// The YouTube player is only created the first time a card is hovered, so the
// page no longer loads 20+ players while scrolling.
const MediaContent = React.memo(({ item, isUnmuted, setUnmutedId }: { item: any, isUnmuted: boolean, setUnmutedId: (id: string | null) => void }) => {
  const isYouTube = item.type === 'youtube';
  const isVideoFile = item.type === 'video' || (item.type === 'cloudinary' && item.src?.endsWith('.mp4'));
  const isPlayable = isYouTube || isVideoFile;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hoveringRef = React.useRef(false);

  const [hovering, setHovering] = React.useState(false);
  const [mounted, setMounted] = React.useState(false); // player created on first hover
  const [fileReady, setFileReady] = React.useState(false);
  const { play: ytPlay, pause: ytPause, setMuted: ytSetMuted, onIframeLoad, isPlaying: ytPlaying } = useYouTubePlayer(iframeRef);

  const start = () => {
    hoveringRef.current = true;
    setHovering(true);
    setMounted(true);
    if (isYouTube) ytPlay();
    else videoRef.current?.play().catch(() => {});
  };

  const halt = React.useCallback(() => {
    hoveringRef.current = false;
    setHovering(false);
    if (isYouTube) ytPause();
    else videoRef.current?.pause();
  }, [isYouTube, ytPause]);

  const stop = () => {
    halt();
    if (isUnmuted) setUnmutedId(null);
  };

  // Pause if the card scrolls away while playing, or when the full player opens.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !isPlayable) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && hoveringRef.current) halt();
    });
    io.observe(el);
    window.addEventListener(PAUSE_PREVIEWS_EVENT, halt);
    return () => {
      io.disconnect();
      window.removeEventListener(PAUSE_PREVIEWS_EVENT, halt);
    };
  }, [isPlayable, halt]);

  // Keep sound in sync with the shared "which card is unmuted" state.
  React.useEffect(() => {
    if (isYouTube) ytSetMuted(!isUnmuted);
    else if (videoRef.current) videoRef.current.muted = !isUnmuted;
  }, [isUnmuted, isYouTube, ytSetMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // don't open the full player
    setUnmutedId(isUnmuted ? null : item.id);
  };

  const playing = isYouTube ? ytPlaying && hovering : hovering && fileReady;

  if (!isPlayable) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0a0a]">
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-cursor="video"
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0a0a] group/media cursor-pointer"
      onPointerEnter={(e) => isMousePointer(e) && start()}
      onPointerLeave={(e) => isMousePointer(e) && stop()}
    >
      {/* Player: only exists after the first hover */}
      {mounted && isYouTube && (
        <div className={cn(
          "absolute w-[100%] h-[155%] -top-[27.5%] left-0 transform-gpu",
          item.isVertical ? "scale-[1.35]" : item.isSquare ? "scale-[1.45]" : "scale-[1.3]"
        )}>
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playlist=${item.videoId}&enablejsapi=1&playsinline=1`}
            className="w-full h-full border-none pointer-events-none"
            allow="autoplay; encrypted-media"
            title={item.title}
            tabIndex={-1}
            onLoad={onIframeLoad}
          />
        </div>
      )}
      {isVideoFile && (
        <video
          ref={videoRef}
          src={mounted ? item.src : undefined}
          preload="none"
          loop
          muted
          playsInline
          onPlaying={() => setFileReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Cover image: shown until the video is actually playing (no black flash) */}
      <img
        src={item.poster || (isYouTube ? ytThumb(item.videoId) : item.src)}
        onLoad={isYouTube && !item.poster ? (e) => onThumbLoad(e, item.videoId) : undefined}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none",
          playing ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Play hint while idle */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none z-10",
        playing ? "opacity-0" : "opacity-100 bg-black/20"
      )}>
        <span className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
          {hovering && !playing ? (
            <span className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <Play size={26} className="ml-1" fill="currentColor" />
          )}
        </span>
      </div>

      {/* Sound toggle (only while previewing) */}
      <div className={cn(
        "absolute bottom-4 right-4 z-20 transition-opacity duration-300",
        hovering ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isUnmuted ? "Mute preview" : "Unmute preview"}
          className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300",
            isUnmuted
              ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              : "bg-black/40 text-white border-white/20 backdrop-blur-md hover:bg-white/10"
          )}
        >
          {isUnmuted ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>
    </div>
  );
});
MediaContent.displayName = 'MediaContent';

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
      { label: 'DTC Ads', id: `work-sub-${workSlug('DTC Ads')}` },
      { label: 'AI films & microdramas', id: `work-sub-${workSlug('AI Films & Microdramas')}` },
      { label: 'AI Storytelling', id: `work-sub-${workSlug('AI Storytelling')}` },
      { label: 'Cartoon Advertisements', id: `work-sub-${workSlug('Cartoon Advertisements')}` },
      { label: 'Motion Graphics', id: `work-sub-${workSlug('Motion Graphics')}` },
      { label: 'Story Explainer', id: `work-sub-${workSlug('Story Explainer')}` },
      { label: 'Launch Video', id: `work-sub-${workSlug('Launch Video')}` },
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
      Jump to a category
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
  const [unmutedId, setUnmutedId] = useState<string | null>(null);

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
            { id: "dtc-NQGkHaMQr0w", title: "DTC ad 01", tag: "DTC Ads", type: "youtube", videoId: "NQGkHaMQr0w", isVertical: true },
            { id: "dtc-ZaoHmk7s1S8", title: "DTC ad 02", tag: "DTC Ads", type: "youtube", videoId: "ZaoHmk7s1S8", isVertical: true },
            { id: "dtc-ehvAu9tJiGU", title: "DTC ad 03", tag: "DTC Ads", type: "youtube", videoId: "ehvAu9tJiGU", isVertical: true },
            { id: "dtc-fqcKu8v7jbI", title: "DTC ad 04", tag: "DTC Ads", type: "youtube", videoId: "fqcKu8v7jbI", isVertical: true },
            { id: "dtc-dc4KmxCgTSw", title: "DTC ad 05", tag: "DTC Ads", type: "youtube", videoId: "dc4KmxCgTSw", isVertical: true },
          ]
        },
        {
          name: "AI Films & Microdramas",
          items: [
            { id: "ai-film-ONJkfWwlXg4", title: "AI microdrama 01", tag: "AI Films & Microdramas", type: "youtube", videoId: "ONJkfWwlXg4" },
            { id: "ai-film-w4eaCtA0yxc", title: "AI microdrama 02", tag: "AI Films & Microdramas", type: "youtube", videoId: "w4eaCtA0yxc" },
          ]
        },
        {
          name: "AI Storytelling",
          items: [
            { id: "ai-story-SPQJ5s6bWyk", title: "AI story 01", tag: "AI Storytelling", type: "youtube", videoId: "SPQJ5s6bWyk", isVertical: true },
            { id: "ai-story-qF2oUtdswVI", title: "AI story 02", tag: "AI Storytelling", type: "youtube", videoId: "qF2oUtdswVI", isVertical: true },
          ]
        },
        {
          name: "Cartoon Advertisements",
          items: [
            { id: "cartoon-hxsKre4FbgI", title: "Cartoon ad 01", tag: "Cartoon Advertisements", type: "youtube", videoId: "hxsKre4FbgI", isVertical: true },
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
            { id: "motion-UWUybnqWsQk", title: "Amazon motion ad", tag: "Motion Graphics", type: "youtube", videoId: "UWUybnqWsQk", isVertical: true },
            { id: "motion-UMvPrUM4hHo", title: "Motion graphic 02", tag: "Motion Graphics", type: "youtube", videoId: "UMvPrUM4hHo", isVertical: true },
            { id: "motion-FA0pcZJoDl0", title: "Motion graphic preview", tag: "Motion Graphics", type: "youtube", videoId: "FA0pcZJoDl0" },
            { id: "motion-01H1TOQ6uuk", title: "Motion graphic 03", tag: "Motion Graphics", type: "youtube", videoId: "01H1TOQ6uuk" },
          ]
        },
        {
          name: "Story Explainer",
          items: [
            { id: "explainer-n5ZzpteMsOs", title: "Origin Of Clea Hindi", tag: "Story Explainer", type: "youtube", videoId: "n5ZzpteMsOs" },
            { id: "explainer-duFUqDAfSW4", title: "Doctor Strange Third Eye Explained in Hindi", tag: "Story Explainer", type: "youtube", videoId: "duFUqDAfSW4" },
          ]
        },
        {
          name: "Launch Video",
          items: [
            { id: "launch-UDl-ZE4k2so", title: "Aftermovie", tag: "Launch Video", type: "youtube", videoId: "UDl-ZE4k2so" },
          ]
        },
      ]
    },
  ], []);

  React.useEffect(() => {
    if (!selectedVideo) return;
    window.dispatchEvent(new Event(PAUSE_PREVIEWS_EVENT)); // stop any hover preview behind the modal
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
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Selected Work</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight flex items-center gap-x-3 md:gap-x-4">
            <RandomLetterSwapPingPong label="Selected" />
            <RandomLetterSwapPingPong label="Work" className="text-white/40 italic" />
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl">
            Videos, ads, and motion graphics I have worked on.
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
                Edited talking-head videos for Askul Global in Adobe After Effects.
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
                Edited the teaser for ELECTRA 2024, a festival organized by EEL at MMMUT.
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
              Featured videos
              </TextScramble>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20" />
            </div>
            <h3 className="text-2xl md:text-4xl font-serif text-white tracking-tight flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3">
              <RandomLetterSwapPingPong label="Choose" className="text-white/90" />
              <RandomLetterSwapPingPong label="a video" className="text-white/40 italic" />
            </h3>
            <p className="text-sm text-white/30 max-w-md">
              Use the thumbnails to switch videos.
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
                <div className="flex items-baseline gap-4">
                  <h3 className="text-4xl md:text-6xl font-serif text-white tracking-tight flex items-center gap-x-3">
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
                    <div className="flex items-center gap-4 mb-8">
                      <h4 className="text-xl md:text-2xl font-serif text-white/60 tracking-tight italic">
                        <RandomLetterSwapPingPong label={sub.name} />
                      </h4>
                      <div className="h-[1px] w-12 bg-white/10" />
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
                                    setUnmutedId(null); // Mute gallery when modal opens
                                  }}>
                                    <MediaContent item={item} isUnmuted={unmutedId === item.id} setUnmutedId={setUnmutedId} />

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
                                    setUnmutedId(null); // Mute gallery when modal opens
                                  }}>
                                    <MediaContent item={item} isUnmuted={unmutedId === item.id} setUnmutedId={setUnmutedId} />

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
                                  setUnmutedId(null); // Mute gallery when modal opens
                                }}>
                                  <MediaContent item={item} isUnmuted={unmutedId === item.id} setUnmutedId={setUnmutedId} />

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
              {selectedVideo.type === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full border-none"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              ) : selectedVideo.type === 'image' ? (
                <img src={selectedVideo.src} className="w-full h-full object-contain" alt={selectedVideo.title} />
              ) : (
                <video
                  src={selectedVideo.src}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AllWork;
