"use client";

import { useEffect, useRef, useState } from "react";

// ── Scroll visibility hook ──
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const PLAYFAIR = "'Playfair Display', Georgia, serif";
const INTER    = "'Inter', sans-serif";

// ─────────────────────────────────────────────────────
//  REPLACE src VALUES WITH YOUR OWN IMAGES:
//  - Drop your photos in /public/gallery/
//  - Change src to e.g. "/gallery/photo1.jpg"
//  - Change label to your caption
//  - span: "tall" = 2 rows height, "wide" = 2 cols width, "normal" = 1x1
// ─────────────────────────────────────────────────────
const photos: {
  id: number;
  src: string;
  label: string;
  span: "tall" | "wide" | "normal";
}[] = [
  {
    id: 1,
    src: "image copy 7.png",
    label: "Office image",
    span: "tall",
  },
  {
    id: 2,
    src: "/g2.png",
    label: "Scissor Work",
    span: "normal",
  },
  {
    id: 3,
    src: "/g3.png",
    label: "Beard Sculpt",
    span: "normal",
  },
   {
    id: 4,
    src: "image copy 8.png",
    label: "He&She Salon",
    span: "normal",
  },
  {
    id: 18,
    src: "/g4.png",
    label: "The Full Look",
    span: "wide",
  },
  {
    id: 5,
    src: "/g5.png",
    label: "Sharp Lines",
    span: "normal",
  },
  {
    id: 6,
    src: "g6.png",
    label: "Hot Towel Shave",
    span: "tall",
  },
  {
    id: 7,
    src: "g7.png",
    label: "Texture & Style",
    span: "normal",
  },
  {
    id: 8,
    src: "image copy 10.png",
    label: "office image",
    span: "wide",
  },
  {
    id: 9,
    src: "g8.png",
    label: "Precision Cut",
    span: "normal",
  },
  {
    id: 10,
    src: "g9.png",
    label: "Hair Colour",
    span: "normal",
  },
  {
    id: 14,
    src: "image copy 9.png",
    label: "office image",
    span: "normal",
  },
];

export default function GallerySectionTwo() {
  const [lightbox, setLightbox] = useState<null | (typeof photos)[0]>(null);

  const titleRef = useInView(0.2);
  const gridRef  = useInView(0.05);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section className="bg-[#100c06] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">

       

        {/* Section Heading */}
         <div
          ref={titleRef.ref}
          className="text-center mb-14 transition-all duration-700 ease-out"
          style={{
            opacity:   titleRef.visible ? 1 : 0,
            transform: titleRef.visible ? "none" : "translateY(40px)",
            fontFamily: INTER,
          }}
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
               Our Work
            </p>

            {/* Exact heading from screenshot */}
            <h2
              className="text-white font-bold mb-4 leading-[1.08]"
              
              style={{
                fontFamily: PLAYFAIR,
                fontSize: "clamp(30px, 4vw, 52px)",
              }}
            >
              The <span className="text-[#C9A04C]">Gallery</span>
            </h2>

            {/* Exact sub from screenshot */}
            <p
              className="text-white/50 text-sm md:text-base max-w-[420px] mx-auto leading-[1.7]"
              
            >Every cut tells a story. Browse our work and find your next look.
              
            </p>
          </div>

        {/* ── Masonry-style CSS Grid ── */}
        <div
          ref={gridRef.ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[240px] gap-3 md:gap-4"
        >
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              onClick={() => setLightbox(photo)}
              className={[
                // grid span
                photo.span === "tall"   ? "row-span-2" : "",
                photo.span === "wide"   ? "col-span-2" : "",
                // base styles
                "relative overflow-hidden rounded-sm cursor-pointer group",
                // scroll-in animation via inline style
              ].join(" ")}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "0.65s",
                transitionTimingFunction: "cubic-bezier(0.22, 0.68, 0, 1.2)",
                transitionDelay: gridRef.visible ? `${i * 0.07}s` : "0s",
                opacity:   gridRef.visible ? 1 : 0,
                transform: gridRef.visible
                  ? "none"
                  : i % 3 === 0
                  ? "translateX(-40px)"
                  : i % 3 === 1
                  ? "translateY(40px)"
                  : "translateX(40px)",
              }}
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark overlay — slides up on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#100c06]/85 via-[#100c06]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Label — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350">
                <p
                  className="text-white font-bold text-sm"
                  style={{ fontFamily: PLAYFAIR }}
                >
                  {photo.label}
                </p>
                <p className="text-[#C9A04C] text-[10px] tracking-widest uppercase mt-0.5"
                   style={{ fontFamily: INTER }}>
                  View Photo
                </p>
              </div>

              {/* Corner gold accent — top-right on hover */}
              <div className="absolute top-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 right-0 w-full h-[1.5px] bg-[#C9A04C]" />
                <div className="absolute top-0 right-0 w-[1.5px] h-full bg-[#C9A04C]" />
              </div>
            </div>
          ))}
        </div>

        {/* ── View All Button ── */}
        {/* <div
          className="flex justify-center mt-12 transition-all duration-700"
          style={{
            opacity:   gridRef.visible ? 1 : 0,
            transform: gridRef.visible ? "none" : "translateY(24px)",
            transitionDelay: gridRef.visible ? `${photos.length * 0.07 + 0.1}s` : "0s",
          }}
        >
          <button
            className="group flex items-center gap-3 border border-[#C9A04C]/40 text-[#C9A04C] text-sm font-semibold tracking-[0.12em] uppercase px-8 py-3.5 hover:bg-[#C9A04C] hover:text-[#100c06] hover:border-[#C9A04C] transition-all duration-300 cursor-pointer"
            style={{ fontFamily: INTER }}
          >
            View All Work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div> */}
      </div>

      {/* ════════════════════════════════════════
           LIGHTBOX
      ════════════════════════════════════════ */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{ backgroundColor: "rgba(10, 7, 4, 0.95)" }}
          onClick={() => setLightbox(null)}
        >
          {/* Card */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "lightboxIn 0.35s cubic-bezier(0.22, 0.68, 0, 1.2) both",
            }}
          >
            <img
              src={lightbox.src.replace("w=600", "w=1200").replace("w=800", "w=1200")}
              alt={lightbox.label}
              className="w-full max-h-[80vh] object-cover"
            />

            {/* Bottom bar */}
            <div className="bg-[#0d0904] border-t border-[#C9A04C]/20 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-base"
                   style={{ fontFamily: PLAYFAIR }}>
                  {lightbox.label}
                </p>
                <p className="text-[#C9A04C] text-xs tracking-widest uppercase mt-0.5"
                   style={{ fontFamily: INTER }}>
                  The Gentleman&apos;s Chair
                </p>
              </div>
              {/* Prev / Next */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const idx = photos.findIndex((p) => p.id === lightbox.id);
                    setLightbox(photos[(idx - 1 + photos.length) % photos.length]);
                  }}
                  className="w-9 h-9 border border-[#C9A04C]/35 flex items-center justify-center text-[#C9A04C] hover:bg-[#C9A04C] hover:text-[#100c06] transition-all duration-200 cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={() => {
                    const idx = photos.findIndex((p) => p.id === lightbox.id);
                    setLightbox(photos[(idx + 1) % photos.length]);
                  }}
                  className="w-9 h-9 border border-[#C9A04C]/35 flex items-center justify-center text-[#C9A04C] hover:bg-[#C9A04C] hover:text-[#100c06] transition-all duration-200 cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#100c06]/80 border border-[#C9A04C]/40 flex items-center justify-center text-[#C9A04C] text-lg hover:bg-[#C9A04C] hover:text-[#100c06] transition-all duration-200 cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Lightbox animation keyframe — only this one tiny style needed */}
          <style>{`
            @keyframes lightboxIn {
              from { opacity: 0; transform: scale(0.92); }
              to   { opacity: 1; transform: scale(1);    }
            }
          `}</style>
        </div>
      )}
    </section>
  );
}