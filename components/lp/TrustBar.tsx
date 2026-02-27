"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { useEffect, useRef, useState } from "react";
import { Building2, Users, BarChart2, CalendarCheck } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TrustStat {
  icon: React.ElementType;
  value: string;
  numericPart: string;
  suffix: string;
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
      className="trustbar-item flex items-center gap-2.5 py-3 px-3.5 rounded-[14px] bg-white border border-[#EEF1F6] flex-1 min-w-0"
    >
      {/* Icon container */}
      <div
        className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
        style={{ background: bgColor }}
      >
        <Icon size={22} color={color} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <div
          className="font-extrabold leading-none whitespace-nowrap mb-0.5"
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            color,
          }}
        >
          {numericPart}
          <span className="text-[0.65em] font-bold text-[#3A4D6A] ml-px">
            {suffix}
          </span>
        </div>
        <div className="text-[11px] text-[#6B7A99] font-semibold tracking-wide whitespace-nowrap">
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
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)",
        boxShadow: "0 4px 24px rgba(42,171,226,0.07)",
        padding: "1.25rem 0",
      }}
    >
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: 1160 }}>
        {/* Desktop: single row with dividers */}
        <div className="hidden md:flex items-center gap-3">
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: "contents" }}>
              <StatItem stat={stat} index={i} inView={inView} />
              {i < stats.length - 1 && (
                <div className="w-px h-12 bg-[#DDE5F0] flex-shrink-0" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: 2x2 grid with horizontal scroll */}
        <div className="grid md:hidden trustbar-mobile" style={{ gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
