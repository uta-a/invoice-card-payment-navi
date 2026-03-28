import { services } from "@/data/services";
import RadioGroup from "../fields/RadioGroup";
import CheckboxGroup from "../fields/CheckboxGroup";

export default function StepPhaseA() {
  const serviceOptions = services.map((s) => ({ value: s.name, label: s.name }));
  // Add "その他" option
  serviceOptions.push({ value: "その他", label: "その他" });

  return (
    <div>
      <h2 style={{
        fontSize: "1.25rem", fontWeight: 700, color: "#1A2B4A",
        marginBottom: "0.5rem",
      }}>
        基本情報
      </h2>
      <p style={{ fontSize: "0.875rem", color: "#6B7A99", marginBottom: "2rem" }}>
        ご利用されたサービスについて教えてください
      </p>

      <RadioGroup
        name="q1_service_used"
        label="Q1. ご利用された請求書カード払いサービスを選択してください"
        options={serviceOptions}
        required
      />

      <RadioGroup
        name="q2_business_type"
        label="Q2. 事業形態を教えてください"
        options={[
          { value: "法人（株式会社・合同会社等）", label: "法人（株式会社・合同会社等）" },
          { value: "個人事業主・フリーランス", label: "個人事業主・フリーランス" },
          { value: "NPO・社団法人等", label: "NPO・社団法人等" },
          { value: "その他", label: "その他" },
        ]}
        required
      />

      <RadioGroup
        name="q3_usage_purpose"
        label="Q3. 主な利用目的を教えてください"
        options={[
          { value: "仕入れ・外注費の支払い", label: "仕入れ・外注費の支払い" },
          { value: "固定費（家賃・リース等）の支払い", label: "固定費（家賃・リース等）の支払い" },
          { value: "税金・社会保険料の支払い", label: "税金・社会保険料の支払い" },
          { value: "広告費・マーケティング費用", label: "広告費・マーケティング費用" },
          { value: "その他", label: "その他" },
        ]}
        required
      />

      <CheckboxGroup
        name="q4_compared_services"
        label="Q4. 利用前に比較したサービスはありますか？"
        options={[
          { value: "他社の請求書カード払い", label: "他社の請求書カード払い" },
          { value: "ファクタリング", label: "ファクタリング" },
          { value: "銀行融資", label: "銀行融資" },
          { value: "ビジネスローン", label: "ビジネスローン" },
          { value: "法人カード", label: "法人カード" },
          { value: "比較せず利用", label: "比較せず利用" },
        ]}
        required
      />

      <CheckboxGroup
        name="q5_selection_reasons"
        label="Q5. このサービスを選んだ理由を教えてください"
        options={[
          { value: "手数料の安さ", label: "手数料の安さ" },
          { value: "入金スピード", label: "入金スピード" },
          { value: "審査の通りやすさ", label: "審査の通りやすさ" },
          { value: "操作のしやすさ", label: "操作のしやすさ" },
          { value: "サポート対応", label: "サポート対応" },
          { value: "知名度・信頼性", label: "知名度・信頼性" },
          { value: "知人・取引先の紹介", label: "知人・取引先の紹介" },
          { value: "その他", label: "その他" },
        ]}
        required
      />

      <RadioGroup
        name="q6_urgency"
        label="Q6. 利用時の緊急度はどのくらいでしたか？"
        options={[
          { value: "即日〜3日以内", label: "即日〜3日以内" },
          { value: "1週間以内", label: "1週間以内" },
          { value: "2週間〜1ヶ月", label: "2週間〜1ヶ月" },
          { value: "急いでいなかった", label: "急いでいなかった" },
        ]}
        required
      />

      <RadioGroup
        name="q7_impression_change"
        label="Q7. 利用前の期待と比べて、実際の印象はどうでしたか？"
        options={[
          { value: "期待以上だった", label: "期待以上だった" },
          { value: "期待通りだった", label: "期待通りだった" },
          { value: "やや期待はずれだった", label: "やや期待はずれだった" },
          { value: "期待はずれだった", label: "期待はずれだった" },
        ]}
        required
      />
    </div>
  );
}
