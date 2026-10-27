import type { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "Abhishek Kumar",
  title: "%s | Abhishek Kumar — Video Editor & Graphic Designer",
  defaultTitle: "Abhishek Kumar — Video Editor & Graphic Designer",
  description:
    "Video Editor & Graphic Designer creating engaging stories through editing, motion, design, and AI-assisted visuals. Based in Gorakhpur, India.",
  url: "https://abhishek-dev7.vercel.app/",
  ogImage: "/og-image.png",
  twitterHandle: "",
};

export const navLinks: NavLink[] = [
  { label: "AI Videos", href: "#ai-videos" },
  { label: "Video Edits", href: "#video-edits" },
  { label: "Designs", href: "#designs" },
  { label: "About", href: "#about" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abhishek-kumar-b77b91288",
    icon: "Linkedin",
  },
  {
    name: "Portfolio",
    url: "https://abhishek-dev7.vercel.app/",
    icon: "Globe",
  },
  {
    name: "Email",
    url: "mailto:abhishekkumardev57@gmail.com",
    icon: "Mail",
  },
  {
    name: "Phone",
    url: "tel:+917398689314",
    icon: "Phone",
  },
];

export const categories = [
  "All",
  "AI Videos",
  "Video Edits",
  "Motion Graphics",
  "Graphic Design",
] as const;
