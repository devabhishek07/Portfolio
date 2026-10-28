"use client";

import { motion } from "framer-motion";
import { ArrowUp, Linkedin } from "lucide-react";
import { scrollToTarget } from "@/lib/scroll";
import { Instagram, XLogo } from "@/components/ui/Icons";

type SocialLinkItem = {
  name: string;
  href: string;
  icon: any;
};

const socialLinksData: SocialLinkItem[] = [
  { name: "Instagram", href: "https://www.instagram.com/abhishek._.075?xtok=dDRuMDhqMDVwYzg3", icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-kumar-b77b91288", icon: Linkedin },
  { name: "X", href: "https://x.com/Abhishekdev07", icon: XLogo },
];

export function Footer() {
  const scrollToTop = () => {
    scrollToTarget(0);
  };

  return (
    <footer id="footer" className="border-t border-white/5 bg-[#0c0c0c]">
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4 flex flex-col items-center text-center md:items-start md:text-left">
            <a href="#hero" className="text-2xl font-serif text-white">
              Abhishek Kumar
            </a>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Video editor and graphic designer creating social content, ads, and campaign visuals. Based in Gorakhpur, India.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-4 text-muted-foreground text-center md:text-left">
              Quick links
            </h4>
            <nav className="grid grid-cols-2 gap-2 text-left w-max">
              <a href="#hero" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Home</a>
              <a href="#projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Projects</a>
              <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</a>
              <a href="#services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Services</a>
              <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</a>
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-4 text-muted-foreground text-center md:text-left">
              Connect
            </h4>
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinksData.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
                    whileHover={{ y: -3 }}
                    aria-label={link.name}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Abhishek Kumar. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 md:ml-auto">
            <p className="text-sm text-white/50">
              Made with <span role="img" aria-label="love" className="text-rose-500">❤️</span> by{" "}
              <a href="https://www.instagram.com/pandey.aditya._/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                Aditya Pandey
              </a>
            </p>
            <motion.button onClick={scrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:text-white hover:border-white/20 cursor-pointer"
              whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Scroll to top">
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
