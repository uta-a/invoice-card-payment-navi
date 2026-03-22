import { useFormContext } from "react-hook-form";

interface RadioGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

export default function RadioGroup({ name, label, options, required }: RadioGroupProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <fieldset data-field={name} style={{ border: "none", padding: 0, margin: "0 0 1.5rem" }}>
      <legend style={{
        fontSize: "0.9375rem", fontWeight: 700, color: "#1A2B4A",
        marginBottom: "0.75rem", display: "block",
      }}>
        {label}
        {required && <span style={{ color: "#EF4444", marginLeft: 4 }}>*</span>}
      </legend>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {options.map((opt) => (
          <label
            key={opt.value}
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.75rem 1rem",
              border: "1.5px solid #DDE5F0",
              borderRadius: "0.75rem",
              cursor: "pointer",
              transition: "all 0.15s",
              background: "#fff",
            }}
            className="radio-option"
          >
            <input
              type="radio"
              value={opt.value}
              {...register(name)}
              style={{
                width: 18, height: 18,
                accentColor: "#2AABE2",
                cursor: "pointer",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "0.9375rem", color: "#1A2B4A" }}>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p style={{ color: "#EF4444", fontSize: "0.8125rem", marginTop: "0.5rem" }}>
          {error.message as string}
        </p>
      )}
    </fieldset>
  );
}
