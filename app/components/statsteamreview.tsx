"use client";

import { useEffect, useRef, useState } from "react";

// ── Scroll-triggered visibility hook ──
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Data ──
const stats = [
  { label: "Styles Created",       display: "3k" },
  { label: "Professional Barbers", display: "12+" },
  { label: "Years of Excellence",  display: "4"  },
  { label: "Clients Served",       display: "4K"  },
];

const barbers = [
  {
    name: "David Smith",
    role: "Lead Barber",
    img: "https://images.unsplash.com/photo-1570158268183-d296b2892211?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Marcus Lee",
    role: "Senior Stylist",
    img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "James Ortiz",
    role: "Colour Specialist",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face",
  },
];

const testimonials = [
  {
    name: "David Smith",
    role: "Loyal Customer",
    stars: 5,
    review:
      "At The Gentleman's Chair, our mission is to redefine the modern man's grooming experience. From classic haircuts to signature beard trims, we bring precision, passion, and personal care.",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop&crop=face",
    thumb:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Alex Turner",
    role: "Regular Client",
    stars: 5,
    review:
      "Absolutely love the experience here. Every visit feels premium and the staff are incredibly skilled. The beard sculpting service is next level — highly recommend!",
    img: "https://images.unsplash.com/photo-1553267751-1c148a7280a1?w=400&h=500&fit=crop&crop=face",
    thumb:
      "https://images.unsplash.com/photo-1553267751-1c148a7280a1?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Ryan Carter",
    role: "Happy Client",
    stars: 5,
    review:
      "Best barbershop in town. The atmosphere, the service, the attention to detail — everything is top-notch. I've been coming for two years and I never leave disappointed.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face",
    thumb:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face",
  },
];

// const galleryImgs = [
//   "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop",
//   "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=400&fit=crop",
//   "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop",
// ];

const PLAYFAIR = "'Playfair Display', Georgia, serif";
const INTER    = "'Inter', sans-serif";

// ── Animation helper ──
// base transition classes always applied; directional start classes applied when NOT visible; reset when visible
const anim = (
  direction: "left" | "right" | "bottom",
  visible: boolean,
  delay = "0s"
): React.CSSProperties => ({
  transitionProperty: "opacity, transform",
  transitionDuration: "0.7s",
  transitionTimingFunction: "cubic-bezier(0.22, 0.68, 0, 1.2)",
  transitionDelay: delay,
  opacity: visible ? 1 : 0,
  transform: visible
    ? "none"
    : direction === "left"
    ? "translateX(-55px)"
    : direction === "right"
    ? "translateX(55px)"
    : "translateY(48px)",
});

export default function StatsTeamReviews() {
  const [activeT, setActiveT] = useState(0);

  const gallery   = useInView(0.1);
  const statsRef  = useInView(0.2);
  const teamTitle = useInView(0.2);
  const teamCards = useInView(0.1);
  const revTitle  = useInView(0.2);
  const revCard   = useInView(0.1);

  return (
    <div id="resources" style={{ fontFamily: INTER }}>

      {/* ═══════════════════════════════════════
           1. GALLERY GRID
      ═══════════════════════════════════════ */}
      {/* <section className="bg-[#1a1108] py-14 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div ref={gallery.ref} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryImgs.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-sm h-52 sm:h-64 group"
                style={anim(
                  i === 0 ? "left" : i === 2 ? "right" : "bottom",
                  gallery.visible,
                  `${i * 0.12}s`
                )}
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ═══════════════════════════════════════
           2. STATS BAR — gold background
      ═══════════════════════════════════════ */}
      <section ref={statsRef.ref} className="bg-[#C9A04C] py-12 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={anim("bottom", statsRef.visible, `${i * 0.1}s`)}
              >
                <p
                  className="font-black text-[#100c06] leading-none"
                  style={{ fontFamily: PLAYFAIR, fontSize: "clamp(34px,4.5vw,56px)" }}
                >
                  {s.display}
                </p>
                <p
                  className="text-[#100c06]/65 text-sm mt-2 font-medium"
                  style={{ fontFamily: INTER }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           3. MEET OUR PROFESSIONALS
      ═══════════════════════════════════════ */}
      <section className="bg-[#100c06] py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

          {/* Title row */}
          <div
            ref={teamTitle.ref}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12"
            style={anim("bottom", teamTitle.visible)}
          >
            <div>
              <p
                className="text-[#C9A04C] text-xs font-semibold tracking-[.28em] uppercase mb-3"
                style={{ fontFamily: INTER }}
              >
                The Team
              </p>
              <h2
                className="text-white font-bold mb-2"
                style={{ fontFamily: PLAYFAIR, fontSize: "clamp(28px,3.5vw,44px)" }}
              >
                Meet Our Professionals
              </h2>
              <p className="text-white/45 text-sm" style={{ fontFamily: INTER }}>
                Expert hands. Modern style. Classic precision.
              </p>
            </div>

            <div className="flex gap-2 mt-6 sm:mt-0">
              {["←", "→"].map((arrow) => (
                <button
                  key={arrow}
                  className="w-10 h-10 border border-[#C9A04C]/35 flex items-center justify-center text-[#C9A04C] text-sm hover:bg-[#C9A04C] hover:text-[#100c06] transition-all duration-300 cursor-pointer"
                >
                  {arrow}
                </button>
              ))}
            </div>
          </div>

          {/* Barber cards */}
          <div ref={teamCards.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {barbers.map((b, i) => (
              <div
                key={b.name}
                className="relative overflow-hidden rounded-sm cursor-pointer group hover:-translate-y-2 transition-transform duration-350"
                style={{
                  height: "380px",
                  ...anim(
                    i === 0 ? "left" : i === 2 ? "right" : "bottom",
                    teamCards.visible,
                    `${i * 0.12}s`
                  ),
                }}
              >
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-full object-cover brightness-[0.82] contrast-105 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100c06]/92 via-[#100c06]/40 to-transparent" />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <div>
                    <p
                      className="text-white font-bold text-lg"
                      style={{ fontFamily: PLAYFAIR }}
                    >
                      {b.name}
                    </p>
                    <p
                      className="text-[#C9A04C] text-xs tracking-wider mt-0.5"
                      style={{ fontFamily: INTER }}
                    >
                      {b.role}
                    </p>
                  </div>

                  {/* Social icons — slide up on hover */}
                  <div className="flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {["f", "tw", "ig", "in"].map((s) => (
                      <div
                        key={s}
                        className="w-7 h-7 rounded-full bg-[#C9A04C]/15 border border-[#C9A04C]/40 flex items-center justify-center text-[#C9A04C] font-bold hover:bg-[#C9A04C]/35 transition-colors duration-200 cursor-pointer"
                        style={{ fontFamily: INTER, fontSize: "8px" }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           4. WHAT OUR CLIENTS SAY
      ═══════════════════════════════════════ */}
      <section className="bg-[#1a1108] py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

          {/* Title row */}
          <div
            ref={revTitle.ref}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12"
            style={anim("bottom", revTitle.visible)}
          >
            <div>
              <p
                className="text-[#C9A04C] text-xs font-semibold tracking-[.28em] uppercase mb-3"
                style={{ fontFamily: INTER }}
              >
                Testimonials
              </p>
              <h2
                className="text-white font-bold mb-2"
                style={{ fontFamily: PLAYFAIR, fontSize: "clamp(28px,3.5vw,44px)" }}
              >
                What Our Clients Say
              </h2>
              <p className="text-white/45 text-sm" style={{ fontFamily: INTER }}>
                Best feedback from our happy clients
              </p>
            </div>

            <div className="flex gap-2 mt-6 sm:mt-0">
              <button
                onClick={() => setActiveT((p) => (p - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 border border-[#C9A04C]/35 flex items-center justify-center text-[#C9A04C] text-sm hover:bg-[#C9A04C] hover:text-[#100c06] transition-all duration-300 cursor-pointer"
              >
                ←
              </button>
              <button
                onClick={() => setActiveT((p) => (p + 1) % testimonials.length)}
                className="w-10 h-10 border border-[#C9A04C]/35 flex items-center justify-center text-[#C9A04C] text-sm hover:bg-[#C9A04C] hover:text-[#100c06] transition-all duration-300 cursor-pointer"
              >
                →
              </button>
            </div>
          </div>

          {/* Review card */}
          <div
            ref={revCard.ref}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center"
            style={anim("bottom", revCard.visible)}
          >
            {/* Left — Photo + thumbs */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-sm mx-auto lg:mx-0 w-full max-w-[280px] h-[320px]">
                <img
                  src={testimonials[activeT].img}
                  alt={testimonials[activeT].name}
                  className="w-full h-full object-cover brightness-[0.85] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1108]/60 to-transparent" />
                <p
                  className="absolute top-3 right-4 text-[#C9A04C] text-6xl leading-none opacity-55 select-none"
                  style={{ fontFamily: PLAYFAIR }}
                >
                  &ldquo;
                </p>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-5">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => setActiveT(i)}
                    className={[
                      "w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer flex-shrink-0",
                      i === activeT
                        ? "border-[#C9A04C]"
                        : "border-white/15 hover:border-[#C9A04C]/55",
                    ].join(" ")}
                  >
                    <img
                      src={t.thumb}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right — Text */}
            <div className="lg:col-span-3">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < testimonials[activeT].stars
                        ? "text-[#C9A04C] text-lg"
                        : "text-[#C9A04C]/20 text-lg"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <p
                className="text-white/82 text-lg md:text-xl leading-[1.75] mb-8 italic"
                style={{ fontFamily: PLAYFAIR }}
              >
                &ldquo;{testimonials[activeT].review}&rdquo;
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-10 bg-[#C9A04C]" />
                <div>
                  <p
                    className="text-white font-bold text-base"
                    style={{ fontFamily: PLAYFAIR }}
                  >
                    {testimonials[activeT].name}
                  </p>
                  <p
                    className="text-[#C9A04C] text-xs tracking-wider mt-0.5"
                    style={{ fontFamily: INTER }}
                  >
                    {testimonials[activeT].role}
                  </p>
                </div>
              </div>

              <button className="bg-[#C9A04C] text-[#100c06] font-semibold text-sm tracking-wide px-7 py-3 hover:bg-[#ddb35c] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,160,76,.35)] active:scale-[.97] transition-all duration-300 cursor-pointer">
                Leave a Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           5. FOOTER
      ═══════════════════════════════════════ */}
      {/* <footer className="bg-[#0a0704] border-t border-[#C9A04C]/15 py-6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white/35 text-xs tracking-wider"
            style={{ fontFamily: INTER }}
          >
            © 2025 The Gentleman&apos;s Chair. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Sitemap"].map((l) => (
              <span
                key={l}
                className="text-white/35 text-xs hover:text-[#C9A04C] cursor-pointer transition-colors duration-200"
                style={{ fontFamily: INTER }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </footer> */}
    </div>
  );
}