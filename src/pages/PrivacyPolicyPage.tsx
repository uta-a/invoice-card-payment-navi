import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function PrivacyPolicyPage() {
  usePageMeta(
    "プライバシーポリシー | 請求書カード払いナビ",
    "請求書カード払いナビのプライバシーポリシー。個人情報の取り扱いについて説明しています。"
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
          <span style={{ color: "#1A2B4A" }}>プライバシーポリシー</span>
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
            プライバシーポリシー
          </h1>

          {/* はじめに */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            はじめに
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            請求書カード払いナビ（以下「当サイト」）は、ユーザーの個人情報の保護を重要な責務と考え、以下の方針に基づき個人情報を取り扱います。
          </p>

          {/* 収集する個人情報 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            収集する個人情報
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            以下の情報を収集する場合があります:
          </p>
          <ul
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
              paddingLeft: "1.5rem",
            }}
          >
            <li style={{ marginBottom: "0.5rem" }}>IPアドレス</li>
            <li style={{ marginBottom: "0.5rem" }}>
              ユーザーエージェント（ブラウザ情報）
            </li>
            <li style={{ marginBottom: "0.5rem" }}>会社名・屋号</li>
            <li style={{ marginBottom: "0.5rem" }}>業種</li>
            <li style={{ marginBottom: "0.5rem" }}>所在地（都道府県）</li>
            <li style={{ marginBottom: "0.5rem" }}>
              口コミアンケートの回答内容
            </li>
          </ul>

          {/* 利用目的 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            利用目的
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            収集した個人情報は以下の目的で利用します:
          </p>
          <ul
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
              paddingLeft: "1.5rem",
            }}
          >
            <li style={{ marginBottom: "0.5rem" }}>
              サービス比較情報の充実・改善
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              口コミコンテンツとしてのサイト掲載（匿名化した上で公開する場合があります）
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              統計データの作成・分析
            </li>
            <li style={{ marginBottom: "0.5rem" }}>不正利用の防止</li>
            <li style={{ marginBottom: "0.5rem" }}>お問い合わせへの対応</li>
          </ul>

          {/* 第三者提供 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            第三者提供
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            原則として個人情報を第三者に提供しません。ただし以下の場合を除きます:
          </p>
          <ul
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
              paddingLeft: "1.5rem",
            }}
          >
            <li style={{ marginBottom: "0.5rem" }}>
              口コミとしてサイト上に掲載する場合（個人を特定できない形に匿名化した上で公開）
            </li>
            <li style={{ marginBottom: "0.5rem" }}>法令に基づく場合</li>
            <li style={{ marginBottom: "0.5rem" }}>
              人の生命、身体または財産の保護のために必要がある場合
            </li>
          </ul>

          {/* 保管期間と安全管理措置 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            保管期間と安全管理措置
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            個人情報は利用目的の達成に必要な期間保管し、不要となった場合は速やかに削除します。SSL暗号化通信やアクセス制御等の安全管理措置を講じています。
          </p>

          {/* Cookie（クッキー）について */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Cookie（クッキー）について
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            当サイトではサイトの利便性向上のためにCookieを使用する場合があります。ブラウザの設定により無効化可能です。
          </p>

          {/* 開示・訂正・削除請求 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            開示・訂正・削除請求
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            ご本人からの個人情報の開示・訂正・削除のご請求は、本人確認の上、合理的な期間内に対応します。
          </p>

          {/* お問い合わせ先 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            お問い合わせ先
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            個人情報の取り扱いに関するお問い合わせは、サイト内のお問い合わせフォームよりご連絡ください。
          </p>

          {/* プライバシーポリシーの変更 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            プライバシーポリシーの変更
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            本ポリシーは予告なく変更される場合があります。変更後はサイト上に掲載した時点で効力を生じます。
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
            最終更新日: 2026年3月13日
          </p>
        </div>
      </div>
    </div>
  );
}
