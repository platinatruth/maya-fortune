import { HighlightDay } from "@/lib/fortune";
import { RELATION_BADGE } from "@/lib/fortune";
import { COLOR_HEX } from "@/lib/types";

interface Props {
  highlights: HighlightDay[];
  yearMonth: { year: number; month: number };
}

const RELATION_TONE_TEXT: Record<HighlightDay["relation"], string> = {
  same: "あなた本来の力が満ちる、本領発揮の日。",
  guide: "進むべき道のヒントが届く、気づきと出会いの日。",
  antipode: "対極の風が吹く、葛藤と成長の日。",
  occult: "偶然と直感が冴える、縁とひらめきの日。",
};

const RELATION_BG: Record<HighlightDay["relation"], string> = {
  same: "bg-turquoise text-white",
  guide: "bg-maya-yellow text-ink",
  antipode: "bg-maya-red text-white",
  occult: "bg-maya-blue text-white",
};

export default function HighlightDaysCard({ highlights, yearMonth }: Props) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
      <h3 className="text-base sm:text-lg font-medium text-turquoise-deep">
        今月のハイライト日
      </h3>
      <p className="mt-1.5 text-xs text-ink-soft">
        {yearMonth.year}年{yearMonth.month}月のうち、特別な意味を持つ日。
      </p>

      {highlights.length === 0 ? (
        <p className="mt-4 text-sm text-ink-soft">
          今月は際立ったハイライト日はありません。穏やかな流れの月です。
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {highlights.map((h) => (
            <li
              key={h.dayOfMonth}
              className="py-3 flex items-center gap-3 flex-wrap"
            >
              <div className="text-center w-12">
                <div className="text-2xl font-serif font-bold text-ink leading-none">
                  {h.dayOfMonth}
                </div>
                <div className="text-[10px] text-ink-soft mt-0.5">
                  {weekdayShort(h.date)}
                </div>
              </div>
              <span
                className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${RELATION_BG[h.relation]}`}
              >
                {RELATION_BADGE[h.relation]}
              </span>
              <div className="flex-1 min-w-[180px]">
                <div className="text-sm text-ink">
                  {RELATION_TONE_TEXT[h.relation]}
                </div>
                <div className="text-xs text-ink-soft mt-0.5 flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="inline-block w-2.5 h-2.5 rounded-full border border-line"
                    style={{ background: COLOR_HEX[h.todayKin.seal.color] }}
                  />
                  KIN{h.todayKin.kin}（{h.todayKin.tone.nameJa}・
                  {h.todayKin.seal.nameJa}）
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function weekdayShort(d: Date): string {
  return ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
}
