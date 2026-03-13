import { useFormContext, Controller } from "react-hook-form";

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

export default function CheckboxGroup({ name, label, options, required }: CheckboxGroupProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <fieldset style={{ border: "none", padding: 0, margin: "0 0 1.5rem" }}>
      <legend style={{
        fontSize: "0.9375rem", fontWeight: 700, color: "#1A2B4A",
        marginBottom: "0.75rem", display: "block",
      }}>
        {label}
        {required && <span style={{ color: "#EF4444", marginLeft: 4 }}>*</span>}
        <span style={{ fontSize: "0.8125rem", color: "#6B7A99", fontWeight: 400, marginLeft: 8 }}>
          （複数選択可）
        </span>
      </legend>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {options.map((opt) => {
              const checked = (field.value as string[])?.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    border: `1.5px solid ${checked ? "#2AABE2" : "#DDE5F0"}`,
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    background: checked ? "#E8F6FD" : "#fff",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      const current = (field.value as string[]) || [];
                      if (e.target.checked) {
                        field.onChange([...current, opt.value]);
                      } else {
                        field.onChange(current.filter((v: string) => v !== opt.value));
                      }
                    }}
                    style={{
                      width: 18, height: 18,
                      accentColor: "#2AABE2",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: "0.9375rem", color: "#1A2B4A" }}>{opt.label}</span>
                </label>
              );
            })}
          </div>
        )}
      />
      {error && (
        <p style={{ color: "#EF4444", fontSize: "0.8125rem", marginTop: "0.5rem" }}>
          {error.message as string}
        </p>
      )}
    </fieldset>
  );
}
