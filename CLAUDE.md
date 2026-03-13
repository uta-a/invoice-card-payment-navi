# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

請求書のクレジットカード払いサービスを比較・ランキング形式で紹介するアフィリエイトサイト。中小企業・個人事業主向け。Netlify にデプロイ（`_redirects` で SPA フォールバック設定済み）。

**注意:** サービスデータ (`src/data/services.ts`) は XXXX プレースホルダーのままで、実データ未投入。

## コマンド

```bash
npm run dev      # 開発サーバー (Vite, http://localhost:5173)
npm run build    # tsc -b && vite build (型チェック + ビルド)
npm run preview  # ビルド済みアプリのプレビュー
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

テストフレームワークは未導入。

## 技術スタック

- Vite 6 + React 19 + React Router v7 (BrowserRouter, SPA)
- TypeScript 5 (strict mode)
- Tailwind CSS v4 (@tailwindcss/postcss 経由)
- Framer Motion (アニメーション)
- Lucide React (アイコン)
- フォント: Noto Sans JP (Google Fonts CDN, index.html で読み込み)

**README は Next.js 記載だが、実際は Vite + React Router に移行済み。**

## アーキテクチャ

### ルーティング (SPA)

`src/main.tsx` → `BrowserRouter` → `src/App.tsx` で Routes 定義:
- `/` → `HomePage` (LP: Hero → TrustBar → Top3 → RankingTabs → ServiceCards)
- `/articles` → `ArticlesPage`
- `/articles/:slug` → `ArticleDetailPage`

全ページ共通: `Header` + `Footer` + `ConversionPopup`

### パスエイリアス

`@/` → `src/` (vite.config.ts の alias + tsconfig.app.json の paths で設定)

### デザインシステム

`src/index.css` に CSS 変数としてカラーパレット・影・角丸を定義 (`@theme inline` ブロック)。Tailwind v4 のテーマトークンとして利用可能。

主要カラー:
- Primary (水色): `#2AABE2`
- Secondary (薄緑): `#3EBF8A`
- Dark (テキスト): `#1A2B4A`

### データフロー

`src/data/services.ts` に全サービスデータ (`Service[]`) とヘルパー関数を定義。コンポーネントが直接 import して使用（API 通信なし、完全静的データ）。

### SEO

SPA のため `usePageMeta` フックで `document.title` と meta description を動的に更新。初期値は `index.html` に記載。
