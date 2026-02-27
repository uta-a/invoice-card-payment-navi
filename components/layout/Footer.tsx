"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "おすすめランキング", href: "/#ranking" },
  { label: "サービス比較", href: "/#services" },
  { label: "記事一覧", href: "/articles" },
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
      {/* Main grid */}
      <div
        className="footer-grid mx-auto"
        style={{
          maxWidth: "1200px",
          padding: "3.5rem 1.5rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        {/* Column 1: About */}
        <div>
          <div className="mb-4">
            <span className="block text-[1.0625rem] font-bold text-[#2AABE2] leading-tight tracking-tight">
              請求書カード払いナビ
            </span>
            <span className="text-[0.6875rem] text-[#6B7A99] tracking-wider">
              専門比較サイト
            </span>
          </div>
          <p className="text-sm text-[#B8C4D8] leading-[1.75] mb-4">
            請求書カード払いサービスを専門に比較する情報サイトです。小規模法人・個人事業主の資金繰り改善をサポートします。
          </p>
          <p className="text-xs text-[#6B7A99] leading-relaxed">
            当サイトはアフィリエイト広告を含む場合があります
          </p>
        </div>

        {/* Column 2: Site map */}
        <div>
          <h3
            className="text-[0.8125rem] font-bold text-white tracking-wider uppercase mb-4 pb-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
          >
            サイトマップ
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="footer-link text-[0.9375rem] inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Legal / Operations */}
        <div>
          <h3
            className="text-[0.8125rem] font-bold text-white tracking-wider uppercase mb-4 pb-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
          >
            運営情報
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="footer-link text-[0.9375rem] inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="text-center"
        style={{
          background: "#0F1A2E",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "1rem 1.5rem",
        }}
      >
        <p className="text-[0.8125rem] text-[#6B7A99] m-0">
          &copy; 2025 請求書カード払いナビ All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
