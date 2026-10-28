import type { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "Abhishek Kumar",
  title: "%s | Abhishek Kumar — Video Editor",
  defaultTitle: "Abhishek Kumar — Video Editor and Graphic Designer",
  description:
    "Video editor and graphic designer creating social videos, campaign ads, motion graphics, and brand visuals. Based in Gorakhpur, India.",
  ogImage: "/og-image.png",
  twitterHandle: "",
};

export const navLinks: NavLink[] = [
  { label: "AI Videos", href: "#work-ai-videos" },
  { label: "Video Edits", href: "#work-video-edits" },
  { label: "Designs", href: "#designs" },
  { label: "About", href: "#about" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abhishek-kumar-b77b91288",
    icon: "Linkedin",
  },
  { name: "X", url: "https://x.com/Abhishekdev07", icon: "X" },
  { name: "Instagram", url: "https://www.instagram.com/abhishek._.075?xtok=dDRuMDhqMDVwYzg3", icon: "Instagram" },
  {
    name: "Email",
    url: "mailto:abhishekkumardev57@gmail.com",
    icon: "Mail",
  },
];

export const categories = [
  "All",
  "AI Videos",
  "Video Edits",
  "Motion Graphics",
  "Graphic Design",
] as const;
