"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Trophy, FileText, Percent, Zap, ClipboardCheck,
  ChevronRight, PhoneCall
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || mobileMenuOpen ? "#ffffff" : "rgba(255,255,255,0.72)",
          boxShadow: scrolled ? "0 2px 12px rgba(42,171,226,0.10)" : "none",
        }}
      >
        <div className="flex items-center justify-between mx-auto max-w-[1200px] h-16 px-6">
          {/* Logo */}
          <Link href="/" className="no-underline flex-shrink-0">
            <div className="flex flex-col gap-px">
              <span className="text-lg font-bold text-[#2AABE2] leading-tight tracking-tight">
                請求書カード払いナビ
              </span>
              <span className="text-[0.6875rem] text-[#6B7A99] leading-none tracking-wider">
                専門比較サイト
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav flex items-center gap-8">
            {[
              { label: "おすすめランキング", action: "ranking" },
              { label: "サービス比較",       action: "services" },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={() => scrollTo(action)}
                className="header-nav-btn"
              >
                {label}
              </button>
            ))}
            <Link
              href="/articles"
              className="header-nav-btn no-underline"
            >
              記事
            </Link>
            <button
              onClick={() => scrollTo("services")}
              className="header-cta-btn"
            >
              無料で比較する
            </button>
          </nav>

          {/* Hamburger button */}
          <button
            className="mobile-hamburger flex items-center justify-center rounded-[10px] cursor-pointer p-1.5 transition-colors duration-200"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={mobileMenuOpen}
            style={{
              background: mobileMenuOpen ? "#F0F9FF" : "none",
              border: mobileMenuOpen ? "1px solid #DDE5F0" : "none",
              color: "#1A2B4A",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Drawer overlay */}
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
              className="fixed inset-0 z-[48] md:hidden"
              style={{
                background: "rgba(26,43,74,0.35)",
                backdropFilter: "blur(2px)",
              }}
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: EASE }}
              aria-label="モバイルナビゲーション"
              className="fixed top-0 right-0 bottom-0 z-[49] flex flex-col overflow-y-auto md:hidden"
              style={{
                width: "min(320px, 88vw)",
                background: "#fff",
                boxShadow: "-8px 0 40px rgba(26,43,74,0.15)",
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 flex-shrink-0 border-b border-[#DDE5F0]">
                <span className="text-sm font-bold text-[#6B7A99] tracking-wider">
                  MENU
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer border-none"
                  style={{ background: "#F1F5F9", color: "#6B7A99" }}
                  aria-label="メニューを閉じる"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sections */}
              <div className="flex-1 py-3 pb-5">
                {NAV_SECTIONS.map((section, si) => (
                  <div key={si} className="mb-2">
                    <div className="text-[10px] font-bold tracking-widest text-[#B8C4D8] px-5 pt-2.5 pb-1.5 uppercase">
                      {section.label}
                    </div>

                    {section.items.map((item, ii) => {
                      const Icon = item.icon;
                      const inner = (
                        <div className="flex items-center gap-3 py-[11px] px-5 cursor-pointer mobile-menu-item">
                          <div
                            className="w-[38px] h-[38px] rounded-[10px] flex-shrink-0 flex items-center justify-center"
                            style={{ background: "#E8F6FD" }}
                          >
                            <Icon size={18} color="#2AABE2" strokeWidth={1.75} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-[#1A2B4A] leading-tight">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-[#6B7A99] mt-px">
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
                            className="block no-underline"
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
                      <div className="h-px mx-5 mt-2" style={{ background: "#F1F5F9" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* CTA at bottom */}
              <div className="px-5 pt-4 pb-8 flex-shrink-0 border-t border-[#DDE5F0]">
                <button
                  onClick={() => scrollTo("services")}
                  className="w-full py-3.5 flex items-center justify-center gap-1.5 border-none rounded-[14px] text-[15px] font-extrabold cursor-pointer text-white"
                  style={{
                    background: "linear-gradient(135deg, #3EBF8A, #2DA374)",
                    boxShadow: "0 4px 16px rgba(62,191,138,0.35)",
                  }}
                >
                  無料でサービスを比較する
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
                <div className="flex items-center justify-center gap-1 mt-2.5">
                  <PhoneCall size={12} color="#6B7A99" />
                  <span className="text-[11px] text-[#6B7A99]">完全無料・最短3分</span>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
