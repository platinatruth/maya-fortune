import { CyclePosition } from "@/lib/fortune";

interface Props {
  cycle: CyclePosition;
}

export default function CyclePositionCard({ cycle }: Props) {
  const dots = Array.from({ length: 13 }, (_, i) => i + 1);

  return (
    <section className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-base sm:text-lg font-medium text-turquoise-deep">
          あなたの13年サイクル
        </h3>
        <span className="text-xs text-ink-soft">
          現在 {cycle.age} 歳
        </span>
      </div>

      <div className="mt-3 text-sm text-ink">
        第 <span className="font-serif text-2xl font-bold mx-1">{cycle.cycleNumber}</span> サイクルの
        <span className="font-serif text-2xl font-bold mx-1">{cycle.positionInCycle}</span> 年目
        <span className="text-ink-soft"> — {cycle.phaseLabel}</span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink">
        {cycle.description}
      </p>

      <div className="mt-5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {dots.map((n) => (
            <span
              key={n}
              className={`inline-block w-3 h-3 rounded-full transition-colors ${
                n <= cycle.positionInCycle
                  ? "bg-turquoise"
                  : "bg-bg-soft border border-line"
              }`}
              aria-label={`音 ${n}`}
              title={`音 ${n}`}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-ink-soft">
          <span>サイクル開始</span>
          <span>
            あと {cycle.yearsToCycleEnd} 年で次のサイクルへ
          </span>
        </div>
      </div>
    </section>
  );
}
