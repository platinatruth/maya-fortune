import { COLOR_HEX, COLOR_LABEL, DIRECTION_LABEL, KinResult } from "@/lib/types";

interface Props {
  kinResult: KinResult;
  birthDateLabel: string;
}

export default function KinDisplay({ kinResult, birthDateLabel }: Props) {
  const { kin, seal, tone } = kinResult;
  return (
    <section className="rounded-3xl bg-surface border border-line p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between text-sm text-ink-soft">
        <span>生年月日</span>
        <span className="font-medium">{birthDateLabel}</span>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-sm text-ink-soft">KIN</span>
        <span className="text-5xl font-serif font-bold tracking-wide text-ink">
          {kin}
        </span>
        <span className="text-sm text-ink-soft">/ 260</span>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard label="太陽の紋章" value={seal.nameJa} sub={seal.keyword} />
        <InfoCard label="銀河の音" value={tone.nameJa} sub={tone.keyword} />
        <InfoCard
          label="色"
          value={COLOR_LABEL[seal.color]}
          accent={COLOR_HEX[seal.color]}
        />
        <InfoCard label="方位" value={DIRECTION_LABEL[seal.direction]} />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DescBlock title={`紋章: ${seal.nameJa}`} body={seal.description} />
        <DescBlock title={`音: ${tone.nameJa}`} body={tone.description} />
      </div>
    </section>
  );
}

function InfoCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl bg-bg-soft px-4 py-3 flex items-center gap-3">
      {accent && (
        <span
          aria-hidden
          className="inline-block w-3.5 h-3.5 rounded-full border border-line"
          style={{ background: accent }}
        />
      )}
      <div className="flex-1">
        <div className="text-xs text-ink-soft">{label}</div>
        <div className="text-base font-medium text-ink">{value}</div>
        {sub && <div className="text-xs text-ink-soft mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function DescBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line p-4">
      <div className="text-sm font-medium text-turquoise-deep">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-ink">{body}</p>
    </div>
  );
}
