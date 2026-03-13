import CheckboxGroup from "../fields/CheckboxGroup";
import TextareaField from "../fields/TextareaField";

export default function StepPhaseC() {
  return (
    <div>
      <h2 style={{
        fontSize: "1.25rem", fontWeight: 700, color: "#1A2B4A",
        marginBottom: "0.5rem",
      }}>
        利用体験
      </h2>
      <p style={{ fontSize: "0.875rem", color: "#6B7A99", marginBottom: "2rem" }}>
        ご利用時の体験について詳しくお聞かせください
      </p>

      <CheckboxGroup
        name="q13_concerns"
        label="Q13. 利用前に不安だった点を選択してください"
        options={[
          { value: "手数料が高くないか", label: "手数料が高くないか" },
          { value: "審査に通るか", label: "審査に通るか" },
          { value: "入金が遅くないか", label: "入金が遅くないか" },
          { value: "セキュリティは大丈夫か", label: "セキュリティは大丈夫か" },
          { value: "操作が難しくないか", label: "操作が難しくないか" },
          { value: "取引先にバレないか", label: "取引先にバレないか" },
          { value: "特に不安はなかった", label: "特に不安はなかった" },
        ]}
        required
      />

      <CheckboxGroup
        name="q13_good_points"
        label="Q13-2. 実際に使ってみて良かった点を選択してください"
        options={[
          { value: "手数料が安い", label: "手数料が安い" },
          { value: "入金が早い", label: "入金が早い" },
          { value: "審査が簡単", label: "審査が簡単" },
          { value: "操作が簡単", label: "操作が簡単" },
          { value: "サポートが丁寧", label: "サポートが丁寧" },
          { value: "取引先への影響なし", label: "取引先への影響なし" },
          { value: "その他", label: "その他" },
        ]}
        required
      />

      <TextareaField
        name="q13_free_text"
        label="良かった点の詳細（任意）"
        placeholder="具体的なエピソードがあればお書きください"
        maxLength={500}
        rows={3}
      />

      <CheckboxGroup
        name="q14_improvements"
        label="Q14. 改善してほしい点を選択してください"
        options={[
          { value: "手数料を下げてほしい", label: "手数料を下げてほしい" },
          { value: "入金速度を上げてほしい", label: "入金速度を上げてほしい" },
          { value: "審査をもっと簡単に", label: "審査をもっと簡単に" },
          { value: "UIをもっと使いやすく", label: "UIをもっと使いやすく" },
          { value: "サポート対応の改善", label: "サポート対応の改善" },
          { value: "利用可能カードの拡充", label: "利用可能カードの拡充" },
          { value: "特にない", label: "特にない" },
        ]}
        required
      />

      <TextareaField
        name="q14_free_text"
        label="改善してほしい点の詳細（任意）"
        placeholder="具体的な改善要望があればお書きください"
        maxLength={500}
        rows={3}
      />

      <TextareaField
        name="q15_experience"
        label="Q15. 利用体験を自由にお書きください"
        placeholder="申し込みから入金までの流れ、使ってみた感想、困ったことなど具体的にお書きください。この口コミはサイト上で公開される場合があります。"
        required
        maxLength={500}
        rows={6}
      />

      <TextareaField
        name="q16_recommendation"
        label="Q16. このサービスを検討している方へのアドバイス"
        placeholder="これから利用を検討している方に伝えたいことを書いてください"
        required
        maxLength={200}
        rows={4}
      />
    </div>
  );
}
