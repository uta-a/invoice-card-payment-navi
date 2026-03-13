import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface StarRatingInputProps {
  name: string;
  label: string;
  required?: boolean;
}

const STAR_PATH = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";
const GOLD = "#F59E0B";
const EMPTY = "#DDE5F0";
const SIZE = 28;

export default function StarRatingInput({ name, label, required }: StarRatingInputProps) {
  const { control, formState: { errors } } = useFormContext();
  const [hovered, setHovered] = useState<number>(0);
  const error = errors[name];

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{
        display: "block", fontSize: "0.9375rem", fontWeight: 700,
        color: "#1A2B4A", marginBottom: "0.5rem",
      }}>
        {label}
        {required && <span style={{ color: "#EF4444", marginLeft: 4 }}>*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            style={{ display: "inline-flex", gap: 4, cursor: "pointer" }}
            onMouseLeave={() => setHovered(0)}
            role="radiogroup"
            aria-label={label}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const active = hovered || (field.value as number) || 0;
              const filled = star <= active;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => field.onChange(star)}
                  onMouseEnter={() => setHovered(star)}
                  style={{
                    background: "none", border: "none", padding: 2,
                    cursor: "pointer", display: "flex",
                    transition: "transform 0.1s",
                    transform: hovered === star ? "scale(1.15)" : "scale(1)",
                  }}
                  aria-label={`${star}点`}
                >
                  <svg width={SIZE} height={SIZE} viewBox="0 0 24 24" fill={filled ? GOLD : EMPTY} xmlns="http://www.w3.org/2000/svg">
                    <path d={STAR_PATH} />
                  </svg>
                </button>
              );
            })}
            {(field.value as number) > 0 && (
              <span style={{
                fontSize: "1rem", fontWeight: 700, color: GOLD,
                marginLeft: 8, display: "flex", alignItems: "center",
              }}>
                {field.value as number}.0
              </span>
            )}
          </div>
        )}
      />
      {error && (
        <p style={{ color: "#EF4444", fontSize: "0.8125rem", marginTop: "0.25rem" }}>
          {error.message as string}
        </p>
      )}
    </div>
  );
}
