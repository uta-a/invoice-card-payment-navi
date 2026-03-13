import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import CheckboxField from "../fields/CheckboxField";

export default function StepConfirm() {
  const { getValues } = useFormContext();
  const values = getValues();

  const sections = [
    {
      title: "基本情報（Q1〜Q7）",
      items: [
        { label: "利用サービス", value: values.q1_service_used },
        { label: "事業形態", value: values.q2_business_type },
        { label: "利用目的", value: values.q3_usage_purpose },
        { label: "比較したサービス", value: (values.q4_compared_services as string[])?.join("、") },
        { label: "選んだ理由", value: (values.q5_selection_reasons as string[])?.join("、") },
        { label: "緊急度", value: values.q6_urgency },
        { label: "期待との比較", value: values.q7_impression_change },
      ],
    },
    {
      title: "サービス評価（Q8〜Q12）",
      items: [
        { label: "総合満足度", value: `${values.q8_rating_overall}/5` },
        { label: "手数料", value: `${values.q8_rating_fee}/5` },
        { label: "入金スピード", value: `${values.q8_rating_speed}/5` },
        { label: "審査", value: `${values.q8_rating_screening}/5` },
        { label: "操作性", value: `${values.q8_rating_simplicity}/5` },
        { label: "サポート", value: `${values.q8_rating_support}/5` },
        { label: "手数料率", value: values.q9_fee_percentage === "覚えていない" ? "覚えていない" : `${values.q9_fee_percentage}%` },
        { label: "追加費用", value: [
          values.q10_additional_costs,
          values.q10_additional_costs_amount ? `（${values.q10_additional_costs_amount}）` : "",
          values.q10_additional_costs_detail ? `- ${values.q10_additional_costs_detail}` : "",
        ].filter(Boolean).join(" ") },
        { label: "審査時間", value: values.q11_screening_time },
        { label: "入金時間", value: values.q11_payment_time },
        { label: "カードブランド", value: values.q12_card_brand },
      ],
    },
    {
      title: "利用体験（Q13〜Q16）",
      items: [
        { label: "利用前の不安", value: (values.q13_concerns as string[])?.join("、") },
        { label: "良かった点", value: (values.q13_good_points as string[])?.join("、") },
        { label: "改善してほしい点", value: (values.q14_improvements as string[])?.join("、") },
        { label: "利用体験", value: values.q15_experience },
        { label: "アドバイス", value: values.q16_recommendation },
      ],
    },
    {
      title: "属性情報",
      items: [
        { label: "今後の利用意向", value: values.q17_future_use },
        { label: "会社名・屋号", value: values.attr_company_name },
        { label: "業種", value: values.attr_industry },
        { label: "所在地", value: values.attr_prefecture || "未回答" },
        { label: "利用期間", value: values.attr_usage_period },
        { label: "利用状況", value: values.attr_usage_status },
        { label: "利用金額", value: values.attr_usage_amount },
      ],
    },
  ];

  return (
    <div>
      <h2 style={{
        fontSize: "1.25rem", fontWeight: 700, color: "#1A2B4A",
        marginBottom: "0.5rem",
      }}>
        回答内容の確認
      </h2>
      <p style={{ fontSize: "0.875rem", color: "#6B7A99", marginBottom: "2rem" }}>
        以下の内容で送信します。内容に誤りがないかご確認ください。
      </p>

      {sections.map((section) => (
        <div key={section.title} style={{
          background: "#fff", borderRadius: "0.75rem",
          border: "1px solid #DDE5F0", marginBottom: "1.5rem",
          overflow: "hidden",
        }}>
          <div style={{
            background: "#F0F9FF", padding: "0.75rem 1rem",
            borderBottom: "1px solid #DDE5F0",
          }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#2AABE2", margin: 0 }}>
              {section.title}
            </h3>
          </div>
          <div style={{ padding: "0.5rem 0" }}>
            {section.items.map((item) => (
              <div key={item.label} style={{
                display: "flex", padding: "0.5rem 1rem",
                borderBottom: "1px solid #F0F4F8",
                gap: "1rem",
              }}>
                <span style={{
                  fontSize: "0.8125rem", color: "#6B7A99",
                  minWidth: "120px", flexShrink: 0,
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: "0.875rem", color: "#1A2B4A",
                  wordBreak: "break-word",
                }}>
                  {item.value || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Consent checkboxes */}
      <div style={{
        background: "#FFF8EB", borderRadius: "0.75rem",
        padding: "1.5rem", marginTop: "2rem",
        border: "1px solid #F59E0B33",
      }}>
        <p style={{
          fontSize: "0.9375rem", fontWeight: 700, color: "#1A2B4A",
          marginBottom: "1rem",
        }}>
          同意事項
        </p>

        <CheckboxField
          name="consent_privacy"
          required
          label={
            <>
              <Link to="/privacy" target="_blank" style={{ color: "#2AABE2", textDecoration: "underline" }}>
                プライバシーポリシー
              </Link>
              に同意する
            </>
          }
        />

        <CheckboxField
          name="consent_guideline"
          required
          label={
            <>
              <Link to="/review-guideline" target="_blank" style={{ color: "#2AABE2", textDecoration: "underline" }}>
                口コミガイドライン
              </Link>
              に同意する
            </>
          }
        />
      </div>
    </div>
  );
}
