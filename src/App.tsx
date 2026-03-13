import { Routes, Route } from "react-router-dom";
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

export default function App() {
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
        </Routes>
      </main>
      <Footer />
      <ConversionPopup />
    </>
  );
}
