import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import ReviewWizard from "@/components/review/ReviewWizard";

export default function ReviewPage() {
  usePageMeta(
    "口コミを投稿する | 請求書カード払いナビ",
    "請求書カード払いサービスの口コミアンケートフォーム。実際の利用体験を共有して、これから検討する方の参考にしていただけます。"
  );

  return (
    <div style={{ background: "#F0F9FF", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Breadcrumb */}
        <nav
          aria-label="パンくずリスト"
          style={{
            display: "flex", alignItems: "center", gap: "0.375rem",
            fontSize: "0.8125rem", color: "#6B7A99", marginBottom: "1.5rem",
          }}
        >
          <Link to="/" style={{ color: "#2AABE2", textDecoration: "none" }}>ホーム</Link>
          <span style={{ color: "#B8C4D8" }}>&gt;</span>
          <span style={{ color: "#6B7A99" }}>口コミを投稿する</span>
        </nav>

        {/* Hero */}
        <section style={{
          background: "linear-gradient(160deg, #E8F6FD 0%, #EDFBF5 50%, #F0F9FF 100%)",
          borderRadius: "16px", padding: "2.5rem 2rem", textAlign: "center",
          marginBottom: "2rem", border: "1px solid #DDE5F0",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "240px", height: "240px", borderRadius: "50%",
            background: "rgba(42,171,226,0.07)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-40px", left: "-40px",
            width: "160px", height: "160px", borderRadius: "50%",
            background: "rgba(62,191,138,0.07)", pointerEvents: "none",
          }} />
          <span style={{
            display: "inline-block", fontSize: "0.75rem", fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "#2AABE2",
            background: "#fff", padding: "0.25rem 1rem", borderRadius: "9999px",
            marginBottom: "1rem", boxShadow: "0 1px 4px rgba(42,171,226,0.12)",
            position: "relative", zIndex: 1,
          }}>
            Review
          </span>
          <h1 style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, color: "#1A2B4A",
            marginBottom: "0.75rem", lineHeight: 1.3, position: "relative", zIndex: 1,
          }}>
            口コミアンケート
          </h1>
          <p style={{
            fontSize: "0.9375rem", color: "#6B7A99", lineHeight: 1.75,
            maxWidth: "520px", margin: "0 auto", position: "relative", zIndex: 1,
          }}>
            請求書カード払いサービスのご利用体験をお聞かせください。<br />
            所要時間は約5〜10分です。
          </p>
        </section>

        {/* Form card */}
        <div style={{
          background: "#fff", borderRadius: "1rem",
          border: "1px solid #DDE5F0",
          boxShadow: "0 2px 12px rgba(42,171,226,0.10)",
          padding: "2rem",
        }}>
          <ReviewWizard />
        </div>
      </div>
    </div>
  );
}
