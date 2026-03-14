import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function ContactPage() {
  usePageMeta(
    "お問い合わせ | 請求書カード払いナビ",
    "請求書カード払いナビへのお問い合わせ方法。連絡先や対応時間をご案内しています。"
  );

  return (
    <div
      style={{
        background: "#F0F9FF",
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "5rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            gap: "0.375rem",
            fontSize: "0.8125rem",
            marginBottom: "1.5rem",
          }}
        >
          <Link to="/" style={{ color: "#2AABE2", textDecoration: "none" }}>
            ホーム
          </Link>
          <span style={{ color: "#1A2B4A" }}>&gt;</span>
          <span style={{ color: "#1A2B4A" }}>お問い合わせ</span>
        </nav>

        {/* Content Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1rem",
            border: "1px solid #DDE5F0",
            padding: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 700,
              color: "#1A2B4A",
              marginBottom: "1.5rem",
            }}
          >
            お問い合わせ
          </h1>

          {/* お問い合わせ方法 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            お問い合わせ方法
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            当サイトへのお問い合わせは、下記メールアドレスまでご連絡ください。
          </p>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
              marginTop: "0.5rem",
            }}
          >
            メールアドレス: XXXX
          </p>

          {/* 対応時間 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            対応時間
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            お問い合わせへの返信は、原則として3営業日以内に対応いたします。土日祝日や年末年始は対応が遅れる場合がございますので、あらかじめご了承ください。
          </p>

          {/* 注意事項 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            注意事項
          </h2>
          <ul
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
              paddingLeft: "1.5rem",
            }}
          >
            <li style={{ marginBottom: "0.5rem" }}>
              各サービスの詳細や契約内容に関するお問い合わせは、各サービス提供元に直接ご連絡ください。
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              お問い合わせの内容によっては、回答にお時間をいただく場合や、回答しかねる場合がございます。
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              営業・広告目的のお問い合わせはご遠慮ください。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
