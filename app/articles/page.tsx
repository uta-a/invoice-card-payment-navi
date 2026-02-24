import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ============================================================
// Metadata
// ============================================================
export const metadata: Metadata = {
  title: "記事一覧 | 請求書カード払いナビ",
  description:
    "請求書カード払いに関する解説記事・比較ガイドを一覧でご覧いただけます。初めての方から上級者まで役立つ情報を専門家監修のもと提供しています。",
};

// ============================================================
// Static data
// ============================================================
type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  date: string;
  readingTime: string;
  gradient: string;
  featured?: boolean;
};

const ARTICLES: Article[] = [
  {
    slug: "what-is-invoice-card-payment",
    title: "請求書カード払いとは？仕組みと選び方を解説",
    excerpt:
      "請求書をクレジットカードで支払う仕組みや、サービス選びのポイントを専門家監修のもとわかりやすく解説します。初めての方はまずこちらをご覧ください。",
    category: "基礎知識",
    categoryColor: "#2AABE2",
    categoryBg: "#E8F6FD",
    date: "2025年11月12日",
    readingTime: "約8分",
    gradient: "linear-gradient(135deg, #2AABE2 0%, #1A8DC4 40%, #3EBF8A 100%)",
    featured: true,
  },
  {
    slug: "fee-comparison-guide",
    title: "手数料の比較ガイド — 安いサービスの選び方",
    excerpt:
      "各社の手数料体系を徹底比較。表面上の手数料だけでなく隠れコストも含めた実質コストの計算方法と、コストを抑えるための選び方のコツを解説します。",
    category: "比較・解説",
    categoryColor: "#3EBF8A",
    categoryBg: "#E8F8F2",
    date: "2025年12月3日",
    readingTime: "約6分",
    gradient: "linear-gradient(135deg, #3EBF8A 0%, #2AABE2 100%)",
  },
  {
    slug: "sole-proprietor-guide",
    title: "個人事業主向け 請求書カード払い完全ガイド",
    excerpt:
      "フリーランス・個人事業主が安心して利用できるサービスを厳選してご紹介。審査基準や必要書類、申請時の注意点まで丁寧に解説します。",
    category: "個人事業主向け",
    categoryColor: "#F59E0B",
    categoryBg: "#FEF3C7",
    date: "2025年12月18日",
    readingTime: "約10分",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
  },
  {
    slug: "no-screening-services",
    title: "審査なしで使えるサービスはある？実態を解説",
    excerpt:
      "「審査なし」を謳うサービスの実態と注意点を解説。本当に与信不要で使えるサービスの仕組みと、信用情報に不安がある方向けの選択肢をご紹介します。",
    category: "審査・申込",
    categoryColor: "#8B5CF6",
    categoryBg: "#F3E8FF",
    date: "2026年1月7日",
    readingTime: "約5分",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
  },
  {
    slug: "cashflow-improvement",
    title: "資金繰り改善に請求書カード払いが効果的な理由",
    excerpt:
      "キャッシュフローの基本的な仕組みから、請求書カード払いを活用した資金繰り改善の実践例まで。月末の支払い集中を乗り越える具体的な戦略を解説します。",
    category: "資金繰り",
    categoryColor: "#2AABE2",
    categoryBg: "#E8F6FD",
    date: "2026年1月15日",
    readingTime: "約7分",
    gradient: "linear-gradient(135deg, #1A8DC4 0%, #8B5CF6 100%)",
  },
  {
    slug: "faq",
    title: "よくある質問 — 請求書カード払いQ&A",
    excerpt:
      "「ポイントは本当に貯まる？」「途中でキャンセルできる？」「取引先に知られる？」など、利用前によく寄せられる疑問に回答します。",
    category: "FAQ",
    categoryColor: "#3EBF8A",
    categoryBg: "#E8F8F2",
    date: "2026年2月1日",
    readingTime: "約4分",
    gradient: "linear-gradient(135deg, #3EBF8A 0%, #F59E0B 100%)",
  },
];

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
      {/* Decorative circles */}
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
      {/* Label */}
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

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const gradients = [
    article.gradient,
  ];

  return (
    <Link
      href={`/articles/${article.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article
        style={{
          background: "#fff",
          border: "1px solid #DDE5F0",
          borderRadius: "14px",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.25s ease, transform 0.25s ease",
          boxShadow: "0 2px 12px rgba(42,171,226,0.07)",
        }}
        className="article-card"
      >
        {/* Thumbnail */}
        <div
          style={{
            height: "160px",
            background: gradients[0],
            position: "relative",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Featured badge */}
          {article.featured && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "#fff",
                background: "rgba(245,158,11,0.95)",
                padding: "0.2rem 0.625rem",
                borderRadius: "9999px",
                letterSpacing: "0.04em",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              おすすめ
            </div>
          )}
          {/* Article number decoration */}
          <span
            style={{
              fontSize: "3.5rem",
              fontWeight: 900,
              color: "rgba(255,255,255,0.15)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* Category badge */}
          <span
            style={{
              position: "absolute",
              bottom: "10px",
              left: "12px",
              fontSize: "0.6875rem",
              fontWeight: 700,
              color: article.categoryColor,
              background: article.categoryBg,
              padding: "0.2rem 0.75rem",
              borderRadius: "9999px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            {article.category}
          </span>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "1.25rem 1.25rem 1rem",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#1A2B4A",
              lineHeight: 1.5,
              marginBottom: "0.75rem",
              flex: "none",
            }}
          >
            {article.title}
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6B7A99",
              lineHeight: 1.7,
              marginBottom: "1rem",
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.excerpt}
          </p>

          {/* Footer meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "0.875rem",
              borderTop: "1px solid #DDE5F0",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.75rem",
                color: "#B8C4D8",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {article.date}
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {article.readingTime}
              </span>
            </div>
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "#2AABE2",
                display: "flex",
                alignItems: "center",
                gap: "0.125rem",
              }}
            >
              読む
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
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
    <>
      <Header />
      <main
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

          {/* Filter bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "1.75rem",
            }}
          >
            <p
              style={{
                fontSize: "0.9375rem",
                color: "#6B7A99",
                margin: 0,
              }}
            >
              全{ARTICLES.length}件の記事
            </p>
            {/* Category filters */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {["すべて", "基礎知識", "比較・解説", "個人事業主向け", "資金繰り"].map(
                (cat) => (
                  <span
                    key={cat}
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: cat === "すべて" ? 700 : 500,
                      color: cat === "すべて" ? "#fff" : "#6B7A99",
                      background:
                        cat === "すべて" ? "#2AABE2" : "#fff",
                      border: `1px solid ${cat === "すべて" ? "#2AABE2" : "#DDE5F0"}`,
                      borderRadius: "9999px",
                      padding: "0.3125rem 0.875rem",
                      cursor: "pointer",
                      userSelect: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {cat}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Article grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "1.5rem",
            }}
            className="sm:grid-cols-2 lg:grid-cols-3"
          >
            {ARTICLES.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>

          {/* Pagination (placeholder) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "3rem",
            }}
          >
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  border: page === 1 ? "none" : "1px solid #DDE5F0",
                  background: page === 1 ? "#2AABE2" : "#fff",
                  color: page === 1 ? "#fff" : "#6B7A99",
                  fontWeight: page === 1 ? 700 : 500,
                  fontSize: "0.9375rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {page}
              </button>
            ))}
            <button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #DDE5F0",
                background: "#fff",
                color: "#6B7A99",
                fontSize: "0.9375rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* CTA banner */}
          <SidebarCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
