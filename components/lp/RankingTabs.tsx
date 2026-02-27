"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { getServicesByRank, Service } from "@/data/services";
import SectionDecorations from "@/components/ui/SectionDecorations";

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

// listItemVariants uses custom prop — defined as plain object to avoid Variants type conflict
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
  const styles: Record<number, { background: string; color: string; border?: string }> = {
    1: { background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#fff" },
    2: { background: "linear-gradient(135deg,#C0C0C0,#9CA3AF)", color: "#fff" },
    3: { background: "linear-gradient(135deg,#CD7F32,#A0522D)", color: "#fff" },
  };
  const defaultStyle = { background: "#F1F5F9", color: "#6B7A99", border: "1px solid #DDE5F0" };
  const style = styles[rank] ?? defaultStyle;

  return (
    <div
      aria-label={`${rank}位`}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: rank <= 3 ? 13 : 12,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        ...style,
      }}
    >
      {rank}
      <span style={{ fontSize: 9, fontWeight: 700, marginLeft: 0.5 }}>位</span>
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
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        flexShrink: 0,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: 800,
        letterSpacing: "-0.01em",
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

// ─── Star rating (sm) ─────────────────────────────────────────────────────────

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
      <span style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B" }}>
        {rating.toFixed(1)}
      </span>
      <span style={{ fontSize: 11, color: "#6B7A99" }}>
        口コミ {reviewCount.toLocaleString()}件
      </span>
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
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      background: cfg.bg,
      color: cfg.color,
      fontSize: 12,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 9999,
    }}>
      <span style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: cfg.dot,
        flexShrink: 0,
        display: "inline-block",
      }} />
      {level}
    </div>
  );
}

function TabMetric({ service, tab }: { service: Service; tab: TabKey }) {
  switch (tab) {
    case "overall":
      return (
        <StarRating rating={service.rating} reviewCount={service.reviewCount} />
      );
    case "fee":
      return (
        <span style={{
          fontSize: 18,
          fontWeight: 800,
          color: "#2AABE2",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}>
          {service.fee}
        </span>
      );
    case "payment":
      return (
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: "#E8F8F2",
          color: "#059669",
          fontSize: 12,
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 9999,
        }}>
          {/* Clock icon */}
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
  const [hovered, setHovered] = useState(false);
  const isFirst = rank === 1;

  return (
    <motion.div
      custom={index}
      variants={listItemVariants}
      initial="initial"
      animate="animate"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="ranking-row"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "1rem 1.25rem",
        borderBottom: isLast ? "none" : "1px solid #DDE5F0",
        background: hovered ? "#E8F6FD" : isFirst ? "rgba(42,171,226,0.04)" : "#fff",
        borderLeft: isFirst ? "3px solid #2AABE2" : "3px solid transparent",
        transition: "background 0.18s ease",
        cursor: "default",
      }}
    >
      {/* Rank badge */}
      <RankBadge rank={rank} />

      {/* Logo */}
      <LogoPlaceholder name={service.shortName} index={index} />

      {/* Name */}
      <div className="ranking-row-name" style={{ flex: "0 0 auto", minWidth: 0, maxWidth: 160 }}>
        <p style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#1A2B4A",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: 2,
        }}>
          {service.name}
        </p>
        {service.badges.length > 0 && (
          <span style={{
            display: "inline-block",
            fontSize: 10,
            fontWeight: 600,
            color: "#2AABE2",
            background: "#E8F6FD",
            padding: "1px 6px",
            borderRadius: 9999,
            whiteSpace: "nowrap",
          }}>
            {service.badges[0]}
          </span>
        )}
      </div>

      {/* Highlighted metric */}
      <div className="ranking-row-metric" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TabMetric service={service} tab={activeTab} />
      </div>

      {/* Action buttons */}
      <div className="ranking-row-actions" style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
      }}>
        <a
          href="#services"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#2AABE2",
            border: "1.5px solid #2AABE2",
            borderRadius: 6,
            padding: "4px 10px",
            textDecoration: "none",
            whiteSpace: "nowrap",
            background: "transparent",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#2AABE2";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#2AABE2";
          }}
        >
          詳細を見る
        </a>
        <a
          href={service.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(135deg,#2AABE2,#1A8DC4)",
            borderRadius: 6,
            padding: "4px 10px",
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(42,171,226,0.3)",
            transition: "box-shadow 0.15s, transform 0.15s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 14px rgba(42,171,226,0.45)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(42,171,226,0.3)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
          }}
        >
          公式サイト →
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
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1.5px solid #CDD8E8",
        boxShadow: "0 4px 20px rgba(26,43,74,0.12), 0 1px 6px rgba(26,43,74,0.06)",
        overflow: "hidden",
      }}
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
      className="section-bg-pale"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
      aria-label="ポイント別ランキング"
    >
      <SectionDecorations variant="b" />
      <div
        className="mx-auto px-4 sm:px-6"
        style={{ maxWidth: 900, position: "relative", zIndex: 1 }}
      >
        {/* ── Section header ────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          {/* H2 */}
          <h2 style={{
            fontSize: "clamp(1.4rem, 3.5vw, 1.875rem)",
            fontWeight: 800,
            color: "#1A2B4A",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            marginBottom: "0.75rem",
          }}>
            あなたの重視するポイントで比較
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
            color: "#6B7A99",
            lineHeight: 1.7,
            maxWidth: 540,
            margin: "0 auto",
          }}>
            手数料・入金速度・審査のしやすさ、それぞれのランキングをご確認ください
          </p>
        </div>

        {/* ── Tab navigation ────────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="ランキングカテゴリ"
          style={{
            display: "flex",
            borderBottom: "2px solid #DDE5F0",
            marginBottom: "1.5rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: 0,
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
                style={{
                  position: "relative",
                  flexShrink: 0,
                  padding: "0.75rem 1.25rem",
                  fontSize: "clamp(12px, 2vw, 14px)",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#2AABE2" : "#6B7A99",
                  background: isActive ? "#fff" : "transparent",
                  border: "none",
                  borderBottom: isActive ? "2px solid #2AABE2" : "2px solid transparent",
                  marginBottom: "-2px",
                  cursor: "pointer",
                  transition: "color 0.18s ease, font-weight 0.18s ease",
                  whiteSpace: "nowrap",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = "#1A8DC4";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = "#6B7A99";
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Tab panels with AnimatePresence ───────────────────────────── */}
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

        {/* ── "全件見る" button ─────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "2px solid #2AABE2",
              color: "#2AABE2",
              background: "#fff",
              fontSize: "0.9375rem",
              fontWeight: 700,
              padding: "0.75rem 2rem",
              borderRadius: 9999,
              textDecoration: "none",
              transition: "background 0.18s, color 0.18s, box-shadow 0.18s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#2AABE2";
              el.style.color = "#fff";
              el.style.boxShadow = "0 6px 20px rgba(42,171,226,0.3)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#fff";
              el.style.color = "#2AABE2";
              el.style.boxShadow = "none";
            }}
          >
            サービス詳細を全て見る ↓
          </a>
        </div>
      </div>
    </section>
  );
}
