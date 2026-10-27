"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, GraduationCap } from "lucide-react";
import { Instagram, XLogo } from "@/components/ui/Icons";
import Image from "next/image";
import { GlowCard } from "@/components/ui/spotlight-card";
import { RandomLetterSwapForward, RandomLetterSwapPingPong } from "@/components/ui/random-letter-swap";
import { TextScramble } from "@/components/ui/text-scramble";
import { TextEffect } from "@/components/ui/text-effect";
import { SectionReveal } from "@/components/ui/SectionReveal";

export const About = () => {
  const skillGroups = [
    {
      title: "Tools",
      skills: [
        { name: "Adobe After Effects", desc: "Motion graphics, visual effects, and dynamic brand content" },
        { name: "Adobe Premiere Pro", desc: "Primary editor for cinematic commercial and video editing" },
        { name: "Adobe Photoshop", desc: "Compositing, retouching, and visual asset creation" },
        { name: "Canva", desc: "Quick social media assets and layout design" },
      ]
    },
    {
      title: "AI Tools",
      skills: [
        { name: "Veo 3", desc: "High-fidelity AI video generation" },
        { name: "Nano Banana", desc: "AI video creation and motion design" },
        { name: "Runway", desc: "Text-to-video synthesis and generative video" },
        { name: "Higgsfield AI", desc: "AI video generation for brand storytelling" },
        { name: "ChatGPT", desc: "Scriptwriting, creative concepts, and hooks" },
        { name: "ElevenLabs", desc: "AI voiceover and voice synthesis" },
        { name: "OpenArt", desc: "AI visual concept generation and ideation" },
      ]
    },
    {
      title: "Creative Skills",
      skills: [
        { name: "Storytelling", desc: "Narrative-driven visual content and brand films" },
        { name: "Color Grading", desc: "Applying professional cinematic colour to raw footages" },
        { name: "Typography & Design", desc: "Kinetic typography and layout design" },
        { name: "Speed Ramping", desc: "Dynamic temporal effects for high-impact editing" },
      ]
    },
    {
      title: "Editing",
      skills: [
        { name: "3D Camera", desc: "Virtual camera movements and scene tracking" },
        { name: "Motion Graphics", desc: "Animated titles and dynamic ad pieces" },
        { name: "Audio Mixing", desc: "Cinematic sound design and audio engineering" },
        { name: "Rotoscoping", desc: "Precise subject isolation and masking" }
      ]
    }
  ];

  const experience = [
    { 
      role: "Freelance Video Editor", 
      company: "FRND", 
      period: "Mar 2026 - Present",
      location: "Bangalore, Karnataka",
      desc: "Develop AI-generated video advertisements for Meta, Google Ads, and FRND's social media channels. Use advanced AI tools to strengthen creative quality, audience engagement, and visual storytelling."
    },
    { 
      role: "Video Editor", 
      company: "Pixelo Digital", 
      period: "Oct 2025 - Dec 2025",
      location: "Navi Mumbai",
      desc: "Designed graphics for campaigns, social media posts, presentations, and branding materials."
    },
    { 
      role: "Video Editor Intern", 
      company: "DigiChowk", 
      period: "Aug 2025 - Sep 2025",
      location: "Delhi",
      desc: "Created 70+ talking-head videos for social media using advanced editing tools, with a focus on creative quality and audience engagement."
    },
    { 
      role: "Freelance Creative Work", 
      company: "Freelancing", 
      period: "2023 - 2024",
      location: null,
      desc: "Collaborated with content creators and emerging startups on ad campaigns, promotional videos, and reels designed to build reach and meaningful engagement."
    },
  ];

  return (
    <section id="about" className="relative pt-32 pb-24">
      {/* Transparent on purpose: the site-wide animated background continues through this section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#080808]"
      />
      <div className="relative max-w-[1300px] mx-auto px-6">
        {/* Section Header */}
        <SectionReveal variant="fade-up" className="flex justify-center mb-10">
          <p className="text-white/40 text-center max-w-md text-base font-medium">
            A closer look at my background, creative skills, and approach to visual storytelling.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column — Profile Card */}
          <SectionReveal variant="fade-up" delay={0.1} className="lg:col-span-5">
            <div 
              className="p-8 rounded-[2rem] border border-white/10 bg-[#111] h-full flex flex-col"
            >
              <div className="relative aspect-[1/1] rounded-[1.5rem] overflow-hidden bg-[#1a1a1a] mb-10 group">
                {/* Profile Image */}
                <Image 
                  src="/images/abhishek/profile.jpeg"
                  alt="Abhishek Kumar"
                  fill
                  className="object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                
                {/* Location / Availability Badge */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c0c0c]/80 backdrop-blur-md border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[9px] uppercase tracking-widest text-white/90 font-bold">Based in Gorakhpur, India</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                <h3 className="text-4xl font-serif text-white flex flex-wrap gap-x-3">
                  <span className="text-white">Hello, I&apos;m</span>
                  <RandomLetterSwapForward
                    label="Abhishek"
                    className="text-white"
                  />
                  <RandomLetterSwapForward
                    label="Kumar"
                    className="text-white/40"
                  />
                </h3>
                <p className="text-white/40 text-base">Video Editor &amp; Graphic Designer based in India.</p>
              </div>

              {/* Categorized Skills Grid */}
              <div className="flex flex-col gap-8 mb-12">
                {skillGroups.map((group) => (
                  <div key={group.title} className="flex flex-col gap-3">
                    <TextScramble 
                      className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold px-1"
                      duration={1}
                      characterSet="01"
                    >
                      {group.title}
                    </TextScramble>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <div key={skill.name} className="relative group/skill">
                          <span 
                            className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-white/60 text-[11px] font-medium hover:bg-white/10 hover:text-white transition-all cursor-help block"
                          >
                            {skill.name}
                          </span>
                          {/* Tooltip on Hover */}
                          <div className="absolute bottom-full left-0 mb-2 w-48 p-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-[10px] text-white/60 opacity-0 invisible group-hover/skill:opacity-100 group-hover/skill:visible transition-all z-50 shadow-2xl pointer-events-none">
                            {skill.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-6">
                {[
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/abhishek-kumar-b77b91288", label: "LinkedIn" },
                  { Icon: XLogo, href: "https://x.com/Abhishekdev07", label: "X" },
                  { Icon: Instagram, href: "https://www.instagram.com/abhishek._.075?xtok=dDRuMDhqMDVwYzg3", label: "Instagram" },
                  { Icon: Mail, href: "mailto:abhishekkumardev57@gmail.com", label: "Email" },
                ].map(({Icon, href, label}, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.2, color: "#fff" }}
                    className="text-white/20 transition-all hover:text-white"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right Column — Detailed Bio, Experience & Education */}
          <SectionReveal variant="fade-up" delay={0.25} className="lg:col-span-7 flex flex-col gap-6">
            <div 
              className="p-10 rounded-[2rem] border border-white/10 bg-[#111] flex flex-col gap-10 h-full"
            >
              {/* Bio */}
              <div className="flex flex-col gap-6">
                <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight flex flex-wrap items-center gap-x-2 md:gap-x-3 gap-y-1 md:gap-y-2">
                  <RandomLetterSwapPingPong label="Turning Ideas" />
                  <span>Into Compelling</span>
                  <span className="text-white/40 italic">Visual Stories</span>
                </h3>
                <div className="flex flex-col gap-4">
                  <TextEffect preset="blur" className="text-base md:text-lg text-white/70 leading-relaxed font-sans">
                    I&apos;m a creative video editor driven by storytelling and the power of visuals. I combine technical precision with a strong sense of pacing to craft cinematic narratives, polished talking-head content, and conversion-focused ad creatives. My workflow brings together professional editing tools and AI-generated assets to improve production speed while maintaining visual consistency, realism, and creative quality.
                  </TextEffect>
                </div>

                <div className="h-px w-full bg-white/5 my-2" />

                {/* Experience Header */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-2xl font-serif text-white tracking-tight">My Creative Journey</h4>
                  <p className="text-sm text-white/40">
                    Experience across AI video advertising, social content, graphic design, and freelance creative projects.
                  </p>
                </div>

                {/* Experience List */}
                <div className="flex flex-col gap-6">
                  {experience.map((exp, i) => (
                    <div 
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 w-full text-white/80 group py-4 border-b border-white/5 last:border-0"
                    >
                      {/* Left: Company & Description */}
                      <div className="md:col-span-8 flex flex-col gap-1 md:gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-medium group-hover:text-white transition-colors">
                            {exp.company}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/50">
                            {exp.role}
                          </span>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed">
                          {exp.desc}
                        </p>
                      </div>
                      {/* Right: Period & Location */}
                      <div className="md:col-span-4 flex flex-col gap-1 md:text-right md:items-end justify-start mt-2 md:mt-0">
                        <span className="text-xs font-mono text-white/40 group-hover:text-white/60 transition-colors uppercase whitespace-nowrap">
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="text-xs text-white/20 group-hover:text-white/40 transition-colors">
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px w-full bg-white/5 my-2" />

                {/* Education Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-white/60" />
                    <h4 className="text-xl font-serif text-white tracking-tight">Education</h4>
                  </div>
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <p className="text-white font-medium text-base">MMMUT Gorakhpur</p>
                      <p className="text-white/50 text-sm">Bachelor of Technology in Electrical Engineering</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                        Expected 2027
                      </span>
                      <p className="text-xs text-white/30 mt-1">Gorakhpur</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
};
