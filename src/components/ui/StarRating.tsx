// ─── Types ───────────────────────────────────────────────────────────────────

type StarSize = "sm" | "md" | "lg";

interface StarRatingProps {
  /** Numeric rating value, 0–5 (supports half-stars, e.g. 4.5) */
  rating: number;
  /** Visual size of each star icon */
  size?: StarSize;
  /** Show the numeric rating value next to the stars */
  showNumber?: boolean;
  /** Show review count as "(XX件)" after the numeric rating */
  reviewCount?: number;
  /** Additional className for the wrapper element */
  className?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SIZE_PX: Record<StarSize, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

const NUMBER_SIZE_CLASS: Record<StarSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const COUNT_SIZE_CLASS: Record<StarSize, string> = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
};

const GAP_CLASS: Record<StarSize, string> = {
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1",
};

const GOLD = "#F59E0B";
const EMPTY_GRAY = "#DDE5F0";

// ─── Sub-components ──────────────────────────────────────────────────────────

/**
 * Full star — entirely filled with gold.
 */
function FullStar({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill={GOLD}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/**
 * Empty star — outlined in light gray.
 */
function EmptyStar({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill={EMPTY_GRAY}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/**
 * Half star — left half gold, right half light gray.
 * Implemented with a clipPath so the path shape is shared.
 */
function HalfStar({ px, id }: { px: number; id: string }) {
  const clipId = `half-clip-${id}`;
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          {/* Clips to the left half of the 24×24 viewBox */}
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>
      {/* Gray full star as base */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={EMPTY_GRAY}
      />
      {/* Gold star clipped to left half */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={GOLD}
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * StarRating — displays a 1–5 star rating with optional numeric label and
 * review count. Supports full, half, and empty star states.
 *
 * @example
 * <StarRating rating={4.5} size="md" showNumber reviewCount={312} />
 */
export default function StarRating({
  rating,
  size = "md",
  showNumber = false,
  reviewCount,
  className = "",
}: StarRatingProps) {
  // Clamp the rating to the valid 0–5 range.
  const clamped = Math.min(5, Math.max(0, rating));
  const px = SIZE_PX[size];

  // Build an array of 5 star descriptors.
  const stars: Array<"full" | "half" | "empty"> = Array.from(
    { length: 5 },
    (_, i) => {
      const threshold = i + 1;
      if (clamped >= threshold) return "full";
      if (clamped >= threshold - 0.5) return "half";
      return "empty";
    }
  );

  // Format the numeric rating to one decimal place, dropping trailing ".0".
  const formattedRating =
    clamped % 1 === 0 ? clamped.toFixed(0) : clamped.toFixed(1);

  return (
    <span
      className={`inline-flex items-center ${GAP_CLASS[size]} ${className}`}
      role="img"
      aria-label={`${formattedRating}点（5点満点）`}
    >
      {/* Stars row */}
      <span className={`inline-flex items-center ${GAP_CLASS[size]}`}>
        {stars.map((type, i) => {
          if (type === "full") return <FullStar key={i} px={px} />;
          if (type === "half")
            return <HalfStar key={i} px={px} id={`${i}`} />;
          return <EmptyStar key={i} px={px} />;
        })}
      </span>

      {/* Numeric rating */}
      {showNumber && (
        <span
          className={`font-bold leading-none ${NUMBER_SIZE_CLASS[size]}`}
          style={{ color: GOLD }}
        >
          {formattedRating}
        </span>
      )}

      {/* Review count */}
      {reviewCount !== undefined && (
        <span
          className={`leading-none ${COUNT_SIZE_CLASS[size]}`}
          style={{ color: "var(--color-gray)" }}
        >
          口コミ {reviewCount.toLocaleString()}件
        </span>
      )}
    </span>
  );
}
