"use client";

import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.1) {
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

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Plans", href: "#" },
  { label: "Contact", href: "#" },
];

const SERVICES = [
  "Classic Haircut",
  "Beard Trim & Shape",
  "Hot Towel Shave",
  "Skin Fade",
  "Hair Colour Treatment",
  "Royal Grooming Package",
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
];

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView(0.2);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [visible, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [footerRef, footerVisible] = useInView(0.05);
  const [statsRef, statsVisible] = useInView(0.15);
  const year = new Date().getFullYear();

  const col = (delay) => ({
    opacity: footerVisible ? 1 : 0,
    transform: footerVisible ? "translateY(0)" : "translateY(36px)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(.22,.68,0,1.2) ${delay}s`,
  });

  return (
    <footer style={{ background: "#080603", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        /* ── Animated background scissors ── */
        @keyframes floatScissor {
          0%,100% { transform: translateY(0px) rotate(-15deg); opacity:0.03; }
          50%      { transform: translateY(-18px) rotate(-12deg); opacity:0.055; }
        }
        @keyframes floatScissor2 {
          0%,100% { transform: translateY(0px) rotate(20deg); opacity:0.025; }
          50%      { transform: translateY(-22px) rotate(24deg); opacity:0.05; }
        }
        .bg-scissor-1 {
          position:absolute; top:8%; right:6%; width:220px; opacity:0.04;
          animation: floatScissor 7s ease-in-out infinite;
          pointer-events:none; user-select:none;
        }
        .bg-scissor-2 {
          position:absolute; bottom:15%; left:3%; width:160px; opacity:0.03;
          animation: floatScissor2 9s ease-in-out infinite 1.5s;
          pointer-events:none; user-select:none;
        }

        /* ── Gold divider line draw ── */
        @keyframes drawLine {
          from { width: 0; }
          to   { width: 100%; }
        }
        .gold-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #C9A04C 30%, #C9A04C 70%, transparent);
          animation: drawLine 1.6s ease both;
        }

        /* ── Marquee scrolling text ── */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        /* ── Social icons ── */
        .social-icon {
          width: 42px; height: 42px;
          border-radius: 2px;
          border: 1px solid rgba(201,160,76,0.25);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.3s;
          text-decoration: none;
        }
        .social-icon:hover {
          background: #C9A04C;
          border-color: #C9A04C;
          color: #100c06;
          transform: translateY(-4px);
        }

        /* ── Footer nav links ── */
        .footer-link {
          color: rgba(255,255,255,0.5);
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s, padding-left 0.3s;
          padding: 3px 0;
        }
        .footer-link::before {
          content: '';
          display: inline-block;
          width: 0;
          height: 1px;
          background: #C9A04C;
          transition: width 0.3s;
          flex-shrink: 0;
        }
        .footer-link:hover { color: #C9A04C; padding-left: 6px; }
        .footer-link:hover::before { width: 14px; }

        /* ── Newsletter input ── */
        .newsletter-input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(201,160,76,0.25);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          padding: 13px 16px;
          border-radius: 1px 0 0 1px;
          outline: none;
          transition: border-color 0.3s, background 0.3s;
        }
        .newsletter-input:focus {
          border-color: #C9A04C;
          background: rgba(201,160,76,0.07);
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.35); }
        .newsletter-btn {
          background: #C9A04C;
          color: #100c06;
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 13px 22px;
          border-radius: 0 1px 1px 0;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          white-space: nowrap;
        }
        .newsletter-btn:hover { background: #dbb95e; transform: scale(1.03); }

        /* ── Stats ── */
        .stat-card {
          text-align: center;
          padding: 28px 20px;
          border: 1px solid rgba(201,160,76,0.12);
          border-radius: 2px;
          background: rgba(201,160,76,0.04);
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover {
          background: rgba(201,160,76,0.09);
          border-color: rgba(201,160,76,0.35);
          transform: translateY(-4px);
        }

        /* ── Bottom bar ── */
        .footer-bottom-links a {
          color: rgba(255,255,255,0.38);
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-bottom-links a:hover { color: #C9A04C; }

        /* ── Grid ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 52px;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 760px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ── Floating BG scissors ── */}
      <svg className="bg-scissor-1" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="0.8">
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
      <svg className="bg-scissor-2" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="0.8">
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>

      {/* ══════════════════════════════════════
           MARQUEE STRIP
      ══════════════════════════════════════ */}
      {/* <div style={{
        borderTop: "1px solid rgba(201,160,76,0.2)",
        borderBottom: "1px solid rgba(201,160,76,0.2)",
        background: "rgba(201,160,76,0.04)",
        padding: "14px 0",
        overflow: "hidden",
      }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, ri) => (
            <div key={ri} style={{ display: "flex", gap: "0", alignItems: "center" }}>
              {["Premium Grooming", "Expert Barbers", "Hot Towel Shave", "Skin Fade Specialists", "Walk-Ins Welcome", "Est. 2010", "Jaipur's Finest"].map((t, i) => (
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
      </div> */}

      {/* ══════════════════════════════════════
           STATS BAR
      ══════════════════════════════════════ */}
      <div
        ref={statsRef}
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 40px 0",
          opacity: statsVisible ? 1 : 0,
          transform: statsVisible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(.22,.68,0,1.2)",
        }}
      >
        <div className="stats-grid">
          {[
            { value: 12000, suffix: "+", label: "Happy Clients", icon: "👤" },
            { value: 15, suffix: " Yrs", label: "Experience", icon: "✦" },
            { value: 8, suffix: "", label: "Expert Barbers", icon: "✂" },
            { value: 4.9, suffix: "★", label: "Average Rating", icon: "★", isDecimal: true },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <p style={{
                fontFamily: "'Playfair Display', serif",
                color: "#C9A04C",
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 800,
                margin: "0 0 6px",
                lineHeight: 1,
              }}>
                {s.isDecimal ? (
                  <span>{statsVisible ? s.value : 0}{s.suffix}</span>
                ) : (
                  <>{statsVisible && <AnimatedCounter target={s.value} suffix={s.suffix} />}</>
                )}
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255,255,255,0.45)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: 0,
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
           MAIN FOOTER GRID
      ══════════════════════════════════════ */}
      <div
        ref={footerRef}
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 40px 52px" }}
      >
        <div className="footer-grid">

          {/* ── Col 1: Brand ── */}
          <div style={col(0.1)}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
              <img src="/image copy 1.png" className="w-[100]" alt="" />
            </div>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.48)",
              fontSize: "13.5px",
              lineHeight: 1.75,
              marginBottom: "28px",
              maxWidth: "280px",
            }}>
              More than just a barbershop — we&apos;re a lifestyle destination for the modern gentleman. Est. 2010, Jaipur.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} className="social-icon" aria-label={s.name}
                  style={{ transitionDelay: `${i * 0.06}s` }}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Working hours mini */}
            <div style={{
              marginTop: "28px",
              padding: "16px 18px",
              background: "rgba(201,160,76,0.06)",
              border: "1px solid rgba(201,160,76,0.15)",
              borderRadius: "2px",
              maxWidth: "280px",
            }}>
              <p style={{
                color: "#C9A04C",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
                marginBottom: "10px",
              }}>
                Working Hours
              </p>
              {[
                { day: "Mon – Fri", time: "9:00am – 8:30pm" },
                { day: "Saturday", time: "10:00am – 6:30pm" },
                { day: "Sunday", time: "Closed", gold: true },
              ].map((h, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < 2 ? "6px" : 0 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{h.day}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", color: h.gold ? "#C9A04C" : "rgba(255,255,255,0.75)", fontSize: "12px", fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div style={col(0.2)}>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 6px",
            }}>
              Quick Links
            </h4>
            <div style={{ width: "32px", height: "2px", background: "#C9A04C", marginBottom: "24px", borderRadius: "1px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {NAV_LINKS.map((l, i) => (
                <a key={i} href={l.href} className="footer-link">{l.label}</a>
              ))}
            </div>
          </div>

          {/* ── Col 3: Services ── */}
          <div style={col(0.3)}>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 6px",
            }}>
              Our Services
            </h4>
            <div style={{ width: "32px", height: "2px", background: "#C9A04C", marginBottom: "24px", borderRadius: "1px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {SERVICES.map((s, i) => (
                <a key={i} href="#" className="footer-link">{s}</a>
              ))}
            </div>
          </div>

          {/* ── Col 4: Newsletter + Contact ── */}
          <div style={col(0.4)}>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 6px",
            }}>
              Stay Updated
            </h4>
            <div style={{ width: "32px", height: "2px", background: "#C9A04C", marginBottom: "24px", borderRadius: "1px" }} />

            <p style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.45)",
              fontSize: "13px",
              lineHeight: 1.65,
              marginBottom: "18px",
            }}>
              Get exclusive grooming tips, offers and updates straight to your inbox.
            </p>

            {subscribed ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(201,160,76,0.1)",
                border: "1px solid rgba(201,160,76,0.35)",
                borderRadius: "2px",
                padding: "14px 16px",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="2.2" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontFamily: "'Inter', sans-serif", color: "#C9A04C", fontSize: "13px", fontWeight: 500 }}>
                  You&apos;re subscribed!
                </span>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <input
                  className="newsletter-input"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="newsletter-btn"
                  onClick={() => email && setSubscribed(true)}
                >
                  Subscribe
                </button>
              </div>
            )}

            {/* Contact details */}
            <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                {
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  text: "Shop No 2, Plot No. 403, 404,80 Feet Road, Near Hanuman Mandir, Kanta, Jhotwara, Jaipur-12",
                },
                {
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  ),
                  text: "+91 95094 84341",
                },
                {
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  text: "hello@thegentlemanshair.com",
                },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ marginTop: "1px", flexShrink: 0 }}>{c.icon}</div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "12.5px",
                    lineHeight: 1.55,
                  }}>
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Gold divider ── */}
        <div style={{ margin: "52px 0 28px" }}>
          {footerVisible && <div className="gold-divider" />}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          opacity: footerVisible ? 1 : 0,
          transition: "opacity 0.8s ease 0.6s",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.3)",
            fontSize: "12px",
            margin: 0,
          }}>
            © {year} <span style={{ color: "#C9A04C" }}>BarberShop</span>. All rights reserved. Crafted with{" "}
            <span style={{ color: "#C9A04C" }}>♥</span> in Jaipur.
          </p>

          <div className="footer-bottom-links" style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l, i) => (
              <a key={i} href="#">{l}</a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "1px solid rgba(201,160,76,0.3)",
              color: "#C9A04C",
              width: "38px",
              height: "38px",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.3s, transform 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C9A04C";
              e.currentTarget.style.color = "#100c06";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C9A04C";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            aria-label="Back to top"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}