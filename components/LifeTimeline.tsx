import { YearOutlook } from "@/lib/biorhythm";
import { COLOR_HEX, COLOR_LABEL } from "@/lib/types";
import { RELATION_BADGE } from "@/lib/fortune";

interface Props {
  past: YearOutlook[];
  future: YearOutlook[];
}

const RELATION_TONE: Record<YearOutlook["relation"], string> = {
  same: "bg-turquoise text-white",
  guide: "bg-maya-yellow text-ink",
  antipode: "bg-maya-red text-white",
  analog: "bg-turquoise-soft text-turquoise-deep",
  occult: "bg-maya-blue text-white",
  neutral: "bg-bg-soft text-ink-soft",
};

export default function LifeTimeline({ past, future }: Props) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-medium text-turquoise-deep">
        ライフタイムライン
      </h3>
      <p className="mt-1.5 text-xs text-ink-soft">
        これまでの5年とこれからの10年。年齢KINとあなたとの関係から、各年のテーマを読み解きます。
      </p>

      {past.length > 0 && (
        <div className="mt-5">
          <SubHeading>これまでの5年</SubHeading>
          <ul className="mt-2 space-y-3">
            {past.map((o) => (
              <YearItem key={o.year} outlook={o} />
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <SubHeading>これからの10年</SubHeading>
        <ul className="mt-2 space-y-3">
          {future.map((o) => (
            <YearItem key={o.year} outlook={o} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs text-ink-soft font-medium tracking-wider">
      <span className="inline-block w-6 h-px bg-line" />
      {children}
      <span className="inline-block flex-1 h-px bg-line" />
    </div>
  );
}

function YearItem({ outlook: o }: { outlook: YearOutlook }) {
  return (
    <li className="rounded-2xl border border-line bg-bg p-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-xl font-bold text-ink">{o.year}</span>
          <span className="text-xs text-ink-soft">年</span>
        </div>
        <span className="text-xs text-ink-soft">{o.age}歳</span>
        <span
          className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${RELATION_TONE[o.relation]}`}
        >
          {RELATION_BADGE[o.relation]}
        </span>
        <span className="text-[11px] text-ink-soft ml-auto">
          第{o.cycleNumber}サイクル {o.positionInCycle}/13・{o.cyclePhaseLabel}
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
          {o.themeKin.seal.nameJa}」（{COLOR_LABEL[o.themeKin.seal.color]}）
        </span>
      </div>

      <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink">
        <p>{o.text.relation}</p>
        <p className="text-ink-soft">{o.text.tonePhase}</p>
        <p className="text-ink-soft">{o.text.colorPhase}</p>
      </div>
    </li>
  );
}
