レビュー投稿API セットアップ手順書（ロリポップVPS + Apache）
=============================================================

前提条件
--------
- ロリポップVPS（Apache + PHP + MySQL が利用可能）
- Node.js（ビルド用、ローカルまたはVPS上）
- フロントエンド（Viteビルド）とAPI（PHP）を同一サーバーにデプロイする構成


1. データベースの作成
---------------------

MySQL CLI で作成する場合:

  mysql -u root -p
  CREATE DATABASE review_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  CREATE USER 'review_user'@'localhost' IDENTIFIED BY '任意の強力なパスワード';
  GRANT ALL PRIVILEGES ON review_db.* TO 'review_user'@'localhost';
  FLUSH PRIVILEGES;

phpMyAdmin から作成する場合:
1) phpMyAdmin にログイン
2) 「データベース」タブで新しいデータベースを作成（照合順序: utf8mb4_unicode_ci）
3) ユーザーアカウントを作成し、作成したDBへの権限を付与

以下の情報を控えておく:
  - ホスト: localhost
  - データベース名（例: review_db）
  - ユーザー名（例: review_user）
  - パスワード


2. テーブルの作成
-----------------

MySQL CLI の場合:

  mysql -u review_user -p review_db < /path/to/api/schema.sql

phpMyAdmin の場合:
1) 作成したデータベースを選択
2) 「SQL」タブを開く
3) api/schema.sql の内容を貼り付けて実行

テーブル reviews が作成され、以下のカラムが含まれることを確認:
  - id (AUTO_INCREMENT, PRIMARY KEY)
  - created_at, ip_address, user_agent
  - q1〜q17 の回答カラム群
  - attr_* の属性カラム群
  - consent_privacy, consent_guideline, is_published
  - INDEX: idx_service, idx_created


3. config.php の設定
--------------------

api/config.php を開き、手順1で設定した情報に書き換える。

  DB_HOST  → localhost
  DB_NAME  → データベース名（例: review_db）
  DB_USER  → ユーザー名（例: review_user）
  DB_PASS  → パスワード

  ALLOWED_ORIGIN → 本番ドメイン（例: https://example.com）
                    ※同一オリジンなので CORS は不要だが、念のため設定しておく
                    ※末尾スラッシュなし

  RATE_LIMIT_SECONDS → 同一IPの連続送信ブロック秒数（デフォルト: 60）
  DUPLICATE_BLOCK_HOURS → 同一IPの重複投稿ブロック時間（デフォルト: 24）

  ADMIN_PASSWORD_HASH → 管理画面のパスワードハッシュ
                         以下のコマンドでハッシュ値を生成し設定する:
                         php -r "echo password_hash('設定したいパスワード', PASSWORD_DEFAULT);"

注意: config.php には認証情報が含まれるため、Git にコミットしない。
      .gitignore に api/config.php を追加すること。


4. Apache 設定（.htaccess）
---------------------------

ドキュメントルート直下の .htaccess で SPA フォールバックを設定する。
このファイルは public/.htaccess としてリポジトリに含まれており、
npm run build 時に dist/ へ自動コピーされる。

内容:
  - 実ファイル・実ディレクトリが存在する場合はそのまま返す
  - api/ ディレクトリへのリクエストはリライトせず PHP がそのまま実行される
  - それ以外のリクエストは /index.html にリライト（SPA ルーティング用）

Apache の mod_rewrite が有効であることを確認:

  sudo a2enmod rewrite
  sudo systemctl restart apache2

また、Apache の設定ファイルで AllowOverride All が設定されていること:

  <Directory /var/www/html>
      AllowOverride All
  </Directory>


5. ビルド＆デプロイ
-------------------

1) フロントエンドをビルド

  npm run build

  dist/ ディレクトリにビルド成果物が出力される。
  .htaccess が dist/ に含まれていることを確認する。

  ※ VITE_API_URL 環境変数は設定不要。
    同一サーバー構成のため、デフォルトの /api/submit-review.php でアクセスできる。

2) ドキュメントルートにデプロイ

  例: ドキュメントルートが /var/www/html の場合

  # フロントエンド（dist/ の中身をドキュメントルートに配置）
  rsync -av --delete dist/ /var/www/html/ --exclude api/config.php

  # API ファイルを配置
  cp api/submit-review.php /var/www/html/api/
  cp api/config.php /var/www/html/api/

3) パーミッション設定

  chmod 600 /var/www/html/api/config.php
  chmod 644 /var/www/html/api/submit-review.php
  chmod 644 /var/www/html/.htaccess


6. 動作確認
-----------

1) ブラウザでトップページにアクセスし、正常に表示されることを確認
2) SPA ルーティングの確認: /review 等のパスに直接アクセスして 404 にならないことを確認
3) ブラウザの開発者ツール（F12）→ Console タブを開く
4) /review ページでレビューフォームを全ステップ入力して送信
5) Console に通信エラーがないことを確認
6) phpMyAdmin または MySQL CLI で reviews テーブルにデータが挿入されていることを確認
7) 同じブラウザからもう一度送信し、429エラー（重複投稿ブロック）が返ることを確認


トラブルシューティング
----------------------

症状: SPA のルーティングで 404 になる
原因: mod_rewrite が無効、または AllowOverride が設定されていない
対処: sudo a2enmod rewrite を実行し、Apache 設定で AllowOverride All を確認

症状: 500 エラーが返る
原因: DB接続情報の誤り、またはテーブル未作成
対処: config.php の接続情報を再確認し、phpMyAdmin でテーブルの存在を確認する
      Apache のエラーログ（/var/log/apache2/error.log）で詳細を確認する

症状: API リクエストが 404 になる
原因: api/ ディレクトリがドキュメントルートに配置されていない
対処: /var/www/html/api/submit-review.php が存在するか確認する

症状: 開発環境（npm run dev）で API に接続できない
原因: 開発環境では submitReview.ts がモック応答を返す仕様
対処: 正常な動作。本番ビルドのみ実際のAPIに接続する


ファイル構成
------------

api/
  config.php          ... DB接続情報・設定定数（※Git管理外にすること）
  config.php.example  ... config.php のテンプレート
  schema.sql          ... テーブル定義SQL
  submit-review.php   ... レビュー投稿エンドポイント
  admin.php           ... アンケート回答管理画面（認証付き）
  reviews.php         ... アンケート回答一覧表示（認証なし）
  setup.php           ... DBセットアップスクリプト（初回のみ使用、完了後は削除）
  SETUP.md            ... 本ファイル

public/
  .htaccess           ... Apache SPA フォールバック設定（ビルド時に dist/ へコピーされる）


管理画面
--------

URL: /api/admin.php
パスワード: config.php の ADMIN_PASSWORD_HASH で設定したもの

機能:
  - アンケート回答の一覧表示
  - 各回答の編集（全項目）
  - 各回答の削除

セキュリティ:
  - PHPセッションによるパスワード認証
  - CSRFトークンによるフォーム保護
  - プリペアドステートメントによるSQLインジェクション対策
