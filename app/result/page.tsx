import Link from "next/link";
import { notFound } from "next/navigation";
import KinDisplay from "@/components/KinDisplay";
import FortuneCard from "@/components/FortuneCard";
import CyclePositionCard from "@/components/CyclePositionCard";
import HighlightDaysCard from "@/components/HighlightDays";
import BiorhythmGraph from "@/components/BiorhythmGraph";
import CategoryYearOutlook from "@/components/CategoryYearOutlook";
import MilestoneYears from "@/components/MilestoneYears";
import { parseBirthdate } from "@/lib/birthdate";
import { buildResultData, BIORHYTHM_RANGE, FUTURE_TIMING_YEARS } from "@/lib/result-data";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const dateParam = typeof params.date === "string" ? params.date : undefined;
  const parsed = parseBirthdate(dateParam);
  if (!parsed) notFound();

  const data = buildResultData(parsed);

  return (
    <main className="flex flex-col flex-1">
      <header className="px-5 sm:px-8 pt-10 pb-4 max-w-2xl mx-auto w-full">
        <Link href="/" className="text-xs text-ink-soft hover:text-turquoise-deep">
          ← 入力に戻る
        </Link>
        <h1 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-ink">
          鑑定結果
        </h1>
      </header>

      <div className="px-5 sm:px-8 pb-16 max-w-2xl mx-auto w-full space-y-6">
        <KinDisplay kinResult={data.userKin} birthDateLabel={data.birthDateLabel} />

        <FortuneCard
          label={data.monthFortune.label}
          periodLabel={data.monthFortune.periodLabel}
          themeKin={data.monthFortune.themeKin}
          relation={data.monthFortune.relation}
          theme={data.monthFortune.theme}
          advice={data.monthFortune.advice}
          caution={data.monthFortune.caution}
        />

        <HighlightDaysCard
          highlights={data.highlights}
          yearMonth={{
            year: data.today.getFullYear(),
            month: data.today.getMonth() + 1,
          }}
        />

        <CyclePositionCard cycle={data.cycle} />

        <PremiumNotice />

        <BiorhythmGraph
          outlooks={data.biorhythm}
          currentYear={data.today.getFullYear()}
          rangeYears={BIORHYTHM_RANGE}
        />

        <MilestoneYears milestones={data.milestones} rangeYears={BIORHYTHM_RANGE} />

        <CategoryYearOutlook
          thisYear={{
            year: data.today.getFullYear(),
            themeKin: data.yearFortune.themeKin,
            relation: data.yearFortune.relation,
          }}
          nextYear={{
            year: data.today.getFullYear() + 1,
            themeKin: data.nextYearFortune.themeKin,
            relation: data.nextYearFortune.relation,
          }}
          userKin={data.userKin}
          destinyPartners={data.destinyPartners}
          loveYears={data.loveYears}
          jobChangeYears={data.jobChangeYears}
          futureYears={FUTURE_TIMING_YEARS}
        />
      </div>
    </main>
  );
}

function PremiumNotice() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-turquoise-soft/60 via-turquoise-soft/40 to-bg-soft/60 border border-turquoise/30 px-6 py-5">
      <div className="flex items-center gap-2.5">
        <span className="text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 rounded-full bg-turquoise text-white">
          Premium
        </span>
        <p className="text-sm font-medium text-ink">
          ここから下はプレミアム機能です
        </p>
      </div>
      <p className="mt-2 text-xs text-ink-soft leading-relaxed">
        現在プレリリース期間中につき、すべて無料でご覧いただけます。
      </p>
    </div>
  );
}
