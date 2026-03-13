import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function ReviewGuidelinePage() {
  usePageMeta(
    "口コミガイドライン | 請求書カード払いナビ",
    "請求書カード払いナビの口コミ投稿ガイドライン。口コミの利用範囲や禁止事項について説明しています。"
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
          <span style={{ color: "#1A2B4A" }}>口コミガイドライン</span>
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
            口コミガイドライン
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
            当サイトでは、請求書カード払いサービスをご利用された方からの口コミを募集しています。公正で有益な口コミ情報を提供するため、以下のガイドラインを定めています。
          </p>

          {/* 口コミの利用範囲 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            口コミの利用範囲
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
              お寄せいただいた口コミは、当サイト上で公開させていただく場合があります
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              口コミの内容は、文意を変えない範囲で編集・要約する場合があります
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              統計情報として集計・分析に利用する場合があります
            </li>
          </ul>

          {/* 投稿にあたってのお願い */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            投稿にあたってのお願い
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
              実際にサービスを利用した上での体験に基づいてご投稿ください
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              具体的なエピソードや数値を含めると、より有益な口コミになります
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              公開されることを前提に、客観的で建設的な表現を心がけてください
            </li>
          </ul>

          {/* 禁止事項 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            禁止事項
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            以下に該当する口コミは掲載できません:
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
              虚偽の内容または事実に基づかない口コミ
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              特定の個人・企業に対する誹謗中傷・名誉毀損
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              個人情報（氏名、電話番号、メールアドレス等）の記載
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              競合サービスによる妨害目的の投稿
            </li>
            <li style={{ marginBottom: "0.5rem" }}>公序良俗に反する表現</li>
            <li style={{ marginBottom: "0.5rem" }}>広告・宣伝目的の投稿</li>
            <li style={{ marginBottom: "0.5rem" }}>
              他者の著作権・知的財産権を侵害する内容
            </li>
          </ul>

          {/* 審査・非公開基準 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            審査・非公開基準
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
              すべての口コミは掲載前に当サイト運営者による審査を行います
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              ガイドラインに違反する口コミは非公開とさせていただきます
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              審査結果についての個別のお問い合わせにはお答えしかねます
            </li>
          </ul>

          {/* 著作権 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            著作権
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
              口コミの著作権は投稿者に帰属します
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              ただし、投稿をもって当サイト運営者に対し、口コミの複製・公開・編集・二次利用に関する非独占的な利用許諾を付与するものとします
            </li>
          </ul>

          {/* インセンティブについて */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            インセンティブについて
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
              口コミ投稿に対してインセンティブ（謝礼・特典等）を提供する場合は、その旨を明示します
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              インセンティブの有無にかかわらず、口コミの内容は投稿者の自由意思に基づくものとします
            </li>
          </ul>

          {/* ガイドラインの変更 */}
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A2B4A",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            ガイドラインの変更
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              lineHeight: 1.8,
            }}
          >
            本ガイドラインは予告なく変更される場合があります。
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
