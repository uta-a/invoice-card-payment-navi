import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { useEffect, useRef, useState } from "react";
import { Building2, Users, BarChart2, CalendarCheck } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TrustStat {
  icon: React.ElementType;
  value: string;         // Display string (may contain non-numeric parts like "万件以上")
  numericPart: string;   // The animated number part e.g. "XX"
  suffix: string;        // Static suffix e.g. "万件以上"
  label: string;
  color: string;
  bgColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: TrustStat[] = [
  {
    icon: Building2,
    value: "XXXX",
    numericPart: "XXXX",
    suffix: "社",
    label: "掲載サービス数",
    color: "#2AABE2",
    bgColor: "#E8F6FD",
  },
  {
    icon: BarChart2,
    value: "XXXX",
    numericPart: "XXXX",
    suffix: "万件以上",
    label: "累計比較件数",
    color: "#3EBF8A",
    bgColor: "#E8F8F2",
  },
  {
    icon: Users,
    value: "XXXX",
    numericPart: "XXXX",
    suffix: "名",
    label: "専門家監修済",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
  },
  {
    icon: CalendarCheck,
    value: "XXXX年XXXX月",
    numericPart: "XXXX",
    suffix: "年XXXX月",
    label: "最終更新",
    color: "#6B7A99",
    bgColor: "#F1F5F9",
  },
];

// ─── Individual stat item ─────────────────────────────────────────────────────

function StatItem({ stat, index, inView }: { stat: TrustStat; index: number; inView: boolean }) {
  const { icon: Icon, numericPart, suffix, label, color, bgColor } = stat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.1 }}
      className="trustbar-item"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "16px 18px",
        borderRadius: 14,
        background: "#fff",
        border: `2px solid ${bgColor}`,
        boxShadow: "0 2px 12px rgba(42,171,226,0.08)",
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Icon container */}
      <div style={{
        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
        background: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={24} color={color} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: 900,
          color,
          lineHeight: 1.1,
          whiteSpace: "nowrap",
          marginBottom: 3,
        }}>
          {numericPart}
          <span style={{ fontSize: "0.65em", fontWeight: 700, color: "#3A4D6A", marginLeft: 1 }}>
            {suffix}
          </span>
        </div>
        <div style={{
          fontSize: 11,
          color: "#6B7A99",
          fontWeight: 600,
          letterSpacing: "0.03em",
          whiteSpace: "nowrap",
        }}>
          {label}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main TrustBar ─────────────────────────────────────────────────────────────

export default function TrustBar() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="サイト実績"
      className="section-bg-white"
      style={{
        borderBottom: "1px solid #DDE5F0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)",
        boxShadow: "0 4px 24px rgba(42,171,226,0.10)",
        padding: "1.25rem 0",
      }}
    >
      <div
        className="mx-auto px-4 sm:px-6"
        style={{ maxWidth: 1160 }}
      >
        {/* Desktop: single row with dividers */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 12 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: "contents" }}>
              <StatItem stat={stat} index={i} inView={inView} />
              {i < stats.length - 1 && (
                <div style={{ width: 1, height: 48, background: "#DDE5F0", flexShrink: 0 }} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div
          className="grid md:hidden trustbar-mobile"
          style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
