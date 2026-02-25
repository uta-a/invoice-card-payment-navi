import type { Metadata } from "next";

export function generateStaticParams() {
  return [{ slug: "what-is-invoice-card-payment" }];
}

export const metadata: Metadata = {
  title: "請求書カード払いとは？仕組みと選び方を解説 | 請求書カード払いナビ",
  description:
    "請求書をクレジットカードで支払う仕組みや、サービス選びのポイントを専門家監修のもと解説します。",
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
