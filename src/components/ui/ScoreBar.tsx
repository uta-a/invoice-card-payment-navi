import React, { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ScoreBarProps {
  /** Label displayed to the left of the bar */
  label: string;
  /** Score value, 0–5 */
  score: number;
  /** Maximum possible score (default: 5) */
  maxScore?: number;
  /**
   * When true the bar animates its fill on mount / when scrolled into view.
   * When false the bar renders at full width immediately.
   * Defaults to true.
   */
  animate?: boolean;
  /** Additional className applied to the outermost wrapper */
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns a Tailwind text-color class that reflects how good the score is:
 *   ≥ 4.5  → gold
 *   ≥ 3.5  → primary blue
 *   < 3.5  → gray
 */
function scoreColorStyle(score: number, maxScore: number): React.CSSProperties {
  const ratio = score / maxScore;
  if (ratio >= 0.9) return { color: "#F59E0B" }; // gold
  if (ratio >= 0.7) return { color: "var(--color-primary)" }; // blue
  return { color: "var(--color-gray)" };
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ScoreBar — an animated horizontal bar that represents a satisfaction score.
 *
 * The bar fills from left to right when the element enters the viewport
 * (Intersection Observer). Animation can be disabled via the `animate` prop.
 *
 * @example
 * <ScoreBar label="手数料満足度" score={4.5} />
 * <ScoreBar label="審査スピード"  score={4.2} animate={false} />
 */
export default function ScoreBar({
  label,
  score,
  maxScore = 5,
  animate = true,
  className = "",
}: ScoreBarProps) {
  // Clamp score to [0, maxScore].
  const clamped = Math.min(maxScore, Math.max(0, score));
  const targetPct = (clamped / maxScore) * 100;

  // `triggered` flips to true once the bar enters the viewport.
  const [triggered, setTriggered] = useState(!animate);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ── Intersection Observer ──────────────────────────────────────────────────
  useEffect(() => {
    // If animation is disabled we're already in the "triggered" state.
    if (!animate) return;

    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTriggered(true);
          // Stop observing once triggered — we only animate once.
          observer.disconnect();
        }
      },
      {
        // Start animation when at least 20% of the element is visible.
        threshold: 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  // ── Derived display values ─────────────────────────────────────────────────
  const formattedScore =
    clamped % 1 === 0 ? clamped.toFixed(1) : clamped.toFixed(1);

  // The CSS custom property tells the @keyframes animation its target width.
  const fillStyle: React.CSSProperties = {
    "--target-width": `${targetPct}%`,
    width: triggered ? `${targetPct}%` : "0%",
    // When animation is running, use the CSS keyframe; otherwise instant.
    ...(triggered && animate
      ? { animation: "scoreBarFill 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards" }
      : {}),
  } as React.CSSProperties;

  return (
    <div
      ref={wrapperRef}
      className={`flex items-center gap-3 w-full ${className}`}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={maxScore}
      aria-label={`${label}: ${formattedScore} / ${maxScore}`}
    >
      {/* ── Label ──────────────────────────────────────────────────────── */}
      <span
        className="shrink-0 text-sm font-medium leading-none"
        style={{
          color: "var(--color-dark)",
          width: "7.5rem", // fixed width keeps bars aligned in a list
        }}
      >
        {label}
      </span>

      {/* ── Track + Fill ───────────────────────────────────────────────── */}
      <div
        className="flex-1 relative h-2.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--color-border)" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            backgroundColor: "var(--color-primary)",
            // Gradient overlay for a polished look.
            background:
              "linear-gradient(90deg, var(--color-primary) 0%, #1A8DC4 100%)",
            ...fillStyle,
          }}
        />
      </div>

      {/* ── Numeric score ──────────────────────────────────────────────── */}
      <span
        className="shrink-0 text-sm font-bold leading-none tabular-nums"
        style={scoreColorStyle(clamped, maxScore)}
      >
        {formattedScore}
      </span>
    </div>
  );
}
