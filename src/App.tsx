import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConversionPopup from "@/components/popup/ConversionPopup";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ReviewPage from "./pages/ReviewPage";
import ReviewCompletePage from "./pages/ReviewCompletePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ReviewGuidelinePage from "./pages/ReviewGuidelinePage";
import DisclaimerPage from "./pages/DisclaimerPage";
import CompanyPage from "./pages/CompanyPage";
import ContactPage from "./pages/ContactPage";

/** ページ遷移後にハッシュ先へスクロール + ページ先頭へのスクロール復元 */
function useScrollBehavior() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // DOM更新後にスクロール
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
    // ハッシュなしのページ遷移は先頭へ
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "5rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1A2B4A", marginBottom: "1rem" }}>
        404 — ページが見つかりません
      </h1>
      <p style={{ fontSize: "1rem", color: "#6B7A99", marginBottom: "2rem" }}>
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          background: "#2AABE2",
          color: "#fff",
          padding: "0.75rem 2rem",
          borderRadius: 9999,
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        トップページへ戻る
      </Link>
    </div>
  );
}

export default function App() {
  useScrollBehavior();

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/review/complete" element={<ReviewCompletePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/review-guideline" element={<ReviewGuidelinePage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ConversionPopup />
    </>
  );
}
