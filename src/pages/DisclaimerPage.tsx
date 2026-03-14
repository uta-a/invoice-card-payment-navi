import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function DisclaimerPage() {
  usePageMeta(
    "免責事項 | 請求書カード払いナビ",
    "請求書カード払いナビの免責事項。当サイトの情報利用に関する注意事項を説明しています。"
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
          <span style={{ color: "#1A2B4A" }}>免責事項</span>
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
            免責事項
          </h1>

          {/* 当サイトの情報について */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            当サイトの情報について
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            請求書カード払いナビ（以下「当サイト」）に掲載されている情報は、可能な限り正確な情報を提供するよう努めておりますが、その内容の正確性、完全性、最新性を保証するものではありません。サービスの内容、料金、手数料等は各サービス提供元の公式サイトにて必ずご確認ください。
          </p>

          {/* アフィリエイト広告について */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            アフィリエイト広告について
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            当サイトはアフィリエイトプログラムに参加しており、掲載しているサービスへのリンクにはアフィリエイトリンクが含まれます。当サイト経由でサービスにお申し込みいただいた場合、当サイトが紹介報酬を受け取ることがあります。ただし、アフィリエイト報酬の有無がランキングや評価に影響を与えることはありません。
          </p>

          {/* 外部リンクについて */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            外部リンクについて
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            当サイトから外部サイトへのリンクが含まれる場合がありますが、リンク先の外部サイトの内容、安全性、正確性について当サイトは一切の責任を負いません。外部サイトのご利用は、各自の責任において行ってください。
          </p>

          {/* 損害の免責 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            損害の免責
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            当サイトの情報を利用したことにより生じた損害（直接的・間接的を問わず）について、当サイトおよび運営者は一切の責任を負いかねます。サービスのご利用や契約に関する最終的な判断は、ご自身の責任において行ってください。
          </p>

          {/* 口コミ・レビューについて */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            口コミ・レビューについて
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            当サイトに掲載されている口コミ・レビューは、投稿者個人の感想であり、サービスの品質や効果を保証するものではありません。投稿内容の正確性について、当サイトは一切の責任を負いません。
          </p>

          {/* 変更について */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            変更について
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            本免責事項の内容は、予告なく変更される場合があります。変更後はサイト上に掲載した時点で効力を生じます。
          </p>

          {/* 最終更新日 */}
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6B7A99",
              marginTop: "2.5rem",
              textAlign: "right",
            }}
          >
            最終更新日: 2026年3月14日
          </p>
        </div>
      </div>
    </div>
  );
}
