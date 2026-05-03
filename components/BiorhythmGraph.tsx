import { YearOutlook } from "@/lib/biorhythm";

interface Props {
  outlooks: YearOutlook[];
  currentYear: number;
  rangeYears: number;
}

const W = 820;
const H = 280;
const PAD_X = 44;
const PAD_TOP = 44;
const PAD_BOTTOM = 30;
const INNER_W = W - PAD_X * 2;
const INNER_H = H - PAD_TOP - PAD_BOTTOM;
const Y_MIN = -7;
const Y_MAX = 11;

function scoreToY(s: number): number {
  return PAD_TOP + ((Y_MAX - s) / (Y_MAX - Y_MIN)) * INNER_H;
}

function yearDiffToX(yearDiff: number, range: number): number {
  return PAD_X + ((yearDiff + range) / (range * 2)) * INNER_W;
}

const MILESTONE_COLOR: Partial<Record<YearOutlook["relation"], string>> = {
  same: "var(--turquoise)",
  guide: "var(--maya-yellow)",
  antipode: "var(--maya-red)",
  occult: "var(--maya-blue)",
};

interface CycleBand {
  startX: number;
  endX: number;
  cycleNumber: number;
}

function buildCycleBands(
  outlooks: YearOutlook[],
  rangeYears: number,
  currentYear: number,
): CycleBand[] {
  const bands: CycleBand[] = [];
  if (outlooks.length === 0) return bands;

  const xOf = (year: number) => yearDiffToX(year - currentYear, rangeYears);

  let i = 0;
  while (i < outlooks.length) {
    const cn = outlooks[i].cycleNumber;
    let j = i;
    while (j < outlooks.length && outlooks[j].cycleNumber === cn) j++;

    const startX = i === 0 ? PAD_X : (xOf(outlooks[i - 1].year) + xOf(outlooks[i].year)) / 2;
    const endX = j === outlooks.length
      ? W - PAD_X
      : (xOf(outlooks[j - 1].year) + xOf(outlooks[j].year)) / 2;

    bands.push({ startX, endX, cycleNumber: cn });
    i = j;
  }
  return bands;
}

export default function BiorhythmGraph({
  outlooks,
  currentYear,
  rangeYears,
}: Props) {
  const points = outlooks.map((o) => ({
    x: yearDiffToX(o.year - currentYear, rangeYears),
    y: scoreToY(o.score),
    o,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaD =
    pathD +
    ` L ${points[points.length - 1].x.toFixed(2)} ${scoreToY(0).toFixed(2)}` +
    ` L ${points[0].x.toFixed(2)} ${scoreToY(0).toFixed(2)} Z`;

  const yearTicks: number[] = [];
  for (let d = -rangeYears; d <= rangeYears; d += 5) yearTicks.push(d);

  const baselineY = scoreToY(0);
  const todayX = yearDiffToX(0, rangeYears);

  const bands = buildCycleBands(outlooks, rangeYears, currentYear);

  return (
    <section className="rounded-3xl border border-line bg-surface p-5 sm:p-6 overflow-hidden">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-base sm:text-lg font-medium text-turquoise-deep">
          13年サイクルで読む、人生の波
        </h3>
        <span className="text-xs text-ink-soft">
          {currentYear - rangeYears}年 〜 {currentYear + rangeYears}年
        </span>
      </div>
      <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">
        13年で1サイクル。各サイクルの中で音位相（磁気→月→電気…→宇宙）が波を描き、関係性・色位相と合わさって運気の起伏になります。背景の濃淡が13年サイクルの区切りです。
      </p>

      <div className="mt-3 -mx-1 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          className="min-w-[600px] max-w-full"
          role="img"
          aria-label="13年サイクルで読む人生の波"
        >
          <defs>
            <linearGradient id="biorhythm-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--turquoise)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--turquoise)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 13-year cycle bands (alternating background) */}
          {bands.map((b, idx) => (
            <g key={`band-${b.cycleNumber}`}>
              <rect
                x={b.startX}
                y={PAD_TOP - 14}
                width={Math.max(0, b.endX - b.startX)}
                height={H - PAD_TOP - PAD_BOTTOM + 14}
                fill={idx % 2 === 0 ? "var(--bg-soft)" : "transparent"}
                opacity={0.6}
              />
              {/* Cycle boundary line (left edge of each band, except first) */}
              {idx > 0 && (
                <line
                  x1={b.startX}
                  x2={b.startX}
                  y1={PAD_TOP - 14}
                  y2={H - PAD_BOTTOM}
                  stroke="var(--turquoise)"
                  strokeWidth="1"
                  strokeDasharray="2,3"
                  opacity={0.5}
                />
              )}
              <text
                x={(b.startX + b.endX) / 2}
                y={PAD_TOP - 18}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--turquoise-deep)"
              >
                第{b.cycleNumber}サイクル
              </text>
            </g>
          ))}

          {/* baseline (score 0) */}
          <line
            x1={PAD_X}
            x2={W - PAD_X}
            y1={baselineY}
            y2={baselineY}
            stroke="var(--ink-soft)"
            strokeWidth="0.8"
            strokeDasharray="3,4"
            opacity={0.5}
          />

          {/* y-axis labels */}
          {[10, 5, 0, -5].map((s) => (
            <g key={s}>
              <text
                x={PAD_X - 6}
                y={scoreToY(s) + 3}
                textAnchor="end"
                fontSize="10"
                fill="var(--ink-soft)"
              >
                {s > 0 ? `+${s}` : s}
              </text>
            </g>
          ))}

          {/* x-axis year ticks (labels only, no vertical lines to keep cycle bands clean) */}
          {yearTicks.map((d) => {
            const x = yearDiffToX(d, rangeYears);
            const labelYear = currentYear + d;
            return (
              <text
                key={d}
                x={x}
                y={H - 10}
                textAnchor="middle"
                fontSize="10"
                fill="var(--ink-soft)"
              >
                {labelYear}
              </text>
            );
          })}

          {/* area under curve */}
          <path d={areaD} fill="url(#biorhythm-area)" />

          {/* curve */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--turquoise-deep)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* today vertical line */}
          <line
            x1={todayX}
            x2={todayX}
            y1={PAD_TOP - 14}
            y2={H - PAD_BOTTOM}
            stroke="var(--turquoise-deep)"
            strokeWidth="1.5"
          />
          <rect
            x={todayX - 14}
            y={PAD_TOP - 12}
            width={28}
            height={14}
            rx={7}
            fill="var(--turquoise-deep)"
          />
          <text
            x={todayX}
            y={PAD_TOP - 2}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="white"
          >
            今
          </text>

          {/* points */}
          {points.map((p, i) => {
            const isMilestone = !!MILESTONE_COLOR[p.o.relation];
            const r = isMilestone ? 4.5 : p.o.isCurrent ? 4 : 2.2;
            const fill =
              MILESTONE_COLOR[p.o.relation] ??
              (p.o.isCurrent ? "var(--turquoise-deep)" : "var(--ink-soft)");
            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={fill}
                  stroke="white"
                  strokeWidth={isMilestone || p.o.isCurrent ? 1.5 : 0}
                />
                {isMilestone && (
                  <text
                    x={p.x}
                    y={p.y - 9}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill={fill}
                  >
                    {p.o.year}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-soft">
        <LegendDot color="var(--turquoise)" label="飛躍の年（本領発揮）" />
        <LegendDot color="var(--maya-yellow)" label="学びの年（気づきと出会い）" />
        <LegendDot color="var(--maya-red)" label="挑戦の年（葛藤と成長）" />
        <LegendDot color="var(--maya-blue)" label="ひらめきの年（縁と直感）" />
      </div>
      <details className="mt-2 text-[11px] text-ink-soft">
        <summary className="cursor-pointer hover:text-turquoise-deep">
          スコアの内訳について
        </summary>
        <div className="mt-1.5 leading-relaxed pl-3 border-l-2 border-line">
          スコアは3層の合成です：<br />
          ① 関係性（飛躍+6 / 学び+4 / ひらめき+3 / 協力+1 / 平穏0 / 挑戦−3）<br />
          ② 音位相 <span className="text-ink-soft">−2 〜 +3</span>（13年周期。共振・銀河の年が高め、月・スペクトルの年が低め）<br />
          ③ 色位相 <span className="text-ink-soft">−2 〜 +2</span>（4年周期。黄=結が高め、青=転が低め）
        </div>
      </details>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span
        aria-hidden
        className="inline-block w-2.5 h-2.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
