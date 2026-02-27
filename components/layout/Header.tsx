"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Trophy, FileText, Percent, Zap, ClipboardCheck,
  ChevronRight, PhoneCall
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── メニュー定義 ─────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    label: "ランキング・比較",
    items: [
      { icon: Trophy,        label: "おすすめランキング",  sub: "総合評価TOP6",       action: "ranking" },
      { icon: Percent,       label: "手数料で比較",        sub: "最安X.X%〜",        action: "ranking" },
      { icon: Zap,           label: "入金速度で比較",      sub: "最短即日対応",       action: "ranking" },
      { icon: ClipboardCheck,label: "審査難易度で比較",    sub: "やさしい順",         action: "ranking" },
    ],
  },
  {
    label: "サービス詳細・記事",
    items: [
      { icon: FileText,      label: "サービス詳細一覧",    sub: "全社まとめて確認",   action: "services" },
      { icon: FileText,      label: "お役立ち記事",        sub: "基礎知識・選び方",   href: "/articles" },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // body スクロールロック
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <header
        style={{
          position: "sticky", top: 0, zIndex: 50,
          background: scrolled || mobileMenuOpen ? "#ffffff" : "rgba(255,255,255,0.72)",
          boxShadow: scrolled ? "0 2px 12px rgba(42,171,226,0.10)" : "none",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        {/* ── Main bar ─────────────────────────────────────────────────────── */}
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 64,
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#2AABE2", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                請求書カード払いナビ
              </span>
              <span style={{ fontSize: "0.6875rem", color: "#6B7A99", lineHeight: 1, letterSpacing: "0.05em" }}>
                専門比較サイト
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {[
              { label: "おすすめランキング", action: "ranking" },
              { label: "サービス比較",       action: "services" },
            ].map(({ label, action }) => (
              <button key={label} onClick={() => scrollTo(action)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.9375rem", fontWeight: 500, color: "#1A2B4A",
                padding: "0.25rem 0", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#2AABE2")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#1A2B4A")}
              >
                {label}
              </button>
            ))}
            <Link href="/articles" style={{
              fontSize: "0.9375rem", fontWeight: 500, color: "#1A2B4A",
              textDecoration: "none", padding: "0.25rem 0", transition: "color 0.2s",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#2AABE2")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#1A2B4A")}
            >
              記事
            </Link>
            <button onClick={() => scrollTo("services")} style={{
              background: "#3EBF8A", color: "#fff", border: "none",
              borderRadius: 9999, padding: "0.5rem 1.375rem",
              fontSize: "0.9375rem", fontWeight: 700, cursor: "pointer",
              whiteSpace: "nowrap", transition: "background 0.2s, transform 0.15s",
              boxShadow: "0 2px 8px rgba(62,191,138,0.30)",
            }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLElement; b.style.background = "#2DA374"; b.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLElement; b.style.background = "#3EBF8A"; b.style.transform = "translateY(0)"; }}
            >
              無料で比較する
            </button>
          </nav>

          {/* Hamburger button */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={mobileMenuOpen}
            style={{
              background: mobileMenuOpen ? "#F0F9FF" : "none",
              border: mobileMenuOpen ? "1px solid #DDE5F0" : "none",
              borderRadius: 10, cursor: "pointer",
              color: "#1A2B4A", padding: "6px",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 48,
                background: "rgba(26,43,74,0.35)",
                backdropFilter: "blur(2px)",
              }}
              className="md:hidden"
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: EASE }}
              aria-label="モバイルナビゲーション"
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(320px, 88vw)", zIndex: 49,
                background: "#fff",
                boxShadow: "-8px 0 40px rgba(26,43,74,0.15)",
                display: "flex", flexDirection: "column",
                overflowY: "auto",
              }}
              className="md:hidden"
            >
              {/* Drawer header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 20px", height: 64, flexShrink: 0,
                borderBottom: "1px solid #DDE5F0",
              }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#6B7A99", letterSpacing: "0.06em" }}>
                  MENU
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: "#F1F5F9", border: "none", borderRadius: 8,
                    width: 32, height: 32, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#6B7A99",
                  }}
                  aria-label="メニューを閉じる"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sections */}
              <div style={{ flex: 1, padding: "12px 0 20px" }}>
                {NAV_SECTIONS.map((section, si) => (
                  <div key={si} style={{ marginBottom: 8 }}>
                    {/* Section label */}
                    <div style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                      color: "#B8C4D8", padding: "10px 20px 6px",
                      textTransform: "uppercase",
                    }}>
                      {section.label}
                    </div>

                    {/* Items */}
                    {section.items.map((item, ii) => {
                      const Icon = item.icon;
                      const inner = (
                        <div style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "11px 20px",
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F0F9FF")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        >
                          {/* Icon bg */}
                          <div style={{
                            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                            background: "#E8F6FD",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Icon size={18} color="#2AABE2" strokeWidth={1.75} />
                          </div>
                          {/* Text */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#1A2B4A", lineHeight: 1.3 }}>
                              {item.label}
                            </div>
                            <div style={{ fontSize: 11, color: "#6B7A99", marginTop: 1 }}>
                              {item.sub}
                            </div>
                          </div>
                          <ChevronRight size={15} color="#B8C4D8" />
                        </div>
                      );

                      if (item.href) {
                        return (
                          <Link
                            key={ii}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ display: "block", textDecoration: "none" }}
                          >
                            {inner}
                          </Link>
                        );
                      }
                      return (
                        <div key={ii} onClick={() => scrollTo(item.action!)}>
                          {inner}
                        </div>
                      );
                    })}

                    {si < NAV_SECTIONS.length - 1 && (
                      <div style={{ height: 1, background: "#F1F5F9", margin: "8px 20px 0" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* CTA at bottom */}
              <div style={{
                padding: "16px 20px 32px", flexShrink: 0,
                borderTop: "1px solid #DDE5F0",
              }}>
                <button
                  onClick={() => scrollTo("services")}
                  style={{
                    width: "100%", padding: "14px",
                    background: "linear-gradient(135deg, #3EBF8A, #2DA374)",
                    color: "#fff", border: "none", borderRadius: 14,
                    fontSize: 15, fontWeight: 800, cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(62,191,138,0.35)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  無料でサービスを比較する
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 4, marginTop: 10,
                }}>
                  <PhoneCall size={12} color="#6B7A99" />
                  <span style={{ fontSize: 11, color: "#6B7A99" }}>完全無料・最短3分</span>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
