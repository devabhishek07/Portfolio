"use client";

import { useState } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Mail, MapPin, Send } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { RandomLetterSwapPingPong } from "@/components/ui/random-letter-swap";
import { Instagram, Linkedin, XLogo } from "@/components/ui/Icons";

const WEB3FORMS_ACCESS_KEY = "769d1301-d14f-4e16-a1fc-662c80b4251f";

export function Contact() {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Project inquiry",
    message: "",
  });

  const mailtoUrl = `mailto:abhishekkumardev57@gmail.com?subject=${encodeURIComponent(formData.subject || "Project inquiry")}&body=${encodeURIComponent(`Hi Abhishek,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus("sending");

    const submission = new FormData(e.currentTarget);
    submission.append("access_key", WEB3FORMS_ACCESS_KEY);
    submission.append("from_name", "Abhishek Kumar Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submission,
        headers: { Accept: "application/json" },
      });
      const result = await response.json() as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Web3Forms submission failed");
      }

      setSubmissionStatus("success");
      setFormData({ name: "", email: "", subject: "Project inquiry", message: "" });
    } catch {
      setSubmissionStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#0c0c0c] relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-white/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 items-start">
          
          {/* Left Column: Info */}
          <SectionReveal variant="slide-right">
            <div className="mb-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white">⊙</span>
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">
                  Contact
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight flex flex-wrap gap-x-3 gap-y-2">
                <RandomLetterSwapPingPong label="Start a" />
                <RandomLetterSwapPingPong label="project" className="text-white/40" />
              </h2>
              <p className="text-lg text-white/60 leading-relaxed max-w-md font-sans">
                Tell me what you need and when. I&apos;ll reply by email.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Email Me</h4>
                  <a href="mailto:abhishekkumardev57@gmail.com" className="text-lg text-white hover:text-white/70 transition-colors">
                    abhishekkumardev57@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Location</h4>
                  <p className="text-lg text-white">
                    Gorakhpur, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                <a 
                  href="https://www.linkedin.com/in/abhishek-kumar-b77b91288"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80 hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://x.com/Abhishekdev07"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80 hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2"
                >
                  <XLogo className="w-4 h-4" />
                  <span>X</span>
                </a>
                <a
                  href="https://www.instagram.com/abhishek._.075?xtok=dDRuMDhqMDVwYzg3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80 hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </SectionReveal>

          {/* Right Column: Form */}
          <SectionReveal variant="slide-left">
            <div className="relative p-10 md:p-14 rounded-[3rem] bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-xl">
              <form 
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="contact-name" className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 ml-1">Name</label>
                    <input 
                      id="contact-name"
                      name="name"
                      required
                      type="text" 
                      placeholder="Your name"
                      className="form-input w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all text-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="contact-email" className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 ml-1">Email</label>
                    <input 
                      id="contact-email"
                      name="email"
                      required
                      type="email" 
                      placeholder="you@example.com"
                      className="form-input w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all text-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="contact-subject" className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 ml-1">Subject</label>
                  <input 
                    id="contact-subject"
                    name="subject"
                    type="text" 
                    placeholder="Project inquiry"
                    className="form-input w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all text-sm"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="contact-message" className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 ml-1">Message</label>
                  <textarea 
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What do you need help with, and when do you need it?"
                    className="form-input w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all text-sm resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <p role="status" aria-live="polite" className={`text-xs ${submissionStatus === "error" ? "text-red-300" : submissionStatus === "success" ? "text-emerald-300" : "text-white/40"}`}>
                  {submissionStatus === "sending" && "Sending your message…"}
                  {submissionStatus === "success" && "Message sent. Thanks for reaching out!"}
                  {submissionStatus === "error" && "Couldn’t send your message. Please try again or use the email app."}
                  {submissionStatus === "idle" && "Your message will be sent directly to my inbox."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <LiquidButton 
                    type="submit" 
                    disabled={submissionStatus === "sending"}
                    className="flex-1 h-14 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                  >
                    {submissionStatus === "sending" ? "Sending…" : submissionStatus === "success" ? "Message Sent" : "Send Message"}
                    {submissionStatus !== "success" && <Send className="h-4 w-4 ml-2" />}
                  </LiquidButton>
                  <a 
                    href={mailtoUrl}
                    className="px-6 h-14 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white hover:text-black transition-all flex items-center justify-center text-sm font-medium whitespace-nowrap"
                  >
                    Open Email App
                  </a>
                </div>
              </form>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
