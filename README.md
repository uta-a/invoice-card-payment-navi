# 請求書カード払いナビ

請求書のクレジットカード払いサービスを比較・ランキング形式で紹介するWebサイトです。
中小企業や個人事業主が最適なサービスを見つけられるよう、手数料・入金スピード・審査難易度などの観点から比較情報を提供します。

## 主な機能

- **サービスランキング** — 総合・手数料・入金スピード・審査の4カテゴリでタブ切り替え比較
- **TOP3 おすすめ表示** — 編集部おすすめの上位3サービスをハイライト
- **サービス詳細カード** — 6サービスのスコア・メリット/デメリット・対象ユーザーを一覧表示
- **記事ページ** — 請求書カード払いに関する解説記事の一覧・詳細
- **コンバージョンポップアップ** — スクロールまたは一定時間経過で表示されるCTA
- **レスポンシブ対応** — モバイルドロワーメニュー付きのスティッキーヘッダー

## 技術スタック

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| フレームワーク | Next.js (App Router) | 16.1.6 |
| UI | React | 19.2.3 |
| 言語 | TypeScript | 5 |
| スタイリング | Tailwind CSS | 4 |
| アニメーション | Framer Motion | 12.34.3 |
| アイコン | Lucide React | 0.575.0 |
| フォント | Noto Sans JP | Google Fonts |

## ディレクトリ構成

```
app/
├── globals.css                 # デザインシステム（CSS変数・ユーティリティ）
├── layout.tsx                  # ルートレイアウト・メタデータ
├── page.tsx                    # トップページ
└── articles/
    ├── page.tsx                # 記事一覧
    └── [slug]/page.tsx         # 記事詳細

components/
├── layout/
│   ├── Header.tsx              # スティッキーヘッダー・モバイルドロワー
│   └── Footer.tsx              # フッター
├── lp/
│   ├── Hero.tsx                # ヒーローセクション
│   ├── TrustBar.tsx            # 信頼性指標
│   ├── Top3.tsx                # TOP3 おすすめ
│   ├── RankingTabs.tsx         # タブ切り替えランキング
│   └── ServiceCards.tsx        # サービス詳細カード一覧
├── popup/
│   └── ConversionPopup.tsx     # フローティングポップアップ
└── ui/
    ├── Badge.tsx               # バッジ
    ├── CTAButton.tsx           # CTAボタン
    ├── StarRating.tsx          # 星評価
    ├── ScoreBar.tsx            # スコアバー
    └── SectionDecorations.tsx  # 装飾要素

data/
└── services.ts                 # サービスデータ定義
```

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

http://localhost:3000 でアクセスできます。

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーの起動 |
| `npm run build` | プロダクションビルド |
| `npm run start` | ビルド済みアプリの起動 |
| `npm run lint` | ESLint による静的解析 |
