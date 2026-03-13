<?php
// DB接続設定（ロリポップの管理画面から取得する値を設定）
// 本番環境ではこのファイルの値を実際の接続情報に書き換えてください

define('DB_HOST', 'mysql○○○.phy.lolipop.lan');
define('DB_NAME', 'LAA○○○○○○○-review');
define('DB_USER', 'LAA○○○○○○○');
define('DB_PASS', '********');

// CORS許可オリジン（本番ドメインに書き換え）
define('ALLOWED_ORIGIN', 'https://your-domain.com');

// レートリミット（秒）
define('RATE_LIMIT_SECONDS', 60);

// 同一IP重複投稿ブロック（時間）
define('DUPLICATE_BLOCK_HOURS', 24);
