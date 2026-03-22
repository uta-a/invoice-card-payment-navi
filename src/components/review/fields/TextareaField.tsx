import { useFormContext } from "react-hook-form";

interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
}

export default function TextareaField({
  name, label, placeholder, required, minLength, maxLength, rows = 5,
}: TextareaFieldProps) {
  const { register, watch, formState: { errors } } = useFormContext();
  const value = watch(name) || "";
  const error = errors[name];

  return (
    <div data-field={name} style={{ marginBottom: "1.5rem" }}>
      <label
        htmlFor={name}
        style={{
          display: "block", fontSize: "0.9375rem", fontWeight: 700,
          color: "#1A2B4A", marginBottom: "0.5rem",
        }}
      >
        {label}
        {required && <span style={{ color: "#EF4444", marginLeft: 4 }}>*</span>}
        {minLength && maxLength && (
          <span style={{ fontSize: "0.8125rem", color: "#6B7A99", fontWeight: 400, marginLeft: 8 }}>
            （{minLength}〜{maxLength}文字）
          </span>
        )}
      </label>
      <textarea
        id={name}
        {...register(name)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%", padding: "0.75rem 1rem",
          border: `1.5px solid ${error ? "#EF4444" : "#DDE5F0"}`,
          borderRadius: "0.75rem",
          fontSize: "0.9375rem",
          color: "#1A2B4A",
          lineHeight: 1.7,
          resize: "vertical",
          outline: "none",
          transition: "border-color 0.2s",
          fontFamily: "inherit",
        }}
      />
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: "0.25rem",
      }}>
        {error ? (
          <p style={{ color: "#EF4444", fontSize: "0.8125rem", margin: 0 }}>
            {error.message as string}
          </p>
        ) : <span />}
        {maxLength && (
          <span style={{
            fontSize: "0.8125rem",
            color: value.length > maxLength ? "#EF4444" : "#6B7A99",
          }}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
