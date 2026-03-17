<?php
// DBセットアップスクリプト
// ブラウザからアクセスしてDB接続確認・テーブル作成を実行する
// セットアップ完了後は必ずこのファイルを削除してください

require_once __DIR__ . '/config.php';

$results = [];

// Step 1: DB接続テスト
try {
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME);
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $results[] = ['success' => true, 'message' => 'DB接続に成功しました'];
} catch (PDOException $e) {
    $results[] = ['success' => false, 'message' => 'DB接続に失敗しました: ' . $e->getMessage()];
    outputHtml($results);
    exit;
}

// Step 2: schema.sql を実行
$schemaPath = __DIR__ . '/schema.sql';
if (!file_exists($schemaPath)) {
    $results[] = ['success' => false, 'message' => 'schema.sql が見つかりません: ' . $schemaPath];
    outputHtml($results);
    exit;
}

$sql = file_get_contents($schemaPath);
try {
    $pdo->exec($sql);
    $results[] = ['success' => true, 'message' => 'schema.sql を実行しました'];
} catch (PDOException $e) {
    $results[] = ['success' => false, 'message' => 'schema.sql の実行に失敗しました: ' . $e->getMessage()];
    outputHtml($results);
    exit;
}

// Step 3: テーブル存在確認
$stmt = $pdo->query("SHOW TABLES LIKE 'reviews'");
if ($stmt->rowCount() > 0) {
    $results[] = ['success' => true, 'message' => 'reviews テーブルが存在することを確認しました'];
} else {
    $results[] = ['success' => false, 'message' => 'reviews テーブルが見つかりません'];
}

outputHtml($results);

function outputHtml(array $results): void
{
    $allSuccess = !in_array(false, array_column($results, 'success'), true);
    ?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DB セットアップ</title>
    <style>
        body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
        .step { padding: 12px 16px; margin: 8px 0; border-radius: 6px; }
        .success { background: #d4edda; color: #155724; }
        .failure { background: #f8d7da; color: #721c24; }
        .warning { background: #fff3cd; color: #856404; padding: 16px; border-radius: 6px; margin-top: 24px; }
    </style>
</head>
<body>
    <h1>DB セットアップ</h1>
    <?php foreach ($results as $r): ?>
        <div class="step <?= $r['success'] ? 'success' : 'failure' ?>">
            <?= ($r['success'] ? '✓' : '✗') . ' ' . htmlspecialchars($r['message'], ENT_QUOTES, 'UTF-8') ?>
        </div>
    <?php endforeach; ?>

    <?php if ($allSuccess): ?>
        <div class="warning">
            <strong>セットアップ完了</strong><br>
            セキュリティのため、このファイル (setup.php) をサーバーから削除してください。
        </div>
    <?php endif; ?>
</body>
</html>
    <?php
}
