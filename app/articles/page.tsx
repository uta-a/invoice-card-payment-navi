import type { Metadata } from "next";
import Link from "next/link";
import ArticlesContent from "@/components/articles/ArticlesContent";

// ============================================================
// Metadata
// ============================================================
export const metadata: Metadata = {
  title: "記事一覧 | 請求書カード払いナビ",
  description:
    "請求書カード払いに関する解説記事・比較ガイドを一覧でご覧いただけます。初めての方から上級者まで役立つ情報を専門家監修のもと提供しています。",
};

// ============================================================
// Sub-components
// ============================================================

function PageHero() {
  return (
    <section
      style={{
        background: "linear-gradient(160deg, #E8F6FD 0%, #EDFBF5 50%, #F0F9FF 100%)",
        borderRadius: "16px",
        padding: "3rem 2rem",
        textAlign: "center",
        marginBottom: "3rem",
        border: "1px solid #DDE5F0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "rgba(42,171,226,0.07)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "rgba(62,191,138,0.07)",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          display: "inline-block",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#2AABE2",
          background: "#fff",
          padding: "0.25rem 1rem",
          borderRadius: "9999px",
          marginBottom: "1rem",
          boxShadow: "0 1px 4px rgba(42,171,226,0.12)",
          position: "relative",
          zIndex: 1,
        }}
      >
        Articles
      </span>
      <h1
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
          fontWeight: 700,
          color: "#1A2B4A",
          marginBottom: "0.75rem",
          lineHeight: 1.3,
          position: "relative",
          zIndex: 1,
        }}
      >
        記事一覧
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#6B7A99",
          lineHeight: 1.75,
          maxWidth: "520px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        請求書カード払いの仕組みや選び方、資金繰り改善のヒントを<br className="hidden md:block" />
        専門家監修のもとわかりやすく解説します。
      </p>
    </section>
  );
}

function SidebarCTA() {
  return (
    <aside
      style={{
        background: "linear-gradient(135deg, #2AABE2 0%, #1A8DC4 60%, #3EBF8A 100%)",
        borderRadius: "14px",
        padding: "2rem 1.5rem",
        textAlign: "center",
        marginTop: "3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "-30px",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "0.625rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        気になるサービスを<br />比較してみよう
      </p>
      <p
        style={{
          fontSize: "0.9375rem",
          color: "rgba(255,255,255,0.85)",
          marginBottom: "1.5rem",
          lineHeight: 1.65,
          position: "relative",
          zIndex: 1,
        }}
      >
        手数料・入金速度・審査のしやすさを<br />一覧で無料比較できます
      </p>
      <Link
        href="/#ranking"
        style={{
          display: "inline-block",
          background: "#fff",
          color: "#2AABE2",
          fontWeight: 700,
          fontSize: "0.9375rem",
          borderRadius: "9999px",
          padding: "0.875rem 2.25rem",
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          position: "relative",
          zIndex: 1,
        }}
      >
        無料でサービスを比較する →
      </Link>
    </aside>
  );
}

// ============================================================
// Page
// ============================================================
export default function ArticlesPage() {
  return (
    <div
      style={{
        background: "#F0F9FF",
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Breadcrumb */}
        <nav
          aria-label="パンくずリスト"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.8125rem",
            color: "#6B7A99",
            marginBottom: "1.5rem",
          }}
        >
          <Link href="/" style={{ color: "#2AABE2", textDecoration: "none" }}>
            ホーム
          </Link>
          <span style={{ color: "#B8C4D8" }}>&gt;</span>
          <span style={{ color: "#6B7A99" }}>記事一覧</span>
        </nav>

        {/* Hero */}
        <PageHero />

        {/* Interactive content: filter + grid + pagination */}
        <ArticlesContent />

        {/* CTA banner */}
        <SidebarCTA />
      </div>
    </div>
  );
}
