import { YearOutlook, MilestoneRelation } from "@/lib/biorhythm";
import { COLOR_HEX, COLOR_LABEL } from "@/lib/types";
import { RELATION_BADGE } from "@/lib/fortune";

interface Props {
  milestones: YearOutlook[];
  rangeYears: number;
}

const MILESTONE_TONE: Record<MilestoneRelation, string> = {
  same: "bg-turquoise text-white",
  guide: "bg-maya-yellow text-ink",
  antipode: "bg-maya-red text-white",
  occult: "bg-maya-blue text-white",
};

const MILESTONE_BORDER: Record<MilestoneRelation, string> = {
  same: "border-turquoise/40 bg-turquoise-soft/30",
  guide: "border-maya-yellow/30 bg-maya-yellow/10",
  antipode: "border-maya-red/30 bg-maya-red/5",
  occult: "border-maya-blue/30 bg-maya-blue/5",
};

export default function MilestoneYears({ milestones, rangeYears }: Props) {
  const sorted = [...milestones].sort((a, b) => a.year - b.year);

  return (
    <section className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-medium text-turquoise-deep">
        あなたの人生の節目年
      </h3>
      <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">
        ±{rangeYears}年の範囲で、特別なエネルギーが流れる「飛躍・学び・挑戦・ひらめき」の年。グラフ上の色付きマーカーと連動しています。
      </p>

      {sorted.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-line bg-bg p-4">
          <p className="text-sm leading-relaxed text-ink">
            あなたは、±{rangeYears}年の範囲には飛躍・学び・挑戦・ひらめきの節目年が訪れない時期にいます。
          </p>
          <p className="mt-1.5 text-xs text-ink-soft">
            日々の波と、4色の流れの中で穏やかに歩む期間です。激変ではなく、確かな積み重ねが力になる時期と捉えてください。
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {sorted.map((o) => {
            const rel = o.relation as MilestoneRelation;
            const isFuture = !o.isPast && !o.isCurrent;
            return (
              <li
                key={o.year}
                className={`rounded-2xl border p-4 ${MILESTONE_BORDER[rel]}`}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl font-bold text-ink">
                      {o.year}
                    </span>
                    <span className="text-xs text-ink-soft">年</span>
                  </div>
                  <span className="text-xs text-ink-soft">{o.age}歳</span>
                  <span
                    className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${MILESTONE_TONE[rel]}`}
                  >
                    {RELATION_BADGE[o.relation]}
                  </span>
                  <span className="text-[11px] text-ink-soft ml-auto">
                    {isFuture ? "これから" : o.isPast ? "これまで" : "今年"}・第
                    {o.cycleNumber}サイクル {o.positionInCycle}/13
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-ink-soft">
                  <span
                    aria-hidden
                    className="inline-block w-2.5 h-2.5 rounded-full border border-line"
                    style={{ background: COLOR_HEX[o.themeKin.seal.color] }}
                  />
                  <span>
                    KIN{o.themeKin.kin}「{o.themeKin.tone.nameJa}・
                    {o.themeKin.seal.nameJa}」（
                    {COLOR_LABEL[o.themeKin.seal.color]}・{o.cyclePhaseLabel}）
                  </span>
                </div>

                <div className="mt-2.5 space-y-1 text-sm leading-relaxed text-ink">
                  <p>{o.text.relation}</p>
                  <p className="text-ink-soft">{o.text.tonePhase}</p>
                  <p className="text-ink-soft">{o.text.colorPhase}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
