import { COLOR_HEX, COLOR_LABEL, DIRECTION_LABEL, KinResult } from "@/lib/types";
import { KinRelation, RELATION_BADGE } from "@/lib/fortune";
import {
  CATEGORY_LABEL,
  CATEGORY_TEMPLATES,
  FortuneCategory,
} from "@/lib/data/fortune-templates";

interface Props {
  label: string;
  periodLabel?: string;
  themeKin: KinResult;
  relation: KinRelation;
  theme: string;
  advice: string;
  caution: string;
  highlight?: boolean;
}

const RELATION_TONE: Record<KinRelation, string> = {
  same: "bg-turquoise text-white",
  guide: "bg-maya-yellow text-ink",
  antipode: "bg-maya-red text-white",
  analog: "bg-turquoise-soft text-turquoise-deep",
  occult: "bg-maya-blue text-white",
  neutral: "bg-bg-soft text-ink-soft",
};

const CATEGORY_ORDER: FortuneCategory[] = ["work", "love", "money", "health"];

export default function FortuneCard({
  label,
  periodLabel,
  themeKin,
  relation,
  theme,
  advice,
  caution,
  highlight,
}: Props) {
  return (
    <section
      className={`rounded-3xl border p-6 sm:p-7 ${
        highlight
          ? "border-turquoise/40 bg-turquoise-soft/40"
          : "border-line bg-surface"
      }`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-base sm:text-lg font-medium text-turquoise-deep">
          {label}
        </h3>
        {periodLabel && (
          <span className="text-xs text-ink-soft">{periodLabel}</span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <span
          aria-hidden
          className="inline-block w-3 h-3 rounded-full border border-line"
          style={{ background: COLOR_HEX[themeKin.seal.color] }}
        />
        <div className="text-sm flex-1 min-w-[150px]">
          <span className="font-medium text-ink">KIN{themeKin.kin}</span>{" "}
          <span className="text-ink-soft">
            / {themeKin.tone.nameJa}・{themeKin.seal.nameJa}（
            {COLOR_LABEL[themeKin.seal.color]}・
            {DIRECTION_LABEL[themeKin.seal.direction]}）
          </span>
        </div>
        <span
          className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${RELATION_TONE[relation]}`}
        >
          {RELATION_BADGE[relation]}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink">{theme}</p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-bg p-4">
          <div className="flex items-center gap-1.5 text-turquoise-deep text-xs font-medium tracking-wider">
            <span>◇</span>
            <span>意識すると良いこと</span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-ink">{advice}</p>
        </div>
        <div className="rounded-2xl border border-line bg-bg p-4">
          <div className="flex items-center gap-1.5 text-maya-red text-xs font-medium tracking-wider">
            <span>△</span>
            <span>気をつけること</span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-ink">{caution}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-bg-soft/70 p-4">
        <div className="text-[11px] font-medium tracking-wider text-turquoise-deep mb-2">
          仕事・恋愛・金運・健康
        </div>
        <ul className="divide-y divide-line">
          {CATEGORY_ORDER.map((cat) => (
            <li
              key={cat}
              className="py-2.5 first:pt-0 last:pb-0 flex gap-3 items-start"
            >
              <span className="text-xs font-medium text-ink shrink-0 w-12 pt-0.5">
                {CATEGORY_LABEL[cat]}
              </span>
              <p className="text-sm leading-relaxed text-ink flex-1">
                {CATEGORY_TEMPLATES[relation][cat]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
