import { z } from "zod";

export const reviewSchema = z.object({
  // === PHASE A (Q1-Q7): Simple selection questions ===
  q1_service_used: z.string({ message: "利用サービスを選択してください" }).min(1, "利用サービスを選択してください"),
  q2_business_type: z.string({ message: "事業形態を選択してください" }).min(1, "事業形態を選択してください"),
  q3_usage_purpose: z.string({ message: "利用目的を選択してください" }).min(1, "利用目的を選択してください"),
  q4_compared_services: z
    .array(z.string())
    .min(1, "少なくとも1つ選択してください"),
  q5_selection_reasons: z
    .array(z.string())
    .min(1, "少なくとも1つ選択してください"),
  q6_urgency: z.string({ message: "緊急度を選択してください" }).min(1, "緊急度を選択してください"),
  q7_impression_change: z.string({ message: "印象の変化を選択してください" }).min(1, "印象の変化を選択してください"),

  // === PHASE B (Q8-Q12): Star ratings and selections ===
  q8_rating_overall: z.number({ message: "評価を選択してください" }).int().min(1, "評価を選択してください").max(5),
  q8_rating_fee: z.number({ message: "評価を選択してください" }).int().min(1, "評価を選択してください").max(5),
  q8_rating_speed: z.number({ message: "評価を選択してください" }).int().min(1, "評価を選択してください").max(5),
  q8_rating_screening: z.number({ message: "評価を選択してください" }).int().min(1, "評価を選択してください").max(5),
  q8_rating_simplicity: z.number({ message: "評価を選択してください" }).int().min(1, "評価を選択してください").max(5),
  q8_rating_support: z.number({ message: "評価を選択してください" }).int().min(1, "評価を選択してください").max(5),
  q9_fee_percentage: z.string({ message: "手数料率を入力してください" }).min(1, "手数料率を入力してください"),
  q9_fee_unknown: z.boolean().optional(),
  q10_additional_costs: z.string({ message: "追加費用について選択してください" }).min(1, "追加費用について選択してください"),
  q10_additional_costs_detail: z.string().optional(),
  q10_additional_costs_amount: z.string().optional(),
  q11_screening_time: z.string({ message: "審査時間を選択してください" }).min(1, "審査時間を選択してください"),
  q11_payment_time: z.string({ message: "入金時間を選択してください" }).min(1, "入金時間を選択してください"),
  q12_card_brand: z.string({ message: "カードブランドを選択してください" }).min(1, "カードブランドを選択してください"),

  // === PHASE C (Q13-Q16): Free text + selections ===
  q13_concerns: z
    .array(z.string())
    .min(1, "少なくとも1つ選択してください"),
  q13_good_points: z
    .array(z.string())
    .min(1, "少なくとも1つ選択してください"),
  q13_free_text: z.string().max(500).optional(),
  q14_improvements: z
    .array(z.string())
    .min(1, "少なくとも1つ選択してください"),
  q14_free_text: z.string().max(500).optional(),
  q15_experience: z
    .string({ message: "利用体験を入力してください" })
    .min(1, "利用体験を入力してください")
    .max(500, "500文字以内で入力してください"),
  q16_recommendation: z
    .string({ message: "アドバイスを入力してください" })
    .min(1, "アドバイスを入力してください")
    .max(200, "200文字以内で入力してください"),

  // === PHASE D (Q17 + attributes) ===
  q17_future_use: z.string({ message: "今後の利用意向を選択してください" }).min(1, "今後の利用意向を選択してください"),
  attr_company_name: z
    .string({ message: "会社名またはペンネームを入力してください" })
    .min(1, "会社名またはペンネームを入力してください")
    .max(200),
  attr_industry: z.string({ message: "業種を選択してください" }).min(1, "業種を選択してください"),
  attr_prefecture: z.string().optional(),
  attr_usage_period: z.string({ message: "利用期間を選択してください" }).min(1, "利用期間を選択してください"),
  attr_usage_status: z.string({ message: "利用状況を選択してください" }).min(1, "利用状況を選択してください"),
  attr_usage_amount: z.string({ message: "利用金額を選択してください" }).min(1, "利用金額を選択してください"),
  attr_online_complete: z.string().optional(),

  // === CONSENT ===
  consent_privacy: z
    .boolean()
    .refine((v) => v === true, "プライバシーポリシーへの同意が必要です"),
  consent_guideline: z
    .boolean()
    .refine((v) => v === true, "ガイドラインへの同意が必要です"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

export const PHASE_A_FIELDS = [
  "q1_service_used",
  "q2_business_type",
  "q3_usage_purpose",
  "q4_compared_services",
  "q5_selection_reasons",
  "q6_urgency",
  "q7_impression_change",
] as const;

export const PHASE_B_FIELDS = [
  "q8_rating_overall",
  "q8_rating_fee",
  "q8_rating_speed",
  "q8_rating_screening",
  "q8_rating_simplicity",
  "q8_rating_support",
  "q9_fee_percentage",
  "q10_additional_costs",
  "q10_additional_costs_detail",
  "q10_additional_costs_amount",
  "q9_fee_unknown",
  "q11_screening_time",
  "q11_payment_time",
  "q12_card_brand",
] as const;

export const PHASE_C_FIELDS = [
  "q13_concerns",
  "q13_good_points",
  "q13_free_text",
  "q14_improvements",
  "q14_free_text",
  "q15_experience",
  "q16_recommendation",
] as const;

export const PHASE_D_FIELDS = [
  "q17_future_use",
  "attr_company_name",
  "attr_industry",
  "attr_prefecture",
  "attr_usage_period",
  "attr_usage_status",
  "attr_usage_amount",
  "attr_online_complete",
] as const;

export const CONSENT_FIELDS = [
  "consent_privacy",
  "consent_guideline",
] as const;
