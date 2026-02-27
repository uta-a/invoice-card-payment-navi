"use client";

import Link from "next/link";

// ============================================================
// Static data (demo)
// ============================================================
const ARTICLE = {
  title: "請求書カード払いとは？仕組みと選び方を解説",
  category: "基礎知識",
  categoryColor: "#2AABE2",
  categoryBg: "#E8F6FD",
  publishedAt: "2025年11月12日",
  updatedAt: "2026年1月28日",
  readingTime: "約8分",
  author: {
    name: "田中 誠一",
    role: "資金調達アドバイザー / 中小企業診断士",
    bio: "中小企業の資金繰り改善を専門とする認定コンサルタント。請求書カード払いサービスの導入支援実績100社超。",
    avatarGradient: "linear-gradient(135deg, #2AABE2, #3EBF8A)",
    initials: "田",
  },
};

const TOP_SERVICES = [
  {
    rank: 1,
    name: "XXXX請求書カード払い",
    rating: 4.8,
    fee: "X.X%〜",
    badge: "手数料最安",
    badgeColor: "#F59E0B",
    href: "https://example.com/service-a",
  },
  {
    rank: 2,
    name: "XXXX支払いサービス",
    rating: 4.6,
    fee: "X.X%〜",
    badge: "最速入金",
    badgeColor: "#3EBF8A",
    href: "https://example.com/service-b",
  },
  {
    rank: 3,
    name: "XXXX請求書払い",
    rating: 4.5,
    fee: "X.X%〜",
    badge: "サポート充実",
    badgeColor: "#8B5CF6",
    href: "https://example.com/service-c",
  },
];

const RELATED_ARTICLES = [
  {
    slug: "fee-comparison-guide",
    title: "手数料の比較ガイド — 安いサービスの選び方",
    excerpt:
      "各社の手数料体系を徹底比較。隠れコストも含めた実質コストの計算方法を解説します。",
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
      "フリーランス・個人事業主が安心して利用できるサービスを厳選。審査基準や必要書類も解説。",
    category: "個人事業主向け",
    categoryColor: "#F59E0B",
    categoryBg: "#FEF3C7",
    date: "2025年12月18日",
    readingTime: "約10分",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
  },
  {
    slug: "cashflow-improvement",
    title: "資金繰り改善に請求書カード払いが効果的な理由",
    excerpt:
      "キャッシュフローの仕組みから、請求書カード払いを活用した資金繰り改善の実践例まで。",
    category: "資金繰り",
    categoryColor: "#8B5CF6",
    categoryBg: "#F3E8FF",
    date: "2026年1月7日",
    readingTime: "約7分",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
  },
];

const TOC_ITEMS = [
  { id: "what-is", label: "請求書カード払いとは？", level: 2 },
  { id: "how-it-works", label: "仕組みとお金の流れ", level: 3 },
  { id: "merit-demerit", label: "メリット・デメリット", level: 3 },
  { id: "recommended-for", label: "こんな方におすすめ", level: 2 },
  { id: "sole-proprietor", label: "個人事業主・フリーランス", level: 3 },
  { id: "small-corporation", label: "小規模法人・スタートアップ", level: 3 },
  { id: "how-to-choose", label: "選び方のポイント3つ", level: 2 },
  { id: "point-fee", label: "① 手数料", level: 3 },
  { id: "point-speed", label: "② 入金速度", level: 3 },
  { id: "point-screening", label: "③ 審査の通りやすさ", level: 3 },
];

// ============================================================
// Sub-components
// ============================================================

function Breadcrumb() {
  return (
    <nav
      aria-label="パンくずリスト"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        flexWrap: "wrap",
        fontSize: "0.8125rem",
        color: "#6B7A99",
        marginBottom: "1.5rem",
      }}
    >
      <Link
        href="/"
        style={{ color: "#2AABE2", textDecoration: "none" }}
      >
        ホーム
      </Link>
      <span style={{ color: "#B8C4D8" }}>&gt;</span>
      <Link
        href="/articles"
        style={{ color: "#2AABE2", textDecoration: "none" }}
      >
        記事一覧
      </Link>
      <span style={{ color: "#B8C4D8" }}>&gt;</span>
      <span style={{ color: "#6B7A99" }}>{ARTICLE.title}</span>
    </nav>
  );
}

function ArticleHeader() {
  return (
    <header style={{ marginBottom: "2rem" }}>
      {/* Category badge */}
      <span
        style={{
          display: "inline-block",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: ARTICLE.categoryColor,
          background: ARTICLE.categoryBg,
          padding: "0.25rem 0.875rem",
          borderRadius: "9999px",
          marginBottom: "1rem",
          letterSpacing: "0.04em",
        }}
      >
        {ARTICLE.category}
      </span>

      {/* H1 */}
      <h1
        style={{
          fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
          fontWeight: 700,
          lineHeight: 1.35,
          color: "#1A2B4A",
          marginBottom: "1.25rem",
          letterSpacing: "-0.01em",
        }}
      >
        {ARTICLE.title}
      </h1>

      {/* Meta info */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.8125rem",
          color: "#6B7A99",
          marginBottom: "1.75rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid #DDE5F0",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          公開: {ARTICLE.publishedAt}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          更新: {ARTICLE.updatedAt}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {ARTICLE.readingTime}で読めます
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          監修: {ARTICLE.author.name}（{ARTICLE.author.role}）
        </span>
      </div>

      {/* Eye-catch image */}
      <div
        style={{
          width: "100%",
          height: "280px",
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, #2AABE2 0%, #1A8DC4 40%, #3EBF8A 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          marginBottom: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-30px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: "relative", zIndex: 1 }}
        >
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <p
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "0.02em",
            position: "relative",
            zIndex: 1,
          }}
        >
          請求書カード払いとは？
        </p>
        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.75)",
            position: "relative",
            zIndex: 1,
          }}
        >
          仕組みと選び方を解説
        </p>
      </div>
    </header>
  );
}

function ArticleBody() {
  return (
    <div
      style={{
        fontSize: "1rem",
        lineHeight: 1.9,
        color: "#1A2B4A",
      }}
    >
      {/* ── Section 1: 請求書カード払いとは？ ── */}
      <h2
        id="what-is"
        style={{
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "#1A2B4A",
          borderLeft: "4px solid #2AABE2",
          paddingLeft: "0.75rem",
          marginTop: "2.5rem",
          marginBottom: "1.25rem",
          lineHeight: 1.4,
        }}
      >
        請求書カード払いとは？
      </h2>
      <p style={{ marginBottom: "1rem" }}>
        <strong>請求書カード払い</strong>とは、取引先から届いた請求書の支払いをクレジットカードで決済できるサービスです。通常、請求書の支払いは銀行振込で行いますが、このサービスを利用することで、カードのポイントを獲得しながら支払期日を先延ばしにすることができます。
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        資金繰りに余裕がない時期でも、カードの支払いサイクル（最大約55日）を活用して、手元の現金を温存できるのが最大のメリットです。
      </p>

      <h3
        id="how-it-works"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "#2AABE2",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        仕組みとお金の流れ
      </h3>
      <p style={{ marginBottom: "1rem" }}>
        基本的な流れは以下のとおりです。
      </p>

      {/* Step flow */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginBottom: "1.75rem",
          padding: "1.25rem",
          background: "#F0F9FF",
          borderRadius: "10px",
        }}
      >
        {[
          { step: "1", label: "請求書を受け取る", desc: "取引先から支払い期日付きの請求書を受領します。" },
          { step: "2", label: "サービスに請求書情報を登録", desc: "請求書カード払いサービスのサイトまたはアプリで、請求書の内容を入力・アップロードします。" },
          { step: "3", label: "クレジットカードで決済", desc: "登録した請求金額をクレジットカードで支払います。ポイントも通常通り付与されます。" },
          { step: "4", label: "サービス会社が取引先に支払い", desc: "サービス会社が取引先へ直接振り込みを行います（手数料を差し引いた額）。" },
          { step: "5", label: "カードの口座から引き落とし", desc: "カードの締め日・支払い日に応じて、口座から引き落とされます。" },
        ].map((item) => (
          <div
            key={item.step}
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#2AABE2",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8125rem",
                fontWeight: 700,
              }}
            >
              {item.step}
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: "0.125rem", color: "#1A2B4A" }}>
                {item.label}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#6B7A99", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3
        id="merit-demerit"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "#2AABE2",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        メリット・デメリット
      </h3>

      {/* Merit / Demerit grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        <div
          style={{
            background: "#E8F8F2",
            borderRadius: "10px",
            padding: "1.25rem",
            borderTop: "3px solid #3EBF8A",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              color: "#3EBF8A",
              marginBottom: "0.75rem",
              fontSize: "0.9375rem",
            }}
          >
            メリット
          </p>
          <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
            {[
              "支払いを最大約55日先延ばしできる",
              "クレジットカードのポイントが貯まる",
              "銀行融資より審査が通りやすい",
              "オンライン完結で手間がかからない",
            ].map((item) => (
              <li key={item} style={{ marginBottom: "0.5rem", color: "#1A2B4A", fontSize: "0.9rem" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            background: "#FFF8F8",
            borderRadius: "10px",
            padding: "1.25rem",
            borderTop: "3px solid #EF4444",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              color: "#EF4444",
              marginBottom: "0.75rem",
              fontSize: "0.9375rem",
            }}
          >
            デメリット
          </p>
          <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
            {[
              "手数料（数%）が発生する",
              "利用できるカードに制限がある場合も",
              "審査に通らないこともある",
              "利用限度額に上限がある",
            ].map((item) => (
              <li key={item} style={{ marginBottom: "0.5rem", color: "#1A2B4A", fontSize: "0.9rem" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Info box */}
      <div
        style={{
          background: "#E8F6FD",
          borderLeft: "4px solid #2AABE2",
          padding: "1rem 1.25rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            color: "#1A8DC4",
            marginBottom: "0.375rem",
            fontSize: "0.9375rem",
          }}
        >
          ポイント
        </p>
        <p style={{ margin: 0, color: "#1A2B4A", fontSize: "0.9375rem" }}>
          手数料は発生しますが、それを上回るカードポイントや、資金繰り改善による機会損失の回避が期待できます。特に支払いサイト（入金〜支払いのタイムラグ）が長い業種では効果が大きいです。
        </p>
      </div>

      {/* ── Section 2: こんな方におすすめ ── */}
      <h2
        id="recommended-for"
        style={{
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "#1A2B4A",
          borderLeft: "4px solid #2AABE2",
          paddingLeft: "0.75rem",
          marginTop: "2.5rem",
          marginBottom: "1.25rem",
          lineHeight: 1.4,
        }}
      >
        こんな方におすすめ
      </h2>
      <p style={{ marginBottom: "1.5rem" }}>
        請求書カード払いは、特定の状況や事業形態にある方に大きなメリットをもたらします。以下に当てはまる方はぜひ検討してみてください。
      </p>

      <h3
        id="sole-proprietor"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "#2AABE2",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        個人事業主・フリーランス
      </h3>
      <p style={{ marginBottom: "1rem" }}>
        銀行融資の審査が通りにくい個人事業主やフリーランスの方でも、クレジットカードさえあれば利用できるサービスが多数あります。確定申告書や事業実績がなくても対応しているサービスも存在します。
      </p>

      {/* Tips box */}
      <div
        style={{
          background: "#FEF3C7",
          borderLeft: "4px solid #F59E0B",
          padding: "1rem 1.25rem",
          borderRadius: "8px",
          marginBottom: "1.75rem",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            color: "#92400E",
            marginBottom: "0.375rem",
            fontSize: "0.9375rem",
          }}
        >
          こんな場面で活躍
        </p>
        <p style={{ margin: 0, color: "#1A2B4A", fontSize: "0.9375rem" }}>
          案件受注直後で入金待ちの間に、外注費や仕入れ代の支払いが重なるケース。カード払いにすることで、入金前でも支払いを乗り越えられます。
        </p>
      </div>

      <h3
        id="small-corporation"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "#2AABE2",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        小規模法人・スタートアップ
      </h3>
      <p style={{ marginBottom: "1rem" }}>
        創業間もない法人は、銀行からの融資枠が限られていることが多く、月末の支払い集中で一時的な資金不足が発生しがちです。請求書カード払いは、融資ではないため負債とならず、貸借対照表を悪化させません。
      </p>

      {/* Comparison table */}
      <div
        style={{
          overflowX: "auto",
          marginBottom: "2rem",
          borderRadius: "10px",
          border: "1px solid #DDE5F0",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
          }}
        >
          <thead>
            <tr style={{ background: "#2AABE2", color: "#fff" }}>
              <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700 }}>比較項目</th>
              <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 700 }}>銀行融資</th>
              <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 700 }}>請求書カード払い</th>
              <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 700 }}>ファクタリング</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "審査の難しさ", bank: "難しい", card: "易しい", factoring: "普通" },
              { label: "調達スピード", bank: "数週間〜", card: "最短即日", factoring: "数日〜" },
              { label: "コスト", bank: "低〜中", card: "中（手数料）", factoring: "高め" },
              { label: "負債になるか", bank: "なる", card: "ならない", factoring: "ならない" },
              { label: "必要書類", bank: "多い", card: "少ない", factoring: "中程度" },
            ].map((row, i) => (
              <tr
                key={row.label}
                style={{
                  background: i % 2 === 0 ? "#fff" : "#F0F9FF",
                  borderBottom: "1px solid #DDE5F0",
                }}
              >
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#1A2B4A" }}>{row.label}</td>
                <td style={{ padding: "0.75rem 1rem", textAlign: "center", color: "#6B7A99" }}>{row.bank}</td>
                <td
                  style={{
                    padding: "0.75rem 1rem",
                    textAlign: "center",
                    color: "#2AABE2",
                    fontWeight: 700,
                    background: i % 2 === 0 ? "#E8F6FD" : "#daeef8",
                  }}
                >
                  {row.card}
                </td>
                <td style={{ padding: "0.75rem 1rem", textAlign: "center", color: "#6B7A99" }}>{row.factoring}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Section 3: 選び方のポイント ── */}
      <h2
        id="how-to-choose"
        style={{
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "#1A2B4A",
          borderLeft: "4px solid #2AABE2",
          paddingLeft: "0.75rem",
          marginTop: "2.5rem",
          marginBottom: "1.25rem",
          lineHeight: 1.4,
        }}
      >
        選び方のポイント3つ
      </h2>
      <p style={{ marginBottom: "1.5rem" }}>
        各社によってサービス内容は大きく異なります。以下の3つのポイントを軸に比較検討することをおすすめします。
      </p>

      <h3
        id="point-fee"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "#2AABE2",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        ① 手数料
      </h3>
      <p style={{ marginBottom: "1rem" }}>
        手数料は各社で大きく異なり、<strong>1%台〜4%台</strong>が一般的な相場です。表面上の手数料だけでなく、月額固定費や登録料などの隠れコストも含めた「実質コスト」で比較することが重要です。
      </p>
      <div
        style={{
          background: "#E8F6FD",
          borderLeft: "4px solid #2AABE2",
          padding: "1rem 1.25rem",
          borderRadius: "8px",
          marginBottom: "1.75rem",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            color: "#1A8DC4",
            marginBottom: "0.375rem",
            fontSize: "0.9375rem",
          }}
        >
          計算例
        </p>
        <p style={{ margin: 0, color: "#1A2B4A", fontSize: "0.9375rem" }}>
          100万円の請求書を手数料2%のサービスで払うと、コストは2万円。年間24枚の請求書を処理すれば年間48万円のコスト。カードポイント（1%還元）と差し引くと実質コストは年間24万円です。
        </p>
      </div>

      <h3
        id="point-speed"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "#2AABE2",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        ② 入金速度
      </h3>
      <p style={{ marginBottom: "1rem" }}>
        取引先への入金スピードは「最短即日」から「5営業日程度」まで差があります。急ぎで支払いが必要な場合は、即日対応可能なサービスを選びましょう。ただし、スピードが速いサービスは手数料が高くなる傾向があります。
      </p>
      <p style={{ marginBottom: "1.75rem" }}>
        定期的に請求書が発生するルーティンであれば、入金速度より手数料を優先する選び方も合理的です。
      </p>

      <h3
        id="point-screening"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "#2AABE2",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        ③ 審査の通りやすさ
      </h3>
      <p style={{ marginBottom: "1rem" }}>
        審査基準はサービスによって大きく異なります。一般的には、<strong>法人格の有無</strong>、<strong>事業実績（開業年数）</strong>、<strong>クレジットカードの利用状況</strong>が主な審査項目です。
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        創業直後や個人事業主の場合は、「審査なし」や「審査が柔軟」をうたうサービスから試してみることをおすすめします。複数のサービスに申し込んで比較するのも有効な戦略です。
      </p>

      {/* Final CTA info box */}
      <div
        style={{
          background: "linear-gradient(135deg, #E8F6FD, #EDFBF5)",
          border: "1px solid #DDE5F0",
          borderRadius: "12px",
          padding: "1.5rem",
          marginTop: "2.5rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: "1.0625rem",
            color: "#1A2B4A",
            marginBottom: "0.75rem",
          }}
        >
          どのサービスが自分に合っている？
        </p>
        <p
          style={{
            color: "#6B7A99",
            fontSize: "0.9375rem",
            marginBottom: "1.25rem",
          }}
        >
          手数料・入金速度・審査基準を一覧で比較できます。
        </p>
        <Link
          href="/#ranking"
          style={{
            display: "inline-block",
            background: "#2AABE2",
            color: "#fff",
            borderRadius: "9999px",
            padding: "0.75rem 2rem",
            fontWeight: 700,
            fontSize: "0.9375rem",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(42,171,226,0.35)",
          }}
        >
          無料でサービスを比較する →
        </Link>
      </div>
    </div>
  );
}

function AuthorBox() {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.25rem",
        alignItems: "flex-start",
        background: "#fff",
        border: "1px solid #DDE5F0",
        borderRadius: "12px",
        padding: "1.5rem",
        marginTop: "3rem",
        boxShadow: "0 2px 12px rgba(42,171,226,0.08)",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: ARTICLE.author.avatarGradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          color: "#fff",
          fontWeight: 700,
        }}
      >
        {ARTICLE.author.initials}
      </div>
      <div>
        <p style={{ fontSize: "0.75rem", color: "#6B7A99", marginBottom: "0.25rem" }}>
          監修者
        </p>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#1A2B4A",
            marginBottom: "0.125rem",
          }}
        >
          {ARTICLE.author.name}
        </p>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "#2AABE2",
            marginBottom: "0.625rem",
          }}
        >
          {ARTICLE.author.role}
        </p>
        <p style={{ fontSize: "0.875rem", color: "#6B7A99", lineHeight: 1.7, margin: 0 }}>
          {ARTICLE.author.bio}
        </p>
      </div>
    </div>
  );
}

function RelatedArticles() {
  return (
    <section style={{ marginTop: "3rem" }}>
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#1A2B4A",
          marginBottom: "1.25rem",
          paddingBottom: "0.75rem",
          borderBottom: "2px solid #DDE5F0",
        }}
      >
        関連記事
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {RELATED_ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <article
              style={{
                background: "#fff",
                border: "1px solid #DDE5F0",
                borderRadius: "10px",
                overflow: "hidden",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 8px 24px rgba(42,171,226,0.15)";
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  height: "100px",
                  background: article.gradient,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    left: "10px",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: article.categoryColor,
                    background: article.categoryBg,
                    padding: "0.125rem 0.625rem",
                    borderRadius: "9999px",
                  }}
                >
                  {article.category}
                </span>
              </div>
              {/* Content */}
              <div style={{ padding: "0.875rem" }}>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#1A2B4A",
                    lineHeight: 1.5,
                    marginBottom: "0.5rem",
                  }}
                >
                  {article.title}
                </p>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "#6B7A99",
                    lineHeight: 1.6,
                    marginBottom: "0.75rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {article.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    fontSize: "0.75rem",
                    color: "#B8C4D8",
                  }}
                >
                  <span>{article.date}</span>
                  <span>{article.readingTime}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TableOfContents() {
  return (
    <aside
      aria-label="目次"
      style={{
        background: "#fff",
        border: "1px solid #DDE5F0",
        borderRadius: "12px",
        padding: "1.25rem",
        marginBottom: "1.5rem",
      }}
    >
      <p
        style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          color: "#1A2B4A",
          marginBottom: "1rem",
          paddingBottom: "0.625rem",
          borderBottom: "2px solid #2AABE2",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2AABE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        目次
      </p>
      <nav>
        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {TOC_ITEMS.filter((item) => item.level === 2).map((h2, i) => (
            <li key={h2.id} style={{ marginBottom: "0.5rem" }}>
              <a
                href={`#${h2.id}`}
                style={{
                  fontSize: "0.875rem",
                  color: "#1A2B4A",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "block",
                  padding: "0.125rem 0",
                }}
              >
                {i + 1}. {h2.label}
              </a>
              {/* Sub items */}
              <ol style={{ listStyle: "none", margin: "0.375rem 0 0.375rem 1rem", padding: 0 }}>
                {TOC_ITEMS.filter((item) => {
                  const h2Items = TOC_ITEMS.filter((t) => t.level === 2);
                  const currentH2Index = h2Items.indexOf(h2);
                  const nextH2 = h2Items[currentH2Index + 1];
                  const currentH2Pos = TOC_ITEMS.indexOf(h2);
                  const nextH2Pos = nextH2 ? TOC_ITEMS.indexOf(nextH2) : TOC_ITEMS.length;
                  const itemPos = TOC_ITEMS.indexOf(item);
                  return item.level === 3 && itemPos > currentH2Pos && itemPos < nextH2Pos;
                }).map((h3) => (
                  <li key={h3.id} style={{ marginBottom: "0.375rem" }}>
                    <a
                      href={`#${h3.id}`}
                      style={{
                        fontSize: "0.8125rem",
                        color: "#6B7A99",
                        textDecoration: "none",
                        display: "block",
                        padding: "0.125rem 0",
                        borderLeft: "2px solid #DDE5F0",
                        paddingLeft: "0.625rem",
                      }}
                    >
                      {h3.label}
                    </a>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

function SidebarRanking() {
  return (
    <aside
      aria-label="サービスランキング"
      style={{
        background: "#fff",
        border: "1px solid #DDE5F0",
        borderRadius: "12px",
        padding: "1.25rem",
        marginBottom: "1.5rem",
      }}
    >
      <p
        style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          color: "#1A2B4A",
          marginBottom: "1rem",
          paddingBottom: "0.625rem",
          borderBottom: "2px solid #F59E0B",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        おすすめランキング TOP3
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {TOP_SERVICES.map((svc) => (
          <div
            key={svc.rank}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "0.875rem",
              background: "#F0F9FF",
              borderRadius: "8px",
              border: "1px solid #DDE5F0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              {/* Rank badge */}
              <div
                style={{
                  flexShrink: 0,
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "#fff",
                  background:
                    svc.rank === 1
                      ? "linear-gradient(135deg, #FFD700, #FFA500)"
                      : svc.rank === 2
                      ? "linear-gradient(135deg, #C0C0C0, #A0A0A0)"
                      : "linear-gradient(135deg, #CD7F32, #A0522D)",
                }}
              >
                {svc.rank}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "#1A2B4A",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {svc.name}
                </p>
              </div>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "#fff",
                  background: svc.badgeColor,
                  padding: "0.125rem 0.5rem",
                  borderRadius: "9999px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {svc.badge}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill={star <= Math.round(svc.rating) ? "#F59E0B" : "#DDE5F0"}
                    stroke={star <= Math.round(svc.rating) ? "#F59E0B" : "#DDE5F0"}
                    strokeWidth="1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span style={{ fontSize: "0.75rem", color: "#6B7A99", marginLeft: "0.125rem" }}>
                  {svc.rating}
                </span>
              </div>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#2AABE2" }}>
                手数料 {svc.fee}
              </span>
            </div>
            <a
              href={svc.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "#2AABE2",
                border: "1.5px solid #2AABE2",
                borderRadius: "9999px",
                padding: "0.375rem 0",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              詳細を見る →
            </a>
          </div>
        ))}
      </div>
      <Link
        href="/#ranking"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "1rem",
          fontSize: "0.8125rem",
          color: "#6B7A99",
          textDecoration: "none",
        }}
      >
        全サービスを比較する →
      </Link>
    </aside>
  );
}

function SidebarCTA() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #2AABE2 0%, #1A8DC4 60%, #3EBF8A 100%)",
        borderRadius: "12px",
        padding: "1.5rem 1.25rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: "-30px",
          right: "-30px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <p
        style={{
          fontSize: "0.9375rem",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "0.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        どのサービスが<br />自分に合っている？
      </p>
      <p
        style={{
          fontSize: "0.8125rem",
          color: "rgba(255,255,255,0.85)",
          marginBottom: "1.25rem",
          lineHeight: 1.6,
          position: "relative",
          zIndex: 1,
        }}
      >
        手数料・入金速度・審査基準を<br />まとめて比較できます
      </p>
      <Link
        href="/#ranking"
        style={{
          display: "block",
          background: "#fff",
          color: "#2AABE2",
          fontWeight: 700,
          fontSize: "0.9375rem",
          borderRadius: "9999px",
          padding: "0.75rem 1rem",
          textDecoration: "none",
          boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          position: "relative",
          zIndex: 1,
        }}
      >
        無料でサービスを比較する →
      </Link>
    </div>
  );
}

// ============================================================
// Page
// ============================================================
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;

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
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Two-column layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: "2rem",
              alignItems: "start",
            }}
            className="lg:grid-cols-[1fr_340px]"
          >
            {/* ── Main content ── */}
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                boxShadow: "0 2px 12px rgba(42,171,226,0.08)",
              }}
            >
              <ArticleHeader />
              <ArticleBody />
              <AuthorBox />
              <RelatedArticles />
            </div>

            {/* ── Sidebar ── */}
            <aside
              className="hidden lg:block"
              style={{
                position: "sticky",
                top: "80px",
                alignSelf: "start",
              }}
            >
              <TableOfContents />
              <SidebarRanking />
              <SidebarCTA />
            </aside>
          </div>
        </div>
      </div>
  );
}
