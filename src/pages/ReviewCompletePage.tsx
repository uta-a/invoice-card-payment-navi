import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import CTAButton from "@/components/ui/CTAButton";

export default function ReviewCompletePage() {
  usePageMeta(
    "送信完了 | 請求書カード払いナビ",
    "口コミアンケートの送信が完了しました。"
  );

  return (
    <div style={{ background: "#F0F9FF", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 1.5rem" }}>
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
          <Link to="/review" style={{ color: "#2AABE2", textDecoration: "none" }}>口コミを投稿する</Link>
          <span style={{ color: "#B8C4D8" }}>&gt;</span>
          <span style={{ color: "#6B7A99" }}>送信完了</span>
        </nav>

        {/* Success card */}
        <div style={{
          background: "#fff", borderRadius: "1rem",
          border: "1px solid #DDE5F0",
          boxShadow: "0 2px 12px rgba(42,171,226,0.10)",
          padding: "3rem 2rem", textAlign: "center",
        }}>
          {/* Check icon */}
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, #3EBF8A, #2DA374)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 4px 16px rgba(62,191,138,0.30)",
          }}>
            <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 style={{
            fontSize: "1.75rem", fontWeight: 700, color: "#1A2B4A",
            marginBottom: "1rem",
          }}>
            送信が完了しました
          </h1>

          <p style={{
            fontSize: "1rem", color: "#6B7A99", lineHeight: 1.75,
            marginBottom: "2rem",
          }}>
            口コミアンケートにご協力いただき、ありがとうございます。<br />
            お寄せいただいた貴重なご意見は、サービス比較情報の<br />
            充実に活用させていただきます。
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <CTAButton variant="primary" size="md" href="/">
              トップページに戻る
            </CTAButton>
            <CTAButton variant="outline" size="md" href="/articles">
              記事一覧を見る
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
