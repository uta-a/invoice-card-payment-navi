// ============================================================
// 請求書カード払いサービス データ定義
// ※ XXXX は実データ入力前のプレースホルダー
// ============================================================

export type ScreeningLevel = "やさしい" | "普通" | "やや厳しい";

export type ServiceScores = {
  fee: number;        // 手数料満足度 (1-5)
  speed: number;      // 審査スピード (1-5)
  support: number;    // サポート対応 (1-5)
  usability: number;  // 使いやすさ (1-5)
};

export type RankByCategory = {
  overall: number;    // 総合
  fee: number;        // 手数料の安さ
  payment: number;    // 入金速度
  screening: number;  // 審査のしやすさ
};

export type Service = {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string;
  officialUrl: string;
  resourceUrl: string;    // 資料請求URL
  catchphrase: string;    // キャッチコピー
  description: string;    // サービス説明文

  // 評価
  rating: number;
  reviewCount: number;
  scores: ServiceScores;
  ranks: RankByCategory;

  // サービス概要
  fee: string;                    // "X.X%〜"
  feeDetail: string;              // 手数料の詳細説明
  paymentSpeed: string;           // "最短即日"
  paymentSpeedDetail: string;
  minAmount: string;              // "XXXX円〜"
  maxAmount: string;              // "XXXX万円"
  screeningLevel: ScreeningLevel;
  screeningTime: string;          // "最短XX時間"

  // 特徴
  badges: string[];               // ["即日入金", "オンライン完結"]
  targetTags: string[];           // ["法人向け", "個人事業主OK"]
  merits: string[];               // メリット3〜5点
  demerits: string[];             // デメリット1〜2点
  recommendFor: string;           // こんな方におすすめ
};

// ============================================================
// サービスデータ（XXXXプレースホルダー — 実データに要差し替え）
// ============================================================
export const services: Service[] = [
  {
    id: "service-a",
    name: "XXXX請求書カード払い",
    shortName: "XXXX",
    logoUrl: "/images/logo-a.png",
    officialUrl: "https://example.com/service-a",
    resourceUrl: "https://example.com/service-a/contact",
    catchphrase: "業界最安水準の手数料で資金繰りをスムーズに",
    description:
      "XXXXは、請求書をクレジットカードで決済できるサービスです。最短即日での入金対応と、業界トップクラスの低手数料が特徴。法人・個人事業主どちらにも対応しています。",
    rating: 4.8,
    reviewCount: 312,
    scores: { fee: 4.9, speed: 4.7, support: 4.8, usability: 4.7 },
    ranks: { overall: 1, fee: 1, payment: 2, screening: 2 },
    fee: "X.X%〜",
    feeDetail: "利用金額・カードの種類によって変動。詳細は公式サイトをご確認ください。",
    paymentSpeed: "最短即日",
    paymentSpeedDetail: "午前中の申請で当日入金可能（審査通過が条件）",
    minAmount: "XXXX円〜",
    maxAmount: "XXXX万円",
    screeningLevel: "やさしい",
    screeningTime: "最短XX分",
    badges: ["即日入金", "オンライン完結", "個人事業主OK"],
    targetTags: ["法人向け", "個人事業主OK", "スタートアップ"],
    merits: [
      "業界最安水準の手数料X.X%〜",
      "最短即日入金で急な資金需要に対応",
      "オンラインのみで完結。来店不要",
      "審査が柔軟で創業間もない事業主にも対応",
    ],
    demerits: [
      "利用可能カードに制限あり（詳細は公式サイト参照）",
      "高額案件は審査に時間がかかる場合あり",
    ],
    recommendFor: "手数料を最重視する方・初めて利用する個人事業主の方",
  },
  {
    id: "service-b",
    name: "XXXX支払いサービス",
    shortName: "XXXX",
    logoUrl: "/images/logo-b.png",
    officialUrl: "https://example.com/service-b",
    resourceUrl: "https://example.com/service-b/contact",
    catchphrase: "圧倒的な入金スピード。翌営業日には資金調達完了",
    description:
      "XXXXは、最速翌営業日入金を実現する請求書カード払いサービスです。独自の審査システムにより、スピーディーかつ柔軟な審査対応が強みです。",
    rating: 4.6,
    reviewCount: 245,
    scores: { fee: 4.2, speed: 4.9, support: 4.6, usability: 4.7 },
    ranks: { overall: 2, fee: 4, payment: 1, screening: 3 },
    fee: "X.X%〜",
    feeDetail: "スピード重視のため標準より若干高め。即日入金保証オプションあり。",
    paymentSpeed: "最短翌営業日",
    paymentSpeedDetail: "審査通過後、翌営業日の午前中に入金完了",
    minAmount: "XXXX円〜",
    maxAmount: "XXXX万円",
    screeningLevel: "やさしい",
    screeningTime: "最短XX時間",
    badges: ["翌日入金", "スマホ完結", "24時間申請"],
    targetTags: ["法人向け", "個人事業主OK", "急ぎの方"],
    merits: [
      "審査最短XX時間、入金最短翌営業日の業界最速クラス",
      "スマートフォンのみで申請から入金まで完結",
      "24時間365日申請受付",
      "利用限度額が大きく高額案件にも対応",
    ],
    demerits: [
      "手数料は他社より若干高め",
      "初回利用時は審査に時間がかかる場合あり",
    ],
    recommendFor: "とにかく早く資金が必要な方・繁忙期の資金繰り改善に",
  },
  {
    id: "service-c",
    name: "XXXX請求書払い",
    shortName: "XXXX",
    logoUrl: "/images/logo-c.png",
    officialUrl: "https://example.com/service-c",
    resourceUrl: "https://example.com/service-c/contact",
    catchphrase: "丁寧なサポートで初めての方も安心",
    description:
      "XXXXは、初めて請求書カード払いを利用する方でも安心して使えるよう、専任サポートチームが導入から運用まで伴走するサービスです。",
    rating: 4.5,
    reviewCount: 198,
    scores: { fee: 4.3, speed: 4.4, support: 4.9, usability: 4.6 },
    ranks: { overall: 3, fee: 3, payment: 3, screening: 4 },
    fee: "X.X%〜",
    feeDetail: "利用金額に応じた段階的な手数料体系。まとめて利用でお得に。",
    paymentSpeed: "最短2営業日",
    paymentSpeedDetail: "審査後2営業日以内に指定口座へ入金",
    minAmount: "XXXX円〜",
    maxAmount: "XXXX万円",
    screeningLevel: "普通",
    screeningTime: "最短XX時間",
    badges: ["専任サポート", "複数枚対応", "法人特化"],
    targetTags: ["法人向け", "初めての方", "高額案件"],
    merits: [
      "専任サポートが申請から入金まで徹底サポート",
      "複数クレジットカードの組み合わせ利用が可能",
      "大口案件に強く、上限額が高い",
      "利用実績に応じて手数料が下がる優遇制度あり",
    ],
    demerits: [
      "入金スピードは他社より遅め（2営業日〜）",
      "個人事業主は一部サービス制限あり",
    ],
    recommendFor: "初めて利用する方・サポートを重視する法人の方",
  },
  {
    id: "service-d",
    name: "XXXXペイレーター",
    shortName: "XXXX",
    logoUrl: "/images/logo-d.png",
    officialUrl: "https://example.com/service-d",
    resourceUrl: "https://example.com/service-d/contact",
    catchphrase: "審査不要！誰でもカンタンに請求書払いを後払いに",
    description:
      "XXXXペイレーターは、与信審査なしで請求書をカード払いに変換できる画期的なサービス。創業直後や信用情報に不安のある方でも安心して利用できます。",
    rating: 4.3,
    reviewCount: 156,
    scores: { fee: 3.8, speed: 4.3, support: 4.2, usability: 4.8 },
    ranks: { overall: 4, fee: 6, payment: 4, screening: 1 },
    fee: "X.X%〜",
    feeDetail: "与信不要のため手数料はやや高め。利用回数に応じた割引あり。",
    paymentSpeed: "最短3営業日",
    paymentSpeedDetail: "本人確認書類提出後、最短3営業日で入金",
    minAmount: "XXXX円〜",
    maxAmount: "XXXX万円",
    screeningLevel: "やさしい",
    screeningTime: "審査なし",
    badges: ["審査なし", "創業直後OK", "個人事業主OK"],
    targetTags: ["個人事業主OK", "創業間もない方", "信用情報に不安"],
    merits: [
      "与信審査不要で誰でも利用可能",
      "創業直後・赤字決算でも利用可能",
      "UIが直感的でスマホから簡単申請",
      "少額から利用可能で気軽に試せる",
    ],
    demerits: [
      "手数料が他社と比べてやや高め",
      "利用上限額が比較的低い",
    ],
    recommendFor: "審査に不安のある方・創業直後の個人事業主の方",
  },
  {
    id: "service-e",
    name: "XXXX BizPay",
    shortName: "XXXX",
    logoUrl: "/images/logo-e.png",
    officialUrl: "https://example.com/service-e",
    resourceUrl: "https://example.com/service-e/contact",
    catchphrase: "会計ソフト連携でバックオフィスをまるごと効率化",
    description:
      "XXXX BizPayは、主要会計ソフト・クラウド経費精算ツールと連携した請求書カード払いサービス。請求書管理から支払い、仕訳まで一括で効率化できます。",
    rating: 4.2,
    reviewCount: 134,
    scores: { fee: 4.0, speed: 4.1, support: 4.3, usability: 4.9 },
    ranks: { overall: 5, fee: 5, payment: 5, screening: 5 },
    fee: "X.X%〜",
    feeDetail: "会計ソフト連携プランでさらにお得な手数料で利用可能。",
    paymentSpeed: "最短3営業日",
    paymentSpeedDetail: "会計ソフト連携により自動仕訳と同時入金処理が可能",
    minAmount: "XXXX円〜",
    maxAmount: "XXXX万円",
    screeningLevel: "普通",
    screeningTime: "最短XX時間",
    badges: ["会計連携", "自動仕訳", "経費精算対応"],
    targetTags: ["法人向け", "バックオフィス効率化", "経理担当者"],
    merits: [
      "主要会計ソフト（XXXX, XXXX等）と自動連携",
      "請求書の登録から支払い・仕訳まで一元管理",
      "経費精算ツールとの連携でバックオフィス全体を効率化",
      "複数社の請求書をまとめて一括処理可能",
    ],
    demerits: [
      "初期設定の連携作業が必要",
      "入金スピードは業界平均程度",
    ],
    recommendFor: "バックオフィス効率化を重視する法人・経理担当者がいる企業",
  },
  {
    id: "service-f",
    name: "XXXX即払い",
    shortName: "XXXX",
    logoUrl: "/images/logo-f.png",
    officialUrl: "https://example.com/service-f",
    resourceUrl: "https://example.com/service-f/contact",
    catchphrase: "高額請求書に特化。まとめて大口決済で有利な条件",
    description:
      "XXXX即払いは、100万円以上の高額請求書に特化した請求書カード払いサービス。大口ユーザー向けの特別手数料と、専任の法人サポートが強みです。",
    rating: 4.0,
    reviewCount: 98,
    scores: { fee: 4.5, speed: 3.8, support: 4.4, usability: 3.9 },
    ranks: { overall: 6, fee: 2, payment: 6, screening: 6 },
    fee: "X.X%〜",
    feeDetail: "高額・大口向けのため、利用金額が高いほど手数料率が下がる。",
    paymentSpeed: "最短5営業日",
    paymentSpeedDetail: "高額審査のため入金まで5営業日程度かかる場合あり",
    minAmount: "XXXX万円〜",
    maxAmount: "XXXX万円以上",
    screeningLevel: "やや厳しい",
    screeningTime: "最短XX時間",
    badges: ["高額対応", "大口特別レート", "法人専用"],
    targetTags: ["法人向け", "高額案件", "製造業・建設業"],
    merits: [
      "100万円以上の大口案件で業界最安水準の手数料",
      "専任の法人担当が付き、個別条件の交渉が可能",
      "上限額なしで超大型案件にも対応",
      "製造業・建設業など業種特化のノウハウあり",
    ],
    demerits: [
      "最低利用金額が高く、少額案件には不向き",
      "審査が厳しめで個人事業主は利用不可",
    ],
    recommendFor: "高額請求書を定期的に処理する法人・製造業・建設業の方",
  },
];

// ランキングデータ取得ヘルパー
export function getServicesByRank(category: keyof RankByCategory): Service[] {
  return [...services].sort((a, b) => a.ranks[category] - b.ranks[category]);
}

export function getTop3Services(): Service[] {
  return getServicesByRank("overall").slice(0, 3);
}
