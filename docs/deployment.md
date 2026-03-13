# デプロイ・初期設定ガイド

## 構成概要

このプロジェクトは**フロントエンド（SPA）**と**バックエンド（PHP API）**で構成されている。

| 項目 | 技術 | デプロイ先 |
|------|------|------------|
| フロントエンド | Vite + React（静的ビルド） | Netlify（または Apache サーバー） |
| バックエンド | PHP（素の PHP） | ロリポップ等の PHP 対応レンタルサーバー |
| データベース | MySQL（InnoDB, utf8mb4） | レンタルサーバー付属の MySQL |

---

## 1. フロントエンドのデプロイ

### ビルド

```bash
npm install
npm run build
```

`dist/` ディレクトリに静的ファイルが生成される。

### Netlify にデプロイする場合

- `dist/` をデプロイディレクトリに指定
- `public/_redirects` が `dist/` にコピーされ、SPA フォールバック（`/* → /index.html 200`）が有効になる
- API は別サーバーなので、環境変数 `VITE_API_URL` でAPIのURLを指定する（後述）

### Apache サーバーにデプロイする場合

- `dist/` の中身をドキュメントルートに配置
- `public/.htaccess` を `dist/` にコピーして配置（ビルド時に自動コピーされる）
- `.htaccess` が API パス（`/api/`）を除外し、それ以外を `index.html` にフォールバックする
- `mod_rewrite` が有効であること

### 環境変数（ビルド時）

| 変数名 | 用途 | デフォルト値 |
|--------|------|-------------|
| `VITE_API_URL` | レビュー投稿APIのURL | `/api/submit-review.php` |

フロントとAPIが別ドメインの場合、ビルド時に指定する：

```bash
VITE_API_URL=https://api.example.com/api/submit-review.php npm run build
```

---

## 2. バックエンド（API）のデプロイ

### デプロイ対象ファイル

`api/` ディレクトリ内の以下2ファイルをサーバーにアップロードする：

```
api/
├── config.php          ← DB接続情報・設定（★要編集）
└── submit-review.php   ← レビュー投稿エンドポイント
```

`api/schema.sql` はDB初期化用で、サーバーにはアップロード不要。

### 配置場所

フロントエンドと同一サーバーの場合：
```
ドキュメントルート/
├── index.html
├── assets/
├── .htaccess
└── api/
    ├── config.php
    └── submit-review.php
```

別サーバーの場合は任意のパスに配置し、`VITE_API_URL` をそのURLに合わせる。

### config.php の編集

ロリポップの管理画面 → 「サーバーの管理・設定」→「データベース」から接続情報を取得し、以下を書き換える：

```php
define('DB_HOST', 'mysql○○○.phy.lolipop.lan');  // ← DB ホスト名
define('DB_NAME', 'LAA○○○○○○○-review');           // ← DB 名
define('DB_USER', 'LAA○○○○○○○');                   // ← DB ユーザー名
define('DB_PASS', '********');                      // ← DB パスワード

define('ALLOWED_ORIGIN', 'https://your-domain.com'); // ← フロントエンドの本番ドメイン
```

### CORS 設定

`ALLOWED_ORIGIN` にフロントエンドの本番ドメイン（`https://～`）を正確に設定する。末尾スラッシュなし。

フロントとAPIが同一ドメインの場合でも設定は必要（`Access-Control-Allow-Origin` ヘッダーとして出力される）。

---

## 3. データベースの初期設定

### 手順

1. ロリポップ管理画面からデータベースを作成（または既存のDBを使用）
2. phpMyAdmin にログイン
3. 「SQL」タブを開き、`api/schema.sql` の内容を貼り付けて実行

### schema.sql の内容（実行するSQL）

```sql
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,

  q1_service_used VARCHAR(100) NOT NULL,
  q2_business_type VARCHAR(50) NOT NULL,
  q3_usage_purpose VARCHAR(100) NOT NULL,
  q4_compared_services JSON,
  q5_selection_reasons JSON,
  q6_urgency VARCHAR(50) NOT NULL,
  q7_impression_change VARCHAR(50) NOT NULL,

  q8_rating_overall TINYINT NOT NULL,
  q8_rating_fee TINYINT NOT NULL,
  q8_rating_speed TINYINT NOT NULL,
  q8_rating_screening TINYINT NOT NULL,
  q8_rating_simplicity TINYINT NOT NULL,
  q8_rating_support TINYINT NOT NULL,
  q9_fee_percentage VARCHAR(20) NOT NULL,
  q10_additional_costs VARCHAR(50) NOT NULL,
  q10_additional_costs_detail TEXT,
  q11_screening_time VARCHAR(50) NOT NULL,
  q11_payment_time VARCHAR(50) NOT NULL,
  q12_card_brand VARCHAR(50) NOT NULL,

  q13_concerns JSON,
  q13_good_points JSON,
  q13_free_text TEXT,
  q14_improvements JSON,
  q14_free_text TEXT,
  q15_experience TEXT NOT NULL,
  q16_recommendation TEXT NOT NULL,

  q17_future_use VARCHAR(50) NOT NULL,
  attr_company_name VARCHAR(200) NOT NULL,
  attr_industry VARCHAR(50) NOT NULL,
  attr_prefecture VARCHAR(20),
  attr_usage_period VARCHAR(50) NOT NULL,
  attr_usage_status VARCHAR(50) NOT NULL,
  attr_usage_amount VARCHAR(50) NOT NULL,
  attr_online_complete VARCHAR(10),

  consent_privacy BOOLEAN DEFAULT FALSE,
  consent_guideline BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,

  INDEX idx_service (q1_service_used),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

`IF NOT EXISTS` 付きなので、既にテーブルがあれば何もしない。

### MySQL のバージョン要件

- MySQL 5.7 以上（JSON型カラムのため）
- ロリポップのMySQLは 5.7 系なので問題なし

---

## 4. デプロイ後の確認

### フロントエンド

- サイトにアクセスして各ページが表示されるか
- `/review` 等のサブページで直接アクセスしても 404 にならないか（SPA フォールバックの確認）

### API

ターミナルから直接APIを叩いて疎通確認：

```bash
curl -X POST https://your-domain.com/api/submit-review.php \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

正常なら `400` + `"必須項目が入力されていません"` が返る（バリデーションエラー）。
DB接続に失敗すると `500` + `"データベースエラーが発生しました"` が返る。

### よくある問題

| 症状 | 原因 | 対処 |
|------|------|------|
| API が 500 を返す | DB 接続情報が間違っている | config.php の値を確認 |
| CORS エラー（ブラウザコンソール） | `ALLOWED_ORIGIN` が一致していない | ドメインを正確に設定（`https://` 付き、末尾スラッシュなし） |
| SPA で直接URL アクセスが 404 | `.htaccess` / `_redirects` が効いていない | mod_rewrite 有効化、またはファイル配置を確認 |
| JSON型カラムのエラー | MySQL 5.6 以下を使用 | MySQL 5.7 以上にアップグレード |

---

## 5. 設定値一覧

| 定数 | 値 | 説明 |
|------|----|------|
| `RATE_LIMIT_SECONDS` | 60 | 連続送信防止（同一IPから60秒以内の再送信をブロック） |
| `DUPLICATE_BLOCK_HOURS` | 24 | 重複投稿防止（同一IPから24時間以内の再投稿をブロック） |
