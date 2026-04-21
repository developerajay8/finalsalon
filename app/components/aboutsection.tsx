"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

/* ──────────────────────────────────────────
   Scroll-reveal hook
────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ──────────────────────────────────────────
   Types
────────────────────────────────────────── */
interface ServiceItem {
  title:    string;
  desc:     string;
  price:    string;
  tag:      string;
  popular?: boolean;
  icon:     ReactNode;
}

/* ──────────────────────────────────────────
   Services data
────────────────────────────────────────── */
const SERVICES: ServiceItem[] = [
  {
    title: "Hair Cut & Styling",
    desc:  "Expert haircuts and creative styling for men and women, customized to enhance your natural features.",
    price: "₹199+",
    tag:   "Unisex",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Grooming & Shaving",
    desc:  "Luxury beard trims, traditional hot towel shaves, and grooming for the modern gentleman.",
    price: "₹99+",
    tag:   "He",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title:   "Premium Makeup",
    desc:    "Flawless bridal, party, and editorial makeup services using high-end global brands.",
    price:   "₹2499+",
    tag:     "She",
    popular: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
     title: "Advanced Hair Care",
    desc:  "Professional Keratin, Smoothening, and deep conditioning treatments for healthy, lustrous hair.",
    price: "₹1999+",
    tag:   "Unisex",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 12 7 10 7 5a5 5 0 0110 0c0 5-5 7-5 7z"/>
      </svg>
    ),
  },
  {
    title: "Skin & Facial Rituals",
    desc:  "Organic and medical-grade facials designed to rejuvenate, brighten, and heal your skin.",
    price: "₹499+",
    tag:   "Unisex",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
  {
     title:   "He & She Luxury Combo",
    desc:    "Our all-inclusive package featuring premium hair care, skin revitalization, and a relaxing spa experience.",
    price:   "₹1499+",
    tag:     "Top Pick",
    popular: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

/* ──────────────────────────────────────────
   Feature check list items
────────────────────────────────────────── */
const FEATURES = [
  "Premium Unisex Services",
  "Luxury Bridal Packages",
  "Advanced Skin Aesthetics",
  "Keratin & Hair Botox",
  "Expert Global Coloring",
  "Modern & Hygienic Setup",
];

/* ──────────────────────────────────────────
   Service Card
────────────────────────────────────────── */
function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useInView(0.08);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden cursor-pointer rounded-sm border p-8 transition-all duration-700
        ${hovered
          ? "border-[#C9A04C]/55 bg-gradient-to-br from-[#C9A04C]/13 to-[#C9A04C]/3 -translate-y-1.5"
          : "border-white/8 bg-white/[0.025] translate-y-0"
        }
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
      style={{ transitionDelay: visible ? `${index * 0.1}s` : "0s" }}
    >
      {/* Popular badge */}
      {item.popular && (
        <div
          className="absolute top-0 right-0 text-[#100c06] text-[8.5px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-bl-sm"
          style={{ background: "#C9A04C", fontFamily: "'Inter', sans-serif" }}
        >
          Popular
        </div>
      )}

      {/* Icon + Price */}
      <div className="flex items-start justify-between mb-5">
        <div
          className={`w-14 h-14 flex items-center justify-center rounded-sm transition-all duration-400
            ${hovered ? "bg-[#C9A04C] text-[#100c06]" : "bg-[#C9A04C]/12 text-[#C9A04C]"}`}
        >
          {item.icon}
        </div>
        <div className="text-right">
          <p
            className="text-[#C9A04C] font-bold leading-none mb-0.5"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px" }}
          >
            {item.price}
          </p>
          <p
            className="text-white/40 text-[10px] tracking-[0.15em] uppercase"
            
          >
            {item.tag}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-white font-bold mb-2.5 leading-snug"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px" }}
      >
        {item.title}
      </h3>

      {/* Desc */}
      <p
        className="text-white/52 text-[13px] leading-relaxed mb-5"
        
      >
        {item.desc}
      </p>

      {/* Book link */}
      <div
        className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300
          ${hovered ? "text-[#C9A04C]" : "text-white/30"}`}
        
      >
        <span>Book Now</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className={`transition-transform duration-300 ${hovered ? "translate-x-1" : "translate-x-0"}`}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>

      {/* Bottom gold reveal line */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-[#C9A04C] transition-all duration-500 ${hovered ? "w-full" : "w-0"}`}
      />
    </div>
  );
}

/* ──────────────────────────────────────────
   Main Export
────────────────────────────────────────── */
export default function AboutServices() {
  const { ref: imgRef,  visible: imgVis  } = useInView(0.12);
  const { ref: txtRef,  visible: txtVis  } = useInView(0.12);
  const { ref: svcHead, visible: svcVis  } = useInView(0.1);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ════════════════════════════════
            ABOUT SECTION
      ════════════════════════════════ */}
      <section id="about" className="bg-[#100c06] py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── Left: Image ── */}
            <div
              ref={imgRef}
              className={`relative rounded-sm overflow-hidden transition-all duration-[850ms]
                ${imgVis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
              style={{ aspectRatio: "4/5", maxWidth: "480px" }}
            >
              {/* Decorative border overlay */}
              <div className="absolute inset-0 border-2 border-[#C9A04C]/40 rounded-sm z-10 pointer-events-none" />

              {/* ── Replace with your actual image ── */}
              <img
                src="/about.png"
                alt="He & She Salon — The Gold Standard of Grooming"
                className="w-full h-full object-cover block"
              />

              {/* Floating stats badge */}
              <div
                className="absolute bottom-6 left-6 z-20 rounded-sm border border-[#C9A04C]/40 px-4 py-3.5"
                style={{ background: "rgba(16,12,6,0.92)" }}
              >
                <p
                  className="text-[#C9A04C] font-bold text-lg leading-none mb-1"
                  
                >
                  12+
                </p>
                <p
                  className="text-white/55 text-xs tracking-[0.12em] uppercase"
                  
                >
                  Years of Style
                </p>
              </div>
            </div>

            {/* ── Right: Text ── */}
            <div
              ref={txtRef}
              className={`transition-all duration-[850ms] delay-150
                ${txtVis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            >
              {/* Eyebrow */}
              <p
                className="text-[#C9A04C] text-xs font-semibold tracking-[0.28em] uppercase mb-4"
                
              >
                Our Story
              </p>

              {/* Headline */}
              <h2
                className="text-white font-bold mb-3 leading-[1.1]"
                style={{
                  
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                }}
              >
                Redefining the Standard<br />
Of <span className="text-[#C9A04C]">Modern Elegance</span>
              </h2>

              {/* Tagline */}
              <p
                className="text-white/55 text-sm italic mb-6"
                
              >
                He & She Salon — Where trend meets tradition for a flawless you.
              </p>

              {/* Gold divider */}
              <div className="w-12 h-0.5 bg-[#C9A04C] mb-6" />

              {/* Body copy */}
              <p
                className="text-white/70 text-sm md:text-base leading-[1.8] mb-4"
                
              >
                At He & She Salon, we believe that self-care is a necessity, not a luxury. We provide a sanctuary where both men and women can enjoy high-end grooming services tailored to their unique style and personality.
              </p>
              <p
                className="text-white/55 text-sm leading-[1.75] mb-8"
                
              >
                Our team of master stylists and therapists use world-class techniques and premium products to ensure you walk out feeling confident, refreshed, and truly transformed.
              </p>

              {/* Feature checklist */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {FEATURES.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#C9A04C" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span
                      className="text-white/65 text-sm"
                      
                    >
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <button
                onClick={() => scrollTo("contact")}
                className="text-sm font-semibold tracking-[0.04em] px-7 py-3 rounded-sm
                  bg-[#C9A04C] text-[#100c06] border-none cursor-pointer
                  transition-all duration-200
                  hover:bg-[#ddb35c] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(201,160,76,0.35)]"
                
              >
                Book Your Session
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════
            OUR SIGNATURE SERVICES
      ════════════════════════════════ */}
      <section id="services" className="bg-[#0d0a05] py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">

          {/* Section Heading */}
          <div
            ref={svcHead}
            className={`text-center mb-12 transition-all duration-[800ms]
              ${svcVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Decorative lines */}
            <div className="flex items-center justify-center gap-3.5 mb-5">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A04C]" />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#C9A04C">
                <rect x="4" y="0" width="2" height="10" />
                <rect x="0" y="4" width="10" height="2" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A04C]" />
            </div>

            <p
              className="text-[#C9A04C] text-[10px] font-bold tracking-[0.35em] uppercase mb-3"
              
            >
              Elite Selection
            </p>

            {/* Exact heading from screenshot */}
            <h2
              className="text-white font-bold mb-4 leading-[1.08]"
              style={{
                
                fontSize: "clamp(30px, 4vw, 52px)",
              }}
            >
              He & She <span className="text-[#C9A04C]">Signature Services</span>
            </h2>

            {/* Exact sub from screenshot */}
            <p
              className="text-white/50 text-sm md:text-base max-w-[420px] mx-auto leading-[1.7]"
              
            >
              Premium grooming experiences designed for him and her.
            </p>
          </div>

          {/* Services Grid — 3 cols → 2 → 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {SERVICES.map((item, i) => (
              <ServiceCard key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* CTA Bar */}
          <div
            className={`mt-16 p-9 md:px-12 bg-[#C9A04C]/7 border border-[#C9A04C]/20 rounded-sm
              flex items-center justify-between gap-6 flex-wrap
              transition-all duration-[800ms] delay-500
              ${svcVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div>
              <p
                className="text-white font-bold mb-1.5"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px" }}
              >
                Seeking a custom transformation?
              </p>
              <p
                className="text-white/50 text-sm"
                
              >
                Consult with our stylists today and find the look that defines you.
              </p>
            </div>

            <div className="flex gap-3.5 items-center flex-wrap">
              <a
                href="tel:+919509484341"
                className="flex items-center gap-2 text-[#C9A04C] text-sm font-semibold no-underline"
                
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +91 95094 84341
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="text-[#100c06] text-[11px] font-bold tracking-[0.22em] uppercase
                  px-9 py-4 rounded-sm border-none cursor-pointer bg-[#C9A04C]
                  transition-all duration-200 hover:bg-[#ddb35c] hover:-translate-y-0.5 whitespace-nowrap"
                
              >
                Book Appointment
              </button>
            </div>
          </div>

        </div>
      </section>


      <div className="bg-[#080603]" style={{
        borderTop: "1px solid rgba(201,160,76,0.2)",
        borderBottom: "1px solid rgba(201,160,76,0.2)",
        padding: "14px 0",
        overflow: "hidden",
      }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, ri) => (
            <div key={ri} style={{ display: "flex", gap: "0", alignItems: "center" }}>
              {["He & She Luxury", "Expert Stylists", "Bridal Glow", "Skin Rejuvenation", "Unisex Perfection", "Since 2012", "Signature Grooming"].map((t, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: "0" }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    color: i % 3 === 0 ? "#C9A04C" : "rgba(255,255,255,0.4)",
                    fontSize: "13px",
                    fontWeight: i % 3 === 0 ? 700 : 400,
                    letterSpacing: "0.08em",
                    padding: "0 32px",
                    fontStyle: i % 3 === 0 ? "normal" : "italic",
                  }}>
                    {t}
                  </span>
                  <svg width="6" height="6" viewBox="0 0 6 6" style={{ flexShrink: 0 }}>
                    <circle cx="3" cy="3" r="2.5" fill="#C9A04C" opacity="0.5" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

    </>
  );
}