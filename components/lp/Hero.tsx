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
      <span className="text-[#F59E0B] text-xs font-bold ml-0.5">{rating.toFixed(1)}</span>
    </span>
  );
}

// ─── Decorative blobs (simplified) ───────────────────────────────────────────

function DecorativeBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large primary blob - top right */}
      <div
        className="absolute"
        style={{
          top: "-10%", right: "-8%",
          width: "45vw", height: "45vw", maxWidth: 520, maxHeight: 520,
          borderRadius: "60% 40% 70% 30% / 40% 60% 40% 60%",
          background: "radial-gradient(ellipse at 40% 40%, rgba(42,171,226,0.14) 0%, rgba(42,171,226,0.02) 70%)",
        }}
      />
      {/* Secondary blob - bottom left */}
      <div
        className="absolute"
        style={{
          bottom: "-5%", left: "2%",
          width: "30vw", height: "30vw", maxWidth: 360, maxHeight: 360,
          borderRadius: "40% 60% 30% 70% / 60% 30% 70% 40%",
          background: "radial-gradient(ellipse at 60% 60%, rgba(62,191,138,0.12) 0%, rgba(62,191,138,0.02) 70%)",
        }}
      />
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
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-16px",
          borderRadius: 28,
          background: "radial-gradient(ellipse at 50% 50%, rgba(42,171,226,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Card container */}
      <div
        className="relative bg-white"
        style={{
          borderRadius: 24,
          boxShadow: "0 16px 64px rgba(42,171,226,0.16), 0 4px 16px rgba(26,43,74,0.08)",
          padding: "26px 28px",
          width: 390,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-[18px] pb-3.5 border-b border-[#DDE5F0]">
          <span className="text-[15px] font-bold text-[#2AABE2] tracking-wider">
            総合ランキング
          </span>
          <span className="text-xs bg-[#E8F8F2] text-[#3EBF8A] px-2.5 py-0.5 rounded-full font-bold">
            XXXX年XXXX月版
          </span>
        </div>

        {/* Service rows */}
        <div className="flex flex-col gap-3">
          {previewServices.map((svc, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-[14px]"
              style={{
                padding: "13px 15px",
                background: i === 0 ? "linear-gradient(135deg,#F0F9FF,#EDFBF5)" : "#FAFBFD",
                border: i === 0 ? "1.5px solid #DDE5F0" : "1px solid #EEF1F6",
              }}
            >
              {/* Rank badge */}
              <div
                className="flex items-center justify-center flex-shrink-0 text-[13px] font-extrabold"
                style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: rankColors[i].bg, color: rankColors[i].text,
                }}
              >
                {svc.rank}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm font-bold text-[#1A2B4A]">
                    {svc.name}
                  </span>
                  <span className="text-[10px] bg-[#E8F6FD] text-[#2AABE2] px-[7px] py-0.5 rounded-full font-bold flex-shrink-0">
                    {svc.badge}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MiniStars rating={svc.rating} />
                  <span className="text-[11px] text-[#6B7A99]">手数料 {svc.fee}</span>
                  <span className="text-[10px] bg-[#E8F8F2] text-[#3EBF8A] px-[7px] py-0.5 rounded-full font-semibold">
                    {svc.speed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA footer */}
        <div className="mt-[18px] pt-3.5 border-t border-[#DDE5F0] text-center">
          <div className="text-[13px] text-[#2AABE2] font-bold cursor-pointer flex items-center justify-center gap-1.5">
            全XXXX社のランキングを見る
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#2AABE2" strokeWidth={2.5}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating accent tag */}
      <div
        className="absolute text-white text-sm font-extrabold rounded-full"
        style={{
          top: -18, left: 24,
          background: "linear-gradient(135deg,#2AABE2,#1A8DC4)",
          padding: "8px 20px",
          boxShadow: "0 4px 18px rgba(42,171,226,0.50)",
          letterSpacing: "0.04em",
        }}
      >
        無料で比較できます
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
        paddingTop: "calc(64px + 4rem)",
        paddingBottom: "4.5rem",
      }}
      aria-label="ヒーローセクション"
    >
      <DecorativeBlobs />

      <div
        className="relative mx-auto px-4 sm:px-6 flex items-center gap-12 justify-between"
        style={{ maxWidth: 1160 }}
      >
        {/* Left: Copy */}
        <motion.div
          className="flex-1 max-w-[600px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Label chip */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 bg-[#E8F6FD] text-[#2AABE2] text-xs font-bold tracking-wider py-[5px] px-3.5 rounded-full border border-[rgba(42,171,226,0.25)] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2AABE2] inline-block" />
              請求書カード払い 専門比較サイト
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1 variants={fadeUp} className="mb-5">
            <span
              className="block font-bold leading-[1.3] text-[#1A2B4A] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              請求書の支払いを
              <br />
              <span className="bg-gradient-to-r from-[#2AABE2] to-[#3EBF8A] bg-clip-text text-transparent">
                クレジットカード
              </span>
              に変える
              <br />
              最適なサービスが見つかる
            </span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            variants={fadeUp}
            className="text-[#3A4D6A] mb-8 max-w-[520px]"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              lineHeight: 1.8,
            }}
          >
            資金繰りの不安をなくし、支払いタイミングを自由にコントロール。
            <br />
            手数料・審査難易度・入金速度をXXXX社以上で徹底比較します。
          </motion.p>

          {/* Trust chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-9">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full py-[5px] px-3 text-xs font-semibold text-[#1A2B4A] border border-[rgba(42,171,226,0.2)]"
                style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)" }}
              >
                <CheckCircle2 size={13} color="#3EBF8A" strokeWidth={2.5} />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons — pill primary + outline rounded secondary */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href="#ranking"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("ranking")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hero-cta-primary inline-flex items-center gap-2 text-white text-base font-bold py-3.5 px-7 rounded-full no-underline"
              style={{
                background: "linear-gradient(135deg, #2AABE2, #1A8DC4)",
                boxShadow: "0 6px 24px rgba(42,171,226,0.38)",
              }}
            >
              おすすめサービスを今すぐ見る
              <ArrowDown size={16} strokeWidth={2.5} />
            </a>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-base btn-outline btn-md btn-rounded no-underline"
            >
              無料で資料請求する
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Preview Card */}
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
