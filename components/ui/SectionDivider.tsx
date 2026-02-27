/**
 * SectionDivider — セクション間のSVGウェーブ/カーブ/スラント区切り
 */

type DividerVariant = "wave" | "curve" | "slant";

interface SectionDividerProps {
  variant?: DividerVariant;
  colorTop?: string;
  colorBottom?: string;
  flip?: boolean;
}

export default function SectionDivider({
  variant = "wave",
  colorTop = "#FFFFFF",
  colorBottom = "#F0F9FF",
  flip = false,
}: SectionDividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        marginTop: -1,
        marginBottom: -1,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        style={{ height: "clamp(40px, 5vw, 80px)" }}
        preserveAspectRatio="none"
      >
        {/* Background fill = top color */}
        <rect width="1440" height="80" fill={colorTop} />

        {/* Shape fill = bottom color */}
        {variant === "wave" && (
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill={colorBottom}
          />
        )}
        {variant === "curve" && (
          <path
            d="M0 60Q360 0 720 40Q1080 80 1440 20V80H0V60Z"
            fill={colorBottom}
          />
        )}
        {variant === "slant" && (
          <path
            d="M0 60L1440 20V80H0V60Z"
            fill={colorBottom}
          />
        )}
      </svg>
    </div>
  );
}
