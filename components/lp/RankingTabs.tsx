"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { getServicesByRank, Service } from "@/data/services";
import SectionDecorations from "@/components/ui/SectionDecorations";
import SectionHeader from "@/components/ui/SectionHeader";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "overall" | "fee" | "payment" | "screening";

interface Tab {
  key: TabKey;
  label: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  { key: "overall",   label: "総合" },
  { key: "fee",       label: "手数料の安さ" },
  { key: "payment",   label: "入金速度" },
  { key: "screening", label: "審査のしやすさ" },
];

const TOP_N = 5;

// ─── Animation variants ───────────────────────────────────────────────────────

const panelVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.2,  ease: "easeIn" } },
};

const listItemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE, delay: i * 0.06 },
  }),
} as const;

// ─── Rank badge ───────────────────────────────────────────────────────────────

function RankBadge({ rank }: { rank: number }) {
  const styles: Record<number, { background: string; color: string }> = {
    1: { background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#fff" },
    2: { background: "linear-gradient(135deg,#C0C0C0,#9CA3AF)", color: "#fff" },
    3: { background: "linear-gradient(135deg,#CD7F32,#A0522D)", color: "#fff" },
  };
  const defaultStyle = { background: "#F1F5F9", color: "#6B7A99" };
  const style = styles[rank] ?? defaultStyle;

  return (
    <div
      aria-label={`${rank}位`}
      className="flex items-center justify-center flex-shrink-0 rounded-full font-extrabold"
      style={{
        width: 36,
        height: 36,
        fontSize: rank <= 3 ? 13 : 12,
        letterSpacing: "-0.02em",
        ...style,
        ...(rank > 3 ? { border: "1px solid #DDE5F0" } : {}),
      }}
    >
      {rank}
      <span className="text-[9px] font-bold ml-px">位</span>
    </div>
  );
}

// ─── Logo placeholder ─────────────────────────────────────────────────────────

const LOGO_BG_COLORS = [
  "#2AABE2", "#3EBF8A", "#8B5CF6", "#F59E0B", "#EF4444",
  "#06B6D4", "#10B981",
];

function LogoPlaceholder({ name, index }: { name: string; index: number }) {
  const bg = LOGO_BG_COLORS[index % LOGO_BG_COLORS.length];
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded-[10px] flex-shrink-0 flex items-center justify-center text-white text-base font-extrabold"
      style={{ background: bg, letterSpacing: "-0.01em" }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

// ─── Star rating (sm) ─────────────────────────────────────────────────────────

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-px">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <svg key={i} width={13} height={13} viewBox="0 0 24 24">
              {partial ? (
                <>
                  <defs>
                    <linearGradient id={`star-partial-${i}`} x1="0" x2="1" y1="0" y2="0">
                      <stop offset={`${(rating % 1) * 100}%`} stopColor="#F59E0B" />
                      <stop offset={`${(rating % 1) * 100}%`} stopColor="#DDE5F0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={`url(#star-partial-${i})`}
                  />
                </>
              ) : (
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={filled ? "#F59E0B" : "#DDE5F0"}
                />
              )}
            </svg>
          );
        })}
      </div>
      <span className="text-[13px] font-bold text-[#F59E0B]">{rating.toFixed(1)}</span>
      <span className="text-[11px] text-[#6B7A99]">({reviewCount.toLocaleString()}件)</span>
    </div>
  );
}

// ─── Highlighted metric per tab ───────────────────────────────────────────────

function ScreeningIndicator({ level }: { level: string }) {
  const config: Record<string, { color: string; bg: string; dot: string }> = {
    "やさしい":   { color: "#059669", bg: "#ECFDF5", dot: "#3EBF8A" },
    "普通":       { color: "#D97706", bg: "#FFFBEB", dot: "#F59E0B" },
    "やや厳しい": { color: "#DC2626", bg: "#FEF2F2", dot: "#EF4444" },
  };
  const cfg = config[level] ?? config["普通"];
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full text-xs font-bold px-2.5 py-0.5"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      <span className="w-[7px] h-[7px] rounded-full flex-shrink-0 inline-block" style={{ background: cfg.dot }} />
      {level}
    </div>
  );
}

function TabMetric({ service, tab }: { service: Service; tab: TabKey }) {
  switch (tab) {
    case "overall":
      return <StarRating rating={service.rating} reviewCount={service.reviewCount} />;
    case "fee":
      return (
        <span className="text-lg font-extrabold text-[#2AABE2] leading-none tracking-tight">
          {service.fee}
        </span>
      );
    case "payment":
      return (
        <span className="inline-flex items-center gap-1 bg-[#E8F8F2] text-[#059669] text-xs font-bold px-2.5 py-1 rounded-full">
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#3EBF8A" strokeWidth={2.5} strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {service.paymentSpeed}
        </span>
      );
    case "screening":
      return <ScreeningIndicator level={service.screeningLevel} />;
    default:
      return null;
  }
}

// ─── Ranking row ──────────────────────────────────────────────────────────────

function RankingRow({
  service,
  rank,
  index,
  isLast,
  activeTab,
}: {
  service: Service;
  rank: number;
  index: number;
  isLast: boolean;
  activeTab: TabKey;
}) {
  // Rank-specific CSS class
  const rankClass = rank === 1 ? "ranking-row-rank1" : rank <= 3 ? "ranking-row-rank2-3" : "ranking-row-rank4-5";

  return (
    <motion.div
      custom={index}
      variants={listItemVariants}
      initial="initial"
      animate="animate"
      className={`ranking-row ${rankClass}`}
      style={{
        borderBottom: isLast ? "none" : "1px solid #DDE5F0",
      }}
    >
      {/* Rank badge */}
      <RankBadge rank={rank} />

      {/* Logo */}
      <LogoPlaceholder name={service.shortName} index={index} />

      {/* Name */}
      <div className="ranking-row-name" style={{ flex: "0 0 auto", minWidth: 0, maxWidth: 160 }}>
        <p className="text-sm font-bold text-[#1A2B4A] whitespace-nowrap overflow-hidden text-ellipsis mb-0.5">
          {service.name}
        </p>
        {service.badges.length > 0 && (
          <span className="inline-block text-[10px] font-semibold text-[#2AABE2] bg-[#E8F6FD] px-1.5 py-px rounded-full whitespace-nowrap">
            {service.badges[0]}
          </span>
        )}
      </div>

      {/* Highlighted metric */}
      <div className="ranking-row-metric flex-1 flex items-center justify-center">
        <TabMetric service={service} tab={activeTab} />
      </div>

      {/* Action button — single CTA */}
      <div className="ranking-row-actions flex items-center gap-2 flex-shrink-0">
        <a
          href={service.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ranking-action-link"
        >
          公式サイト
        </a>
      </div>
    </motion.div>
  );
}

// ─── Tab panel ────────────────────────────────────────────────────────────────

function TabPanel({ tab }: { tab: TabKey }) {
  const services = getServicesByRank(tab).slice(0, TOP_N);

  return (
    <motion.div
      key={tab}
      variants={panelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white rounded-2xl border border-[#DDE5F0] overflow-hidden"
      style={{ boxShadow: "0 2px 12px rgba(26,43,74,0.07)" }}
    >
      {services.map((service, i) => (
        <RankingRow
          key={service.id}
          service={service}
          rank={service.ranks[tab]}
          index={i}
          isLast={i === services.length - 1}
          activeTab={tab}
        />
      ))}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RankingTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("overall");

  return (
    <section
      id="ranking"
      className="section-bg-white relative overflow-hidden"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      aria-label="ポイント別ランキング"
    >
      <SectionDecorations variant="b" />
      <div className="mx-auto px-4 sm:px-6 relative z-[1]" style={{ maxWidth: 900 }}>
        {/* Section header — accent-line variant */}
        <SectionHeader
          variant="accent-line"
          chipLabel="ポイント別ランキング"
          title="あなたの重視するポイントで比較"
          subtitle="手数料・入金速度・審査のしやすさ、それぞれのランキングをご確認ください"
        />

        {/* Tab navigation */}
        <div
          role="tablist"
          aria-label="ランキングカテゴリ"
          className="flex mb-6 overflow-x-auto"
          style={{
            borderBottom: "2px solid #DDE5F0",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className="tab-btn relative flex-shrink-0 outline-none whitespace-nowrap"
                style={{
                  padding: "0.75rem clamp(0.5rem, 2vw, 1.25rem)",
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#2AABE2" : "#6B7A99",
                  background: isActive ? "#fff" : "transparent",
                  border: "none",
                  borderBottom: isActive ? "2px solid #2AABE2" : "2px solid transparent",
                  marginBottom: "-2px",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-label={TABS.find((t) => t.key === activeTab)?.label}
          style={{ minHeight: 320 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <TabPanel key={activeTab} tab={activeTab} />
          </AnimatePresence>
        </div>

        {/* "全件見る" button */}
        <div className="text-center mt-8">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-base btn-outline btn-md btn-pill"
          >
            サービス詳細を全て見る
          </a>
        </div>
      </div>
    </section>
  );
}
