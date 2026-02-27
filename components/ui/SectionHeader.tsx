/**
 * SectionHeader — 4バリエーションのセクションヘッダー
 *
 * - chip: ラベルチップ + H2 (Top3用)
 * - accent-line: 左カラーバー + H2 (RankingTabs用)
 * - icon-badge: アイコン + H2 + 下線装飾 (ServiceCards用)
 */

import React from "react";

type HeaderVariant = "chip" | "accent-line" | "icon-badge";

interface SectionHeaderProps {
  variant?: HeaderVariant;
  chipLabel?: string;
  title: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  variant = "chip",
  chipLabel,
  title,
  subtitle,
  icon,
  className = "",
}: SectionHeaderProps) {
  if (variant === "chip") {
    return (
      <div className={`text-center flex flex-col items-center gap-3.5 ${className}`}>
        {chipLabel && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(42,171,226,0.25)]"
            style={{
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
              fontSize: 12,
              fontWeight: 700,
              padding: "5px 14px",
              letterSpacing: "0.06em",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-primary)" }}
              aria-hidden="true"
            />
            {chipLabel}
          </span>
        )}
        <h2
          className="m-0 leading-tight"
          style={{
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 800,
            color: "var(--color-dark)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="m-0 max-w-[540px]"
            style={{
              fontSize: 15,
              color: "var(--color-gray)",
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  if (variant === "accent-line") {
    return (
      <div className={`text-center mb-10 ${className}`}>
        {chipLabel && (
          <div className="mb-3.5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(42,171,226,0.25)]"
              style={{
                background: "#E8F6FD",
                color: "#2AABE2",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "5px 14px",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "#2AABE2" }}
              />
              {chipLabel}
            </span>
          </div>
        )}
        <h2
          className="mb-3"
          style={{
            fontSize: "clamp(1.4rem, 3.5vw, 1.875rem)",
            fontWeight: 800,
            color: "#1A2B4A",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mx-auto max-w-[540px]"
            style={{
              fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
              color: "#6B7A99",
              lineHeight: 1.7,
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  // icon-badge variant
  return (
    <div className={`text-center mb-12 ${className}`}>
      {chipLabel && (
        <div className="mb-5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(42,171,226,0.25)]"
            style={{
              background: "#E8F6FD",
              color: "#2AABE2",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "5px 14px",
            }}
          >
            {icon && (
              <span className="flex items-center" aria-hidden="true">
                {icon}
              </span>
            )}
            {chipLabel}
          </span>
        </div>
      )}
      <h2
        className="mb-3"
        style={{
          fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
          fontWeight: 800,
          color: "#1A2B4A",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "clamp(0.875rem, 1.8vw, 1rem)",
            color: "#6B7A99",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
      {/* 下線装飾 */}
      <div
        className="mx-auto mt-4"
        style={{
          width: 48,
          height: 3,
          borderRadius: 9999,
          background: "linear-gradient(90deg, #2AABE2, #3EBF8A)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
