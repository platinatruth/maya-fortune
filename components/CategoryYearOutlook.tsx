import { COLOR_HEX, KinResult } from "@/lib/types";
import { KinRelation, RELATION_BADGE } from "@/lib/fortune";
import {
  CATEGORY_LABEL,
  DETAILED_CATEGORY_TEMPLATES,
  TONE_COLOR_CATEGORY_TEMPLATES,
  USER_NATAL_ANCHOR_BY_CATEGORY,
  FortuneCategory,
} from "@/lib/data/fortune-templates";
import { SEAL_VOCATIONS } from "@/lib/data/seal-specifics";
import {
  DestinyPartner,
  FavorableYear,
} from "@/lib/destiny";

interface YearInfo {
  year: number;
  themeKin: KinResult;
  relation: KinRelation;
}

interface Props {
  thisYear: YearInfo;
  nextYear: YearInfo;
  userKin: KinResult;
  destinyPartners: DestinyPartner[];
  loveYears: FavorableYear[];
  jobChangeYears: FavorableYear[];
  futureYears: number;
}

const CATEGORY_ORDER: FortuneCategory[] = ["overall", "work", "love", "money", "health"];

const RELATION_TONE: Record<KinRelation, string> = {
  same: "bg-turquoise text-white",
  guide: "bg-maya-yellow text-ink",
  antipode: "bg-maya-red text-white",
  analog: "bg-turquoise-soft text-turquoise-deep",
  occult: "bg-maya-blue text-white",
  neutral: "bg-bg-soft text-ink-soft",
};

const CATEGORY_ACCENT: Record<FortuneCategory, string> = {
  overall: "bg-turquoise text-white",
  work: "bg-turquoise/10 text-turquoise-deep",
  love: "bg-maya-red/10 text-maya-red",
  money: "bg-maya-yellow/15 text-ink",
  health: "bg-maya-blue/10 text-maya-blue",
};

export default function CategoryYearOutlook({
  thisYear,
  nextYear,
  userKin,
  destinyPartners,
  loveYears,
  jobChangeYears,
  futureYears,
}: Props) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-medium text-turquoise-deep">
        今年〜来年の運勢（詳しい解説）
      </h3>
      <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">
        全体運に加え、仕事・恋愛・金運・健康。それぞれの運気が、今年から来年にかけてどう動いていくか。年齢KINとの関係性から読み解きます。
      </p>

      <div className="mt-5 space-y-4">
        {CATEGORY_ORDER.map((cat) => {
          const userAnchor = USER_NATAL_ANCHOR_BY_CATEGORY[userKin.seal.color][cat];
          return (
          <div
            key={cat}
            className={`rounded-2xl border p-5 ${
              cat === "overall"
                ? "border-turquoise/40 bg-turquoise-soft/20"
                : "border-line bg-bg"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_ACCENT[cat]}`}
              >
                {CATEGORY_LABEL[cat]}
              </span>
            </div>

            <div className="mt-3 flex gap-2.5 items-start rounded-xl bg-surface/60 border border-line p-3">
              <span className="shrink-0 inline-block px-1.5 py-0.5 rounded bg-turquoise text-white font-medium text-[10px] mt-px">
                あなた
              </span>
              <p className="text-xs leading-relaxed text-ink flex-1">{userAnchor}</p>
            </div>

            <YearBlock label="今年" yearInfo={thisYear} category={cat} />
            <YearBlock label="来年" yearInfo={nextYear} category={cat} />

            {cat === "work" && (
              <JobChangeSubBlock
                userKin={userKin}
                jobChangeYears={jobChangeYears}
                futureYears={futureYears}
              />
            )}
            {cat === "love" && (
              <DestinyPartnerSubBlock
                destinyPartners={destinyPartners}
                loveYears={loveYears}
                futureYears={futureYears}
              />
            )}
          </div>
          );
        })}
      </div>
    </section>
  );
}

function YearBlock({
  label,
  yearInfo,
  category,
}: {
  label: string;
  yearInfo: YearInfo;
  category: FortuneCategory;
}) {
  const relationText = DETAILED_CATEGORY_TEMPLATES[yearInfo.relation][category];
  const toneColorText =
    TONE_COLOR_CATEGORY_TEMPLATES[yearInfo.themeKin.tone.number][
      yearInfo.themeKin.seal.color
    ][category];
  const mainText = `${relationText}${toneColorText}`;
  return (
    <div className="mt-4 first:mt-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-ink">{label}</span>
        <span className="text-xs text-ink-soft">{yearInfo.year}年</span>
        <span
          className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${RELATION_TONE[yearInfo.relation]}`}
        >
          {RELATION_BADGE[yearInfo.relation]}
        </span>
      </div>
      <div className="mt-1 mb-2 text-xs text-ink-soft flex items-center gap-1.5">
        <span
          aria-hidden
          className="inline-block w-2 h-2 rounded-full border border-line"
          style={{ background: COLOR_HEX[yearInfo.themeKin.seal.color] }}
        />
        KIN{yearInfo.themeKin.kin}・{yearInfo.themeKin.tone.nameJa}
      </div>
      <p className="text-sm leading-relaxed text-ink">{mainText}</p>
    </div>
  );
}

function SubBlockHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 flex items-center gap-2 text-xs font-medium tracking-wider text-turquoise-deep">
      <span className="inline-block w-3 h-px bg-turquoise" />
      {children}
    </div>
  );
}

function JobChangeSubBlock({
  userKin,
  jobChangeYears,
  futureYears,
}: {
  userKin: KinResult;
  jobChangeYears: FavorableYear[];
  futureYears: number;
}) {
  const vocations = SEAL_VOCATIONS[userKin.seal.number] ?? [];
  return (
    <div className="mt-5 rounded-xl border border-dashed border-line p-4">
      <SubBlockHeader>転職について（具体）</SubBlockHeader>

      <div className="mt-3">
        <h5 className="text-sm font-medium text-ink mb-1.5">
          向いている職種
        </h5>
        <p className="text-xs text-ink-soft mb-2">
          あなたの紋章「{userKin.seal.nameJa}」が示す本質：{userKin.seal.keyword}
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {vocations.map((v) => (
            <li
              key={v}
              className="text-xs px-2.5 py-1 rounded-full bg-turquoise-soft text-turquoise-deep"
            >
              {v}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h5 className="text-sm font-medium text-ink mb-1.5">
          転職に向くタイミング（今後{futureYears}年）
        </h5>
        <p className="text-xs text-ink-soft mb-2">
          挑戦の年・スペクトル音の年・青の年のいずれかが、転換のタイミング。
        </p>
        {jobChangeYears.length === 0 ? (
          <p className="text-sm text-ink-soft leading-relaxed">
            今後{futureYears}年の範囲では、強い転換のタイミングは見られません。今は地道に積み重ねる時期です。
          </p>
        ) : (
          <ul className="space-y-1.5">
            {jobChangeYears.map((y) => (
              <li key={y.year} className="text-xs text-ink leading-relaxed flex gap-2">
                <span className="shrink-0 font-serif text-sm font-bold text-ink">
                  {y.year}
                </span>
                <span className="text-ink-soft">（{y.age}歳）</span>
                <span className="flex-1">{y.reason}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function DestinyPartnerSubBlock({
  destinyPartners,
  loveYears,
  futureYears,
}: {
  destinyPartners: DestinyPartner[];
  loveYears: FavorableYear[];
  futureYears: number;
}) {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-line p-4">
      <SubBlockHeader>運命の人について（具体）</SubBlockHeader>

      <div className="mt-3">
        <h5 className="text-sm font-medium text-ink mb-1.5">
          運命の人候補（魂の家族）
        </h5>
        <p className="text-xs text-ink-soft mb-2">
          あなたのKINに対して特別な関係性を持つ3つのKIN。これらの紋章・音を持つ人と縁が深まりやすい傾向です。
        </p>
        <ul className="space-y-2.5">
          {destinyPartners.map((p) => (
            <li
              key={p.type}
              className="rounded-lg bg-surface border border-line p-3"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-turquoise-deep">
                  {p.typeLabel}
                </span>
                <span className="text-[11px] text-ink-soft flex items-center gap-1">
                  <span
                    aria-hidden
                    className="inline-block w-2 h-2 rounded-full border border-line"
                    style={{
                      background: COLOR_HEX[p.kinResult.seal.color],
                    }}
                  />
                  KIN{p.kinResult.kin}「{p.kinResult.tone.nameJa}・
                  {p.kinResult.seal.nameJa}」
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-ink">
                {p.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h5 className="text-sm font-medium text-ink mb-1.5">
          出会いやすいタイミング（今後{futureYears}年）
        </h5>
        <p className="text-xs text-ink-soft mb-2">
          飛躍・学び・協力・ひらめきの年が、運命の出会いに繋がりやすい時期。
        </p>
        {loveYears.length === 0 ? (
          <p className="text-sm text-ink-soft leading-relaxed">
            今後{futureYears}年の範囲では、特に出会いに恵まれる節目年は見られません。日常の中で人との縁を温める時期です。
          </p>
        ) : (
          <ul className="space-y-1.5">
            {loveYears.map((y) => (
              <li key={y.year} className="text-xs text-ink leading-relaxed flex gap-2">
                <span className="shrink-0 font-serif text-sm font-bold text-ink">
                  {y.year}
                </span>
                <span className="text-ink-soft">（{y.age}歳）</span>
                <span className="flex-1">{y.reason}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

