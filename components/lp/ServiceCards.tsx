"use client";

import { motion, type Variants } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import ScoreBar from "@/components/ui/ScoreBar";
import Badge from "@/components/ui/Badge";
import { services, Service } from "@/data/services";
import SectionDecorations from "@/components/ui/SectionDecorations";
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
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

function LogoPlaceholder({
  shortName,
  index,
}: {
  shortName: string;
  index: number;
}) {
  const gradient = logoGradients[index % logoGradients.length];
  return (
    <div
      className="service-card-logo"
      style={{
        width: 56,
        height: 56,
        borderRadius: 12,
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }}
      aria-hidden="true"
    >
      <span
        style={{
          color: "#fff",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "0.04em",
          textAlign: "center",
          lineHeight: 1.3,
          padding: "0 6px",
          maxWidth: 48,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 9999,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {level}
    </span>
  );
}

// ─── Info grid cell ───────────────────────────────────────────────────────────

function InfoCell({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#F8FAFD",
        border: "1px solid #DDE5F0",
        borderRadius: 8,
        padding: "6px 8px",
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: "#6B7A99",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      {children ? (
        children
      ) : (
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#1A2B4A",
            lineHeight: 1.3,
          }}
        >
          {value}
        </div>
      )}
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const rank = service.ranks.overall;
  const rankStyle = getRankStyle(rank);
  const isTop = rank === 1;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      style={{
        background: isTop
          ? "linear-gradient(160deg, #FFFFFF 0%, #F0F9FF 60%, #EDFBF5 100%)"
          : "#fff",
        border: isTop ? "2px solid #2AABE2" : "1px solid #DDE5F0",
        borderRadius: 16,
        boxShadow: isTop
          ? "0 8px 32px rgba(42,171,226,0.18), 0 2px 8px rgba(42,171,226,0.10)"
          : "0 4px 20px rgba(42,171,226,0.10)",
        padding: 18,
        position: "relative",
        overflow: "hidden",
      }}
      aria-label={`${service.name} — 総合${rank}位`}
    >
      {/* Top-1 accent stripe */}
      {isTop && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #2AABE2 0%, #3EBF8A 100%)",
            borderRadius: "16px 16px 0 0",
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Card Header ─────────────────────────────────────────────────── */}
      <div
        className="service-card-header"
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
          paddingTop: isTop ? 4 : 0,
        }}
      >
        {/* Rank badge */}
        <div
          className="service-card-rank"
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: rankStyle.bg,
            border: rankStyle.border,
            color: rankStyle.text,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.14)",
          }}
          aria-label={`総合${rankStyle.label}`}
        >
          <span
            style={{
              fontSize: 7,
              fontWeight: 700,
              letterSpacing: "0.06em",
              opacity: 0.88,
              lineHeight: 1,
            }}
          >
            総合
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {rank}
          </span>
          <span
            style={{
              fontSize: 8,
              fontWeight: 700,
              lineHeight: 1,
              opacity: 0.88,
            }}
          >
            位
          </span>
        </div>

        {/* Logo */}
        <LogoPlaceholder shortName={service.shortName} index={index} />

        {/* Name + catchphrase + stars */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
              fontWeight: 800,
              color: "#1A2B4A",
              lineHeight: 1.25,
              marginBottom: 3,
              letterSpacing: "-0.01em",
            }}
          >
            {service.name}
          </h3>
          <p
            style={{
              fontSize: 12,
              color: "#6B7A99",
              lineHeight: 1.4,
              marginBottom: 6,
            }}
          >
            {service.catchphrase}
          </p>
          <StarRating
            rating={service.rating}
            size="md"
            showNumber
            reviewCount={service.reviewCount}
          />
        </div>
      </div>

      {/* ── Card Body — two columns ──────────────────────────────────────── */}
      <div
        className="service-card-body"
        style={{
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        {/* Left column: score bars */}
        <motion.div
          style={{ flex: "1 1 280px", minWidth: 240 }}
          variants={scoreBarsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#1A2B4A",
              letterSpacing: "0.04em",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 3,
                height: 12,
                background: "linear-gradient(180deg, #2AABE2 0%, #3EBF8A 100%)",
                borderRadius: 9999,
                display: "inline-block",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            満足度内訳
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <motion.div variants={scoreBarItem}>
              <ScoreBar
                label="手数料満足度"
                score={service.scores.fee}
                animate
              />
            </motion.div>
            <motion.div variants={scoreBarItem}>
              <ScoreBar
                label="審査スピード"
                score={service.scores.speed}
                animate
              />
            </motion.div>
            <motion.div variants={scoreBarItem}>
              <ScoreBar
                label="サポート対応"
                score={service.scores.support}
                animate
              />
            </motion.div>
            <motion.div variants={scoreBarItem}>
              <ScoreBar
                label="使いやすさ"
                score={service.scores.usability}
                animate
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right column: service info + badges */}
        <div style={{ flex: "0 0 240px", minWidth: 220 }}>
          {/* 2×2 info grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 5,
              marginBottom: 8,
            }}
          >
            <InfoCell label="手数料" value={service.fee} />
            <InfoCell label="入金速度" value={service.paymentSpeed} />
            <InfoCell label="最小金額" value={service.minAmount} />
            <InfoCell label="審査難易度">
              <ScreeningIndicator level={service.screeningLevel} />
            </InfoCell>
          </div>

          {/* Feature badges */}
          {service.badges.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 8,
              }}
            >
              {service.badges.map((b) => (
                <Badge key={b} variant="secondary" size="sm">
                  {b}
                </Badge>
              ))}
            </div>
          )}

          {/* Target tags */}
          {service.targetTags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {service.targetTags.map((t) => (
                <Badge key={t} variant="primary" size="sm">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── こんな方におすすめ ────────────────────────────────────────────── */}
      <div
        style={{
          background: "#E8F6FD",
          border: "1px solid rgba(42,171,226,0.2)",
          borderRadius: 10,
          padding: "8px 12px",
          marginBottom: 10,
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <Lightbulb
          size={15}
          style={{ flexShrink: 0, marginTop: 1, color: "#F5A623" }}
          aria-hidden="true"
        />
        <div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#1A8DC4",
              letterSpacing: "0.06em",
              display: "block",
              marginBottom: 2,
            }}
          >
            こんな方におすすめ
          </span>
          <p
            style={{
              fontSize: 13,
              color: "#1A2B4A",
              lineHeight: 1.5,
              margin: 0,
              fontWeight: 500,
            }}
          >
            {service.recommendFor}
          </p>
        </div>
      </div>

      {/* ── Merits ──────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#1A2B4A",
            letterSpacing: "0.04em",
            marginBottom: 6,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 3,
              height: 12,
              background: "linear-gradient(180deg, #3EBF8A 0%, #2DA374 100%)",
              borderRadius: 9999,
              display: "inline-block",
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          このサービスのポイント
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {service.merits.map((m, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 7,
                fontSize: 12,
                color: "#1A2B4A",
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#E8F8F2",
                  color: "#3EBF8A",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
                aria-hidden="true"
              >
                <Check size={10} strokeWidth={3} />
              </span>
              {m}
            </li>
          ))}
        </ul>
      </div>

      {/* ── CTA Footer ──────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid #DDE5F0",
          paddingTop: 12,
        }}
      >
        <div
          className="service-card-cta"
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          {/* Resource request button — green */}
          <a
            href={service.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "linear-gradient(135deg, #3EBF8A 0%, #2DA374 100%)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "0.6rem 1.25rem",
              borderRadius: 9999,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(62,191,138,0.32)",
              transition: "transform 0.18s, box-shadow 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 24px rgba(62,191,138,0.44)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 4px 16px rgba(62,191,138,0.32)";
            }}
          >
            {/* Document icon */}
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            資料請求（無料）
          </a>

          {/* Official site button — blue */}
          <a
            href={service.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "linear-gradient(135deg, #2AABE2 0%, #1A8DC4 100%)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "0.6rem 1.25rem",
              borderRadius: 9999,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(42,171,226,0.30)",
              transition: "transform 0.18s, box-shadow 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 24px rgba(42,171,226,0.42)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 4px 16px rgba(42,171,226,0.30)";
            }}
          >
            公式サイトを見る
            <svg
              width={15}
              height={15}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <p
          style={{
            fontSize: 11,
            color: "#6B7A99",
            margin: 0,
          }}
        >
          ※外部サイトに遷移します
        </p>
      </div>
    </motion.article>
  );
}

// ─── Main Section Component ───────────────────────────────────────────────────

export default function ServiceCards() {
  const sorted = [...services].sort(
    (a, b) => a.ranks.overall - b.ranks.overall
  );

  return (
    <section
      id="services"
      className="section-bg-pale"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
      aria-label="おすすめサービス詳細"
    >
      <SectionDecorations variant="c" />
      <div
        className="mx-auto px-4 sm:px-6"
        style={{ maxWidth: 1160, position: "relative", zIndex: 1 }}
      >
        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          {/* Label chip */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#E8F6FD",
              color: "#2AABE2",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "5px 14px",
              borderRadius: 9999,
              border: "1px solid rgba(42,171,226,0.25)",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#2AABE2",
                display: "inline-block",
              }}
              aria-hidden="true"
            />
            サービス詳細比較
          </div>

          {/* H2 */}
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 800,
              color: "#1A2B4A",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              margin: "0 0 0.75rem",
            }}
          >
            おすすめ請求書カード払いサービス
            <br />
            詳細比較
          </h2>

        </motion.div>

        {/* ── Service cards ────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {sorted.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* ── Affiliate disclosure ─────────────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid #DDE5F0",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "#6B7A99",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 640,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            ※当サイトのリンクにはアフィリエイト広告が含まれる場合があります。掲載内容は編集部の独自調査に基づいています。
          </p>
        </div>
      </div>
    </section>
  );
}
