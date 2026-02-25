"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, CheckCircle2, Shield, RefreshCcw, Building2 } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Animation variants ──────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.75, ease: EASE, delay: 0.35 },
  },
};

// ─── Mini preview card data ───────────────────────────────────────────────────

const previewServices = [
  { rank: 1, name: "XXXXカード払い", fee: "X.X%〜", speed: "最短即日", rating: 4.8, badge: "手数料最安" },
  { rank: 2, name: "XXXXペイサービス", fee: "X.X%〜", speed: "翌営業日", rating: 4.6, badge: "入金最速" },
  { rank: 3, name: "XXXX請求書払い", fee: "X.X%〜", speed: "最短2日", rating: 4.5, badge: "審査やさしい" },
];

const rankColors = [
  { bg: "linear-gradient(135deg,#FFD700,#FFA500)", text: "#fff" },
  { bg: "linear-gradient(135deg,#C0C0C0,#A0A0A0)", text: "#fff" },
  { bg: "linear-gradient(135deg,#CD7F32,#A0522D)", text: "#fff" },
];

// ─── Trust chips ─────────────────────────────────────────────────────────────

const trustPoints = [
  { icon: Shield, label: "専門家監修済" },
  { icon: Building2, label: "XXXX社掲載" },
  { icon: RefreshCcw, label: "毎月情報更新" },
];

// ─── Stars ────────────────────────────────────────────────────────────────────

function MiniStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={13} height={13} viewBox="0 0 24 24" fill={i < Math.round(rating) ? "#F59E0B" : "#DDE5F0"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span style={{ color: "#F59E0B", fontSize: 12, fontWeight: 700, marginLeft: 2 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

// ─── Decorative blob ─────────────────────────────────────────────────────────

function DecorativeBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large primary blob - top right */}
      <div
        style={{
          position: "absolute", top: "-10%", right: "-8%",
          width: "45vw", height: "45vw", maxWidth: 520, maxHeight: 520,
          borderRadius: "60% 40% 70% 30% / 40% 60% 40% 60%",
          background: "radial-gradient(ellipse at 40% 40%, rgba(42,171,226,0.18) 0%, rgba(42,171,226,0.04) 70%)",
          filter: "blur(2px)",
        }}
      />
      {/* Secondary blob - bottom left */}
      <div
        style={{
          position: "absolute", bottom: "-5%", left: "2%",
          width: "30vw", height: "30vw", maxWidth: 360, maxHeight: 360,
          borderRadius: "40% 60% 30% 70% / 60% 30% 70% 40%",
          background: "radial-gradient(ellipse at 60% 60%, rgba(62,191,138,0.16) 0%, rgba(62,191,138,0.03) 70%)",
          filter: "blur(1px)",
        }}
      />
      {/* Dot grid pattern */}
      <svg
        style={{ position: "absolute", top: "15%", right: "10%", opacity: 0.22 }}
        width="180" height="180" viewBox="0 0 180 180"
      >
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 30 + 15} cy={row * 30 + 15} r={2.5}
              fill="#2AABE2"
            />
          ))
        )}
      </svg>
      {/* Small accent circles */}
      <div style={{
        position: "absolute", top: "20%", left: "5%",
        width: 12, height: 12, borderRadius: "50%",
        background: "#3EBF8A", opacity: 0.45
      }} />
      <div style={{
        position: "absolute", top: "45%", left: "12%",
        width: 8, height: 8, borderRadius: "50%",
        background: "#2AABE2", opacity: 0.35
      }} />
      {/* 下端フェードアウト — 次セクションへなめらかに繋げる */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "35%",
        background: "linear-gradient(to bottom, transparent 0%, rgba(240,249,255,0.90) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ─── Preview Card ─────────────────────────────────────────────────────────────

function PreviewCard() {
  return (
    <motion.div
      variants={cardVariants}
      className="relative hidden lg:block"
      style={{ flex: "0 0 auto", marginTop: 8 }}
    >
      {/* Floating glow */}
      <div style={{
        position: "absolute", inset: "-16px",
        borderRadius: 28,
        background: "radial-gradient(ellipse at 50% 50%, rgba(42,171,226,0.16) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Card container */}
      <div style={{
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 16px 64px rgba(42,171,226,0.16), 0 4px 16px rgba(26,43,74,0.08)",
        padding: "26px 28px",
        width: 390,
        position: "relative",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 18, paddingBottom: 14,
          borderBottom: "1px solid #DDE5F0"
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#2AABE2", letterSpacing: "0.06em" }}>
            総合ランキング
          </span>
          <span style={{
            fontSize: 12, background: "#E8F8F2", color: "#3EBF8A",
            padding: "3px 10px", borderRadius: 9999, fontWeight: 700
          }}>
            XXXX年XXXX月版
          </span>
        </div>

        {/* Service rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {previewServices.map((svc, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "13px 15px",
                background: i === 0 ? "linear-gradient(135deg,#F0F9FF,#EDFBF5)" : "#FAFBFD",
                borderRadius: 14,
                border: i === 0 ? "1.5px solid #DDE5F0" : "1px solid #EEF1F6",
              }}
            >
              {/* Rank badge */}
              <div style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                background: rankColors[i].bg, color: rankColors[i].text,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800,
              }}>
                {svc.rank}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1A2B4A" }}>
                    {svc.name}
                  </span>
                  <span style={{
                    fontSize: 10, background: "#E8F6FD", color: "#2AABE2",
                    padding: "2px 7px", borderRadius: 9999, fontWeight: 700, flexShrink: 0,
                  }}>
                    {svc.badge}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MiniStars rating={svc.rating} />
                  <span style={{ fontSize: 11, color: "#6B7A99" }}>手数料 {svc.fee}</span>
                  <span style={{
                    fontSize: 10, background: "#E8F8F2", color: "#3EBF8A",
                    padding: "2px 7px", borderRadius: 9999, fontWeight: 600,
                  }}>
                    {svc.speed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA footer */}
        <div style={{
          marginTop: 18, paddingTop: 14,
          borderTop: "1px solid #DDE5F0",
          textAlign: "center"
        }}>
          <div style={{
            fontSize: 13, color: "#2AABE2", fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 5
          }}>
            全XXXX社のランキングを見る
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#2AABE2" strokeWidth={2.5}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating accent tag */}
      <div style={{
        position: "absolute", top: -18, left: 24,
        background: "linear-gradient(135deg,#2AABE2,#1A8DC4)",
        color: "#fff", fontSize: 14, fontWeight: 800,
        padding: "8px 20px", borderRadius: 9999,
        boxShadow: "0 4px 18px rgba(42,171,226,0.50)",
        letterSpacing: "0.04em",
      }}>
        ✦ 無料で比較できます
      </div>
    </motion.div>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden section-bg-hero hero-container"
      style={{
        paddingTop: "calc(64px + 3rem)",
        paddingBottom: "3.5rem",
      }}
      aria-label="ヒーローセクション"
    >
      <DecorativeBlobs />

      <div
        className="relative mx-auto px-4 sm:px-6"
        style={{
          maxWidth: 1160,
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          justifyContent: "space-between",
        }}
      >
        {/* ── Left: Copy ─────────────────────────────────────────────────── */}
        <motion.div
          className="flex-1"
          style={{ maxWidth: 600 }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main copy (h1) */}
          <motion.div variants={fadeUp}>
            <h1 style={{
              fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.3,
              color: "#1A2B4A",
              letterSpacing: "-0.01em",
              marginBottom: "1.25rem",
            }}>
              請求書カード払い{" "}
              <span style={{
                background: "linear-gradient(135deg, #2AABE2, #3EBF8A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                専門比較サイト
              </span>
            </h1>
          </motion.div>

          {/* Sub copy */}
          <motion.p variants={fadeUp} style={{
            fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
            fontWeight: 500,
            color: "#3A4D6A",
            lineHeight: 1.8,
            marginBottom: "2rem",
            maxWidth: 520,
          }}>
            手数料・審査難易度・入金速度をXXXX社以上で徹底比較します。
          </motion.p>

          {/* Trust chips */}
          <motion.div variants={fadeUp} style={{
            display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "2.25rem"
          }}>
            {trustPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: "#E8F6FD", backdropFilter: "blur(4px)",
                  border: "1.5px solid rgba(42,171,226,0.35)",
                  borderRadius: 9999, padding: "6px 14px",
                  fontSize: 13, fontWeight: 600, color: "#1A2B4A",
                }}
              >
                <CheckCircle2 size={15} color="#3EBF8A" strokeWidth={2.5} />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons — vertical stack */}
          <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
            {/* Green button */}
            <div>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%",
                  background: "linear-gradient(135deg, #3EBF8A, #2DA374)",
                  color: "#fff", fontSize: "1rem", fontWeight: 700,
                  padding: "0.875rem 1.75rem", borderRadius: 9999,
                  boxShadow: "0 6px 24px rgba(62,191,138,0.32)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 32px rgba(62,191,138,0.42)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 24px rgba(62,191,138,0.32)";
                }}
              >
                無料で資料請求する
              </a>
            </div>

            {/* Blue button */}
            <a
              href="#ranking"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("ranking")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                width: "100%",
                background: "linear-gradient(135deg, #2AABE2, #1A8DC4)",
                color: "#fff", fontSize: "1rem", fontWeight: 700,
                padding: "0.875rem 1.75rem", borderRadius: 9999,
                boxShadow: "0 6px 24px rgba(42,171,226,0.38)",
                transition: "transform 0.2s, box-shadow 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 32px rgba(42,171,226,0.46)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 24px rgba(42,171,226,0.38)";
              }}
            >
              おすすめサービスを今すぐ見る
              <ArrowDown size={16} strokeWidth={2.5} />
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: Preview Card ─────────────────────────────────────────── */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <PreviewCard />
        </motion.div>
      </div>
    </section>
  );
}
