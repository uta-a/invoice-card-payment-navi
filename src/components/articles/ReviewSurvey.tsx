import { type CSSProperties, type ReactNode, useState } from "react";

type RatingKey =
  | "overall"
  | "fee"
  | "speed"
  | "screening"
  | "ease"
  | "support";

type FormState = {
  serviceName: string;
  serviceOther: string;
  businessType: string;
  purpose: string;
  purposeOther: string;
  comparedServices: string[];
  selectedReasons: string[];
  selectedReasonOther: string;
  urgency: string;
  impression: string;
  ratings: Record<RatingKey, number>;
  feePercent: string;
  feeUnknown: boolean;
  extraCost: string;
  extraCostDetail: string;
  screeningTime: string;
  paymentTime: string;
  cardBrand: string;
  cardBrandOther: string;
  anxieties: string[];
  goodPoints: string[];
  anxietyComment: string;
  improvementPoints: string[];
  improvementComment: string;
  issuesResolved: string;
  recommendFor: string;
  reuseIntent: string;
  companyName: string;
  industry: string;
  industryOther: string;
  prefecture: string;
  usagePeriod: string;
  usageStatus: string;
  amountRange: string;
  completedOnline: string;
};

type SurveySubmission = {
  articleSlug: string;
  submittedAt: string;
  serviceName: string;
  businessType: string;
  answers: FormState;
};

const SURVEY_ENDPOINT =
  import.meta.env.VITE_REVIEW_SURVEY_ENDPOINT ?? "/api/reviews/create.php";

const SERVICE_OPTIONS = [
  "支払い.com",
  "DGFT請求書カード払い",
  "INVOYカード払い",
  "マネーフォワード請求書カード払い",
  "ラボルカード払い",
  "LP請求書カード払い",
  "Fintoカード後払い",
  "フリーウェイ請求書カード払い",
  "その他",
] as const;

const BUSINESS_TYPES = [
  "個人事業主",
  "法人（従業員9名以下）",
  "法人（10～99名）",
  "法人（100名以上）",
] as const;

const PURPOSE_OPTIONS = [
  "仕入れ・外注費の支払い",
  "人件費・給与の支払い",
  "税金・社会保険料の支払い",
  "家賃・固定費の支払い",
  "その他",
] as const;

const COMPARISON_OPTIONS = [
  "他社の請求書カード払い",
  "ファクタリング",
  "銀行融資",
  "ビジネスローン",
  "法人カード",
  "比較せず利用",
] as const;

const REASON_OPTIONS = [
  "手数料が安かった",
  "即日対応できた",
  "審査が簡単・不要だった",
  "手続きがシンプルだった",
  "運営会社の信頼性",
  "口コミ・評判が良かった",
  "その他",
] as const;

const URGENCY_OPTIONS = [
  "即日必要だった",
  "数日以内に必要だった",
  "余裕があった",
] as const;

const IMPRESSION_OPTIONS = [
  "想像より良かった",
  "想定通りだった",
  "少し期待と違った",
] as const;

const RATING_ITEMS: Array<{ key: RatingKey; label: string }> = [
  { key: "overall", label: "総合満足度" },
  { key: "fee", label: "手数料の納得感" },
  { key: "speed", label: "支払いまでのスピード" },
  { key: "screening", label: "審査の通りやすさ" },
  { key: "ease", label: "手続きの簡単さ" },
  { key: "support", label: "サポート対応" },
];

const SCREENING_OPTIONS = [
  "即日（数分）",
  "半日以内",
  "1日",
  "2日以上",
  "審査なしだった",
] as const;

const PAYMENT_OPTIONS = [
  "即日",
  "翌営業日",
  "2～3営業日",
  "4日以上",
] as const;

const CARD_BRANDS = [
  "Visa",
  "Mastercard",
  "JCB",
  "American Express",
  "Diners Club",
  "その他",
] as const;

const ANXIETY_OPTIONS = [
  "手数料が高そう",
  "審査に通るか不安",
  "取引先にバレないか心配",
  "サービスの安全性",
  "手続きが面倒そう",
  "初めて聞くサービスで不安",
  "特に不安はなかった",
] as const;

const GOOD_POINT_OPTIONS = [
  "審査・利用開始が早かった",
  "手続きが簡単だった",
  "オンライン完結できた",
  "サポート対応が良かった",
  "支払いに間に合った",
  "手数料が納得できた",
] as const;

const IMPROVEMENT_OPTIONS = [
  "手数料がやや高い",
  "提出書類が必要だった",
  "対応時間に制限があった",
  "カードブランドに制限があった",
  "特になし",
] as const;

const REUSE_OPTIONS = [
  "ぜひ利用したい",
  "状況次第",
  "もう使わない",
] as const;

const INDUSTRY_OPTIONS = [
  "IT",
  "建設",
  "飲食",
  "小売",
  "制作",
  "卸売",
  "不動産",
  "その他",
] as const;

const USAGE_PERIOD_OPTIONS = [
  "1ヶ月以内",
  "3ヶ月以内",
  "6ヶ月以内",
  "1年以上前",
] as const;

const USAGE_STATUS_OPTIONS = ["新規", "継続", "乗り換え"] as const;

const AMOUNT_RANGE_OPTIONS = [
  "10万円未満",
  "10～50万",
  "50～100万",
  "100～500万",
  "500万以上",
] as const;

const ONLINE_OPTIONS = ["はい", "いいえ"] as const;

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
] as const;

const STEP_TITLES = [
  {
    label: "Phase A",
    title: "基本情報",
    description: "まずは選択式の質問だけで、利用状況を短く整理します。",
  },
  {
    label: "Phase B",
    title: "評価と利用条件",
    description: "比較に使う定量データを集めます。",
  },
  {
    label: "Phase C",
    title: "体験談",
    description: "不安や改善点、どう役立ったかを口コミとして深掘りします。",
  },
  {
    label: "Phase D",
    title: "掲載用属性",
    description: "掲載や分類に必要な最低限の属性だけ入力します。",
  },
] as const;

const initialState: FormState = {
  serviceName: "",
  serviceOther: "",
  businessType: "",
  purpose: "",
  purposeOther: "",
  comparedServices: [],
  selectedReasons: [],
  selectedReasonOther: "",
  urgency: "",
  impression: "",
  ratings: { overall: 0, fee: 0, speed: 0, screening: 0, ease: 0, support: 0 },
  feePercent: "",
  feeUnknown: false,
  extraCost: "",
  extraCostDetail: "",
  screeningTime: "",
  paymentTime: "",
  cardBrand: "",
  cardBrandOther: "",
  anxieties: [],
  goodPoints: [],
  anxietyComment: "",
  improvementPoints: [],
  improvementComment: "",
  issuesResolved: "",
  recommendFor: "",
  reuseIntent: "",
  companyName: "",
  industry: "",
  industryOther: "",
  prefecture: "",
  usagePeriod: "",
  usageStatus: "",
  amountRange: "",
  completedOnline: "",
};

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function textInputStyle(multiline = false): CSSProperties {
  return {
    width: "100%",
    minHeight: multiline ? "132px" : undefined,
    borderRadius: "12px",
    border: "1px solid #DDE5F0",
    background: "#FFFFFF",
    padding: "0.9rem 1rem",
    fontSize: "0.95rem",
    lineHeight: 1.6,
    color: "#1A2B4A",
    resize: multiline ? "vertical" : "none",
  };
}

function trimPayload(form: FormState): FormState {
  return {
    ...form,
    serviceOther: form.serviceOther.trim(),
    purposeOther: form.purposeOther.trim(),
    selectedReasonOther: form.selectedReasonOther.trim(),
    feePercent: form.feePercent.trim(),
    extraCostDetail: form.extraCostDetail.trim(),
    cardBrandOther: form.cardBrandOther.trim(),
    anxietyComment: form.anxietyComment.trim(),
    improvementComment: form.improvementComment.trim(),
    issuesResolved: form.issuesResolved.trim(),
    recommendFor: form.recommendFor.trim(),
    companyName: form.companyName.trim(),
    industryOther: form.industryOther.trim(),
  };
}

function Field({
  label,
  required = false,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <div>
        <label
          style={{
            display: "block",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#1A2B4A",
            marginBottom: "0.35rem",
          }}
        >
          {label}
          <span
            style={{
              color: required ? "#EF4444" : "#6B7A99",
              marginLeft: "0.4rem",
            }}
          >
            {required ? "必須" : "任意"}
          </span>
        </label>
        {hint ? (
          <p style={{ margin: 0, color: "#6B7A99", fontSize: "0.875rem" }}>{hint}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function ChoiceGrid({
  options,
  selected,
  onSelect,
  multiple = false,
}: {
  options: readonly string[];
  selected: string | string[];
  onSelect: (value: string) => void;
  multiple?: boolean;
}) {
  const selectedValues = Array.isArray(selected) ? selected : [selected];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "0.75rem",
      }}
    >
      {options.map((option) => {
        const active = selectedValues.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            aria-pressed={multiple ? active : undefined}
            style={{
              textAlign: "left",
              padding: "0.95rem 1rem",
              borderRadius: "12px",
              border: active ? "1.5px solid #2AABE2" : "1px solid #DDE5F0",
              background: active ? "#E8F6FD" : "#FFFFFF",
              color: active ? "#1A8DC4" : "#1A2B4A",
              fontWeight: 600,
              lineHeight: 1.5,
              cursor: "pointer",
              boxShadow: active ? "0 6px 18px rgba(42,171,226,0.12)" : "none",
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function RatingInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (nextValue: number) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: "0.75rem",
        padding: "1rem",
        borderRadius: "12px",
        background: "#FFFFFF",
        border: "1px solid #DDE5F0",
      }}
    >
      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1A2B4A" }}>
        {label}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {[1, 2, 3, 4, 5].map((score) => {
          const active = score <= value;
          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(score)}
              aria-label={`${label}を${score}点で評価`}
              style={{
                minWidth: "44px",
                height: "44px",
                borderRadius: "9999px",
                border: active ? "1px solid #F59E0B" : "1px solid #DDE5F0",
                background: active ? "#FFF8EB" : "#F8FBFF",
                color: active ? "#C27A00" : "#6B7A99",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {score}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ReviewSurvey({ articleSlug }: { articleSlug: string }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [stepError, setStepError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currentStep = STEP_TITLES[step];

  function setValue<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validateStep(stepIndex: number) {
    if (stepIndex === 0) {
      if (!form.serviceName) return "Q1 サービス名を選択してください。";
      if (form.serviceName === "その他" && !form.serviceOther.trim()) return "Q1 のその他サービス名を入力してください。";
      if (!form.businessType) return "Q2 事業形態を選択してください。";
      if (!form.purpose) return "Q3 利用目的を選択してください。";
      if (form.purpose === "その他" && !form.purposeOther.trim()) return "Q3 のその他利用目的を入力してください。";
      if (form.comparedServices.length === 0) return "Q4 比較したサービスを1つ以上選択してください。";
      if (form.selectedReasons.length === 0) return "Q5 選んだ理由を1つ以上選択してください。";
      if (form.selectedReasons.includes("その他") && !form.selectedReasonOther.trim()) return "Q5 のその他理由を入力してください。";
      if (!form.urgency) return "Q6 支払いの緊急度を選択してください。";
      if (!form.impression) return "Q7 利用後の印象を選択してください。";
      return "";
    }

    if (stepIndex === 1) {
      const unrated = RATING_ITEMS.find((item) => form.ratings[item.key] === 0);
      if (unrated) return `Q8 ${unrated.label}を評価してください。`;
      if (!form.feeUnknown && !form.feePercent.trim()) return "Q9 手数料を入力するか、覚えていないを選択してください。";
      if (!form.extraCost) return "Q10 手数料以外の費用有無を選択してください。";
      if (form.extraCost === "あった" && !form.extraCostDetail.trim()) return "Q10 の費用内容と金額を入力してください。";
      if (!form.screeningTime || !form.paymentTime) return "Q11 審査時間と支払いまでの時間を選択してください。";
      if (!form.cardBrand) return "Q12 カードブランドを選択してください。";
      if (form.cardBrand === "その他" && !form.cardBrandOther.trim()) return "Q12 のその他ブランド名を入力してください。";
      return "";
    }

    if (stepIndex === 2) {
      if (form.anxieties.length === 0) return "Q13 利用前の不安を1つ以上選択してください。";
      if (form.goodPoints.length === 0) return "Q13 実際に良かった点を1つ以上選択してください。";
      if (form.improvementPoints.length === 0) return "Q14 気になった点を選択してください。";
      const issuesLength = form.issuesResolved.trim().length;
      if (issuesLength < 50 || issuesLength > 500) return "Q15 は50〜500文字で入力してください。";
      if (form.recommendFor.trim().length > 0 && (form.recommendFor.trim().length < 30 || form.recommendFor.trim().length > 200)) return "Q16 は入力する場合、30〜200文字で入力してください。";
      return "";
    }

    if (!form.reuseIntent) return "Q17 今後の利用意向を選択してください。";
    if (!form.industry) return "業界を選択してください。";
    if (form.industry === "その他" && !form.industryOther.trim()) return "業界のその他内容を入力してください。";
    if (!form.prefecture) return "会社所在地を選択してください。";
    if (!form.usagePeriod) return "利用時期を選択してください。";
    if (!form.usageStatus) return "利用状況を選択してください。";
    if (!form.amountRange) return "利用金額帯を選択してください。";
    if (!form.completedOnline) return "オンライン完結でしたか？を選択してください。";
    return "";
  }

  function handleNext() {
    const errorMessage = validateStep(step);
    if (errorMessage) {
      setStepError(errorMessage);
      return;
    }

    setStepError("");
    setStep((current) => Math.min(current + 1, STEP_TITLES.length - 1));
  }

  async function handleSubmit() {
    const errorMessage = validateStep(3);
    if (errorMessage) {
      setStepError(errorMessage);
      return;
    }

    setStepError("");
    setSubmitError("");
    setSubmitting(true);

    const cleanedForm = trimPayload(form);
    const payload: SurveySubmission = {
      articleSlug,
      submittedAt: new Date().toISOString(),
      serviceName:
        cleanedForm.serviceName === "その他"
          ? cleanedForm.serviceOther
          : cleanedForm.serviceName,
      businessType: cleanedForm.businessType,
      answers: cleanedForm,
    };

    try {
      const response = await fetch(SURVEY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        success?: boolean;
        code?: string;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ??
            "送信に失敗しました。時間をおいて再度お試しください。",
        );
      }

      setSubmitSuccess(true);
      setForm(initialState);
      setStep(0);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "送信に失敗しました。時間をおいて再度お試しください。",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby="review-survey-title"
      style={{
        marginTop: "2.5rem",
        marginBottom: "2.5rem",
        padding: "clamp(1.25rem, 3vw, 2rem)",
        borderRadius: "20px",
        background:
          "linear-gradient(180deg, rgba(232,246,253,0.9) 0%, rgba(255,255,255,0.98) 22%, #FFFFFF 100%)",
        border: "1px solid #DDE5F0",
        boxShadow: "0 16px 40px rgba(42,171,226,0.10)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "720px" }}>
          <span className="section-label">Review Survey</span>
          <h2
            id="review-survey-title"
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              lineHeight: 1.35,
              marginBottom: "0.5rem",
            }}
          >
            請求書カード払いの口コミアンケート
          </h2>
          <p style={{ margin: 0, color: "#4E6385", lineHeight: 1.8 }}>
            実際に利用した体験をもとに、手数料・審査・使いやすさをお聞きしています。
            投稿内容は確認後に掲載へ活用します。
          </p>
        </div>
        <div
          style={{
            minWidth: "210px",
            background: "#F8FBFF",
            border: "1px solid #DDE5F0",
            borderRadius: "16px",
            padding: "1rem 1.1rem",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "#6B7A99", marginBottom: "0.35rem" }}>
            投稿ルール
          </div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1A2B4A" }}>
            同一IPは24時間で1回まで
          </div>
          <div style={{ fontSize: "0.85rem", color: "#6B7A99", marginTop: "0.45rem" }}>
            スパム防止のため、同一回線からの連続投稿は自動で制限します。
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        {STEP_TITLES.map((item, index) => {
          const active = index === step;
          const completed = index < step;
          return (
            <div
              key={item.label}
              style={{
                padding: "0.95rem 1rem",
                borderRadius: "14px",
                border: active ? "1.5px solid #2AABE2" : "1px solid #DDE5F0",
                background: active ? "#E8F6FD" : completed ? "#EDFBF5" : "#FFFFFF",
              }}
            >
              <div
                style={{
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: active ? "#1A8DC4" : completed ? "#2DA374" : "#6B7A99",
                  textTransform: "uppercase",
                  marginBottom: "0.35rem",
                }}
              >
                {item.label}
              </div>
              <div style={{ fontWeight: 700, color: "#1A2B4A" }}>{item.title}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginBottom: "1.5rem",
          padding: "1rem 1.1rem",
          borderRadius: "16px",
          background: "#F8FBFF",
          border: "1px solid #DDE5F0",
        }}
      >
        <div style={{ fontSize: "0.85rem", color: "#1A8DC4", fontWeight: 700 }}>
          {currentStep.label}
        </div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A2B4A" }}>
          {currentStep.title}
        </div>
        <p style={{ margin: "0.35rem 0 0", color: "#6B7A99" }}>
          {currentStep.description}
        </p>
      </div>

      {submitSuccess ? (
        <div
          style={{
            padding: "1.1rem 1.2rem",
            borderRadius: "16px",
            border: "1px solid #BFE7D1",
            background: "#EDFBF5",
            color: "#185B43",
            marginBottom: "1.25rem",
          }}
        >
          送信ありがとうございました。内容を確認のうえ、口コミ掲載や比較情報の改善に活用します。
        </div>
      ) : null}

      {stepError ? (
        <div
          style={{
            padding: "0.95rem 1rem",
            borderRadius: "14px",
            border: "1px solid #F4B4B4",
            background: "#FFF5F5",
            color: "#B42318",
            marginBottom: "1rem",
          }}
        >
          {stepError}
        </div>
      ) : null}

      {submitError ? (
        <div
          style={{
            padding: "0.95rem 1rem",
            borderRadius: "14px",
            border: "1px solid #F4B4B4",
            background: "#FFF5F5",
            color: "#B42318",
            marginBottom: "1rem",
          }}
        >
          {submitError}
        </div>
      ) : null}

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {step === 0 ? (
          <>
            <Field label="Q1. ご利用されたサービス名を教えてください。" required>
              <select
                value={form.serviceName}
                onChange={(event) => setValue("serviceName", event.target.value)}
                style={textInputStyle()}
              >
                <option value="">選択してください</option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {form.serviceName === "その他" ? (
                <input
                  value={form.serviceOther}
                  onChange={(event) => setValue("serviceOther", event.target.value)}
                  placeholder="サービス名を入力"
                  style={textInputStyle()}
                />
              ) : null}
            </Field>

            <Field label="Q2. 事業形態を教えてください。" required>
              <ChoiceGrid
                options={BUSINESS_TYPES}
                selected={form.businessType}
                onSelect={(value) => setValue("businessType", value)}
              />
            </Field>

            <Field label="Q3. 主な利用目的を教えてください。" required>
              <ChoiceGrid
                options={PURPOSE_OPTIONS}
                selected={form.purpose}
                onSelect={(value) => setValue("purpose", value)}
              />
              {form.purpose === "その他" ? (
                <input
                  value={form.purposeOther}
                  onChange={(event) => setValue("purposeOther", event.target.value)}
                  placeholder="利用目的を入力"
                  style={textInputStyle()}
                />
              ) : null}
            </Field>

            <Field label="Q4. 利用前に比較したサービスはありますか？" required>
              <ChoiceGrid
                options={COMPARISON_OPTIONS}
                selected={form.comparedServices}
                multiple
                onSelect={(value) =>
                  setValue("comparedServices", toggleValue(form.comparedServices, value))
                }
              />
            </Field>

            <Field label="Q5. なぜこのサービスを選びましたか？" required>
              <ChoiceGrid
                options={REASON_OPTIONS}
                selected={form.selectedReasons}
                multiple
                onSelect={(value) =>
                  setValue("selectedReasons", toggleValue(form.selectedReasons, value))
                }
              />
              {form.selectedReasons.includes("その他") ? (
                <input
                  value={form.selectedReasonOther}
                  onChange={(event) =>
                    setValue("selectedReasonOther", event.target.value)
                  }
                  placeholder="選んだ理由を入力"
                  style={textInputStyle()}
                />
              ) : null}
            </Field>

            <Field label="Q6. 支払いの緊急度はどの程度でしたか？" required>
              <ChoiceGrid
                options={URGENCY_OPTIONS}
                selected={form.urgency}
                onSelect={(value) => setValue("urgency", value)}
              />
            </Field>

            <Field label="Q7. 利用後の印象はどう変わりましたか？" required>
              <ChoiceGrid
                options={IMPRESSION_OPTIONS}
                selected={form.impression}
                onSelect={(value) => setValue("impression", value)}
              />
            </Field>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Field label="Q8. 各項目を星5段階で評価してください。" required>
              <div style={{ display: "grid", gap: "0.9rem" }}>
                {RATING_ITEMS.map((item) => (
                  <RatingInput
                    key={item.key}
                    label={item.label}
                    value={form.ratings[item.key]}
                    onChange={(nextValue) =>
                      setValue("ratings", { ...form.ratings, [item.key]: nextValue })
                    }
                  />
                ))}
              </div>
            </Field>

            <Field
              label="Q9. 手数料はいくらでしたか？"
              required
              hint="例: 2.5 / 3.0 / 4.8"
            >
              <div style={{ display: "grid", gap: "0.8rem" }}>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  disabled={form.feeUnknown}
                  value={form.feePercent}
                  onChange={(event) => setValue("feePercent", event.target.value)}
                  placeholder="手数料（%）"
                  style={textInputStyle()}
                />
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    color: "#1A2B4A",
                    fontWeight: 600,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.feeUnknown}
                    onChange={(event) => {
                      const checked = event.target.checked;
                      setValue("feeUnknown", checked);
                      if (checked) {
                        setValue("feePercent", "");
                      }
                    }}
                  />
                  覚えていない
                </label>
              </div>
            </Field>

            <Field label="Q10. 手数料以外にかかった費用はありましたか？" required>
              <ChoiceGrid
                options={["なし", "あった"]}
                selected={form.extraCost}
                onSelect={(value) => setValue("extraCost", value)}
              />
              {form.extraCost === "あった" ? (
                <textarea
                  value={form.extraCostDetail}
                  onChange={(event) => setValue("extraCostDetail", event.target.value)}
                  placeholder="例: 振込手数料 440円、事務手数料 1,100円"
                  style={textInputStyle(true)}
                />
              ) : null}
            </Field>

            <Field label="Q11. 審査時間・支払いまでの時間を教えてください。" required>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  <div style={{ fontWeight: 700, color: "#1A2B4A" }}>審査時間</div>
                  <ChoiceGrid
                    options={SCREENING_OPTIONS}
                    selected={form.screeningTime}
                    onSelect={(value) => setValue("screeningTime", value)}
                  />
                </div>
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  <div style={{ fontWeight: 700, color: "#1A2B4A" }}>
                    支払いまで
                  </div>
                  <ChoiceGrid
                    options={PAYMENT_OPTIONS}
                    selected={form.paymentTime}
                    onSelect={(value) => setValue("paymentTime", value)}
                  />
                </div>
              </div>
            </Field>

            <Field label="Q12. 利用したカードブランドを教えてください。" required>
              <ChoiceGrid
                options={CARD_BRANDS}
                selected={form.cardBrand}
                onSelect={(value) => setValue("cardBrand", value)}
              />
              {form.cardBrand === "その他" ? (
                <input
                  value={form.cardBrandOther}
                  onChange={(event) => setValue("cardBrandOther", event.target.value)}
                  placeholder="カードブランドを入力"
                  style={textInputStyle()}
                />
              ) : null}
            </Field>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Field
              label="Q13. 利用前に不安だったことと、実際に使ってみた感想を教えてください。"
              required
            >
              <div style={{ display: "grid", gap: "1rem" }}>
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  <div style={{ fontWeight: 700, color: "#1A2B4A" }}>
                    利用前の不安
                  </div>
                  <ChoiceGrid
                    options={ANXIETY_OPTIONS}
                    selected={form.anxieties}
                    multiple
                    onSelect={(value) =>
                      setValue("anxieties", toggleValue(form.anxieties, value))
                    }
                  />
                </div>
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  <div style={{ fontWeight: 700, color: "#1A2B4A" }}>
                    実際に良かった点
                  </div>
                  <ChoiceGrid
                    options={GOOD_POINT_OPTIONS}
                    selected={form.goodPoints}
                    multiple
                    onSelect={(value) =>
                      setValue("goodPoints", toggleValue(form.goodPoints, value))
                    }
                  />
                </div>
                <textarea
                  value={form.anxietyComment}
                  onChange={(event) => setValue("anxietyComment", event.target.value)}
                  placeholder="不安だった点と、実際に使ってみた感想があれば補足してください。"
                  style={textInputStyle(true)}
                />
              </div>
            </Field>

            <Field label="Q14. 気になった点・改善してほしい点はありますか？" required>
              <ChoiceGrid
                options={IMPROVEMENT_OPTIONS}
                selected={form.improvementPoints}
                multiple
                onSelect={(value) =>
                  setValue(
                    "improvementPoints",
                    toggleValue(form.improvementPoints, value),
                  )
                }
              />
              <textarea
                value={form.improvementComment}
                onChange={(event) =>
                  setValue("improvementComment", event.target.value)
                }
                placeholder="気になった点や改善要望があれば記入してください。"
                style={textInputStyle(true)}
              />
            </Field>

            <Field
              label="Q15. 具体的に何に困っていて、どう解決しましたか？"
              required
              hint="50〜500文字で入力してください。"
            >
              <textarea
                value={form.issuesResolved}
                onChange={(event) => setValue("issuesResolved", event.target.value)}
                placeholder="例: 仕入れ先への支払いが重なり、手元資金が不足。銀行融資は審査に時間がかかるため、即日対応できる請求書カード払いを利用。結果、取引先への支払いに間に合い、信用も守れました。"
                style={textInputStyle(true)}
              />
            </Field>

            <Field
              label="Q16. このサービスをおすすめするとしたら、どんな企業・事業主に向いていますか？"
              hint="任意。30〜200文字で入力してください。"
            >
              <textarea
                value={form.recommendFor}
                onChange={(event) => setValue("recommendFor", event.target.value)}
                placeholder="例: 急ぎの支払いが多い企業、ファクタリングの手数料が高いと感じている個人事業主"
                style={textInputStyle(true)}
              />
            </Field>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <Field label="Q17. 今後も利用したいと思いますか？" required>
              <ChoiceGrid
                options={REUSE_OPTIONS}
                selected={form.reuseIntent}
                onSelect={(value) => setValue("reuseIntent", value)}
              />
            </Field>

            <Field label="会社名・屋号" hint="任意">
              <input
                value={form.companyName}
                onChange={(event) => setValue("companyName", event.target.value)}
                placeholder="会社名・屋号を入力"
                style={textInputStyle()}
              />
            </Field>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
              }}
            >
              <Field label="業界" required>
                <select
                  value={form.industry}
                  onChange={(event) => setValue("industry", event.target.value)}
                  style={textInputStyle()}
                >
                  <option value="">選択してください</option>
                  {INDUSTRY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {form.industry === "その他" ? (
                  <input
                    value={form.industryOther}
                    onChange={(event) => setValue("industryOther", event.target.value)}
                    placeholder="業界を入力"
                    style={textInputStyle()}
                  />
                ) : null}
              </Field>

              <Field label="会社所在地（都道府県）" required>
                <select
                  value={form.prefecture}
                  onChange={(event) => setValue("prefecture", event.target.value)}
                  style={textInputStyle()}
                >
                  <option value="">選択してください</option>
                  {PREFECTURES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="利用時期" required>
                <select
                  value={form.usagePeriod}
                  onChange={(event) => setValue("usagePeriod", event.target.value)}
                  style={textInputStyle()}
                >
                  <option value="">選択してください</option>
                  {USAGE_PERIOD_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="利用状況" required>
                <select
                  value={form.usageStatus}
                  onChange={(event) => setValue("usageStatus", event.target.value)}
                  style={textInputStyle()}
                >
                  <option value="">選択してください</option>
                  {USAGE_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="利用金額帯" required>
                <select
                  value={form.amountRange}
                  onChange={(event) => setValue("amountRange", event.target.value)}
                  style={textInputStyle()}
                >
                  <option value="">選択してください</option>
                  {AMOUNT_RANGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="オンライン完結でしたか？" required>
                <ChoiceGrid
                  options={ONLINE_OPTIONS}
                  selected={form.completedOnline}
                  onSelect={(value) => setValue("completedOnline", value)}
                />
              </Field>
            </div>
          </>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.75rem",
          marginTop: "1.75rem",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setStepError("");
            setStep((current) => Math.max(current - 1, 0));
          }}
          disabled={step === 0 || submitting}
          style={{
            minWidth: "140px",
            padding: "0.9rem 1.4rem",
            borderRadius: "9999px",
            border: "1px solid #DDE5F0",
            background: step === 0 ? "#F4F7FB" : "#FFFFFF",
            color: step === 0 ? "#A0AEC0" : "#1A2B4A",
            fontWeight: 700,
            cursor: step === 0 ? "not-allowed" : "pointer",
          }}
        >
          前のステップ
        </button>

        {step < STEP_TITLES.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            style={{
              minWidth: "180px",
              padding: "0.9rem 1.6rem",
              borderRadius: "9999px",
              border: "none",
              background: "#2AABE2",
              color: "#FFFFFF",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(42,171,226,0.22)",
            }}
          >
            次のステップへ
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              minWidth: "180px",
              padding: "0.9rem 1.6rem",
              borderRadius: "9999px",
              border: "none",
              background: submitting ? "#8FCFEA" : "#3EBF8A",
              color: "#FFFFFF",
              fontWeight: 700,
              cursor: submitting ? "wait" : "pointer",
              boxShadow: "0 10px 24px rgba(62,191,138,0.22)",
            }}
          >
            {submitting ? "送信中..." : "口コミを送信する"}
          </button>
        )}
      </div>
    </section>
  );
}
