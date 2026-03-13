import { useFormContext } from "react-hook-form";

interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export default function SelectField({ name, label, options, placeholder, required }: SelectFieldProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        htmlFor={name}
        style={{
          display: "block", fontSize: "0.9375rem", fontWeight: 700,
          color: "#1A2B4A", marginBottom: "0.5rem",
        }}
      >
        {label}
        {required && <span style={{ color: "#EF4444", marginLeft: 4 }}>*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        style={{
          width: "100%", padding: "0.75rem 1rem",
          border: `1.5px solid ${error ? "#EF4444" : "#DDE5F0"}`,
          borderRadius: "0.75rem",
          fontSize: "0.9375rem",
          color: "#1A2B4A",
          background: "#fff",
          cursor: "pointer",
          outline: "none",
          transition: "border-color 0.2s",
          appearance: "auto",
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && (
        <p style={{ color: "#EF4444", fontSize: "0.8125rem", marginTop: "0.5rem" }}>
          {error.message as string}
        </p>
      )}
    </div>
  );
}
