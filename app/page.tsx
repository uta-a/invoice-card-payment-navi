import Hero from "@/components/lp/Hero";
import TrustBar from "@/components/lp/TrustBar";
import Top3 from "@/components/lp/Top3";
import RankingTabs from "@/components/lp/RankingTabs";
import ServiceCards from "@/components/lp/ServiceCards";

export default function Home() {
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
