import React from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CTAButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type CTAButtonSize = "sm" | "md" | "lg";

interface CTAButtonBase {
  /** Visual style */
  variant?: CTAButtonVariant;
  /** Size */
  size?: CTAButtonSize;
  /** Stretch to fill parent width */
  fullWidth?: boolean;
  /** Optional icon rendered to the right of the label (overrides default arrow) */
  icon?: React.ReactNode;
  /** Shows a loading spinner and disables interaction */
  loading?: boolean;
  /** Additional Tailwind classes */
  className?: string;
  children: React.ReactNode;
}

// When `href` is provided the component renders as <a>, otherwise <button>.
type CTAButtonAsAnchor = CTAButtonBase & {
  href: string;
  target?: string;
  rel?: string;
  // button-only props are not accepted
  type?: never;
  disabled?: never;
  onClick?: never;
};

type CTAButtonAsButton = CTAButtonBase & {
  href?: never;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type CTAButtonProps = CTAButtonAsAnchor | CTAButtonAsButton;

// ---------------------------------------------------------------------------
// Style maps
// ---------------------------------------------------------------------------

const variantBase: Record<CTAButtonVariant, string> = {
  primary:
    "bg-[#2AABE2] text-white shadow-sm " +
    "hover:bg-[#1A8DC4] active:bg-[#1A8DC4] " +
    "focus-visible:ring-2 focus-visible:ring-[#2AABE2] focus-visible:ring-offset-2",
  secondary:
    "bg-[#3EBF8A] text-white shadow-sm " +
    "hover:bg-[#2DA374] active:bg-[#2DA374] " +
    "focus-visible:ring-2 focus-visible:ring-[#3EBF8A] focus-visible:ring-offset-2",
  outline:
    "bg-transparent text-[#2AABE2] border border-[#2AABE2] " +
    "hover:bg-[#E8F6FD] active:bg-[#E8F6FD] " +
    "focus-visible:ring-2 focus-visible:ring-[#2AABE2] focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-[#2AABE2] " +
    "hover:text-[#1A8DC4] active:text-[#1A8DC4] " +
    "focus-visible:ring-2 focus-visible:ring-[#2AABE2] focus-visible:ring-offset-2",
};

const sizeClasses: Record<CTAButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg font-bold gap-2.5",
};

// Show the default right-arrow for filled variants; ghost/outline use a
// subtler chevron. Only rendered when no custom `icon` is passed.
const showDefaultArrow: Record<CTAButtonVariant, boolean> = {
  primary: true,
  secondary: true,
  outline: false,
  ghost: false,
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Default right-pointing arrow icon (SVG, inline) */
const ArrowIcon: React.FC<{ size: CTAButtonSize }> = ({ size }) => {
  const dim = size === "sm" ? 14 : size === "md" ? 16 : 20;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
};

/** Animated loading spinner (SVG, inline) */
const Spinner: React.FC<{ size: CTAButtonSize }> = ({ size }) => {
  const dim = size === "sm" ? 14 : size === "md" ? 16 : 20;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden="true"
      className="flex-shrink-0 animate-spin"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * High-quality CTA button / link component.
 *
 * Renders as an `<a>` tag when `href` is provided, otherwise as `<button>`.
 *
 * @example
 * <CTAButton variant="primary" size="lg" href="https://example.com">
 *   公式サイトを見る
 * </CTAButton>
 *
 * <CTAButton variant="secondary" size="md" onClick={handleClick}>
 *   資料請求（無料）
 * </CTAButton>
 *
 * <CTAButton variant="outline" size="sm" loading>
 *   送信中...
 * </CTAButton>
 */
export const CTAButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  CTAButtonProps
>(function CTAButton(props, ref) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    icon,
    loading = false,
    className = "",
    children,
    ...rest
  } = props;

  // Determine which trailing icon to show
  const trailingIcon = loading ? (
    <Spinner size={size} />
  ) : icon !== undefined ? (
    // Custom icon supplied by consumer
    <span className="flex-shrink-0 flex items-center" aria-hidden="true">
      {icon}
    </span>
  ) : showDefaultArrow[variant] ? (
    <ArrowIcon size={size} />
  ) : null;

  const composedClass = [
    // Base
    "inline-flex items-center justify-center font-semibold rounded-full",
    "transition-all duration-200 ease-in-out",
    "cursor-pointer outline-none select-none",
    // Variant
    variantBase[variant],
    // Size
    sizeClasses[size],
    // Width
    fullWidth ? "w-full" : "",
    // Disabled / loading state
    loading || (rest as CTAButtonAsButton).disabled
      ? "opacity-60 pointer-events-none"
      : "",
    // Consumer overrides
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // --- Render as <a> ---
  if ("href" in rest && rest.href !== undefined) {
    const { href, target, rel, ...anchorRest } = rest as CTAButtonAsAnchor;
    // Ensure safe defaults for external links
    const resolvedRel =
      rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={resolvedRel}
        className={composedClass}
        {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <span>{children}</span>
        {trailingIcon}
      </a>
    );
  }

  // --- Render as <button> ---
  const { type = "button", disabled, onClick, ...buttonRest } =
    rest as CTAButtonAsButton;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={composedClass}
      {...(buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
});

CTAButton.displayName = "CTAButton";

export default CTAButton;
