# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

請求書のクレジットカード払いサービスを比較・ランキング形式で紹介するアフィリエイトサイト。中小企業・個人事業主向け。ロリポップVPS にデプロイ（Apache `.htaccess` で SPA フォールバック設定）。

**注意:** サービスデータ (`src/data/services.ts`) は XXXX プレースホルダーのままで、実データ未投入。

**注意:** README.md は Next.js 記載だが、実際は Vite + React Router の SPA 構成。

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
- React Hook Form + Zod (フォームバリデーション)
- フォント: Noto Sans JP (Google Fonts CDN, index.html で読み込み)
- バックエンド API: PHP (MySQL, ロリポップVPS)

## アーキテクチャ

### ルーティング (SPA)

`src/main.tsx` → `BrowserRouter` → `src/App.tsx` で Routes 定義:
- `/` → `HomePage` (LP: Hero → TrustBar → Top3 → RankingTabs → ServiceCards)
- `/articles` → `ArticlesPage`
- `/articles/:slug` → `ArticleDetailPage`
- `/review` → `ReviewPage` (レビュー投稿ウィザード)
- `/review/complete` → `ReviewCompletePage`
- `/privacy` → `PrivacyPolicyPage`
- `/review-guideline` → `ReviewGuidelinePage`
- `/disclaimer` → `DisclaimerPage`
- `/company` → `CompanyPage`
- `/contact` → `ContactPage`
- `*` → `NotFoundPage` (App.tsx 内で定義)

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

### レビューフォーム

マルチステップウィザード形式 (`src/components/review/ReviewWizard.tsx`)。5ステップ (Phase A〜D + 確認) で構成。

- スキーマ: `src/schemas/reviewSchema.ts` — Zod でバリデーション定義。各フェーズのフィールド名は `PHASE_A_FIELDS` 等の定数で管理
- フォーム: React Hook Form (`FormProvider`) + `zodResolver` でステップごとにバリデーション (`trigger`)
- ステップUI: `src/components/review/steps/` に各ステップのコンポーネント
- フィールドUI: `src/components/review/fields/` に再利用可能なフォームフィールドコンポーネント群
- プログレス: `src/components/review/ProgressBar.tsx`
- 送信: `src/lib/submitReview.ts` — 開発時はコンソールログ + モック応答、本番は `VITE_API_URL` へ POST

### バックエンド API (PHP)

`api/` ディレクトリに PHP で実装されたバックエンド。フロントエンドと同一サーバー（ロリポップVPS）にデプロイ。

- `submit-review.php` — レビュー投稿エンドポイント (POST)
- `admin.php` — 管理画面 (PHPセッション認証、CSRF保護)
- `reviews.php` — 回答一覧表示
- `config.php` — DB接続情報・設定定数 (**Git管理外にすること**)
- `schema.sql` — テーブル定義SQL
- `setup.php` — 初回DBセットアップ用 (完了後は削除)

セットアップ手順の詳細は `api/SETUP.md` を参照。

### 環境変数

- `VITE_API_URL` — レビュー送信先 API エンドポイント（未設定時は `/api/submit-review.php`）

### SEO

SPA のため `src/hooks/usePageMeta.ts` フックで `document.title` と meta description を動的に更新。初期値は `index.html` に記載。

### デプロイ

ロリポップVPS (Apache) にデプロイ。`npm run build` で `dist/` を生成し、`rsync` でドキュメントルートに配置。`.htaccess` による SPA フォールバック設定あり。詳細は `docs/deployment.md` および `api/SETUP.md` を参照。
