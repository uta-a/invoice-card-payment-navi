<?php
// アンケート回答管理画面（認証付き）
session_start();
require_once __DIR__ . '/config.php';

// CSRFトークン生成
function generateCsrfToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken(string $token): bool {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function h(string $str): string {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// ログアウト処理
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    header('Location: admin.php');
    exit;
}

// ログイン処理
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'login') {
    if (password_verify($_POST['password'] ?? '', ADMIN_PASSWORD_HASH)) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: admin.php');
        exit;
    }
    $loginError = 'パスワードが正しくありません';
}

// 未ログインならログイン画面
if (empty($_SESSION['admin_logged_in'])) {
    showLoginPage($loginError ?? null);
    exit;
}

// DB接続
try {
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME);
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    die('DB接続エラー: ' . h($e->getMessage()));
}

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

$readonlyColumns = ['id', 'created_at', 'user_agent'];
$hiddenColumns = ['user_agent'];
$jsonColumns = ['q4_compared_services', 'q5_selection_reasons', 'q13_concerns', 'q13_good_points', 'q14_improvements'];
$booleanColumns = ['consent_privacy', 'consent_guideline', 'is_published'];
$ratingColumns = ['q8_rating_overall', 'q8_rating_fee', 'q8_rating_speed', 'q8_rating_screening', 'q8_rating_simplicity', 'q8_rating_support'];
$textareaColumns = ['q10_additional_costs_detail', 'q13_free_text', 'q14_free_text', 'q15_experience', 'q16_recommendation'];

$action = $_GET['action'] ?? $_POST['action'] ?? 'list';
$message = '';

// 削除処理
if ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $message = 'CSRFトークンが無効です';
    } else {
        $id = (int)($_POST['id'] ?? 0);
        $stmt = $pdo->prepare('DELETE FROM reviews WHERE id = :id');
        $stmt->execute([':id' => $id]);
        header('Location: admin.php?msg=deleted');
        exit;
    }
}

// 更新処理
if ($action === 'update' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $message = 'CSRFトークンが無効です';
    } else {
        $id = (int)($_POST['id'] ?? 0);
        $editableColumns = array_diff(array_keys($labels), $readonlyColumns);
        $sets = [];
        $params = [':id' => $id];
        foreach ($editableColumns as $col) {
            if (in_array($col, $hiddenColumns)) continue;
            if (in_array($col, $booleanColumns)) {
                $params[":$col"] = isset($_POST[$col]) ? 1 : 0;
            } elseif (in_array($col, $jsonColumns)) {
                $val = $_POST[$col] ?? '';
                $arr = array_map('trim', explode(',', $val));
                $arr = array_filter($arr, fn($v) => $v !== '');
                $params[":$col"] = json_encode(array_values($arr), JSON_UNESCAPED_UNICODE);
            } elseif (in_array($col, $ratingColumns)) {
                $params[":$col"] = max(1, min(5, (int)($_POST[$col] ?? 1)));
            } else {
                $params[":$col"] = $_POST[$col] ?? '';
            }
            $sets[] = "$col = :$col";
        }
        $sql = 'UPDATE reviews SET ' . implode(', ', $sets) . ' WHERE id = :id';
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        header('Location: admin.php?msg=updated');
        exit;
    }
}

// メッセージ
if (isset($_GET['msg'])) {
    $message = match ($_GET['msg']) {
        'deleted' => '回答を削除しました',
        'updated' => '回答を更新しました',
        default => '',
    };
}

// 編集画面
if ($action === 'edit') {
    $id = (int)($_GET['id'] ?? 0);
    $stmt = $pdo->prepare('SELECT * FROM reviews WHERE id = :id');
    $stmt->execute([':id' => $id]);
    $review = $stmt->fetch();
    if (!$review) {
        die('回答が見つかりません');
    }
    showEditPage($review, $labels, $readonlyColumns, $hiddenColumns, $jsonColumns, $booleanColumns, $ratingColumns, $textareaColumns);
    exit;
}

// 一覧表示
$stmt = $pdo->query('SELECT * FROM reviews ORDER BY created_at DESC');
$reviews = $stmt->fetchAll();
showListPage($reviews, $labels, $hiddenColumns, $message);

// === 表示関数 ===

function showLoginPage(?string $error): void {
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理画面ログイン</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Helvetica Neue', sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .login-box { background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); width: 100%; max-width: 360px; }
        h1 { font-size: 18px; margin-bottom: 24px; text-align: center; color: #1A2B4A; }
        input[type="password"] { width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; margin-bottom: 16px; }
        button { width: 100%; padding: 10px; background: #1A2B4A; color: #fff; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }
        button:hover { background: #2a3d5e; }
        .error { color: #dc3545; font-size: 13px; margin-bottom: 12px; text-align: center; }
    </style>
</head>
<body>
    <div class="login-box">
        <h1>管理画面</h1>
        <?php if ($error): ?>
            <div class="error"><?= h($error) ?></div>
        <?php endif; ?>
        <form method="post">
            <input type="hidden" name="action" value="login">
            <input type="password" name="password" placeholder="パスワード" autofocus>
            <button type="submit">ログイン</button>
        </form>
    </div>
</body>
</html>
<?php
}

function showListPage(array $reviews, array $labels, array $hiddenColumns, string $message): void {
    $count = count($reviews);
    $csrf = generateCsrfToken();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アンケート回答管理</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Helvetica Neue', sans-serif; background: #f5f5f5; padding: 24px; color: #333; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        h1 { font-size: 20px; }
        .logout { color: #666; text-decoration: none; font-size: 13px; }
        .logout:hover { color: #333; }
        .count { color: #666; margin-bottom: 24px; font-size: 14px; }
        .msg { background: #d4edda; color: #155724; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; font-size: 13px; }
        .review-card { background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; overflow: hidden; }
        .review-header { background: #1A2B4A; color: #fff; padding: 12px 20px; font-size: 14px; display: flex; justify-content: space-between; align-items: center; }
        .review-header .id { font-weight: bold; }
        .review-header .actions { display: flex; gap: 8px; }
        .review-header .actions a, .review-header .actions button { background: none; border: 1px solid rgba(255,255,255,0.4); color: #fff; padding: 4px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; text-decoration: none; }
        .review-header .actions a:hover { background: rgba(255,255,255,0.15); }
        .review-header .actions button { background: #dc3545; border-color: #dc3545; }
        .review-header .actions button:hover { background: #c82333; }
        .review-body { padding: 16px 20px; }
        .review-body table { width: 100%; border-collapse: collapse; }
        .review-body td { padding: 8px 12px; border-bottom: 1px solid #eee; font-size: 13px; vertical-align: top; }
        .review-body td:first-child { width: 180px; font-weight: 600; color: #555; white-space: nowrap; }
        .review-body tr:last-child td { border-bottom: none; }
        .rating { color: #e8a400; }
        .empty { text-align: center; padding: 60px; color: #999; }
    </style>
</head>
<body>
    <div class="top-bar">
        <h1>アンケート回答管理</h1>
        <a href="admin.php?action=logout" class="logout">ログアウト</a>
    </div>
    <p class="count"><?= $count ?> 件の回答</p>

    <?php if ($message): ?>
        <div class="msg"><?= h($message) ?></div>
    <?php endif; ?>

    <?php if ($count === 0): ?>
        <div class="empty">まだ回答はありません。</div>
    <?php endif; ?>

    <?php foreach ($reviews as $review): ?>
        <div class="review-card">
            <div class="review-header">
                <span>
                    <span class="id">#<?= $review['id'] ?></span>
                    &nbsp; <?= h($review['created_at']) ?>
                </span>
                <span class="actions">
                    <a href="admin.php?action=edit&id=<?= $review['id'] ?>">編集</a>
                    <form method="post" style="display:inline" onsubmit="return confirm('この回答を削除しますか？')">
                        <input type="hidden" name="action" value="delete">
                        <input type="hidden" name="id" value="<?= $review['id'] ?>">
                        <input type="hidden" name="csrf_token" value="<?= $csrf ?>">
                        <button type="submit">削除</button>
                    </form>
                </span>
            </div>
            <div class="review-body">
                <table>
                    <?php foreach ($review as $key => $value): ?>
                        <?php if (in_array($key, $hiddenColumns)) continue; ?>
                        <tr>
                            <td><?= h($labels[$key] ?? $key) ?></td>
                            <td>
                                <?php if (str_starts_with($key, 'q8_rating_')): ?>
                                    <span class="rating"><?= str_repeat('★', (int)$value) . str_repeat('☆', 5 - (int)$value) ?></span>
                                <?php elseif (in_array($key, ['consent_privacy', 'consent_guideline', 'is_published'])): ?>
                                    <?= $value ? '○' : '×' ?>
                                <?php else: ?>
                                    <?php
                                        $decoded = json_decode($value ?? '', true);
                                        if (is_array($decoded)) {
                                            echo h(implode(', ', $decoded));
                                        } elseif ($value === null) {
                                            echo '<span style="color:#999">-</span>';
                                        } else {
                                            echo h((string)$value);
                                        }
                                    ?>
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
<?php
}

function showEditPage(array $review, array $labels, array $readonlyColumns, array $hiddenColumns, array $jsonColumns, array $booleanColumns, array $ratingColumns, array $textareaColumns): void {
    $csrf = generateCsrfToken();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>回答編集 #<?= $review['id'] ?></title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Helvetica Neue', sans-serif; background: #f5f5f5; padding: 24px; color: #333; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        h1 { font-size: 20px; }
        .back { color: #666; text-decoration: none; font-size: 13px; }
        .back:hover { color: #333; }
        .edit-card { background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 24px; max-width: 800px; }
        .field { margin-bottom: 16px; }
        .field label { display: block; font-size: 13px; font-weight: 600; color: #555; margin-bottom: 4px; }
        .field input[type="text"],
        .field input[type="number"],
        .field textarea { width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; }
        .field textarea { resize: vertical; min-height: 80px; }
        .field .readonly { background: #f5f5f5; color: #999; border-color: #eee; }
        .field .hint { font-size: 11px; color: #999; margin-top: 2px; }
        .checkbox-field { display: flex; align-items: center; gap: 8px; }
        .checkbox-field input { width: 16px; height: 16px; }
        .btn-group { margin-top: 24px; display: flex; gap: 12px; }
        .btn { padding: 10px 24px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }
        .btn-primary { background: #1A2B4A; color: #fff; }
        .btn-primary:hover { background: #2a3d5e; }
        .btn-secondary { background: #e9ecef; color: #333; }
        .btn-secondary:hover { background: #dee2e6; }
    </style>
</head>
<body>
    <div class="top-bar">
        <h1>回答編集 #<?= $review['id'] ?></h1>
        <a href="admin.php" class="back">一覧に戻る</a>
    </div>
    <div class="edit-card">
        <form method="post" action="admin.php">
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="id" value="<?= $review['id'] ?>">
            <input type="hidden" name="csrf_token" value="<?= $csrf ?>">

            <?php foreach ($review as $key => $value): ?>
                <?php if (in_array($key, $hiddenColumns)) continue; ?>
                <div class="field">
                    <label><?= h($labels[$key] ?? $key) ?></label>
                    <?php if (in_array($key, $readonlyColumns)): ?>
                        <input type="text" value="<?= h((string)($value ?? '')) ?>" class="readonly" readonly>
                    <?php elseif (in_array($key, $booleanColumns)): ?>
                        <div class="checkbox-field">
                            <input type="checkbox" name="<?= $key ?>" value="1" <?= $value ? 'checked' : '' ?>>
                            <span style="font-size:13px"><?= $value ? '○' : '×' ?></span>
                        </div>
                    <?php elseif (in_array($key, $ratingColumns)): ?>
                        <input type="number" name="<?= $key ?>" value="<?= (int)$value ?>" min="1" max="5">
                        <div class="hint">1〜5 の数値</div>
                    <?php elseif (in_array($key, $jsonColumns)): ?>
                        <?php
                            $decoded = json_decode($value ?? '', true);
                            $display = is_array($decoded) ? implode(', ', $decoded) : ($value ?? '');
                        ?>
                        <input type="text" name="<?= $key ?>" value="<?= h($display) ?>">
                        <div class="hint">カンマ区切りで入力</div>
                    <?php elseif (in_array($key, $textareaColumns)): ?>
                        <textarea name="<?= $key ?>"><?= h((string)($value ?? '')) ?></textarea>
                    <?php else: ?>
                        <input type="text" name="<?= $key ?>" value="<?= h((string)($value ?? '')) ?>">
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>

            <div class="btn-group">
                <button type="submit" class="btn btn-primary">更新</button>
                <a href="admin.php" class="btn btn-secondary">キャンセル</a>
            </div>
        </form>
    </div>
</body>
</html>
<?php
}
