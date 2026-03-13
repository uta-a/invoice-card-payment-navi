import StarRatingInput from "../fields/StarRatingInput";
import RadioGroup from "../fields/RadioGroup";
import TextareaField from "../fields/TextareaField";
import { useFormContext } from "react-hook-form";

export default function StepPhaseB() {
  const { watch, register, setValue, formState: { errors } } = useFormContext();
  const additionalCosts = watch("q10_additional_costs");
  const feeUnknown = watch("q9_fee_unknown");

  return (
    <div>
      <h2 style={{
        fontSize: "1.25rem", fontWeight: 700, color: "#1A2B4A",
        marginBottom: "0.5rem",
      }}>
        サービス評価
      </h2>
      <p style={{ fontSize: "0.875rem", color: "#6B7A99", marginBottom: "2rem" }}>
        サービスの各項目を5段階で評価してください
      </p>

      {/* Q8: Star ratings */}
      <div style={{
        background: "#F0F9FF", borderRadius: "1rem", padding: "1.5rem",
        marginBottom: "2rem", border: "1px solid #DDE5F0",
      }}>
        <p style={{
          fontSize: "0.9375rem", fontWeight: 700, color: "#1A2B4A",
          marginBottom: "1rem",
        }}>
          Q8. 以下の項目を5段階で評価してください
          <span style={{ color: "#EF4444", marginLeft: 4 }}>*</span>
        </p>
        <StarRatingInput name="q8_rating_overall" label="総合満足度" required />
        <StarRatingInput name="q8_rating_fee" label="手数料" required />
        <StarRatingInput name="q8_rating_speed" label="入金スピード" required />
        <StarRatingInput name="q8_rating_screening" label="審査の通りやすさ" required />
        <StarRatingInput name="q8_rating_simplicity" label="操作のしやすさ" required />
        <StarRatingInput name="q8_rating_support" label="サポート対応" required />
      </div>

      {/* Q9: Fee percentage - 0.1% unit input */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{
          display: "block", fontSize: "0.9375rem", fontWeight: 700,
          color: "#1A2B4A", marginBottom: "0.5rem",
        }}>
          Q9. 実際に支払った手数料はどのくらいでしたか？
          <span style={{ color: "#EF4444", marginLeft: 4 }}>*</span>
        </label>
        <p style={{ fontSize: "0.8125rem", color: "#6B7A99", marginBottom: "0.75rem" }}>
          0.1%単位でご入力ください（例: 3.0、2.5）
        </p>
        {!feeUnknown && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              {...register("q9_fee_percentage")}
              placeholder="3.0"
              style={{
                width: "120px", padding: "0.75rem 1rem",
                border: `1.5px solid ${errors.q9_fee_percentage ? "#EF4444" : "#DDE5F0"}`,
                borderRadius: "0.75rem",
                fontSize: "0.9375rem", color: "#1A2B4A",
                outline: "none",
              }}
            />
            <span style={{ fontSize: "0.9375rem", color: "#1A2B4A", fontWeight: 600 }}>%</span>
          </div>
        )}
        <label style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.875rem", color: "#6B7A99", cursor: "pointer",
        }}>
          <input
            type="checkbox"
            checked={!!feeUnknown}
            onChange={(e) => {
              setValue("q9_fee_unknown", e.target.checked);
              if (e.target.checked) {
                setValue("q9_fee_percentage", "覚えていない");
              } else {
                setValue("q9_fee_percentage", "");
              }
            }}
            style={{ width: 16, height: 16, accentColor: "#2AABE2" }}
          />
          覚えていない
        </label>
        {errors.q9_fee_percentage && (
          <p style={{ color: "#EF4444", fontSize: "0.8125rem", marginTop: "0.5rem" }}>
            {errors.q9_fee_percentage.message as string}
          </p>
        )}
      </div>

      <RadioGroup
        name="q10_additional_costs"
        label="Q10. 手数料以外に発生した費用はありましたか？"
        options={[
          { value: "なかった", label: "なかった" },
          { value: "振込手数料", label: "振込手数料" },
          { value: "月額費用", label: "月額費用" },
          { value: "その他", label: "その他" },
          { value: "覚えていない", label: "覚えていない" },
        ]}
        required
      />

      {additionalCosts && additionalCosts !== "なかった" && additionalCosts !== "覚えていない" && (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="q10_additional_costs_amount" style={{
              display: "block", fontSize: "0.9375rem", fontWeight: 700,
              color: "#1A2B4A", marginBottom: "0.5rem",
            }}>
              具体的な金額を教えてください
            </label>
            <input
              id="q10_additional_costs_amount"
              type="text"
              {...register("q10_additional_costs_amount")}
              placeholder="例: 550円 / 月額1,100円"
              style={{
                width: "100%", padding: "0.75rem 1rem",
                border: "1.5px solid #DDE5F0",
                borderRadius: "0.75rem",
                fontSize: "0.9375rem", color: "#1A2B4A",
                outline: "none",
              }}
            />
          </div>
          {additionalCosts === "その他" && (
            <TextareaField
              name="q10_additional_costs_detail"
              label="費用の内容を教えてください"
              placeholder="例: 書類発行手数料"
              rows={2}
              maxLength={200}
            />
          )}
        </>
      )}

      <RadioGroup
        name="q11_screening_time"
        label="Q11. 審査にかかった時間を教えてください"
        options={[
          { value: "即日", label: "即日" },
          { value: "翌営業日", label: "翌営業日" },
          { value: "2〜3営業日", label: "2〜3営業日" },
          { value: "4営業日以上", label: "4営業日以上" },
          { value: "覚えていない", label: "覚えていない" },
        ]}
        required
      />

      <RadioGroup
        name="q11_payment_time"
        label="Q11-2. 入金までにかかった時間を教えてください"
        options={[
          { value: "即日", label: "即日" },
          { value: "翌営業日", label: "翌営業日" },
          { value: "2〜3営業日", label: "2〜3営業日" },
          { value: "4営業日以上", label: "4営業日以上" },
          { value: "覚えていない", label: "覚えていない" },
        ]}
        required
      />

      <RadioGroup
        name="q12_card_brand"
        label="Q12. 利用したクレジットカードのブランドを教えてください"
        options={[
          { value: "Visa", label: "Visa" },
          { value: "Mastercard", label: "Mastercard" },
          { value: "JCB", label: "JCB" },
          { value: "American Express", label: "American Express" },
          { value: "Diners Club", label: "Diners Club" },
          { value: "その他", label: "その他" },
        ]}
        required
      />
    </div>
  );
}
