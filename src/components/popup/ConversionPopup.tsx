import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Check } from "lucide-react";

const SCROLL_THRESHOLD = 30; // スクロール率(%)でも表示
const DELAY_MS = 4000;       // ページ読み込み後4秒で自動表示
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STORAGE_KEY = "popup_dismissed";

// ポップアップの3状態
type PopupState = "hidden" | "expanded" | "minimized";

export default function ConversionPopup() {
  const [state, setState] = useState<PopupState>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true" ? "minimized" : "hidden";
    } catch {
      return "hidden";
    }
  });
  const [hasTriggered, setHasTriggered] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const show = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);
    setState("expanded");
  }, [hasTriggered]);

  // タイマートリガー（4秒後）
  useEffect(() => {
    const timer = setTimeout(show, DELAY_MS);
    return () => clearTimeout(timer);
  }, [show]);

  // スクロールトリガー（30%以上）
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

  // バツ → ミニタブへ
  const handleMinimize = useCallback(() => {
    setState("minimized");
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  // タブクリック → 再展開
  const handleExpand = useCallback(() => {
    setState("expanded");
  }, []);

  const handleScrollToServices = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ── フル展開ポップアップ ──────────────────────────────────────────── */}
      <AnimatePresence>
        {state === "expanded" && (
          <motion.div
            key="popup-full"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="popup-expanded"
            style={{
              position: "fixed", bottom: 24, right: 24,
              width: 360, zIndex: 40,
              backgroundColor: "#fff",
              border: "1px solid #DDE5F0",
              borderRadius: 20,
              boxShadow: "0 8px 40px rgba(26,43,74,0.18)",
              overflow: "hidden",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="資金繰りサポートのご案内"
          >
            {/* アクセントストライプ */}
            <div style={{
              height: 4,
              background: "linear-gradient(to right, #2AABE2, #3EBF8A)",
            }} />

            <div style={{ padding: "18px 20px 20px" }}>
              {/* ヘッダー行 */}
              <div style={{
                display: "flex", alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 8, gap: 8,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                  <Lightbulb size={18} style={{ flexShrink: 0, color: "#F5A623" }} aria-hidden="true" />
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#1A2B4A", lineHeight: 1.4 }}>
                    資金繰りでお困りですか？
                  </span>
                </div>

                {/* バツボタン（→ミニタブへ） */}
                <button
                  onClick={handleMinimize}
                  title="最小化"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 22, height: 22,
                    background: "#F1F5F9", border: "none",
                    borderRadius: 6, cursor: "pointer",
                    color: "#6B7A99", padding: 0, flexShrink: 0,
                    transition: "background 0.15s, color 0.15s",
                  }}
                  aria-label="最小化"
                  onMouseEnter={(e) => { const b = e.currentTarget as HTMLElement; b.style.background = "#DDE5F0"; b.style.color = "#1A2B4A"; }}
                  onMouseLeave={(e) => { const b = e.currentTarget as HTMLElement; b.style.background = "#F1F5F9"; b.style.color = "#6B7A99"; }}
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* 本文 */}
              <p style={{ fontSize: 13, color: "#6B7A99", lineHeight: 1.7, margin: "0 0 14px 0" }}>
                請求書をカード払いに変えて支払いを後ろ倒しに。今すぐ最適なサービスを見つけましょう。
              </p>

              {/* CTAボタン群 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  onClick={handleScrollToServices}
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "linear-gradient(135deg, #3EBF8A, #2DA374)",
                    color: "#fff", border: "none", borderRadius: 10,
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    lineHeight: 1.4,
                    transition: "opacity 0.15s",
                    boxShadow: "0 3px 10px rgba(62,191,138,0.30)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  おすすめサービスを比較する
                </button>

                <button
                  onClick={handleScrollToServices}
                  style={{
                    width: "100%", padding: "11px 16px",
                    backgroundColor: "transparent",
                    color: "#2AABE2", border: "1.5px solid #2AABE2",
                    borderRadius: 10, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", lineHeight: 1.4,
                    transition: "background-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => { const b = e.currentTarget as HTMLElement; b.style.backgroundColor = "#2AABE2"; b.style.color = "#fff"; }}
                  onMouseLeave={(e) => { const b = e.currentTarget as HTMLElement; b.style.backgroundColor = "transparent"; b.style.color = "#2AABE2"; }}
                >
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }}
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  無料で資料請求する
                </button>
              </div>

              {/* 信頼テキスト */}
              <p style={{ fontSize: 11, color: "#6B7A99", textAlign: "center", margin: "12px 0 0", lineHeight: 1.5 }}>
                <Check size={12} strokeWidth={3} style={{ display: "inline", verticalAlign: "middle" }} /> 完全無料 <Check size={12} strokeWidth={3} style={{ display: "inline", verticalAlign: "middle" }} /> 最短3分で完了
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ミニタブ（右端に常時表示）────────────────────────────────────── */}
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
            style={{
              position: "fixed",
              right: 0,
              bottom: 80,
              zIndex: 40,
              cursor: "pointer",
              border: "none",
              padding: "14px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              width: 38,
              borderRadius: "12px 0 0 12px",
              background: "linear-gradient(180deg, #2AABE2 0%, #3EBF8A 100%)",
              boxShadow: "-4px 4px 20px rgba(42,171,226,0.30)",
              color: "#fff",
            }}
            whileHover={{ width: 46 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* アイコン */}
            <Lightbulb size={16} style={{ color: "#fff" }} aria-hidden="true" />

            {/* 縦書きテキスト */}
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}>
              比較する
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
