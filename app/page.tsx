import Hero from "@/components/lp/Hero";
import TrustBar from "@/components/lp/TrustBar";
import Top3 from "@/components/lp/Top3";
import RankingTabs from "@/components/lp/RankingTabs";
import ServiceCards from "@/components/lp/ServiceCards";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      {/* ファーストビュー */}
      <Hero />

      <SectionDivider
        variant="wave"
        colorTop="#F0F9FF"
        colorBottom="#FFFFFF"
      />

      {/* 安心感バー（実績数値）*/}
      <TrustBar />

      <SectionDivider
        variant="curve"
        colorTop="#F8FBFF"
        colorBottom="#F0F9FF"
      />

      {/* おすすめ3選（即判断ゾーン）*/}
      <Top3 />

      <SectionDivider
        variant="slant"
        colorTop="#F0F9FF"
        colorBottom="#FFFFFF"
      />

      {/* ポイント別ランキング */}
      <RankingTabs />

      <SectionDivider
        variant="curve"
        colorTop="#FFFFFF"
        colorBottom="#F0F9FF"
      />

      {/* おすすめサービス詳細（総合順位順）*/}
      <ServiceCards />
    </>
  );
}
