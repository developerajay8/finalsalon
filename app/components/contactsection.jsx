"use client";

import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.12) {
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

const SERVICES = [
  "Classic Haircut",
  "Beard Trim & Shape",
  "Hot Towel Shave",
  "Skin Fade",
  "Hair Colour Treatment",
  "Royal Grooming Package",
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState("");
  const [sectionRef, sectionVisible] = useInView(0.08);

  const baseInput = {
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(201,160,76,0.3)",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    fontSize: "13.5px",
    padding: "13px 16px",
    borderRadius: "1px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s, background 0.3s",
    appearance: "none",
  };

  const focusedStyle = (field) =>
    focused === field
      ? { borderColor: "#C9A04C", background: "rgba(201,160,76,0.07)" }
      : {};

  return (
    <section
      ref={sectionRef}
      style={{ background: "#0d0904", position: "relative", overflow: "hidden" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .contact-input::placeholder { color: rgba(255,255,255,0.38); }
        .contact-select option { background: #1a1108; color: #fff; }

        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 2.2fr 1fr;
          min-height: 680px;
        }
        .contact-img-left, .contact-img-right { display: block; }

        @media (max-width: 1024px) {
          .contact-layout { grid-template-columns: 0.8fr 2fr; }
          .contact-img-right { display: none; }
        }
        @media (max-width: 680px) {
          .contact-layout { grid-template-columns: 1fr; }
          .contact-img-left { display: none; }
        }

        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.15) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-check { animation: checkPop 0.6s cubic-bezier(.22,.68,0,1.2) both; }
        .anim-slide { animation: slideUp 0.6s ease both; }

        .submit-btn {
          background: transparent;
          border: 1.5px solid rgba(16,12,6,0.55);
          color: #100c06;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 16px 24px;
          border-radius: 1px;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.3s, transform 0.2s;
        }
        .submit-btn:hover { background: rgba(16,12,6,0.15); transform: translateY(-1px); }
        .submit-btn:active { transform: scale(0.98); }
      `}</style>

      <div className="contact-layout">

        {/* ── Left image ── */}
        <div
          className="contact-img-left"
          style={{
            backgroundImage: "url('/left.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.85s ease 0.1s, transform 0.85s cubic-bezier(.22,.68,0,1.2) 0.1s",
          }}
        >
          {/* right-side fade */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 40%, rgba(13,9,4,0.75))" }} />
          {/* Bottom overlay with text */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "32px 24px",
            background: "linear-gradient(to top, rgba(13,9,4,0.9), transparent)",
          }}>
            <p style={{ color: "#C9A04C", fontFamily: "'Playfair Display', serif", fontSize: "15px", fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>
              "Where every cut tells a story."
            </p>
          </div>
        </div>

        {/* ── Centre form ── */}
        <div
          style={{
            background: "#805808",
            padding: "68px 52px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(.22,.68,0,1.2) 0.2s",
          }}
        >
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "38px" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "12px", marginBottom: "14px",
            }}>
              <div style={{ height: "1px", width: "36px", background: "rgba(16,12,6,0.35)" }} />
              <svg width="10" height="10" viewBox="0 0 10 10">
                <rect x="4" y="0" width="2" height="10" fill="rgba(16,12,6,0.5)" />
                <rect x="0" y="4" width="10" height="2" fill="rgba(16,12,6,0.5)" />
              </svg>
              <div style={{ height: "1px", width: "36px", background: "rgba(16,12,6,0.35)" }} />
            </div>

            <p style={{
              color: "rgba(16,12,6,0.55)",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              marginBottom: "10px",
            }}>
              Book Your Session
            </p>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#100c06",
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 800,
              margin: "0 0 12px",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}>
              Make Appointment
            </h2>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(16,12,6,0.6)",
              fontSize: "13px",
              lineHeight: 1.65,
              maxWidth: "360px",
              margin: "0 auto",
            }}>
              Reserve your chair with our master barbers — walk in confident, walk out legendary.
            </p>
          </div>

          {sent ? (
            /* Success state */
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                className="anim-check"
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  background: "#100c06",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 22px",
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C9A04C" strokeWidth="2.2" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="anim-slide" style={{
                fontFamily: "'Playfair Display', serif",
                color: "#100c06",
                fontSize: "24px",
                fontWeight: 700,
                margin: "0 0 10px",
              }}>
                Appointment Booked!
              </h3>
              <p className="anim-slide" style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(16,12,6,0.65)",
                fontSize: "14px",
                animationDelay: "0.1s",
              }}>
                We&apos;ll confirm your booking via email shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                style={{
                  marginTop: "22px",
                  background: "transparent",
                  border: "1px solid rgba(16,12,6,0.4)",
                  color: "#100c06",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "11px 28px",
                  borderRadius: "1px",
                  cursor: "pointer",
                }}
              >
                Book Another
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              {/* Row 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "13px" }}>
                {[
                  { key: "name", placeholder: "Your Full Name", type: "text" },
                  { key: "email", placeholder: "Email Address", type: "email" },
                ].map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    className="contact-input"
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    style={{ ...baseInput, ...focusedStyle(key) }}
                    onFocus={() => setFocused(key)}
                    onBlur={() => setFocused("")}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                ))}
              </div>

              {/* Row 2 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "13px" }}>
                <input
                  className="contact-input"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  style={{ ...baseInput, ...focusedStyle("phone") }}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <select
                  className="contact-input contact-select"
                  value={form.service}
                  style={{ ...baseInput, cursor: "pointer", ...focusedStyle("service") }}
                  onFocus={() => setFocused("service")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="">Select Service</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Date */}
              <input
                className="contact-input"
                type="date"
                value={form.date}
                style={{ ...baseInput, colorScheme: "dark", ...focusedStyle("date") }}
                onFocus={() => setFocused("date")}
                onBlur={() => setFocused("")}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              {/* Message */}
              <textarea
                className="contact-input"
                placeholder="Write your message (optional)"
                value={form.message}
                rows={4}
                style={{ ...baseInput, resize: "vertical", ...focusedStyle("message") }}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused("")}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              {/* Submit */}
              <button className="submit-btn" onClick={() => setSent(true)}>
                Appointment Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* ── Right image ── */}
        <div
          className="contact-img-right"
          style={{
            backgroundImage: "url('/right.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateX(0)" : "translateX(40px)",
            transition: "opacity 0.85s ease 0.3s, transform 0.85s cubic-bezier(.22,.68,0,1.2) 0.3s",
          }}
        >
          {/* Left-side fade */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, transparent 40%, rgba(13,9,4,0.75))" }} />
          {/* Floating rating badge */}
          <div style={{
            position: "absolute",
            top: "50%",
            right: "24px",
            transform: "translateY(-50%)",
            background: "rgba(16,12,6,0.88)",
            border: "1px solid rgba(201,160,76,0.4)",
            borderRadius: "2px",
            padding: "18px 20px",
            textAlign: "center",
          }}>
            <p style={{ color: "#C9A04C", fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 800, margin: 0 }}>4.9</p>
            <div style={{ display: "flex", gap: "3px", justifyContent: "center", margin: "6px 0" }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#C9A04C">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.1em", margin: 0 }}>
              500+ Reviews
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}