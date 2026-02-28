import { usePageMeta } from "../hooks/usePageMeta";
import Hero from "@/components/lp/Hero";
import TrustBar from "@/components/lp/TrustBar";
import Top3 from "@/components/lp/Top3";
import RankingTabs from "@/components/lp/RankingTabs";
import ServiceCards from "@/components/lp/ServiceCards";

export default function HomePage() {
  usePageMeta(
    "請求書カード払いナビ｜おすすめサービス比較ランキング",
    "請求書をクレジットカードで支払いたい小規模法人・個人事業主向けの専門比較サイト。手数料・審査難易度・入金速度を徹底比較し、あなたに最適なサービスをご提案します。",
  );

  return (
    <>
      {/* ファーストビュー */}
      <Hero />

      {/* 安心感バー（実績数値）*/}
      <TrustBar />

      {/* おすすめ3選（即判断ゾーン）*/}
      <Top3 />

      {/* ポイント別ランキング */}
      <RankingTabs />

      {/* おすすめサービス詳細（総合順位順）*/}
      <ServiceCards />
    </>
  );
}
