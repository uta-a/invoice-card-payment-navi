import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";

import { getTop3Services, Service } from "@/data/services";
import SectionDecorations from "@/components/ui/SectionDecorations";

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

// Logo placeholder gradient palettes per rank
const LOGO_GRADIENTS = [
  "linear-gradient(135deg, #2AABE2 0%, #1A8DC4 100%)",
  "linear-gradient(135deg, #3EBF8A 0%, #2DA374 100%)",
  "linear-gradient(135deg, #6B7A99 0%, #3A4D6A 100%)",
] as const;

// ─── Animation Variants ──────────────────────────────────────────────────────

// Cubic-bezier cast to satisfy Framer Motion's Easing type
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
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

/** Yen / fee icon */
function FeeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

/** Lightning / speed icon */
function LightningIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

/** Check / screening icon */
function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/** Editorial pick crown icon */
function CrownIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          color: iconColor,
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
        }}
      >
        {icon}
        <span>{label}</span>
      </div>
      <div
        style={{
          fontSize: "15px",
          fontWeight: 800,
          color: "var(--color-dark)",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {value}
      </div>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const meta = RANK_META[index];
  const logoGradient = LOGO_GRADIENTS[index];
  const isFirst = index === 0;

  const [hovered, setHovered] = React.useState(false);

  // Card base styles
  const cardStyle: React.CSSProperties = {
    position: "relative",
    flex: isFirst ? "1.04" : "1",
    backgroundColor: "#ffffff",
    border: isFirst
      ? "2px solid rgba(42, 171, 226, 0.45)"
      : "1.5px solid #CDD8E8",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    cursor: "default",
    transition: "box-shadow 0.25s ease, transform 0.25s ease",
    boxShadow: hovered
      ? isFirst
        ? "0 12px 40px rgba(42,171,226,0.28), 0 4px 16px rgba(42,171,226,0.18)"
        : "0 8px 28px rgba(42,171,226,0.22), 0 2px 10px rgba(42,171,226,0.14)"
      : isFirst
      ? "0 6px 28px rgba(42,171,226,0.22), 0 2px 10px rgba(42,171,226,0.12)"
      : "0 4px 20px rgba(26,43,74,0.10), 0 1px 6px rgba(26,43,74,0.06)",
    transform: hovered
      ? isFirst
        ? "scale(1.02) translateY(-4px)"
        : "translateY(-4px)"
      : isFirst
      ? "scale(1.02)"
      : "scale(1)",
    // Subtle gradient bg for 1st card
    background: isFirst
      ? "linear-gradient(160deg, #ffffff 70%, #e8f6fd 100%)"
      : "#ffffff",
  };

  return (
    <motion.div
      variants={cardVariants}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Editorial badge — 1位 only */}
      {isFirst && (
        <div
          style={{
            position: "absolute",
            top: "-13px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: 700,
            padding: "4px 14px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            boxShadow: "0 2px 8px rgba(245,158,11,0.40)",
            letterSpacing: "0.04em",
          }}
        >
          <CrownIcon />
          編集部のイチオシ
        </div>
      )}

      {/* Card top: rank badge + logo + name + rating */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        {/* Rank badge */}
        <div
          style={{
            flexShrink: 0,
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: meta.gradient,
            boxShadow: `0 3px 10px ${meta.shadowColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
          aria-label={`総合${meta.label}`}
        >
          {meta.label}
        </div>

        {/* Logo placeholder */}
        <div
          style={{
            flexShrink: 0,
            width: "60px",
            height: "60px",
            borderRadius: "12px",
            background: logoGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.3,
            letterSpacing: "0.02em",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
          aria-label={`${service.name} ロゴ`}
        >
          {service.shortName}
        </div>

        {/* Name + rating */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: isFirst ? "17px" : "16px",
              fontWeight: 800,
              color: "var(--color-dark)",
              lineHeight: 1.3,
              wordBreak: "break-word",
            }}
          >
            {service.name}
          </h3>
          <StarRating
            rating={service.rating}
            size="md"
            showNumber
            reviewCount={service.reviewCount}
          />
        </div>
      </div>

      {/* 3-metric summary row */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          backgroundColor: "var(--color-bg)",
          borderRadius: "10px",
          padding: "12px 8px",
          gap: "0",
        }}
      >
        <MetricItem
          icon={<FeeIcon />}
          label="手数料"
          value={service.fee}
          iconColor="var(--color-primary)"
        />
        <div
          style={{
            width: "1px",
            backgroundColor: "var(--color-border)",
            alignSelf: "stretch",
            margin: "0 4px",
          }}
          aria-hidden="true"
        />
        <MetricItem
          icon={<LightningIcon />}
          label="入金速度"
          value={service.paymentSpeed}
          iconColor="var(--color-secondary)"
        />
        <div
          style={{
            width: "1px",
            backgroundColor: "var(--color-border)",
            alignSelf: "stretch",
            margin: "0 4px",
          }}
          aria-hidden="true"
        />
        <MetricItem
          icon={<CheckIcon />}
          label="審査"
          value={service.screeningLevel}
          iconColor="var(--color-gold)"
        />
      </div>

      {/* Badge list */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        {service.badges.map((badge, i) => (
          <Badge key={badge} variant={i === 0 ? "secondary" : "primary"} size="sm">
            {badge}
          </Badge>
        ))}
      </div>

      {/* CTA buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "auto",
          paddingTop: "4px",
        }}
      >
        {/* Green: 無料で資料請求する */}
        <a
          href={service.resourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            padding: "10px 24px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #3EBF8A 0%, #2DA374 100%)",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 700,
            textDecoration: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(62,191,138,0.32)",
            transition: "transform 0.18s, box-shadow 0.18s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow = "0 8px 24px rgba(62,191,138,0.44)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "0 4px 16px rgba(62,191,138,0.32)";
          }}
        >
          <svg
            width={15}
            height={15}
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
        {/* White: 公式サイトを見る */}
        <a
          href={service.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            padding: "10px 24px",
            borderRadius: "999px",
            border: "1.5px solid #DDE5F0",
            backgroundColor: "#ffffff",
            color: "#1A2B4A",
            fontSize: "15px",
            fontWeight: 600,
            textDecoration: "none",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(26,43,74,0.08)",
            transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.backgroundColor = "#F0F9FF";
            el.style.boxShadow = "0 4px 16px rgba(42,171,226,0.15)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.backgroundColor = "#ffffff";
            el.style.boxShadow = "0 2px 8px rgba(26,43,74,0.08)";
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
      className="section-bg-pale"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <SectionDecorations variant="a" />
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Section Header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            textAlign: "center",
            marginBottom: "52px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {/* H2 */}
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 800,
              color: "var(--color-dark)",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            おすすめ請求書カード払いサービス{" "}
            <span style={{ color: "var(--color-primary)" }}>3選</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              color: "var(--color-gray)",
              lineHeight: 1.7,
              maxWidth: "540px",
            }}
          >
            手数料・審査・入金速度を総合評価した上位3社をご紹介します
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="top3-cards"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {top3.map((service: Service, index: number) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: "center",
            marginTop: "32px",
            fontSize: "12px",
            color: "var(--color-gray)",
            lineHeight: 1.7,
          }}
        >
          ※ 掲載情報は調査時点のものです。最新情報は各公式サイトにてご確認ください。
        </motion.p>
      </div>

      {/* Responsive styles now handled by .top3-cards in globals.css */}
    </section>
  );
}
