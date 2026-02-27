"use client";

import { motion, type Variants } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import ScoreBar from "@/components/ui/ScoreBar";
import Badge from "@/components/ui/Badge";
import { services, Service } from "@/data/services";
import SectionDecorations from "@/components/ui/SectionDecorations";
import SectionHeader from "@/components/ui/SectionHeader";
import { Lightbulb, Check } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Animation variants ───────────────────────────────────────────────────────

const sectionFadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const scoreBarsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const scoreBarItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

// ─── Rank badge config ────────────────────────────────────────────────────────

type RankStyle = {
  bg: string;
  text: string;
  label: string;
  border: string;
};

function getRankStyle(rank: number): RankStyle {
  switch (rank) {
    case 1:
      return {
        bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
        text: "#fff",
        label: "1位",
        border: "2px solid rgba(255,165,0,0.5)",
      };
    case 2:
      return {
        bg: "linear-gradient(135deg, #D0D0D0 0%, #A8A8A8 100%)",
        text: "#fff",
        label: "2位",
        border: "2px solid rgba(160,160,160,0.5)",
      };
    case 3:
      return {
        bg: "linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)",
        text: "#fff",
        label: "3位",
        border: "2px solid rgba(160,82,45,0.45)",
      };
    default:
      return {
        bg: "linear-gradient(135deg, #8899BB 0%, #6B7A99 100%)",
        text: "#fff",
        label: `${rank}位`,
        border: "2px solid rgba(107,122,153,0.4)",
      };
  }
}

// ─── Logo placeholder ─────────────────────────────────────────────────────────

const logoGradients = [
  "linear-gradient(135deg, #2AABE2 0%, #1A8DC4 100%)",
  "linear-gradient(135deg, #3EBF8A 0%, #2DA374 100%)",
  "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
  "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
  "linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)",
];

function LogoPlaceholder({ shortName, index }: { shortName: string; index: number }) {
  const gradient = logoGradients[index % logoGradients.length];
  return (
    <div
      className="service-card-logo w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
      style={{
        background: gradient,
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }}
      aria-hidden="true"
    >
      <span className="text-white text-[13px] font-extrabold tracking-wider text-center leading-tight px-1.5 max-w-[70px] overflow-hidden line-clamp-2">
        {shortName}
      </span>
    </div>
  );
}

// ─── Screening level indicator ────────────────────────────────────────────────

function ScreeningIndicator({ level }: { level: Service["screeningLevel"] }) {
  const config: Record<Service["screeningLevel"], { color: string; bg: string }> = {
    やさしい: { color: "#3EBF8A", bg: "#E8F8F2" },
    普通: { color: "#2AABE2", bg: "#E8F6FD" },
    やや厳しい: { color: "#F59E0B", bg: "#FEF3C7" },
  };
  const { color, bg } = config[level];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full text-xs font-bold px-2 py-0.5"
      style={{ background: bg, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 inline-block" style={{ background: color }} />
      {level}
    </span>
  );
}

// ─── Info grid cell ───────────────────────────────────────────────────────────

function InfoCell({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="bg-[#F8FAFD] border border-[#DDE5F0] rounded-[10px] py-2.5 px-3">
      <div className="text-[10px] font-bold text-[#6B7A99] tracking-wider uppercase mb-1">
        {label}
      </div>
      {children ? (
        children
      ) : (
        <div className="text-sm font-bold text-[#1A2B4A] leading-tight">
          {value}
        </div>
      )}
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const rank = service.ranks.overall;
  const rankStyle = getRankStyle(rank);
  const isTop = rank === 1;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px 0px" }}
      className="relative overflow-hidden rounded-[20px]"
      style={{
        background: isTop
          ? "linear-gradient(160deg, #FFFFFF 0%, #F0F9FF 60%, #EDFBF5 100%)"
          : "#fff",
        border: isTop ? "2px solid #2AABE2" : "1px solid #DDE5F0",
        boxShadow: isTop
          ? "0 8px 32px rgba(42,171,226,0.18), 0 2px 8px rgba(42,171,226,0.10)"
          : "0 4px 20px rgba(42,171,226,0.10)",
        padding: 32,
      }}
      aria-label={`${service.name} — 総合${rank}位`}
    >
      {/* Top-1 accent stripe */}
      {isTop && (
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-[20px]"
          style={{ background: "linear-gradient(90deg, #2AABE2 0%, #3EBF8A 100%)" }}
          aria-hidden="true"
        />
      )}

      {/* ── Zone 1: Header — Rank + Logo + Name + Catchphrase + Stars ── */}
      <div className="card-zone pt-0">
        <div
          className="service-card-header flex items-start gap-[18px] mb-6"
          style={{ paddingTop: isTop ? 8 : 0 }}
        >
          {/* Rank badge */}
          <div
            className="service-card-rank w-[52px] h-[52px] rounded-[14px] flex flex-col items-center justify-center flex-shrink-0"
            style={{
              background: rankStyle.bg,
              border: rankStyle.border,
              color: rankStyle.text,
              boxShadow: "0 4px 12px rgba(0,0,0,0.14)",
            }}
            aria-label={`総合${rankStyle.label}`}
          >
            <span className="text-[8px] font-bold tracking-wider opacity-[0.88] leading-none">
              総合
            </span>
            <span className="text-lg font-black leading-tight tracking-tight">
              {rank}
            </span>
            <span className="text-[9px] font-bold leading-none opacity-[0.88]">
              位
            </span>
          </div>

          {/* Logo */}
          <LogoPlaceholder shortName={service.shortName} index={index} />

          {/* Name + catchphrase + stars */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-extrabold text-[#1A2B4A] leading-[1.25] mb-1 tracking-tight"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)" }}
            >
              {service.name}
            </h3>
            <p className="text-sm text-[#6B7A99] leading-normal mb-2.5">
              {service.catchphrase}
            </p>
            <StarRating rating={service.rating} size="lg" showNumber reviewCount={service.reviewCount} />
          </div>
        </div>
      </div>

      {/* ── Zone 2: Specs — InfoCells + ScoreBars ── */}
      <div className="card-zone">
        <div className="service-card-body flex gap-6 items-start flex-wrap mb-0">
          {/* Left column: score bars */}
          <motion.div
            className="flex-[1_1_280px] min-w-[240px]"
            variants={scoreBarsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px 0px" }}
          >
            <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#1A2B4A] tracking-wider mb-3">
              <span
                className="w-[3px] h-3.5 rounded-full flex-shrink-0 inline-block"
                style={{ background: "linear-gradient(180deg, #2AABE2 0%, #3EBF8A 100%)" }}
                aria-hidden="true"
              />
              満足度内訳
            </div>

            <div className="flex flex-col gap-2.5">
              <motion.div variants={scoreBarItem}>
                <ScoreBar label="手数料満足度" score={service.scores.fee} animate />
              </motion.div>
              <motion.div variants={scoreBarItem}>
                <ScoreBar label="審査スピード" score={service.scores.speed} animate />
              </motion.div>
              <motion.div variants={scoreBarItem}>
                <ScoreBar label="サポート対応" score={service.scores.support} animate />
              </motion.div>
              <motion.div variants={scoreBarItem}>
                <ScoreBar label="使いやすさ" score={service.scores.usability} animate />
              </motion.div>
            </div>
          </motion.div>

          {/* Right column: service info + badges */}
          <div className="flex-[0_0_240px] min-w-[220px]">
            {/* 2x2 info grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <InfoCell label="手数料" value={service.fee} />
              <InfoCell label="入金速度" value={service.paymentSpeed} />
              <InfoCell label="最小金額" value={service.minAmount} />
              <InfoCell label="審査難易度">
                <ScreeningIndicator level={service.screeningLevel} />
              </InfoCell>
            </div>

            {/* Feature badges */}
            {service.badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {service.badges.map((b) => (
                  <Badge key={b} variant="secondary" size="sm">{b}</Badge>
                ))}
              </div>
            )}

            {/* Target tags */}
            {service.targetTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {service.targetTags.map((t) => (
                  <Badge key={t} variant="primary" size="sm">{t}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Zone 3: Details — Recommend + Points + CTA ── */}
      <div className="card-zone">
        {/* こんな方におすすめ */}
        <div className="bg-[#E8F6FD] border border-[rgba(42,171,226,0.2)] rounded-xl py-3 px-4 mb-5 flex items-start gap-2.5">
          <Lightbulb size={18} className="flex-shrink-0 mt-px text-[#F5A623]" aria-hidden="true" />
          <div>
            <span className="text-[11px] font-bold text-[#1A8DC4] tracking-wider block mb-0.5">
              こんな方におすすめ
            </span>
            <p className="text-sm text-[#1A2B4A] leading-relaxed m-0 font-medium">
              {service.recommendFor}
            </p>
          </div>
        </div>

        {/* このサービスのポイント */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#1A2B4A] tracking-wider mb-2.5">
            <span
              className="w-[3px] h-3.5 rounded-full flex-shrink-0 inline-block"
              style={{ background: "linear-gradient(180deg, #3EBF8A 0%, #2DA374 100%)" }}
              aria-hidden="true"
            />
            このサービスのポイント
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-[7px]">
            {service.merits.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#1A2B4A] leading-[1.55]">
                <span className="w-[18px] h-[18px] rounded-full bg-[#E8F8F2] text-[#3EBF8A] inline-flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Footer — single primary button */}
        <div className="border-t border-[#DDE5F0] pt-5">
          <div className="service-card-cta flex gap-3 flex-wrap items-center mb-2">
            <a
              href={service.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-primary btn-md btn-pill service-cta-link"
            >
              公式サイトを見る
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <p className="text-[11px] text-[#6B7A99] m-0">
            ※外部サイトに遷移します
          </p>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Section Component ───────────────────────────────────────────────────

export default function ServiceCards() {
  const sorted = [...services].sort(
    (a, b) => a.ranks.overall - b.ranks.overall
  );
  const count = sorted.length;

  return (
    <section
      id="services"
      className="section-bg-pale relative overflow-hidden"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      aria-label="おすすめサービス詳細"
    >
      <SectionDecorations variant="c" />
      <div className="mx-auto px-4 sm:px-6 relative z-[1]" style={{ maxWidth: 1160 }}>
        {/* Section header — icon-badge variant */}
        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <SectionHeader
            variant="icon-badge"
            chipLabel="サービス詳細"
            title={
              <>
                おすすめ請求書カード払いサービス
                <br />
                詳細比較
              </>
            }
            subtitle={`総合評価順に全${count}社の詳細情報をご紹介します`}
          />
        </motion.div>

        {/* Service cards */}
        <div className="flex flex-col gap-6">
          {sorted.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Affiliate disclosure */}
        <div className="border-t border-[#DDE5F0] mt-12 pt-6 text-center">
          <p className="text-xs text-[#6B7A99] leading-relaxed m-0 max-w-[640px] mx-auto">
            ※当サイトのリンクにはアフィリエイト広告が含まれる場合があります。掲載内容は編集部の独自調査に基づいています。
          </p>
        </div>
      </div>
    </section>
  );
}
