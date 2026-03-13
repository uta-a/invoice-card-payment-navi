const STEP_LABELS = ["基本情報", "サービス評価", "利用体験", "属性情報", "確認・送信"];

interface ProgressBarProps {
  currentStep: number; // 0-indexed
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      {/* Step indicators */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "relative", padding: "0 0.5rem",
      }}>
        {/* Background line */}
        <div style={{
          position: "absolute", top: 14, left: "calc(10% + 14px)", right: "calc(10% + 14px)",
          height: 3, background: "#DDE5F0", zIndex: 0,
        }} />
        {/* Active line */}
        <div style={{
          position: "absolute", top: 14, left: "calc(10% + 14px)",
          height: 3, background: "#2AABE2", zIndex: 1,
          width: `${(currentStep / (STEP_LABELS.length - 1)) * 80}%`,
          transition: "width 0.3s ease",
        }} />

        {STEP_LABELS.map((label, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={label} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              zIndex: 2, flex: 1,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: 700,
                background: isCompleted ? "#2AABE2" : isCurrent ? "#2AABE2" : "#fff",
                color: isCompleted || isCurrent ? "#fff" : "#B8C4D8",
                border: `2px solid ${isCompleted || isCurrent ? "#2AABE2" : "#DDE5F0"}`,
                transition: "all 0.3s ease",
              }}>
                {isCompleted ? (
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span style={{
                fontSize: "0.6875rem", fontWeight: isCurrent ? 700 : 400,
                color: isCurrent ? "#2AABE2" : isCompleted ? "#1A2B4A" : "#B8C4D8",
                marginTop: 6, textAlign: "center", whiteSpace: "nowrap",
              }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
