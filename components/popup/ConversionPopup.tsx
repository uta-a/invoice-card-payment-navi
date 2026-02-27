"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Check } from "lucide-react";

const SCROLL_THRESHOLD = 30;
const DELAY_MS = 4000;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type PopupState = "hidden" | "expanded" | "minimized";

export default function ConversionPopup() {
  const [state, setState] = useState<PopupState>("hidden");
  const [hasTriggered, setHasTriggered] = useState(false);

  const show = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);
    setState("expanded");
  }, [hasTriggered]);

  useEffect(() => {
    const timer = setTimeout(show, DELAY_MS);
    return () => clearTimeout(timer);
  }, [show]);

  const handleScroll = useCallback(() => {
    if (hasTriggered) return;
    const scrollY = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    if ((scrollY / total) * 100 >= SCROLL_THRESHOLD) show();
  }, [hasTriggered, show]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleMinimize = useCallback(() => {
    setState("minimized");
  }, []);

  const handleExpand = useCallback(() => {
    setState("expanded");
  }, []);

  const handleScrollToServices = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* フル展開ポップアップ */}
      <AnimatePresence>
        {state === "expanded" && (
          <motion.div
            key="popup-full"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="popup-expanded fixed bottom-6 right-6 z-40 bg-white border border-[#DDE5F0] rounded-[20px] overflow-hidden"
            style={{
              width: 360,
              boxShadow: "0 8px 40px rgba(26,43,74,0.18)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="資金繰りサポートのご案内"
          >
            {/* アクセントストライプ */}
            <div
              className="h-1"
              style={{ background: "linear-gradient(to right, #2AABE2, #3EBF8A)" }}
            />

            <div className="p-5 pt-[18px]">
              {/* ヘッダー行 */}
              <div className="flex items-start justify-between mb-2 gap-2">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <Lightbulb size={18} className="flex-shrink-0 text-[#F5A623]" aria-hidden="true" />
                  <span className="text-[15px] font-bold text-[#1A2B4A] leading-snug">
                    資金繰りでお困りですか？
                  </span>
                </div>

                <button
                  onClick={handleMinimize}
                  title="最小化"
                  className="popup-close-btn"
                  aria-label="最小化"
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* 本文 */}
              <p className="text-[13px] text-[#6B7A99] leading-relaxed mb-3.5">
                請求書をカード払いに変えて支払いを後ろ倒しに。今すぐ最適なサービスを見つけましょう。
              </p>

              {/* CTAボタン群 */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleScrollToServices}
                  className="popup-cta-primary"
                >
                  おすすめサービスを比較する
                </button>

                <button
                  onClick={handleScrollToServices}
                  className="popup-cta-secondary"
                >
                  無料で資料請求する
                </button>
              </div>

              {/* 信頼テキスト */}
              <p className="text-[11px] text-[#6B7A99] text-center mt-3 leading-normal">
                <Check size={12} strokeWidth={3} className="inline align-middle" /> 完全無料 <Check size={12} strokeWidth={3} className="inline align-middle" /> 最短3分で完了
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ミニタブ */}
      <AnimatePresence>
        {state === "minimized" && (
          <motion.button
            key="popup-mini"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={handleExpand}
            aria-label="比較ツールを開く"
            title="もう一度比較する"
            className="fixed right-0 bottom-20 z-40 cursor-pointer border-none py-3.5 flex flex-col items-center justify-center gap-1.5 text-white"
            style={{
              width: 38,
              borderRadius: "12px 0 0 12px",
              background: "linear-gradient(180deg, #2AABE2 0%, #3EBF8A 100%)",
              boxShadow: "-4px 4px 20px rgba(42,171,226,0.30)",
            }}
            whileHover={{ width: 46 }}
            whileTap={{ scale: 0.96 }}
          >
            <Lightbulb size={16} className="text-white" aria-hidden="true" />
            <span
              className="text-[10px] font-bold text-white leading-none"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                letterSpacing: "0.08em",
              }}
            >
              比較する
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
