"use client";

import { useState, useEffect, useRef } from "react";

const GALLERY_ITEMS = [
  {
    img: "/gallery/g1.jpg",
    title: "Executive Precision Cut",
    desc: "A refined haircut tailored for leaders — sharp lines, clean finish, and unmatched sophistication.",
    tag: "Haircut",
  },
  {
    img: "/gallery/g2.jpg",
    title: "Elite Beard Craft",
    desc: "Sculpted with razor precision to enhance your jawline and elevate your presence.",
    tag: "Beard",
  },
  {
    img: "/gallery/g3.jpg",
    title: "Skin Fade Mastery",
    desc: "Seamless gradients blended to perfection — bold, clean, and undeniably modern.",
    tag: "Fade",
  },
  {
    img: "/gallery/g4.jpg",
    title: "Luxury Hot Towel Ritual",
    desc: "Indulge in a relaxing shave experience with warm towels, rich lather, and smooth precision.",
    tag: "Shave",
  },
  {
    img: "/gallery/g5.jpg",
    title: "Modern Textured Style",
    desc: "Crafted volume and natural movement designed to hold shape and style all day.",
    tag: "Style",
  },
  {
    img: "/gallery/g6.jpg",
    title: "Signature Royal Package",
    desc: "An all-in-one grooming experience — haircut, beard styling, facial care, and relaxation.",
    tag: "Premium",
  },
];

function useInView(threshold = 0.15) {
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
  return [ref, visible] as const;
}

interface GalleryItem {
  img: string;
  title: string;
  desc: string;
  tag: string;
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView(0.1);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-sm cursor-pointer"
      style={{
        aspectRatio: "3/4",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.96)",
        transition: `opacity 0.8s ease ${index * 0.12}s, transform 0.8s cubic-bezier(.22,.68,0,1.2) ${index * 0.12}s`,
      }}
    >
      {/* BG image with zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${item.img}')`,
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.75s cubic-bezier(.22,.68,0,1.2)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(10,7,3,0.96) 0%, rgba(10,7,3,0.6) 50%, rgba(10,7,3,0.15) 100%)"
            : "linear-gradient(to top, rgba(10,7,3,0.55) 0%, rgba(10,7,3,0.1) 60%, transparent 100%)",
        }}
      />

      {/* Gold shimmer top line */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-all duration-500"
        style={{
          background: "linear-gradient(to right, transparent, #C9A04C, transparent)",
          width: hovered ? "100%" : "0%",
        }}
      />

      {/* Tag pill — visible when not hovered */}
      <div
        className="absolute top-4 left-4 bg-[#C9A04C] text-[#100c06] text-[9px] font-bold
          tracking-[0.22em] uppercase px-3.5 py-[5px] rounded-sm transition-opacity duration-300"
        style={{
          fontFamily: "'Inter', sans-serif",
          opacity: hovered ? 0 : 1,
        }}
      >
        {item.tag}
      </div>

      {/* Hover content */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 pb-7 transition-all duration-500"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(20px)",
          opacity: hovered ? 1 : 0,
        }}
      >
        {/* Gold category label */}
        <span
          className="inline-block text-[#C9A04C] text-[9px] font-bold tracking-[0.25em] uppercase mb-2.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          — {item.tag}
        </span>

        {/* Title */}
        <h3
          className="text-white font-bold text-xl leading-snug mb-2.5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {item.title}
        </h3>

        {/* Desc */}
        <p
          className="text-white/68 text-[13px] leading-[1.65] mb-[18px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {item.desc}
        </p>

        {/* View more arrow */}
        <div
          className="flex items-center gap-2 text-[#C9A04C] text-[10px] font-bold
            tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span>View More</span>
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [headRef, headVisible] = useInView(0.1);

  return (
    <section className="bg-[#100c06] py-[100px]">

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Section Heading ── */}
        <div
          ref={headRef}
          className="text-center mb-16 transition-all duration-[800ms]"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          {/* Decorative lines + icon */}
          <div className="flex items-center justify-center gap-3.5 mb-[18px]">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A04C]" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#C9A04C">
              <rect x="5" y="0" width="2" height="12" />
              <rect x="0" y="5" width="12" height="2" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A04C]" />
          </div>

          <p
            className="text-[#C9A04C] text-[10px] font-bold tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            OUR CRAFT
          </p>

          <h2
            className="text-white font-bold leading-[1.08] mb-[18px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(34px, 4.5vw, 58px)",
            }}
          >
            Crafted for <span className="text-[#C9A04C]">Gentlemen</span>
          </h2>

          <p
            className="text-white/50 text-[15px] leading-[1.7] max-w-[460px] mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Experience grooming redefined — where precision meets luxury and every detail matters.
          </p>
        </div>

        {/* ── Gallery Grid — 3 cols → 2 → 1 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* ── View All Button ── */}
        <div className="text-center mt-[54px]">
          <button
            className="bg-transparent border border-[#C9A04C]/45 text-[#C9A04C]
              text-[11px] font-bold tracking-[0.22em] uppercase
              px-11 py-[15px] rounded-sm cursor-pointer
              transition-all duration-300
              hover:bg-[#C9A04C] hover:text-[#100c06] hover:border-[#C9A04C] hover:-translate-y-0.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            VIEW FULL COLLECTION
          </button>
        </div>

      </div>
    </section>
  );
}