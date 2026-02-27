"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { getTop3Services, Service } from "@/data/services";
import SectionDecorations from "@/components/ui/SectionDecorations";
import SectionHeader from "@/components/ui/SectionHeader";

// ─── Constants ───────────────────────────────────────────────────────────────

const RANK_META = [
  {
    label: "1位",
    gradient: "linear-gradient(135deg, #FFD700, #FFA500)",
    shadowColor: "rgba(255, 165, 0, 0.35)",
    isTop: true,
  },
  {
    label: "2位",
    gradient: "linear-gradient(135deg, #C0C0C0, #A0A0A0)",
    shadowColor: "rgba(160, 160, 160, 0.30)",
    isTop: false,
  },
  {
    label: "3位",
    gradient: "linear-gradient(135deg, #CD7F32, #A0522D)",
    shadowColor: "rgba(165, 82, 45, 0.28)",
    isTop: false,
  },
] as const;

const LOGO_GRADIENTS = [
  "linear-gradient(135deg, #2AABE2 0%, #1A8DC4 100%)",
  "linear-gradient(135deg, #3EBF8A 0%, #2DA374 100%)",
  "linear-gradient(135deg, #6B7A99 0%, #3A4D6A 100%)",
] as const;

// ─── Animation Variants ──────────────────────────────────────────────────────

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function FeeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 19h20v2H2zM2 6l5 7 5-9 5 9 5-7-2 11H4z" />
    </svg>
  );
}

// ─── Metric Row Item ──────────────────────────────────────────────────────────

interface MetricItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconColor: string;
}

function MetricItem({ icon, label, value, iconColor }: MetricItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
      <div
        className="flex items-center gap-1 whitespace-nowrap"
        style={{ color: iconColor, fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}
      >
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-[13px] font-bold text-[var(--color-dark)] text-center leading-tight">
        {value}
      </div>
    </div>
  );
}

// ─── First Place Card (横長) ────────────────────────────────────────────────

function FirstPlaceCard({ service, index }: { service: Service; index: number }) {
  const meta = RANK_META[0];
  const logoGradient = LOGO_GRADIENTS[0];

  return (
    <motion.div
      variants={cardVariants}
      className="top3-card-first relative bg-white rounded-[20px] card-hover overflow-hidden"
      style={{
        border: "2px solid rgba(42, 171, 226, 0.35)",
        boxShadow: "0 8px 32px rgba(42,171,226,0.18), 0 2px 10px rgba(42,171,226,0.10)",
        background: "linear-gradient(160deg, #ffffff 60%, #F0F9FF 85%, #EDFBF5 100%)",
      }}
    >
      {/* Gold top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-[20px]"
        style={{ background: "linear-gradient(90deg, #FFD700, #FFA500)" }}
        aria-hidden="true"
      />

      {/* Editorial badge */}
      <div
        className="absolute top-[-13px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-white text-[11px] font-bold px-3.5 py-1 rounded-full whitespace-nowrap z-10"
        style={{
          background: "linear-gradient(135deg, #F59E0B, #D97706)",
          boxShadow: "0 2px 8px rgba(245,158,11,0.40)",
          letterSpacing: "0.04em",
        }}
      >
        <CrownIcon />
        編集部のイチオシ
      </div>

      {/* Content — Desktop: horizontal layout */}
      <div className="p-7 pt-8 flex flex-col md:flex-row md:items-center gap-6">
        {/* Left: Rank + Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-[13px] font-extrabold text-white flex-shrink-0"
            style={{
              background: meta.gradient,
              boxShadow: `0 3px 10px ${meta.shadowColor}`,
              letterSpacing: "-0.02em",
            }}
            aria-label={`総合${meta.label}`}
          >
            {meta.label}
          </div>

          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold text-center leading-tight overflow-hidden"
            style={{
              background: logoGradient,
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              letterSpacing: "0.02em",
            }}
            aria-label={`${service.name} ロゴ`}
          >
            {service.shortName}
          </div>
        </div>

        {/* Center: Name + Rating + Catchphrase + Metrics */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1.5 mb-3">
            <h3 className="text-[17px] font-extrabold text-[var(--color-dark)] leading-tight m-0">
              {service.name}
            </h3>
            <StarRating rating={service.rating} size="md" showNumber reviewCount={service.reviewCount} />
          </div>

          <p className="text-[13px] text-[var(--color-mid)] leading-relaxed italic border-l-[3px] border-[var(--color-primary)] pl-2.5 mb-4 m-0">
            {service.catchphrase}
          </p>

          {/* 3-metric summary */}
          <div className="flex items-stretch bg-[var(--color-bg)] rounded-[10px] py-3 px-2">
            <MetricItem icon={<FeeIcon />} label="手数料" value={service.fee} iconColor="var(--color-primary)" />
            <div className="w-px bg-[var(--color-border)] self-stretch mx-1" aria-hidden="true" />
            <MetricItem icon={<LightningIcon />} label="入金速度" value={service.paymentSpeed} iconColor="var(--color-secondary)" />
            <div className="w-px bg-[var(--color-border)] self-stretch mx-1" aria-hidden="true" />
            <MetricItem icon={<CheckIcon />} label="審査" value={service.screeningLevel} iconColor="var(--color-gold)" />
          </div>
        </div>

        {/* Right: Badges + CTA */}
        <div className="flex flex-col items-stretch gap-3 md:min-w-[180px]">
          <div className="flex flex-wrap gap-1.5">
            {service.badges.map((badge, i) => (
              <Badge key={badge} variant={i === 0 ? "secondary" : "primary"} size="sm">
                {badge}
              </Badge>
            ))}
          </div>

          <a
            href={service.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-primary btn-md btn-pill w-full text-center"
          >
            公式サイトを見る
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── 2nd/3rd Place Card ──────────────────────────────────────────────────────

function SubCard({ service, index }: { service: Service; index: number }) {
  const meta = RANK_META[index];
  const logoGradient = LOGO_GRADIENTS[index];

  return (
    <motion.div
      variants={cardVariants}
      className="relative bg-white rounded-[16px] card-hover flex flex-col gap-4 p-6"
      style={{
        border: "1px solid var(--color-border)",
        boxShadow: "0 2px 12px rgba(42,171,226,0.10)",
      }}
    >
      {/* Card top: rank badge + logo + name + rating */}
      <div className="flex items-start gap-3.5">
        <div
          className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-[13px] font-extrabold text-white"
          style={{
            background: meta.gradient,
            boxShadow: `0 3px 10px ${meta.shadowColor}`,
            letterSpacing: "-0.02em",
          }}
          aria-label={`総合${meta.label}`}
        >
          {meta.label}
        </div>

        <div
          className="w-[60px] h-[60px] rounded-xl flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold text-center leading-tight overflow-hidden"
          style={{
            background: logoGradient,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            letterSpacing: "0.02em",
          }}
          aria-label={`${service.name} ロゴ`}
        >
          {service.shortName}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <h3 className="text-base font-extrabold text-[var(--color-dark)] leading-tight m-0 break-words">
            {service.name}
          </h3>
          <StarRating rating={service.rating} size="md" showNumber reviewCount={service.reviewCount} />
        </div>
      </div>

      {/* Catchphrase */}
      <p className="text-[13px] text-[var(--color-mid)] leading-relaxed italic border-l-[3px] border-[var(--color-primary)] pl-2.5 m-0">
        {service.catchphrase}
      </p>

      {/* 3-metric summary */}
      <div className="flex items-stretch bg-[var(--color-bg)] rounded-[10px] py-3 px-2">
        <MetricItem icon={<FeeIcon />} label="手数料" value={service.fee} iconColor="var(--color-primary)" />
        <div className="w-px bg-[var(--color-border)] self-stretch mx-1" aria-hidden="true" />
        <MetricItem icon={<LightningIcon />} label="入金速度" value={service.paymentSpeed} iconColor="var(--color-secondary)" />
        <div className="w-px bg-[var(--color-border)] self-stretch mx-1" aria-hidden="true" />
        <MetricItem icon={<CheckIcon />} label="審査" value={service.screeningLevel} iconColor="var(--color-gold)" />
      </div>

      {/* Badge list */}
      <div className="flex flex-wrap gap-1.5">
        {service.badges.map((badge, i) => (
          <Badge key={badge} variant={i === 0 ? "secondary" : "primary"} size="sm">
            {badge}
          </Badge>
        ))}
      </div>

      {/* CTA — single button */}
      <div className="mt-auto pt-1">
        <a
          href={service.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="top3-official-link flex items-center justify-center gap-1.5 w-full py-2.5 px-6 rounded-full text-[15px] font-bold no-underline text-[#1A2B4A] bg-white"
          style={{
            border: "1.5px solid #DDE5F0",
            boxShadow: "0 2px 8px rgba(26,43,74,0.08)",
          }}
        >
          公式サイトを見る
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Top3() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  const top3 = getTop3Services();

  return (
    <section
      ref={sectionRef}
      id="top3"
      className="section-bg-pale relative overflow-hidden"
      style={{ paddingTop: 80, paddingBottom: 80 }}
    >
      <SectionDecorations variant="a" />
      <div className="relative z-[1] mx-auto px-5" style={{ maxWidth: 1160 }}>
        {/* Section Header — chip variant */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-[52px]"
        >
          <SectionHeader
            variant="chip"
            chipLabel="まず見てほしい3社"
            title={
              <>
                おすすめ請求書カード払いサービス{" "}
                <span className="text-[var(--color-primary)]">3選</span>
              </>
            }
            subtitle="手数料・審査・入金速度を総合評価した上位3社をご紹介します"
          />
        </motion.div>

        {/* Cards — 1st: full width, 2nd-3rd: 2-column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-5"
        >
          {/* 1st place — full width horizontal */}
          <FirstPlaceCard service={top3[0]} index={0} />

          {/* 2nd & 3rd — 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SubCard service={top3[1]} index={1} />
            <SubCard service={top3[2]} index={2} />
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-xs text-[var(--color-gray)] leading-relaxed"
        >
          ※ 掲載情報は調査時点のものです。最新情報は各公式サイトにてご確認ください。
        </motion.p>
      </div>
    </section>
  );
}
