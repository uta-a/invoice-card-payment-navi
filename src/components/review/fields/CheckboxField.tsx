import { useFormContext, Controller } from "react-hook-form";
import type { ReactNode } from "react";

interface CheckboxFieldProps {
  name: string;
  label: ReactNode;
  required?: boolean;
}

export default function CheckboxField({ name, label, required }: CheckboxFieldProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <label style={{
            display: "flex", alignItems: "flex-start", gap: "0.75rem",
            padding: "0.75rem 1rem",
            border: `1.5px solid ${error ? "#EF4444" : "#DDE5F0"}`,
            borderRadius: "0.75rem",
            cursor: "pointer",
            background: field.value ? "#E8F6FD" : "#fff",
            transition: "all 0.15s",
          }}>
            <input
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              style={{
                width: 18, height: 18,
                accentColor: "#2AABE2",
                cursor: "pointer",
                flexShrink: 0,
                marginTop: 2,
              }}
            />
            <span style={{ fontSize: "0.875rem", color: "#1A2B4A", lineHeight: 1.6 }}>
              {label}
              {required && <span style={{ color: "#EF4444", marginLeft: 4 }}>*</span>}
            </span>
          </label>
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
