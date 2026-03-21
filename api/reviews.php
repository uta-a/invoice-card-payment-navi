<?php
// 送信済みアンケート一覧表示
// セキュリティ: 管理用ページのため、確認後はサーバーから削除するか、Basic認証等で保護してください

require_once __DIR__ . '/config.php';

try {
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME);
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    die('DB接続エラー: ' . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8'));
}

$stmt = $pdo->query('SELECT * FROM reviews ORDER BY created_at DESC');
$reviews = $stmt->fetchAll();
$count = count($reviews);

$labels = [
    'id' => 'ID',
    'created_at' => '投稿日時',
    'ip_address' => 'IPアドレス',
    'q1_service_used' => '利用サービス',
    'q2_business_type' => '業種',
    'q3_usage_purpose' => '利用目的',
    'q4_compared_services' => '比較したサービス',
    'q5_selection_reasons' => '選んだ理由',
    'q6_urgency' => '緊急度',
    'q7_impression_change' => '印象の変化',
    'q8_rating_overall' => '総合評価',
    'q8_rating_fee' => '手数料評価',
    'q8_rating_speed' => 'スピード評価',
    'q8_rating_screening' => '審査評価',
    'q8_rating_simplicity' => '簡便さ評価',
    'q8_rating_support' => 'サポート評価',
    'q9_fee_percentage' => '手数料率',
    'q10_additional_costs' => '追加費用',
    'q10_additional_costs_detail' => '追加費用詳細',
    'q11_screening_time' => '審査時間',
    'q11_payment_time' => '入金時間',
    'q12_card_brand' => 'カードブランド',
    'q13_concerns' => '気になった点',
    'q13_good_points' => '良かった点',
    'q13_free_text' => '自由記述（感想）',
    'q14_improvements' => '改善してほしい点',
    'q14_free_text' => '自由記述（改善）',
    'q15_experience' => '利用体験',
    'q16_recommendation' => 'おすすめ度',
    'q17_future_use' => '今後の利用意向',
    'attr_company_name' => '会社名',
    'attr_industry' => '業界',
    'attr_prefecture' => '都道府県',
    'attr_usage_period' => '利用期間',
    'attr_usage_status' => '利用状況',
    'attr_usage_amount' => '利用金額',
    'attr_online_complete' => 'オンライン完結',
    'consent_privacy' => 'プライバシー同意',
    'consent_guideline' => 'ガイドライン同意',
    'is_published' => '公開状態',
];

// 表示不要なカラム
$hiddenColumns = ['user_agent'];

function formatValue($key, $value) {
    if ($value === null) return '<span style="color:#999">-</span>';
    if (in_array($key, ['consent_privacy', 'consent_guideline', 'is_published'])) {
        return $value ? '○' : '×';
    }
    // JSON カラム
    $decoded = json_decode($value, true);
    if (is_array($decoded)) {
        return htmlspecialchars(implode(', ', $decoded), ENT_QUOTES, 'UTF-8');
    }
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アンケート回答一覧</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Helvetica Neue', sans-serif; background: #f5f5f5; padding: 24px; color: #333; }
        h1 { font-size: 20px; margin-bottom: 8px; }
        .count { color: #666; margin-bottom: 24px; font-size: 14px; }
        .review-card { background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; overflow: hidden; }
        .review-header { background: #1A2B4A; color: #fff; padding: 12px 20px; font-size: 14px; display: flex; justify-content: space-between; align-items: center; }
        .review-header .id { font-weight: bold; }
        .review-body { padding: 16px 20px; }
        .review-body table { width: 100%; border-collapse: collapse; }
        .review-body td { padding: 8px 12px; border-bottom: 1px solid #eee; font-size: 13px; vertical-align: top; }
        .review-body td:first-child { width: 180px; font-weight: 600; color: #555; white-space: nowrap; }
        .review-body tr:last-child td { border-bottom: none; }
        .rating { color: #e8a400; }
        .empty { text-align: center; padding: 60px; color: #999; }
        .warning { background: #fff3cd; color: #856404; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; font-size: 13px; }
    </style>
</head>
<body>
    <h1>アンケート回答一覧</h1>
    <p class="count"><?= $count ?> 件の回答</p>
    <div class="warning">このページは管理用です。確認後はサーバーから削除するか、アクセス制限をかけてください。</div>

    <?php if ($count === 0): ?>
        <div class="empty">まだ回答はありません。</div>
    <?php endif; ?>

    <?php foreach ($reviews as $review): ?>
        <div class="review-card">
            <div class="review-header">
                <span class="id">#<?= $review['id'] ?></span>
                <span><?= htmlspecialchars($review['created_at'], ENT_QUOTES, 'UTF-8') ?></span>
            </div>
            <div class="review-body">
                <table>
                    <?php foreach ($review as $key => $value): ?>
                        <?php if (in_array($key, $hiddenColumns)) continue; ?>
                        <tr>
                            <td><?= htmlspecialchars($labels[$key] ?? $key, ENT_QUOTES, 'UTF-8') ?></td>
                            <td>
                                <?php if (str_starts_with($key, 'q8_rating_')): ?>
                                    <span class="rating"><?= str_repeat('★', (int)$value) . str_repeat('☆', 5 - (int)$value) ?></span>
                                <?php else: ?>
                                    <?= formatValue($key, $value) ?>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </table>
            </div>
        </div>
    <?php endforeach; ?>
</body>
</html>
