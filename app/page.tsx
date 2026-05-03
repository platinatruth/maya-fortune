import BirthdateForm from "@/components/BirthdateForm";
import { SEALS } from "@/lib/data/seals";
import { TONES } from "@/lib/data/tones";
import { COLOR_HEX, COLOR_LABEL, DIRECTION_LABEL, MayaColor, Seal } from "@/lib/types";

const COLOR_ORDER: MayaColor[] = ["red", "white", "blue", "yellow"];
const COLOR_PHASE_LABEL: Record<MayaColor, string> = {
  red: "起・始動",
  white: "承・浄化",
  blue: "転・変容",
  yellow: "結・収穫",
};

export default function Home() {
  const sealsByColor: Record<MayaColor, Seal[]> = {
    red: SEALS.filter((s) => s.color === "red"),
    white: SEALS.filter((s) => s.color === "white"),
    blue: SEALS.filter((s) => s.color === "blue"),
    yellow: SEALS.filter((s) => s.color === "yellow"),
  };

  return (
    <main className="flex flex-col flex-1">
      {/* Hero */}
      <section className="px-5 sm:px-8 pt-12 sm:pt-20 pb-12 max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-2 text-turquoise-deep text-xs font-medium tracking-widest uppercase">
          <span className="inline-block w-8 h-px bg-turquoise" />
          maya-fortune
        </div>
        <h1 className="mt-4 text-3xl sm:text-5xl font-serif font-bold leading-tight text-ink">
          あなたのKINで、
          <br />
          人生の流れを読む。
        </h1>
        <p className="mt-5 text-sm sm:text-base leading-relaxed text-ink-soft max-w-xl">
          260日周期のマヤ暦ツォルキンに、生年月日を重ねます。
          20の太陽の紋章 × 13の銀河の音から、あなただけのKIN番号と
          人生のバイオリズムを導き出します。
        </p>
        <a
          href="#input"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-turquoise hover:bg-turquoise-deep transition-colors text-white font-medium px-6 py-3 text-sm shadow-sm"
        >
          あなたのKINを知る
          <span aria-hidden>→</span>
        </a>
      </section>

      {/* What is Maya calendar */}
      <section className="px-5 sm:px-8 py-12 bg-bg-soft/50 border-y border-line">
        <div className="max-w-3xl mx-auto w-full">
          <SectionHeading kicker="ABOUT" title="マヤ暦とは" />
          <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-ink">
            <p>
              古代マヤ文明が用いた、<strong>260日周期の神聖暦「ツォルキン」</strong>。
              20の太陽の紋章と13の銀河の音が組み合わさり、260通りのKIN（運命のエネルギー）が生まれます。
            </p>
            <p>
              あなたの生年月日が、ひとつのKINに対応します。
              そこから、あなた本来の本質、毎日のリズム、人生のバイオリズム——
              ありのままの自分を知る糸口が見えてきます。
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <Stat number="260" label="ユニークなKIN" />
            <Stat number="20" label="太陽の紋章" />
            <Stat number="13" label="銀河の音" />
          </div>
        </div>
      </section>

      {/* 20 Solar Seals */}
      <section className="px-5 sm:px-8 py-14">
        <div className="max-w-3xl mx-auto w-full">
          <SectionHeading kicker="20 SEALS" title="20の太陽の紋章" />
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-soft">
            紋章はあなたの「本質」を示します。4色（赤・白・青・黄）× 5系統 = 20の紋章があり、
            それぞれが個性のテーマを担っています。
          </p>

          <div className="mt-8 space-y-6">
            {COLOR_ORDER.map((color) => (
              <div key={color}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    aria-hidden
                    className="inline-block w-3 h-3 rounded-full border border-line"
                    style={{ background: COLOR_HEX[color] }}
                  />
                  <h3 className="text-base sm:text-lg font-medium text-ink">
                    {COLOR_LABEL[color]}の紋章
                  </h3>
                  <span className="text-xs text-ink-soft">
                    {COLOR_PHASE_LABEL[color]}・
                    {DIRECTION_LABEL[sealsByColor[color][0].direction]}
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {sealsByColor[color].map((seal) => (
                    <li
                      key={seal.number}
                      className="rounded-2xl border border-line bg-surface p-3"
                    >
                      <div className="text-[10px] text-ink-soft tracking-wider">
                        SEAL {seal.number}
                      </div>
                      <div className="text-sm font-medium text-ink mt-0.5">
                        {seal.nameJa}
                      </div>
                      <div className="text-[11px] text-ink-soft mt-1 leading-snug">
                        {seal.keyword}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-bg-soft p-4 text-sm text-ink-soft">
            あなたはどの紋章でしょう？ 生年月日を入力すると、20の中からあなた本来の紋章が決まります。
          </div>
        </div>
      </section>

      {/* 13 Galactic Tones */}
      <section className="px-5 sm:px-8 py-14 bg-bg-soft/50 border-y border-line">
        <div className="max-w-3xl mx-auto w-full">
          <SectionHeading kicker="13 TONES" title="13の銀河の音" />
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-soft">
            音はあなたの「個性のテンポ」を示します。1磁気（始まり）から13宇宙（完成）まで、
            13年で1サイクルを刻むリズム。
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TONES.map((tone) => (
              <li
                key={tone.number}
                className="rounded-2xl border border-line bg-surface p-3 flex items-start gap-3"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-turquoise-soft text-turquoise-deep font-serif text-base font-bold flex items-center justify-center">
                  {tone.number}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-ink">
                    {tone.nameJa}
                  </div>
                  <div className="text-[11px] text-ink-soft mt-0.5 leading-snug">
                    {tone.keyword}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl bg-surface border border-line p-4 text-sm text-ink-soft">
            あなたが今、13年サイクルのどの音にいるかも分かります。サイクルの始まりか・中央か・集大成か。
          </div>
        </div>
      </section>

      {/* What you'll discover */}
      <section className="px-5 sm:px-8 py-14">
        <div className="max-w-3xl mx-auto w-full">
          <SectionHeading kicker="WHAT YOU GET" title="あなたが知れること" />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Feature
              title="あなたのKIN番号と本質"
              body="20紋章 × 13音から、あなただけのKINが決まります。本質的な性格と、4色エネルギーの読み解き。"
              free
            />
            <Feature
              title="今月の運勢とハイライト日"
              body="今月のテーマKIN、関係性、意識すること、注意点。月内の特別な日（飛躍・学び・挑戦・ひらめき）も。"
              free
            />
            <Feature
              title="13年サイクルの位置"
              body="あなたが今、人生の13年サイクルの何年目にいるか。種まき期か収穫期か、現在地が見えます。"
              free
            />
            <Feature
              title="人生のバイオリズム（±20年）"
              body="過去から未来までの運気の波形を可視化。13年サイクル × 関係性 × 色位相の合成スコアで、人生の山と谷が分かります。"
            />
            <Feature
              title="人生の節目年"
              body="±20年の中で、特別なエネルギーが流れる飛躍・学び・挑戦・ひらめきの年。グラフのマーカーと連動。"
            />
            <Feature
              title="今年〜来年の詳しい解説"
              body="全体運・仕事運・恋愛運・金運・健康運。それぞれ、関係性 × 音 × 色の組み合わせで1,560通りの解説から導出。"
            />
            <Feature
              title="運命の人候補（魂の家族）"
              body="あなたに特別な縁を結ぶ3つのKIN（協力・挑戦・神秘）。どんなタイプの人と縁が深まるかが分かります。"
            />
            <Feature
              title="向いている職種・転職タイミング"
              body="あなたの紋章が示す本質的な仕事の方向性と、今後10年で訪れる転換のタイミング。"
            />
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            <span className="inline-block px-1.5 py-0.5 rounded-full bg-turquoise text-white text-[10px] font-medium mr-1.5">
              無料
            </span>
            付きの項目は今すぐ見られます。それ以外はプレミアム機能です（リリース時に会員登録で解放予定）。
          </p>
        </div>
      </section>

      {/* CTA / Form */}
      <section
        id="input"
        className="px-5 sm:px-8 py-14 bg-turquoise-soft/30 border-t border-line"
      >
        <div className="max-w-2xl mx-auto w-full">
          <SectionHeading kicker="START" title="あなたのKINを知る" center />
          <p className="mt-3 text-sm leading-relaxed text-ink-soft text-center">
            生年月日を西暦で入力してください。
          </p>
          <div className="mt-8 rounded-3xl bg-surface border border-line p-6 sm:p-8 shadow-sm">
            <BirthdateForm />
          </div>
          <p className="mt-4 text-[11px] text-ink-soft text-center leading-relaxed">
            ※ 計算は日本式マヤ暦（ドリームスペル方式・手帳方式）を採用しています。
          </p>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  kicker,
  title,
  center,
}: {
  kicker: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <div
        className={`flex items-center gap-2 text-turquoise-deep text-xs font-medium tracking-widest uppercase ${
          center ? "justify-center" : ""
        }`}
      >
        <span className="inline-block w-6 h-px bg-turquoise" />
        {kicker}
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl font-serif font-bold leading-tight text-ink">
        {title}
      </h2>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl bg-surface border border-line p-4">
      <div className="text-3xl sm:text-4xl font-serif font-bold text-turquoise-deep">
        {number}
      </div>
      <div className="text-xs text-ink-soft mt-0.5">{label}</div>
    </div>
  );
}

function Feature({
  title,
  body,
  free,
}: {
  title: string;
  body: string;
  free?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-surface border border-line p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-ink">{title}</span>
        {free && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-turquoise text-white">
            無料
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">{body}</p>
    </div>
  );
}
