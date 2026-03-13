import RadioGroup from "../fields/RadioGroup";
import SelectField from "../fields/SelectField";
import { useFormContext } from "react-hook-form";

const PREFECTURES = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
  "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県",
  "岐阜県","静岡県","愛知県","三重県",
  "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
  "鳥取県","島根県","岡山県","広島県","山口県",
  "徳島県","香川県","愛媛県","高知県",
  "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県",
];

export default function StepPhaseD() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <h2 style={{
        fontSize: "1.25rem", fontWeight: 700, color: "#1A2B4A",
        marginBottom: "0.5rem",
      }}>
        今後の利用意向・属性情報
      </h2>
      <p style={{ fontSize: "0.875rem", color: "#6B7A99", marginBottom: "2rem" }}>
        最後に、今後の利用意向とご自身についてお聞かせください
      </p>

      <RadioGroup
        name="q17_future_use"
        label="Q17. 今後の利用意向を教えてください"
        options={[
          { value: "継続して利用したい", label: "継続して利用したい" },
          { value: "状況次第で利用したい", label: "状況次第で利用したい" },
          { value: "他社に乗り換えたい", label: "他社に乗り換えたい" },
          { value: "利用をやめたい", label: "利用をやめたい" },
        ]}
        required
      />

      {/* Attribute section */}
      <div style={{
        background: "#F0F9FF", borderRadius: "1rem", padding: "1.5rem",
        marginTop: "1.5rem", border: "1px solid #DDE5F0",
      }}>
        <h3 style={{
          fontSize: "1rem", fontWeight: 700, color: "#1A2B4A",
          marginBottom: "1.5rem",
        }}>
          属性情報
        </h3>

        {/* Company name */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="attr_company_name" style={{
            display: "block", fontSize: "0.9375rem", fontWeight: 700,
            color: "#1A2B4A", marginBottom: "0.5rem",
          }}>
            会社名・屋号（ペンネーム可）
            <span style={{ color: "#EF4444", marginLeft: 4 }}>*</span>
          </label>
          <input
            id="attr_company_name"
            type="text"
            {...register("attr_company_name")}
            placeholder="例: 株式会社〇〇 / 〇〇事務所"
            style={{
              width: "100%", padding: "0.75rem 1rem",
              border: `1.5px solid ${errors.attr_company_name ? "#EF4444" : "#DDE5F0"}`,
              borderRadius: "0.75rem",
              fontSize: "0.9375rem",
              color: "#1A2B4A",
              outline: "none",
            }}
          />
          {errors.attr_company_name && (
            <p style={{ color: "#EF4444", fontSize: "0.8125rem", marginTop: "0.5rem" }}>
              {errors.attr_company_name.message as string}
            </p>
          )}
        </div>

        <RadioGroup
          name="attr_industry"
          label="業種"
          options={[
            { value: "IT・通信", label: "IT・通信" },
            { value: "製造業", label: "製造業" },
            { value: "建設・不動産", label: "建設・不動産" },
            { value: "小売・卸売", label: "小売・卸売" },
            { value: "飲食・サービス", label: "飲食・サービス" },
            { value: "医療・福祉", label: "医療・福祉" },
            { value: "コンサルティング", label: "コンサルティング" },
            { value: "クリエイティブ・デザイン", label: "クリエイティブ・デザイン" },
            { value: "教育", label: "教育" },
            { value: "その他", label: "その他" },
          ]}
          required
        />

        <SelectField
          name="attr_prefecture"
          label="所在地（都道府県）"
          placeholder="選択してください（任意）"
          options={PREFECTURES.map((p) => ({ value: p, label: p }))}
        />

        <RadioGroup
          name="attr_usage_period"
          label="利用期間"
          options={[
            { value: "1ヶ月未満", label: "1ヶ月未満" },
            { value: "1〜3ヶ月", label: "1〜3ヶ月" },
            { value: "3〜6ヶ月", label: "3〜6ヶ月" },
            { value: "6ヶ月〜1年", label: "6ヶ月〜1年" },
            { value: "1年以上", label: "1年以上" },
          ]}
          required
        />

        <RadioGroup
          name="attr_usage_status"
          label="現在の利用状況"
          options={[
            { value: "現在も利用中", label: "現在も利用中" },
            { value: "過去に利用（解約済み）", label: "過去に利用（解約済み）" },
            { value: "お試し利用のみ", label: "お試し利用のみ" },
          ]}
          required
        />

        <RadioGroup
          name="attr_usage_amount"
          label="1回あたりの利用金額"
          options={[
            { value: "10万円未満", label: "10万円未満" },
            { value: "10〜50万円", label: "10〜50万円" },
            { value: "50〜100万円", label: "50〜100万円" },
            { value: "100〜500万円", label: "100〜500万円" },
            { value: "500万円以上", label: "500万円以上" },
          ]}
          required
        />

        <RadioGroup
          name="attr_online_complete"
          label="オンラインのみで完結しましたか？（任意）"
          options={[
            { value: "はい", label: "はい" },
            { value: "いいえ", label: "いいえ" },
            { value: "わからない", label: "わからない" },
          ]}
        />
      </div>
    </div>
  );
}
