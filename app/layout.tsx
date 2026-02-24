import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConversionPopup from "@/components/popup/ConversionPopup";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "請求書カード払いナビ｜おすすめサービス比較ランキング",
  description:
    "請求書をクレジットカードで支払いたい小規模法人・個人事業主向けの専門比較サイト。手数料・審査難易度・入金速度を徹底比較し、あなたに最適なサービスをご提案します。",
  keywords: "請求書カード払い, 請求書払い, クレジットカード, 資金繰り, 比較, ランキング",
  openGraph: {
    title: "請求書カード払いナビ｜おすすめサービス比較ランキング",
    description:
      "請求書をクレジットカードで支払いたい事業主向け専門比較サイト。手数料・審査・入金速度を徹底比較。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="antialiased" style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ConversionPopup />
      </body>
    </html>
  );
}
