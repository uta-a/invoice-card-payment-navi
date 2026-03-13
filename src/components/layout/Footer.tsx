import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "おすすめランキング", href: "/#ranking" },
  { label: "サービス比較", href: "/#services" },
  { label: "記事一覧", href: "/articles" },
  { label: "口コミを書く", href: "/review" },
];

const LEGAL_LINKS = [
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "口コミガイドライン", href: "/review-guideline" },
  { label: "免責事項", href: "/disclaimer" },
  { label: "運営会社", href: "/company" },
  { label: "お問い合わせ", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1A2B4A", color: "#ffffff" }}>
      {/* ── Main grid ── */}
      <div
        className="footer-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        {/* ── Column 1: About ── */}
        <div>
          {/* Logo */}
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "#2AABE2",
                display: "block",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              請求書カード払いナビ
            </span>
            <span
              style={{
                fontSize: "0.6875rem",
                color: "#6B7A99",
                letterSpacing: "0.05em",
              }}
            >
              専門比較サイト
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "0.875rem",
              color: "#B8C4D8",
              lineHeight: 1.75,
              marginBottom: "1rem",
            }}
          >
            請求書カード払いサービスを専門に比較する情報サイトです。小規模法人・個人事業主の資金繰り改善をサポートします。
          </p>

          {/* Affiliate disclosure */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "#6B7A99",
              lineHeight: 1.6,
            }}
          >
            当サイトはアフィリエイト広告を含む場合があります
          </p>
        </div>

        {/* ── Column 2: Site map ── */}
        <div>
          <h3
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            サイトマップ
          </h3>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
            }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  style={{
                    fontSize: "0.9375rem",
                    color: "#B8C4D8",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "#2AABE2")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "#B8C4D8")
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 3: Legal / Operations ── */}
        <div>
          <h3
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            運営情報
          </h3>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
            }}
          >
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  style={{
                    fontSize: "0.9375rem",
                    color: "#B8C4D8",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "#2AABE2")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "#B8C4D8")
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          background: "#0F1A2E",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "1rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.8125rem",
            color: "#6B7A99",
            margin: 0,
          }}
        >
          © 2025 請求書カード払いナビ All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
