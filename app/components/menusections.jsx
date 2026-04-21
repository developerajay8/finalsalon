"use client";

import { useState, useEffect, useRef } from "react";

// ─── All data from real menu images ────────────────────────────────
const MENU_DATA = {
  male: [
    {
      category: "Male Services",
      icon: "✂",
      items: [
        { name: "Shave", price: "49" },
        { name: "Hair Cut", price: "149" },
        { name: "Kids Cut", price: "149" },
        { name: "Bleach", price: "249" },
        { name: "Facial (Onwards)", price: "549" },
        { name: "Face Clean-Up", price: "349" },
        { name: "Head Massage", price: "199" },
        { name: "Body Massage", price: "999" },
        { name: "Hair Color — L'Oreal", price: "549" },
        { name: "Hair Color — Matrix", price: "499" },
        { name: "High Lighting", price: "149" },
        { name: "Straightening (Onwards)", price: "1499" },
        { name: "Hair Spa (Onwards)", price: "649" },
        { name: "Manicure (Onwards)", price: "399" },
        { name: "Pedicure (Onwards)", price: "449" },
        { name: "Keratin (Onwards)", price: "1499" },
        { name: "Nanoplastia Treatment (Onwards)", price: "2499" },
      ],
    },
    {
      category: "Hair Styling",
      icon: "💈",
      items: [
        { name: "Ironing", price: "399" },
        { name: "Crimping", price: "399" },
        { name: "Juda", price: "250–999" },
        { name: "Saree Draping", price: "299–1499" },
      ],
    },
    {
      category: "Pedicure",
      icon: "🌿",
      items: [
        { name: "Pedicure Classic", price: "349" },
        { name: "Pedicure Royal", price: "449" },
        { name: "Pedicure Signature", price: "799" },
        { name: "Pedicure Crystal", price: "1399" },
      ],
    },
    {
      category: "Body Polishing",
      icon: "✨",
      items: [
        { name: "Aroma Therapy Eternal Bleach", price: "2499" },
        { name: "Stress Relief", price: "1999" },
        { name: "Aroma Therapy Intense Nourishment", price: "5499" },
        { name: "Hydrating Anti Cellulite", price: "4499" },
      ],
    },
  ],
  female: [
    {
      category: "Female Services",
      icon: "💄",
      items: [
        { name: "Eye Brow", price: "30" },
        { name: "Upper Lips", price: "20" },
        { name: "Forehead / Chin", price: "20" },
        { name: "Chin With Wax", price: "49" },
        { name: "Hair Cut", price: "199" },
        { name: "Hair Cut With Shampoo", price: "249" },
        { name: "Hair Dryer", price: "149" },
        { name: "Ironing (According Length)", price: "399" },
        { name: "Tongs / Curls", price: "399" },
        { name: "One Length", price: "249" },
        { name: "Advance Cut", price: "349" },
        { name: "Hair Spa (Onwards)", price: "849" },
        { name: "Anti Dandruff", price: "1199" },
        { name: "Straightening", price: "2999" },
        { name: "Rebonding", price: "3499" },
        { name: "Keratin (Onwards)", price: "2999" },
        { name: "Nanoplastia Treatment (Onwards)", price: "6999" },
      ],
    },
    {
      category: "Manicure",
      icon: "💅",
      items: [
        { name: "Manicure Classic", price: "349" },
        { name: "Manicure Royal", price: "449" },
        { name: "Manicure Signature", price: "599" },
      ],
    },
    {
      category: "D-Tan",
      icon: "🌟",
      items: [
        { name: "Half & Full Hand", price: "249–999" },
        { name: "Half & Full Leg", price: "349–999" },
        { name: "Ozone", price: "449" },
        { name: "Aroma", price: "399" },
        { name: "Lotus", price: "499" },
      ],
    },
    {
      category: "Head Massage",
      icon: "🧖",
      items: [
        { name: "Indian Head", price: "199" },
        { name: "Aroma Head", price: "399" },
        { name: "Morrocan Oil", price: "599" },
        { name: "Aroma Foot", price: "499" },
        { name: "Full Body", price: "999" },
        { name: "Head & Foot Massage", price: "799" },
      ],
    },
  ],
  common: [
    {
      category: "Facial",
      icon: "🌸",
      note: "Range: ₹599 to ₹2999",
      items: [
        { name: "O3", price: "2999" },
        { name: "Cheryl's (Onwards)", price: "1649" },
        { name: "Aroma (Onwards)", price: "1449" },
        { name: "VLCC (Onwards)", price: "1249" },
        { name: "Whitening Facial (Onwards)", price: "2499" },
      ],
    },
    {
      category: "Hair Treatment",
      icon: "💆",
      items: [
        { name: "Extreme Hair Repair Treatment", price: "2999" },
        { name: "Extreme Repair Hair / Face Treatment", price: "2499" },
        { name: "Repair / Weak, Damage Hair (Style & Aroma)", price: "1299" },
        { name: "Moisturizing Sensitive Dry Or Fizzy (L'Oreal)", price: "1499" },
        { name: "Anti Dandruff (L'Oreal)", price: "1599" },
      ],
    },
    {
      category: "Coloring",
      icon: "🎨",
      items: [
        { name: "Inoa / Matrix Tach-Up", price: "549" },
        { name: "Inoa / L'Oreal Tach-Up", price: "599" },
        { name: "Full Global (Matrix)", price: "2499" },
        { name: "Full Global (L'Oreal)", price: "2999" },
        { name: "Innova (L'Oreal)", price: "3499" },
      ],
    },
    {
      category: "Highlighting",
      icon: "✦",
      items: [
        { name: "Per Streak", price: "149" },
        { name: "Crown Area", price: "2499" },
        { name: "Half Head", price: "2999" },
        { name: "Full Head", price: "4999" },
      ],
    },
    {
      category: "Wax & Bleach",
      icon: "🌿",
      note: "Milk · Banana Chocolate · Brazillan · Rica",
      items: [
        { name: "Face Wax", price: "249" },
        { name: "Under Arms", price: "49–149" },
        { name: "Full Hand", price: "249–599" },
        { name: "Full Leg", price: "349–899" },
        { name: "Full Body", price: "1499–1999" },
        { name: "Back Wax", price: "449–899" },
        { name: "Upper Lips", price: "49" },
        { name: "Chin", price: "49" },
        { name: "Ozone Bleach Face", price: "449" },
        { name: "Cheryl's Bleach Face", price: "349" },
        { name: "Gold Bleach Face", price: "199" },
        { name: "Back Bleach", price: "349–699" },
        { name: "Body Bleach", price: "1499" },
      ],
    },
    {
      category: "Makeup",
      icon: "💋",
      items: [
        { name: "Air Brush", price: "24999" },
        { name: "Bobby Brown Mac HD", price: "16999" },
        { name: "Mac HD", price: "14999" },
        { name: "Make-Up Studio", price: "11999" },
        { name: "Make-Up Studio + Kryolan", price: "8999" },
        { name: "Kryolan", price: "6999" },
        { name: "Party Makeup", price: "1999–3499" },
      ],
    },
    {
      category: "Bridal Package",
      icon: "👰",
      items: [
        {
          name: "1 Day Package",
          price: "4999",
          desc: "Brightening Facial · Hair Spa · D-Tan · Full Body Waxing · Manicure · Pedicure · Body Polishing With Steam · Eye Brow · Upper Lips",
        },
        {
          name: "15 Day Package",
          price: "9999",
          desc: "Day 1: Bridal Consultation, Hair Spa, Power Brightening Cleanup, Back Polishing, Signature Pedicure & Manicure · Day 5–10: D-Tan, Brightening Face Mask, Body Polishing With Steam & Hair Cut · Day 11–15: Power Bright Facial, D-Tan, Waxing, Back & Neck Bleach, Eye Brown, Upper Lips",
        },
      ],
    },
  ],
};

// ── Hook ────────────────────────────────────────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Service Row ─────────────────────────────────────────────────────
function ServiceRow({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "12px",
        padding: "9px 14px",
        borderLeft: hovered ? "2px solid #C9A04C" : "2px solid transparent",
        background: hovered ? "rgba(201,160,76,0.07)" : "transparent",
        transition: "all 0.22s ease",
        opacity: 1,
        animation: `rowFadeIn 0.4s ease ${index * 0.03}s both`,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          color: hovered ? "#fff" : "rgba(255,255,255,0.7)",
          fontSize: "13px",
          margin: 0,
          lineHeight: 1.45,
          transition: "color 0.22s",
        }}>
          {item.name}
        </p>
        {item.desc && (
          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.35)",
            fontSize: "11px",
            margin: "5px 0 0",
            lineHeight: 1.55,
          }}>
            {item.desc}
          </p>
        )}
      </div>
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        fontSize: "13px",
        color: hovered ? "#100c06" : "#C9A04C",
        background: hovered ? "#C9A04C" : "rgba(201,160,76,0.1)",
        padding: "3px 11px",
        borderRadius: "1px",
        whiteSpace: "nowrap",
        flexShrink: 0,
        transition: "all 0.22s ease",
      }}>
        ₹{item.price}
      </span>
    </div>
  );
}

// ── Category Card ───────────────────────────────────────────────────
function CategoryCard({ cat, cardIndex }) {
  const [ref, visible] = useInView(0.04);
  const [open, setOpen] = useState(true);

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid rgba(201,160,76,0.16)",
        borderRadius: "2px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.025)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(44px)",
        transition: `opacity 0.75s ease ${cardIndex * 0.07}s, transform 0.75s cubic-bezier(.22,.68,0,1.2) ${cardIndex * 0.07}s`,
      }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 16px",
          background: open ? "rgba(201,160,76,0.1)" : "rgba(201,160,76,0.04)",
          border: "none",
          borderBottom: open ? "1px solid rgba(201,160,76,0.14)" : "none",
          cursor: "pointer",
          gap: "10px",
          transition: "background 0.3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <span style={{ fontSize: "15px", lineHeight: 1 }}>{cat.icon}</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            color: "#C9A04C",
            fontSize: "13.5px",
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}>
            {cat.category}
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(201,160,76,0.6)",
            fontSize: "10px",
            fontWeight: 600,
            background: "rgba(201,160,76,0.1)",
            padding: "2px 8px",
            borderRadius: "20px",
          }}>
            {cat.items.length}
          </span>
        </div>
        <svg
          width="13" height="13" viewBox="0 0 24 24"
          fill="none" stroke="#C9A04C" strokeWidth="2.5" strokeLinecap="round"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.35s ease", flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Note */}
      {cat.note && open && (
        <div style={{
          margin: "10px 14px 2px",
          padding: "5px 12px",
          background: "rgba(201,160,76,0.06)",
          border: "1px solid rgba(201,160,76,0.18)",
          borderRadius: "1px",
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            color: "#C9A04C",
            fontSize: "11px",
            fontStyle: "italic",
            fontWeight: 500,
          }}>
            {cat.note}
          </span>
        </div>
      )}

      {/* Items */}
      <div style={{
        maxHeight: open ? "3000px" : "0",
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(.22,.68,0,1.2)",
      }}>
        <div style={{ padding: "6px 0 8px" }}>
          {cat.items.map((item, i) => (
            <ServiceRow key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN EXPORT ─────────────────────────────────────────────────────
export default function MenuSection() {
  const [tab, setTab] = useState("male");
  const [headRef, headVisible] = useInView(0.1);

  const TABS = [
    { id: "male",   label: "For Him",      emoji: "✂",  count: MENU_DATA.male.reduce((a, c) => a + c.items.length, 0) },
    { id: "female", label: "For Her",      emoji: "💄", count: MENU_DATA.female.reduce((a, c) => a + c.items.length, 0) },
    { id: "common", label: "All Services", emoji: "✦",  count: MENU_DATA.common.reduce((a, c) => a + c.items.length, 0) },
  ];

  return (
    <section style={{ background: "#100c06", padding: "88px 0 100px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes rowFadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .menu-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          align-items: start;
        }
        @media (max-width: 820px) {
          .menu-2col { grid-template-columns: 1fr; }
        }

        .tab-strip {
          display: flex;
          gap: 0;
          border: 1px solid rgba(201,160,76,0.25);
          border-radius: 2px;
          overflow: hidden;
          width: fit-content;
          margin: 0 auto;
        }

        .tab-btn {
          padding: 12px 30px;
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
          display: flex;
          align-items: center;
          gap: 7px;
          border-right: 1px solid rgba(201,160,76,0.2);
        }
        .tab-btn:last-child { border-right: none; }
        .tab-btn.active {
          background: #C9A04C;
          color: #100c06;
        }
        .tab-btn.inactive {
          background: transparent;
          color: rgba(255,255,255,0.48);
        }
        .tab-btn.inactive:hover {
          background: rgba(201,160,76,0.1);
          color: #C9A04C;
        }
        .count-pill {
          font-size: 9px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
        }

        .cta-strip {
          margin-top: 50px;
          padding: 30px 36px;
          background: rgba(201,160,76,0.05);
          border: 1px solid rgba(201,160,76,0.18);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .call-btn {
          display: flex; align-items: center; gap: 9px;
          background: #C9A04C; color: #100c06;
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 13px 22px; border-radius: 1px; text-decoration: none;
          transition: background 0.3s, transform 0.2s;
        }
        .call-btn:hover { background: #dbb95e; transform: translateY(-2px); }
        .insta-btn {
          display: flex; align-items: center; gap: 9px;
          background: transparent; color: #C9A04C;
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 13px 22px; border-radius: 1px; text-decoration: none;
          border: 1px solid rgba(201,160,76,0.38);
          transition: all 0.3s;
        }
        .insta-btn:hover { background: rgba(201,160,76,0.1); border-color: #C9A04C; }

        @media (max-width: 600px) {
          .tab-strip { flex-direction: column; width: 100%; }
          .tab-btn { border-right: none; border-bottom: 1px solid rgba(201,160,76,0.2); justify-content: center; }
          .tab-btn:last-child { border-bottom: none; }
          .cta-strip { flex-direction: column; text-align: center; align-items: center; }
        }
      `}</style>

      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 28px" }}>

        {/* ── Heading ── */}
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: "44px",
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(.22,.68,0,1.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(to right, transparent, #C9A04C)" }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(to left, transparent, #C9A04C)" }} />
          </div>

          <p style={{
            color: "#C9A04C", fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.32em", textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif", marginBottom: "12px",
          }}>
            Style N Razors · Unisex Salon & Makeup Studio
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#fff", fontSize: "clamp(28px, 4vw, 50px)",
            fontWeight: 800, lineHeight: 1.08, margin: "0 0 14px",
          }}>
            Services &amp; <span style={{ color: "#C9A04C" }}>Pricing</span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.42)", fontSize: "14px",
            lineHeight: 1.7, maxWidth: "400px", margin: "0 auto",
          }}>
            Premium grooming for every look, every budget — Jhotwara, Jaipur.
          </p>
        </div>

        {/* ── Tab Strip ── */}
        <div
          className="tab-strip"
          style={{
            marginBottom: "36px",
            opacity: headVisible ? 1 : 0,
            transition: "opacity 0.7s ease 0.2s",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? "active" : "inactive"}`}
              onClick={() => setTab(t.id)}
            >
              <span>{t.emoji}</span>
              {t.label}
              <span className="count-pill" style={{
                background: tab === t.id ? "rgba(16,12,6,0.22)" : "rgba(201,160,76,0.15)",
                color: tab === t.id ? "#100c06" : "#C9A04C",
              }}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Divider label ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "26px",
          opacity: headVisible ? 1 : 0,
          transition: "opacity 0.6s ease 0.3s",
        }}>
          <div style={{ height: "1px", flex: 1, background: "rgba(201,160,76,0.12)" }} />
          <span style={{
            fontFamily: "'Playfair Display', serif",
            color: "rgba(255,255,255,0.35)",
            fontSize: "12px", fontStyle: "italic", letterSpacing: "0.1em",
          }}>
            {tab === "male" ? "✂ Men's Grooming Menu" : tab === "female" ? "💄 Women's Beauty Menu" : "✦ Complete Services Menu"}
          </span>
          <div style={{ height: "1px", flex: 1, background: "rgba(201,160,76,0.12)" }} />
        </div>

        {/* ── 2-Column card grid ── */}
        <div className="menu-2col" key={tab}>
          {MENU_DATA[tab].map((cat, i) => (
            <CategoryCard key={`${tab}-${cat.category}`} cat={cat} cardIndex={i} />
          ))}
        </div>

        {/* ── CTA Bottom Strip ── */}
        <div
          className="cta-strip"
          style={{
            opacity: headVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              color: "#fff", fontSize: "17px", fontWeight: 700, margin: "0 0 5px",
            }}>
              Walk-ins Welcome · Appointments Preferred
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.4)", fontSize: "12.5px", margin: 0, lineHeight: 1.55,
            }}>
              Shop No. 2, Plot No. 403–404, 80 Feet Road, Near Hanuman Mandir, Kanta, Jhotwara, Jaipur-12
            </p>
          </div>
          <div style={{ display: "flex", gap: "11px", flexWrap: "wrap" }}>
            <a href="tel:+919509484341" className="call-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +91 95094 84341
            </a>
            <a href="https://instagram.com/stylenrazors" target="_blank" rel="noopener noreferrer" className="insta-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @stylenrazors
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}