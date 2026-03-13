<?php
require_once __DIR__ . '/config.php';

// CORS headers
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

try {
    // Read JSON input
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => '不正なリクエストです']);
        exit;
    }

    // Required fields validation
    $requiredFields = [
        'q1_service_used', 'q2_business_type', 'q3_usage_purpose',
        'q4_compared_services', 'q5_selection_reasons', 'q6_urgency', 'q7_impression_change',
        'q8_rating_overall', 'q8_rating_fee', 'q8_rating_speed',
        'q8_rating_screening', 'q8_rating_simplicity', 'q8_rating_support',
        'q9_fee_percentage', 'q10_additional_costs',
        'q11_screening_time', 'q11_payment_time', 'q12_card_brand',
        'q13_concerns', 'q13_good_points',
        'q14_improvements',
        'q15_experience', 'q16_recommendation',
        'q17_future_use', 'attr_company_name', 'attr_industry',
        'attr_usage_period', 'attr_usage_status', 'attr_usage_amount',
        'consent_privacy', 'consent_guideline',
    ];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || (is_string($data[$field]) && trim($data[$field]) === '')) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "必須項目「{$field}」が入力されていません"]);
            exit;
        }
    }

    // Get client info
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

    // Connect to database
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // Rate limiting: check if same IP submitted within RATE_LIMIT_SECONDS
    $stmtRate = $pdo->prepare(
        'SELECT COUNT(*) FROM reviews WHERE ip_address = :ip AND created_at > DATE_SUB(NOW(), INTERVAL :seconds SECOND)'
    );
    $stmtRate->execute([
        ':ip' => $ipAddress,
        ':seconds' => RATE_LIMIT_SECONDS,
    ]);

    if ((int) $stmtRate->fetchColumn() > 0) {
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => '送信間隔が短すぎます。しばらく待ってから再度お試しください。']);
        exit;
    }

    // Duplicate submission check: block same IP within DUPLICATE_BLOCK_HOURS
    $stmtDup = $pdo->prepare(
        'SELECT COUNT(*) FROM reviews WHERE ip_address = :ip AND created_at > DATE_SUB(NOW(), INTERVAL :hours HOUR)'
    );
    $stmtDup->execute([
        ':ip' => $ipAddress,
        ':hours' => DUPLICATE_BLOCK_HOURS,
    ]);

    if ((int) $stmtDup->fetchColumn() > 0) {
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => 'すでにご回答いただいております。一定期間内の再投稿はできません。']);
        exit;
    }

    // Sanitize text inputs
    $sanitize = function ($value) {
        return is_string($value) ? htmlspecialchars($value, ENT_QUOTES, 'UTF-8') : $value;
    };

    // Encode array fields as JSON
    $jsonFields = ['q4_compared_services', 'q5_selection_reasons', 'q13_concerns', 'q13_good_points', 'q14_improvements'];

    // INSERT into reviews table
    $stmt = $pdo->prepare('
        INSERT INTO reviews (
            ip_address, user_agent,
            q1_service_used, q2_business_type, q3_usage_purpose,
            q4_compared_services, q5_selection_reasons, q6_urgency, q7_impression_change,
            q8_rating_overall, q8_rating_fee, q8_rating_speed,
            q8_rating_screening, q8_rating_simplicity, q8_rating_support,
            q9_fee_percentage, q10_additional_costs, q10_additional_costs_detail,
            q11_screening_time, q11_payment_time, q12_card_brand,
            q13_concerns, q13_good_points, q13_free_text,
            q14_improvements, q14_free_text,
            q15_experience, q16_recommendation,
            q17_future_use, attr_company_name, attr_industry, attr_prefecture,
            attr_usage_period, attr_usage_status, attr_usage_amount, attr_online_complete,
            consent_privacy, consent_guideline
        ) VALUES (
            :ip_address, :user_agent,
            :q1_service_used, :q2_business_type, :q3_usage_purpose,
            :q4_compared_services, :q5_selection_reasons, :q6_urgency, :q7_impression_change,
            :q8_rating_overall, :q8_rating_fee, :q8_rating_speed,
            :q8_rating_screening, :q8_rating_simplicity, :q8_rating_support,
            :q9_fee_percentage, :q10_additional_costs, :q10_additional_costs_detail,
            :q11_screening_time, :q11_payment_time, :q12_card_brand,
            :q13_concerns, :q13_good_points, :q13_free_text,
            :q14_improvements, :q14_free_text,
            :q15_experience, :q16_recommendation,
            :q17_future_use, :attr_company_name, :attr_industry, :attr_prefecture,
            :attr_usage_period, :attr_usage_status, :attr_usage_amount, :attr_online_complete,
            :consent_privacy, :consent_guideline
        )
    ');

    $stmt->execute([
        ':ip_address' => $ipAddress,
        ':user_agent' => $sanitize($userAgent),
        ':q1_service_used' => $sanitize($data['q1_service_used']),
        ':q2_business_type' => $sanitize($data['q2_business_type']),
        ':q3_usage_purpose' => $sanitize($data['q3_usage_purpose']),
        ':q4_compared_services' => json_encode($data['q4_compared_services'], JSON_UNESCAPED_UNICODE),
        ':q5_selection_reasons' => json_encode($data['q5_selection_reasons'], JSON_UNESCAPED_UNICODE),
        ':q6_urgency' => $sanitize($data['q6_urgency']),
        ':q7_impression_change' => $sanitize($data['q7_impression_change']),
        ':q8_rating_overall' => (int) $data['q8_rating_overall'],
        ':q8_rating_fee' => (int) $data['q8_rating_fee'],
        ':q8_rating_speed' => (int) $data['q8_rating_speed'],
        ':q8_rating_screening' => (int) $data['q8_rating_screening'],
        ':q8_rating_simplicity' => (int) $data['q8_rating_simplicity'],
        ':q8_rating_support' => (int) $data['q8_rating_support'],
        ':q9_fee_percentage' => $sanitize($data['q9_fee_percentage']),
        ':q10_additional_costs' => $sanitize($data['q10_additional_costs']),
        ':q10_additional_costs_detail' => isset($data['q10_additional_costs_detail']) ? $sanitize($data['q10_additional_costs_detail']) : null,
        ':q11_screening_time' => $sanitize($data['q11_screening_time']),
        ':q11_payment_time' => $sanitize($data['q11_payment_time']),
        ':q12_card_brand' => $sanitize($data['q12_card_brand']),
        ':q13_concerns' => json_encode($data['q13_concerns'], JSON_UNESCAPED_UNICODE),
        ':q13_good_points' => json_encode($data['q13_good_points'], JSON_UNESCAPED_UNICODE),
        ':q13_free_text' => isset($data['q13_free_text']) ? $sanitize($data['q13_free_text']) : null,
        ':q14_improvements' => json_encode($data['q14_improvements'], JSON_UNESCAPED_UNICODE),
        ':q14_free_text' => isset($data['q14_free_text']) ? $sanitize($data['q14_free_text']) : null,
        ':q15_experience' => $sanitize($data['q15_experience']),
        ':q16_recommendation' => $sanitize($data['q16_recommendation']),
        ':q17_future_use' => $sanitize($data['q17_future_use']),
        ':attr_company_name' => $sanitize($data['attr_company_name']),
        ':attr_industry' => $sanitize($data['attr_industry']),
        ':attr_prefecture' => isset($data['attr_prefecture']) ? $sanitize($data['attr_prefecture']) : null,
        ':attr_usage_period' => $sanitize($data['attr_usage_period']),
        ':attr_usage_status' => $sanitize($data['attr_usage_status']),
        ':attr_usage_amount' => $sanitize($data['attr_usage_amount']),
        ':attr_online_complete' => isset($data['attr_online_complete']) ? $sanitize($data['attr_online_complete']) : null,
        ':consent_privacy' => (bool) $data['consent_privacy'] ? 1 : 0,
        ':consent_guideline' => (bool) $data['consent_guideline'] ? 1 : 0,
    ]);

    $insertedId = $pdo->lastInsertId();

    echo json_encode(['success' => true, 'id' => (string) $insertedId]);

} catch (PDOException $e) {
    error_log('Review submission DB error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'データベースエラーが発生しました']);
} catch (Exception $e) {
    error_log('Review submission error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'サーバーエラーが発生しました']);
}
