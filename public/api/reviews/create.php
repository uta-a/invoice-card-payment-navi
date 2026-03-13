<?php

declare(strict_types=1);

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "code" => "method_not_allowed",
        "message" => "POST only",
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function respond(int $statusCode, string $code, string $message): void
{
    http_response_code($statusCode);
    echo json_encode([
        "success" => $statusCode < 400,
        "code" => $code,
        "message" => $message,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function getClientIp(): string
{
    $headers = [
        "HTTP_CF_CONNECTING_IP",
        "HTTP_X_FORWARDED_FOR",
        "HTTP_CLIENT_IP",
        "REMOTE_ADDR",
    ];

    foreach ($headers as $header) {
        if (empty($_SERVER[$header])) {
            continue;
        }

        $candidates = array_map("trim", explode(",", (string) $_SERVER[$header]));
        foreach ($candidates as $candidate) {
            if (filter_var($candidate, FILTER_VALIDATE_IP)) {
                return $candidate;
            }
        }
    }

    return "0.0.0.0";
}

function requireString(array $source, string $key): string
{
    $value = $source[$key] ?? "";
    return is_string($value) ? trim($value) : "";
}

$rawBody = file_get_contents("php://input");
$payload = json_decode($rawBody ?: "", true);

if (!is_array($payload)) {
    respond(422, "validation_error", "リクエスト形式が不正です。");
}

$articleSlug = requireString($payload, "articleSlug");
$serviceName = requireString($payload, "serviceName");
$businessType = requireString($payload, "businessType");
$submittedAt = requireString($payload, "submittedAt");
$answers = $payload["answers"] ?? null;

if ($articleSlug === "" || $serviceName === "" || $businessType === "" || $submittedAt === "") {
    respond(422, "validation_error", "必須項目が不足しています。");
}

if (!is_array($answers)) {
    respond(422, "validation_error", "回答データが不足しています。");
}

$issuesResolved = requireString($answers, "issuesResolved");
$recommendFor = requireString($answers, "recommendFor");

if (mb_strlen($issuesResolved) < 50 || mb_strlen($issuesResolved) > 500) {
    respond(422, "validation_error", "Q15 は50〜500文字で入力してください。");
}

if ($recommendFor !== "" && (mb_strlen($recommendFor) < 30 || mb_strlen($recommendFor) > 200)) {
    respond(422, "validation_error", "Q16 は30〜200文字で入力してください。");
}

$dbHost = getenv("REVIEW_DB_HOST") ?: "localhost";
$dbPort = getenv("REVIEW_DB_PORT") ?: "3306";
$dbName = getenv("REVIEW_DB_NAME") ?: "";
$dbUser = getenv("REVIEW_DB_USER") ?: "";
$dbPass = getenv("REVIEW_DB_PASS") ?: "";

if ($dbName === "" || $dbUser === "") {
    respond(500, "server_error", "DB接続設定が不足しています。");
}

$ipAddress = getClientIp();
$userAgent = substr((string) ($_SERVER["HTTP_USER_AGENT"] ?? ""), 0, 255);

try {
    $pdo = new PDO(
        sprintf("mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4", $dbHost, $dbPort, $dbName),
        $dbUser,
        $dbPass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    $duplicateCheck = $pdo->prepare(
        "SELECT id
         FROM reviews
         WHERE ip_address = :ip_address
           AND created_at >= (NOW() - INTERVAL 24 HOUR)
         LIMIT 1"
    );
    $duplicateCheck->execute([
        ":ip_address" => $ipAddress,
    ]);

    if ($duplicateCheck->fetch()) {
        respond(429, "duplicate_ip", "この回線からは24時間以内に投稿済みです。時間を空けて再度お試しください。");
    }

    $insert = $pdo->prepare(
        "INSERT INTO reviews (
            article_slug,
            service_name,
            business_type,
            company_name,
            industry,
            prefecture,
            usage_period,
            usage_status,
            amount_range,
            completed_online,
            reuse_intent,
            issues_resolved,
            recommend_for,
            answers_json,
            ip_address,
            user_agent,
            status,
            submitted_at
        ) VALUES (
            :article_slug,
            :service_name,
            :business_type,
            :company_name,
            :industry,
            :prefecture,
            :usage_period,
            :usage_status,
            :amount_range,
            :completed_online,
            :reuse_intent,
            :issues_resolved,
            :recommend_for,
            :answers_json,
            :ip_address,
            :user_agent,
            'pending',
            :submitted_at
        )"
    );

    $insert->execute([
        ":article_slug" => $articleSlug,
        ":service_name" => $serviceName,
        ":business_type" => $businessType,
        ":company_name" => requireString($answers, "companyName"),
        ":industry" => requireString($answers, "industry"),
        ":prefecture" => requireString($answers, "prefecture"),
        ":usage_period" => requireString($answers, "usagePeriod"),
        ":usage_status" => requireString($answers, "usageStatus"),
        ":amount_range" => requireString($answers, "amountRange"),
        ":completed_online" => requireString($answers, "completedOnline"),
        ":reuse_intent" => requireString($answers, "reuseIntent"),
        ":issues_resolved" => $issuesResolved,
        ":recommend_for" => $recommendFor,
        ":answers_json" => json_encode($answers, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ":ip_address" => $ipAddress,
        ":user_agent" => $userAgent,
        ":submitted_at" => $submittedAt,
    ]);

    respond(200, "ok", "アンケートを受け付けました。");
} catch (Throwable $throwable) {
    error_log("[review-survey] " . $throwable->getMessage());
    respond(500, "server_error", "サーバーエラーが発生しました。");
}
