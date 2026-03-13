import { Link } from "react-router-dom";
import ReviewSurvey from "@/components/articles/ReviewSurvey";
import { usePageMeta } from "../hooks/usePageMeta";

function SurveyHero() {
  return (
    <section
      style={{
        background: "linear-gradient(155deg, #E8F6FD 0%, #EDFBF5 55%, #FFFFFF 100%)",
        border: "1px solid #DDE5F0",
        borderRadius: "20px",
        padding: "clamp(1.5rem, 4vw, 3rem)",
        marginBottom: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-70px",
          right: "-40px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(42,171,226,0.09)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-40px",
          width: "210px",
          height: "210px",
          borderRadius: "50%",
          background: "rgba(62,191,138,0.08)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "760px" }}>
        <span className="section-label">Voice Collection</span>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            lineHeight: 1.25,
            marginBottom: "0.85rem",
          }}
        >
          請求書カード払いの
          <br />
          口コミアンケート
        </h1>
        <p
          style={{
            margin: 0,
            color: "#4E6385",
            lineHeight: 1.9,
            maxWidth: "680px",
          }}
        >
          実際の利用者の声を集めて、手数料・審査・スピード・使いやすさの比較精度を高めるためのフォームです。
          回答内容は確認後に掲載へ活用します。
        </p>
      </div>
    </section>
  );
}

export default function SurveyPage() {
  usePageMeta(
    "請求書カード払い 口コミアンケート | 請求書カード払いナビ",
    "請求書カード払いの利用体験を募集する口コミアンケートページです。手数料、審査、スピード、使いやすさの実体験を投稿できます。",
  );

  return (
    <div
      style={{
        background: "#F0F9FF",
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <nav
          aria-label="パンくずリスト"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.8125rem",
            color: "#6B7A99",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={{ color: "#2AABE2", textDecoration: "none" }}>
            ホーム
          </Link>
          <span style={{ color: "#B8C4D8" }}>&gt;</span>
          <span style={{ color: "#6B7A99" }}>口コミアンケート</span>
        </nav>

        <SurveyHero />
        <ReviewSurvey articleSlug="survey-page" />
      </div>
    </div>
  );
}
