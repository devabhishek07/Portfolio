"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause, SkipBack, SkipForward, Maximize2, Minimize2 } from "lucide-react";
import { useYouTubePlayer, isMousePointer, ytThumb, onThumbLoad } from "@/lib/youtube";

interface FeaturedVideo {
  id: string;
  title: string;
  category: string;
  videoId: string;
}

const featuredVideos: FeaturedVideo[] = [
  { id: "showreel-c_0GeIyvwdM", title: "Showreel", category: "Selected work", videoId: "c_0GeIyvwdM" },
  { id: "story-SPQJ5s6bWyk", title: "AI story 01", category: "AI storytelling", videoId: "SPQJ5s6bWyk" },
  { id: "story-qF2oUtdswVI", title: "AI story 02", category: "AI storytelling", videoId: "qF2oUtdswVI" },
  { id: "microdrama-ONJkfWwlXg4", title: "Short film 01", category: "AI short films", videoId: "ONJkfWwlXg4" },
  { id: "microdrama-w4eaCtA0yxc", title: "Short film 02", category: "AI short films", videoId: "w4eaCtA0yxc" },
];

export const MacbookShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  // Nothing plays on its own: the player is only created on first hover/tap,
  // plays while the cursor is over the screen, and pauses when it leaves.
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(0); // -1 left, 1 right
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const {
    play,
    pause,
    setMuted: ytSetMuted,
    seekTo: ytSeekTo,
    send,
    onIframeLoad,
    isPlaying,
    reset,
  } = useYouTubePlayer(iframeRef);

  const activeVideo = featuredVideos[activeIndex];

  useEffect(() => {
    ytSetMuted(isMuted);
  }, [isMuted, ytSetMuted]);

  // Pause when the showcase scrolls out of view.
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [pause]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    reset();

    const handlePlayerMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow || typeof event.data !== "string") return;

      try {
        const message = JSON.parse(event.data);
        if (message.event !== "infoDelivery" || !message.info) return;

        if (typeof message.info.currentTime === "number") {
          setCurrentTime(message.info.currentTime);
        }
        if (typeof message.info.duration === "number") {
          setDuration(message.info.duration);
        }
      } catch {
        // Ignore non-JSON messages from the iframe.
      }
    };

    window.addEventListener("message", handlePlayerMessage);
    return () => window.removeEventListener("message", handlePlayerMessage);
  }, [activeVideo.videoId, reset]);

  // Only poll the timeline while something is actually playing.
  useEffect(() => {
    if (!isPlaying) return;
    const updateProgress = window.setInterval(() => {
      send("getCurrentTime");
      send("getDuration");
    }, 500);
    return () => window.clearInterval(updateProgress);
  }, [isPlaying, send]);

  const startPlayback = () => {
    setMounted(true);
    play();
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else startPlayback();
  };

  const seekTo = (time: number) => {
    const nextTime = Math.max(0, Math.min(time, duration || time));
    setCurrentTime(nextTime);
    ytSeekTo(nextTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === screenRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await screenRef.current?.requestFullscreen();
    }
  };

  const goTo = (newIndex: number) => {
    const total = featuredVideos.length;
    const nextIdx = (newIndex + total) % total;
    if (nextIdx === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setIsMuted(true);
    pause();
    setActiveIndex(nextIdx);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  return (
    <div className="w-full flex flex-col items-center mb-20 md:mb-24 relative">
      {/* Ambient glow behind laptop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-[960px] mx-auto flex items-center justify-center">
        <button
          onClick={goPrev}
          aria-label="Previous featured video"
          className="absolute left-2 md:-left-14 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/75 backdrop-blur-md transition hover:bg-white hover:text-black md:flex"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goNext}
          aria-label="Next featured video"
          className="absolute right-2 md:-right-14 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/75 backdrop-blur-md transition hover:bg-white hover:text-black md:flex"
        >
          <ChevronRight size={20} />
        </button>

        {/* MacBook Frame */}
        <div
          className="w-full"
          style={{ perspective: "2000px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              transform: "rotateX(4deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* ═══ Image-based MacBook Frame ═══ */}
            <div className="relative w-full aspect-[1536/1024]">
              {/* Laptop Image */}
              <img 
                src="/images/macbook-frame.png" 
                alt="MacBook Frame" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-2xl" 
              />
              
              {/* Screen Content Area */}
              {/* Adjust these percentage values based on the actual screen position in the image */}
              <div 
                ref={screenRef}
                onPointerEnter={(e) => isMousePointer(e) && startPlayback()}
                onPointerLeave={(e) => isMousePointer(e) && !isFullscreen && pause()}
                data-cursor="video"
                className="absolute bg-black overflow-hidden z-10 group/screen"
                style={{
                  top: "11.2%",     // pushed slightly down to clear top bezel
                  left: "14%",      // pushed inward to clear left bezel
                  right: "14%",     // pushed inward to clear right bezel
                  bottom: "17%",    // pushed slightly up to clear bottom bezel
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  borderBottomLeftRadius: "2px",
                  borderBottomRightRadius: "2px",
                }}
              >
                {/* Active video iframe */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeVideo.videoId}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {mounted && (
                      <iframe
                        ref={iframeRef}
                        src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=0&mute=1&loop=1&playlist=${activeVideo.videoId}&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&enablejsapi=1&playsinline=1`}
                        className="absolute inset-0 w-[104%] h-[120%] -top-[10%] -left-[2%] border-none pointer-events-none"
                        allow="autoplay; encrypted-media; fullscreen"
                        title={activeVideo.title}
                        tabIndex={-1}
                        onLoad={onIframeLoad}
                      />
                    )}
                    {/* Cover image until the video is actually playing */}
                    <img
                      src={ytThumb(activeVideo.videoId)}
                      onLoad={(e) => onThumbLoad(e, activeVideo.videoId)}
                      alt={activeVideo.title}
                      className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
                        isPlaying ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

                {/* Central Play/Pause/Skip Overlay */}
                <div className={`absolute inset-0 z-20 flex items-center justify-center gap-4 md:gap-6 pointer-events-none transition-opacity duration-300 ${isPlaying ? "opacity-0 group-hover/screen:opacity-100" : "opacity-100"}`}>
                  {/* Prev */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); seekTo(currentTime - 10); }} 
                    title="Back 10 seconds"
                    aria-label="Back 10 seconds"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md pointer-events-auto hover:bg-black/80 hover:scale-110 transition-all shadow-xl"
                  >
                    <SkipBack size={20} className="ml-[-2px]" />
                  </button>
                  {/* Play/Pause */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }} 
                    title={isPlaying ? "Pause video" : "Play video"}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md pointer-events-auto hover:bg-black/80 hover:scale-110 transition-all shadow-xl"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                  </button>
                  {/* Next */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); seekTo(currentTime + 10); }} 
                    title="Forward 10 seconds"
                    aria-label="Forward 10 seconds"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md pointer-events-auto hover:bg-black/80 hover:scale-110 transition-all shadow-xl"
                  >
                    <SkipForward size={20} className="ml-[2px]" />
                  </button>
                </div>

                {/* Timeline */}
                <div className="absolute bottom-2 left-4 right-28 z-20 flex items-center gap-2 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300">
                  <span className="min-w-[32px] text-[10px] font-mono text-white/70">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 1}
                    step="0.1"
                    value={Math.min(currentTime, duration || 1)}
                    onChange={(e) => seekTo(Number(e.target.value))}
                    aria-label="Video timeline"
                    className="h-1 min-w-0 flex-1 cursor-pointer accent-white"
                  />
                  <span className="min-w-[32px] text-right text-[10px] font-mono text-white/70">{formatTime(duration)}</span>
                </div>

                {/* Counter */}
                <div className="absolute bottom-4 right-14 z-20 pointer-events-none">
                  <span className="text-xs font-mono text-white/30">
                    {String(activeIndex + 1).padStart(2, "0")}
                    <span className="text-white/15 mx-1">/</span>
                    {String(featuredVideos.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Mute toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className={`absolute bottom-3.5 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    !isMuted
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      : "bg-white/10 text-white/60 border border-white/15 backdrop-blur-sm hover:bg-white/15"
                  }`}
                >
                  {!isMuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>

                {/* Fullscreen toggle */}
                <button
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  className="absolute bottom-3.5 right-14 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white/60 border border-white/15 backdrop-blur-sm opacity-0 group-hover/screen:opacity-100 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>

                {/* Subtle screen reflection + click-to-mute area */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-white/[0.015] via-transparent to-transparent z-10 cursor-pointer" 
                  onClick={() => setIsMuted(!isMuted)}
                />
              </div>
            </div>

            {/* ═══ Shadow on surface ═══ */}
            <div className="w-[96%] mx-auto h-[6px] bg-black/40 blur-md rounded-full -mt-[2px]" />
          </motion.div>
        </div>
      </div>

      <div className="relative z-30 mt-3 grid w-full max-w-4xl grid-cols-2 gap-3 px-5 sm:grid-cols-3 md:grid-cols-5 md:gap-4 md:px-0">
        {featuredVideos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => goTo(index)}
            aria-pressed={activeIndex === index}
            className={`group overflow-hidden rounded-xl border text-left transition ${activeIndex === index ? "border-white/60 bg-white/[0.08]" : "border-white/10 bg-white/[0.025] hover:border-white/30"}`}
          >
            <img
              src={ytThumb(video.videoId, "hqdefault")}
              alt=""
              className="aspect-video w-full object-cover opacity-75 transition group-hover:opacity-100"
              loading="lazy"
            />
            <span className="block whitespace-normal break-words px-3 pt-2 text-[9px] font-mono leading-snug tracking-[0.08em] text-white/45">{video.category}</span>
            <span className="block whitespace-normal break-words px-3 pb-2 text-xs font-medium leading-snug text-white/80">{video.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
