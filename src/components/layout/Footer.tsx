import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "おすすめランキング", href: "/#ranking" },
  { label: "サービス比較", href: "/#services" },
  { label: "記事一覧", href: "/articles" },
  { label: "口コミアンケート", href: "/survey" },
];

const LEGAL_LINKS = [
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "免責事項", href: "/disclaimer" },
  { label: "運営会社", href: "/company" },
  { label: "お問い合わせ", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1A2B4A", color: "#ffffff" }}>
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
        <div>
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
              資金繰り比較サイト
            </span>
          </div>

          <p
            style={{
              fontSize: "0.875rem",
              color: "#B8C4D8",
              lineHeight: 1.75,
              marginBottom: "1rem",
            }}
          >
            請求書カード払いサービスを比較し、導入判断に必要な情報を整理して届ける比較メディアです。
            中小企業・個人事業主の資金繰り改善をサポートします。
          </p>

          <p
            style={{
              fontSize: "0.75rem",
              color: "#6B7A99",
              lineHeight: 1.6,
            }}
          >
            当サイトにはアフィリエイト広告が含まれる場合があります。
          </p>
        </div>

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
            Site Map
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
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#2AABE2")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#B8C4D8")
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

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
            Legal
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
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#2AABE2")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#B8C4D8")
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

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
          © 2025 請求書カード払いナビ. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
