/**
 * SectionDecorations — ソフトなグラデーションオーバーレイ
 * ブロブ+ドットグリッドを廃止し、シンプルなグラデーションに変更。
 * セクションに position:relative / overflow:hidden が必要。
 */

type Variant = "a" | "b" | "c";

interface Props {
  variant?: Variant;
}

export default function SectionDecorations({ variant = "a" }: Props) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {variant === "a" && <VariantA />}
      {variant === "b" && <VariantB />}
      {variant === "c" && <VariantC />}
    </div>
  );
}

/* ── Variant A : Top3用 — 水色+緑のソフトグラデーション ── */
function VariantA() {
  return (
    <>
      {/* 右上 — 水色グラデーション */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          right: "-8%",
          width: "40vw",
          height: "40vw",
          maxWidth: 480,
          maxHeight: 480,
          borderRadius: "60% 40% 70% 30% / 40% 60% 40% 60%",
          background: "radial-gradient(ellipse at 40% 40%, rgba(42,171,226,0.12) 0%, transparent 70%)",
        }}
      />
      {/* 左下 — 緑グラデーション */}
      <div
        className="absolute"
        style={{
          bottom: "-8%",
          left: "-4%",
          width: "30vw",
          height: "30vw",
          maxWidth: 340,
          maxHeight: 340,
          borderRadius: "40% 60% 35% 65% / 55% 35% 65% 45%",
          background: "radial-gradient(ellipse at 60% 60%, rgba(62,191,138,0.10) 0%, transparent 70%)",
        }}
      />
    </>
  );
}

/* ── Variant B : RankingTabs用 ── */
function VariantB() {
  return (
    <>
      {/* 左上 — 水色グラデーション */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          left: "-6%",
          width: "36vw",
          height: "36vw",
          maxWidth: 420,
          maxHeight: 420,
          borderRadius: "45% 55% 60% 40% / 50% 45% 55% 50%",
          background: "radial-gradient(ellipse at 55% 45%, rgba(42,171,226,0.10) 0%, transparent 68%)",
        }}
      />
      {/* 右下 — 緑グラデーション */}
      <div
        className="absolute"
        style={{
          bottom: "-6%",
          right: "-5%",
          width: "30vw",
          height: "30vw",
          maxWidth: 340,
          maxHeight: 340,
          borderRadius: "60% 40% 45% 55% / 40% 60% 50% 50%",
          background: "radial-gradient(ellipse at 45% 55%, rgba(62,191,138,0.08) 0%, transparent 68%)",
        }}
      />
    </>
  );
}

/* ── Variant C : ServiceCards用 ── */
function VariantC() {
  return (
    <>
      {/* 右中 — 水色グラデーション */}
      <div
        className="absolute"
        style={{
          top: "25%",
          right: "-10%",
          width: "34vw",
          height: "34vw",
          maxWidth: 400,
          maxHeight: 400,
          borderRadius: "50% 50% 65% 35% / 35% 65% 50% 50%",
          background: "radial-gradient(ellipse at 35% 50%, rgba(42,171,226,0.10) 0%, transparent 65%)",
        }}
      />
      {/* 左上 — 緑グラデーション */}
      <div
        className="absolute"
        style={{
          top: "-5%",
          left: "-5%",
          width: "28vw",
          height: "28vw",
          maxWidth: 320,
          maxHeight: 320,
          borderRadius: "55% 45% 40% 60% / 60% 40% 55% 45%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(62,191,138,0.08) 0%, transparent 65%)",
        }}
      />
    </>
  );
}
