/**
 * SectionDecorations — Hero と同じ水色ブロブ・ドットグリッドを
 * 任意のセクションに重ねるデコレーションコンポーネント。
 * セクションに position:relative / overflow:hidden が必要。
 *
 * variant で配置パターンを変えることで各セクションに変化を持たせる。
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
      {/* 上下端フェードアウト — セクション境界をなめらかに */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "20%",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, transparent 100%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "20%",
        background: "linear-gradient(to top, rgba(255,255,255,0.55) 0%, transparent 100%)",
      }} />
    </div>
  );
}

/* ── Variant A : 右上ブロブ大 + 左下ブロブ小（Heroと同系統） ── */
function VariantA() {
  return (
    <>
      {/* 右上 — 水色ブロブ */}
      <div style={{
        position: "absolute", top: "-8%", right: "-6%",
        width: "38vw", height: "38vw", maxWidth: 460, maxHeight: 460,
        borderRadius: "55% 45% 65% 35% / 45% 55% 45% 55%",
        background: "radial-gradient(ellipse at 40% 40%, rgba(42,171,226,0.30) 0%, transparent 70%)",
        filter: "blur(3px)",
      }} />
      {/* 左下 — 緑ブロブ */}
      <div style={{
        position: "absolute", bottom: "-6%", left: "-3%",
        width: "28vw", height: "28vw", maxWidth: 320, maxHeight: 320,
        borderRadius: "40% 60% 35% 65% / 55% 35% 65% 45%",
        background: "radial-gradient(ellipse at 60% 60%, rgba(62,191,138,0.24) 0%, transparent 70%)",
        filter: "blur(2px)",
      }} />
      {/* ドットグリッド — 右上 */}
      <DotGrid top="12%" right="8%" opacity={0.40} />
      {/* アクセント小円 */}
      <SmallCircle top="18%" left="4%" color="#3EBF8A" size={10} opacity={0.7} />
      <SmallCircle top="55%" left="10%" color="#2AABE2" size={7} opacity={0.6} />
    </>
  );
}

/* ── Variant B : 左上ブロブ + 右中ブロブ（ランキング用） ── */
function VariantB() {
  return (
    <>
      {/* 左上 — 水色ブロブ */}
      <div style={{
        position: "absolute", top: "-10%", left: "-5%",
        width: "35vw", height: "35vw", maxWidth: 400, maxHeight: 400,
        borderRadius: "45% 55% 60% 40% / 50% 45% 55% 50%",
        background: "radial-gradient(ellipse at 55% 45%, rgba(42,171,226,0.28) 0%, transparent 68%)",
        filter: "blur(3px)",
      }} />
      {/* 右下 — 緑ブロブ */}
      <div style={{
        position: "absolute", bottom: "-4%", right: "-4%",
        width: "30vw", height: "30vw", maxWidth: 340, maxHeight: 340,
        borderRadius: "60% 40% 45% 55% / 40% 60% 50% 50%",
        background: "radial-gradient(ellipse at 45% 55%, rgba(62,191,138,0.22) 0%, transparent 68%)",
        filter: "blur(2px)",
      }} />
      {/* ドットグリッド — 左下 */}
      <DotGrid bottom="10%" left="6%" opacity={0.38} />
      <SmallCircle top="25%" right="5%" color="#2AABE2" size={11} opacity={0.65} />
      <SmallCircle bottom="20%" left="15%" color="#3EBF8A" size={8} opacity={0.55} />
    </>
  );
}

/* ── Variant C : 中央ブロブ + 両端アクセント（詳細用） ── */
function VariantC() {
  return (
    <>
      {/* 右中 — 水色ブロブ */}
      <div style={{
        position: "absolute", top: "30%", right: "-8%",
        width: "32vw", height: "32vw", maxWidth: 380, maxHeight: 380,
        borderRadius: "50% 50% 65% 35% / 35% 65% 50% 50%",
        background: "radial-gradient(ellipse at 35% 50%, rgba(42,171,226,0.26) 0%, transparent 65%)",
        filter: "blur(4px)",
      }} />
      {/* 左上 — 緑ブロブ */}
      <div style={{
        position: "absolute", top: "-5%", left: "-4%",
        width: "26vw", height: "26vw", maxWidth: 300, maxHeight: 300,
        borderRadius: "55% 45% 40% 60% / 60% 40% 55% 45%",
        background: "radial-gradient(ellipse at 50% 50%, rgba(62,191,138,0.22) 0%, transparent 65%)",
        filter: "blur(2px)",
      }} />
      {/* ドットグリッド — 右上 */}
      <DotGrid top="8%" right="5%" opacity={0.36} />
      {/* ドットグリッド — 左下（小） */}
      <DotGrid bottom="12%" left="3%" cols={4} rows={4} opacity={0.30} />
      <SmallCircle top="15%" left="8%" color="#2AABE2" size={9} opacity={0.65} />
      <SmallCircle bottom="25%" right="8%" color="#3EBF8A" size={12} opacity={0.55} />
    </>
  );
}

/* ── 共通サブコンポーネント ──────────────────────────────────── */

function DotGrid({
  top, right, bottom, left,
  rows = 6, cols = 6,
  opacity = 0.2,
}: {
  top?: string; right?: string; bottom?: string; left?: string;
  rows?: number; cols?: number; opacity?: number;
}) {
  const w = cols * 28 + 4;
  const h = rows * 28 + 4;
  return (
    <svg
      style={{ position: "absolute", top, right, bottom, left, opacity }}
      width={w} height={h} viewBox={`0 0 ${w} ${h}`}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 28 + 14} cy={row * 28 + 14} r={2.2}
            fill="#2AABE2"
          />
        ))
      )}
    </svg>
  );
}

function SmallCircle({
  top, right, bottom, left,
  color, size, opacity,
}: {
  top?: string; right?: string; bottom?: string; left?: string;
  color: string; size: number; opacity: number;
}) {
  return (
    <div style={{
      position: "absolute", top, right, bottom, left,
      width: size, height: size, borderRadius: "50%",
      background: color, opacity,
    }} />
  );
}
