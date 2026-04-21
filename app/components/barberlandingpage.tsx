"use client";

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
//  SETUP (one-time, outside this file):
//
//  1. In tailwind.config.ts → extend keyframes + animation (see bottom of this file)
//  2. In app/layout.tsx <head> add:
//     <link rel="preconnect" href="https://fonts.googleapis.com" />
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//     <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
//
//  3. BG image → place at /public/hero-bg.jpg
// ─────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About Us", id: "about" },
  { label: "Plans", id: "plans" },
  { label: "Resources", id: "resources" },
  { label: "Contact", id: "contact" },
];
const PLAYFAIR = "'Playfair Display', Georgia, serif";



export default function BarberLandingPage() {
  const [scrolled,    setScrolled]   = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);
  const [active,      setActive]     = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (id: string) => {
  setActive(id);

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  setMobileOpen(false);
};

const handleScrolls = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
const handleScrollservices = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

  return (
    <div className="min-h-screen bg-[#100c06] font-sans">

      {/* ════════════════════════════════════════
           HEADER
      ════════════════════════════════════════ */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#0d0904]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <div className="flex items-center gap-3 shrink-0">
            <img src="/image copy 1.png" className="w-[80px]" alt="" />
          </div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-7">
  {NAV_LINKS.map((link) => (
    <span
      key={link.id}
      onClick={() => handleScroll(link.id)}
      className={[
        "relative text-[13.5px] font-medium tracking-[0.025em] cursor-pointer pb-[3px]",
        "transition-colors duration-200",
        "after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#C9A04C]",
        "after:transition-all after:duration-300",
        active === link.id
          ? "text-[#C9A04C] after:w-full"
          : "text-white/82 hover:text-white after:w-0 hover:after:w-full",
      ].join(" ")}
    >
      {link.label}
    </span>
  ))}
</nav>
          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-4">
            {/* Gold button */}
            <button onClick={() => handleScrolls("contact")}
              className="hidden sm:block text-sm px-5 py-2.5 rounded-sm font-semibold tracking-[0.04em]
                         bg-[#C9A04C] text-[#100c06]
                         hover:bg-[#ddb35c] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(201,160,76,0.35)]
                         active:scale-[0.97] transition-all duration-[250ms] cursor-pointer"
            font-sans 
            >
              Get a Free Quote
            </button>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={[
                    "block h-[1.5px] bg-white transition-all duration-300",
                    mobileOpen
                      ? i === 0 ? "w-5 translate-y-[6.5px] rotate-45"
                      : i === 1 ? "w-5 opacity-0"
                      : "w-5 -translate-y-[6.5px] -rotate-45"
                      : i === 1 ? "w-3" : "w-5",
                  ].join(" ")}
                />
              ))}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav ── */}
        <div
          className={[
            "lg:hidden overflow-hidden transition-all duration-500",
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="bg-[#0d0904]/98 px-8 pb-6 pt-2 flex flex-col gap-5 border-t border-[#C9A04C]/20">
           
  {NAV_LINKS.map((link) => (
    <span
      key={link.id}
      onClick={() => handleScroll(link.id)}
      className={[
        "relative text-sm font-medium tracking-[0.025em] cursor-pointer pb-[3px]",
        "transition-colors duration-200",
        "after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#C9A04C]",
        "after:transition-all after:duration-300",
        active === link.id
          ? "text-[#C9A04C] after:w-full"
          : "text-white/82 hover:text-white after:w-0 hover:after:w-full",
      ].join(" ")}
    >
      {link.label}
    </span>
  ))}
            <button onClick={() => handleScrolls("contact")}
              className="text-sm px-5 py-2.5 rounded-sm font-semibold tracking-[0.04em] w-fit mt-1
                         bg-[#C9A04C] text-[#100c06]
                         hover:bg-[#ddb35c] hover:-translate-y-px
                         active:scale-[0.97] transition-all duration-[250ms] cursor-pointer"
            font-sans 
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
           HERO SECTION
           BG image → /public/hero-bg.jpg
      ════════════════════════════════════════ */}
      <section id="home"
        className="relative min-h-screen flex flex-col justify-between animate-fade-in"
        style={{
          backgroundImage:    "url('/image.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center top",
          backgroundRepeat:   "no-repeat",
        }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#100c06]/90 via-[#100c06]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100c06] via-transparent to-[#100c06]/30" />

        {/* ── Hero Content ── */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-10">
            <div className="max-w-2xl">

              {/* Eyebrow */}
              <p
                className="animate-fade-up-1 text-[#C9A04C] text-xs font-semibold tracking-[0.3em] uppercase mb-5"
              font-sans 
              >
                He & She Salon · Hair · Makeup · Beauty
              </p>

              {/* Headline */}
              <h1 style={{ fontFamily: PLAYFAIR, fontSize: "clamp(38px, 5.5vw, 72px)" }}
                className="animate-fade-up-2  lg:text-[72px] md:text-[55px] text-[38px] text-white font-bold leading-[1.08] mb-6">
                Style That Defines
<br />
                Your
                <span className="text-[#C9A04C]"> Personality</span>
              </h1>

              {/* Subtitle */}
              <p
                className="animate-fade-up-3 text-white/65 text-sm md:text-base leading-relaxed mb-8 max-w-sm"
              font-sans 
              >
                We&rsquo;re more than just a barbershop &mdash; we&rsquo;re a lifestyle destination for the modern gentleman.
              </p>

              {/* CTAs */}
              <div className="animate-fade-up-3 flex flex-wrap gap-4 items-center">
                <button onClick={() => handleScrolls("contact")}
                  className="text-sm px-7 py-3 rounded-sm font-semibold tracking-[0.04em]
                             bg-[#C9A04C] text-[#100c06]
                             hover:bg-[#ddb35c] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(201,160,76,0.35)]
                             active:scale-[0.97] transition-all duration-[250ms] cursor-pointer"
                font-sans 
                >
                  Get a Free Quote
                </button>
                <button onClick={() => handleScrollservices("services")}
                  className="text-sm font-medium px-7 py-3 rounded-sm
                             text-white/80 border border-white/25
                             hover:border-[#C9A04C]/60 hover:text-[#C9A04C]
                             transition-all duration-[250ms] cursor-pointer"
                font-sans 
                >
                  Our Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
             BOTTOM INFO BAR
        ════════════════════════════════════ */}
        <div className="relative z-10 border-t border-[#C9A04C]/20 bg-[#0d0904]/80 backdrop-blur-sm">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#C9A04C]/20">

              {/* Location */}
              <div className="flex items-start gap-4 py-6 sm:pr-10">
                <div className="mt-0.5 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#C9A04C] text-xs font-semibold tracking-[0.18em] uppercase mb-1"
                    font-sans >
                    Location
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed font-sans">
                    Shop No 2, Plot No. 403, 404,80 Feet Road, <br />Near Hanuman Mandir, Kanta, Jhotwara, Jaipur-12
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4 py-6 sm:px-10">
                <div className="mt-0.5 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#C9A04C] text-xs font-semibold tracking-[0.18em] uppercase mb-1"
                    font-sans >
                    Contact
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed font-sans">
                    +91 95094 84341<br />
                    hello@thegentlemanshair.com
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4 py-6 sm:pl-10">
                <div className="mt-0.5 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#C9A04C] text-xs font-semibold tracking-[0.18em] uppercase mb-1"
                    font-sans >
                    Opening Hours
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed font-sans">
                    Mon to Fri: 9:00am – 8:30pm<br />
                    Sat: 10:00am – 6:30pm<br />
                    <span className="text-[#C9A04C]/80">Sun: Closed</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ADD THIS TO YOUR tailwind.config.ts  →  theme.extend
// ═══════════════════════════════════════════════════════════════
//
//  keyframes: {
//    fadeUp: {
//      "0%":   { opacity: "0", transform: "translateY(28px)" },
//      "100%": { opacity: "1", transform: "translateY(0)"    },
//    },
//    fadeIn: {
//      "0%":   { opacity: "0" },
//      "100%": { opacity: "1" },
//    },
//  },
//  animation: {
//    "fade-up-1": "fadeUp 0.75s cubic-bezier(.22,.68,0,1.2) 0.15s both",
//    "fade-up-2": "fadeUp 0.75s cubic-bezier(.22,.68,0,1.2) 0.35s both",
//    "fade-up-3": "fadeUp 0.75s cubic-bezier(.22,.68,0,1.2) 0.50s both",
//    "fade-in":   "fadeIn 1.2s ease 0.1s both",
//  },