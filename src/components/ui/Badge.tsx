import React from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BadgeVariant = "primary" | "secondary" | "gold" | "gray" | "outline";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  /** Visual style of the badge */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Optional icon rendered to the left of the label */
  icon?: React.ReactNode;
  /** Additional Tailwind classes */
  className?: string;
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Style maps
// ---------------------------------------------------------------------------

const variantClasses: Record<BadgeVariant, string> = {
  // 水色 — primary-light bg / primary text
  primary:
    "bg-[#E8F6FD] text-[#2AABE2] border border-transparent",
  // 薄緑 — secondary-light bg / secondary text
  secondary:
    "bg-[#E8F8F2] text-[#3EBF8A] border border-transparent",
  // ゴールド — gold-light bg / amber-600 text
  gold:
    "bg-[#FEF3C7] text-[#D97706] border border-transparent",
  // グレー — slate bg / gray text
  gray:
    "bg-[#F1F5F9] text-[#6B7A99] border border-transparent",
  // アウトライン — transparent bg / gray text / border
  outline:
    "bg-transparent text-[#6B7A99] border border-[#DDE5F0]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-xs gap-1",
  md: "px-3.5 py-1   text-sm gap-1.5",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Badge / tag component used throughout the site for feature labels such as
 * 「即日入金」「オンライン完結」「個人事業主OK」etc.
 *
 * @example
 * <Badge variant="secondary">即日入金</Badge>
 * <Badge variant="primary" size="sm" icon={<CheckIcon />}>オンライン完結</Badge>
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
}) => {
  return (
    <span
      className={[
        // Base
        "inline-flex items-center font-semibold rounded-full leading-none whitespace-nowrap select-none",
        // Variant
        variantClasses[variant],
        // Size
        sizeClasses[size],
        // Consumer overrides
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && (
        <span className="flex-shrink-0 flex items-center" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
