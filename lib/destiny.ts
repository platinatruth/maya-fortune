import { calculateKin, resolveKin } from "./tzolkin";
import { detectRelation } from "./fortune";
import { KinRelation } from "./fortune-types";
import { KinResult } from "./types";

interface BirthDate {
  year: number;
  month: number;
  day: number;
}

// =========================================
// 5つの魂の家族（運命の関係性KIN）
// =========================================

const ANALOG_PAIRS: Record<number, number> = {
  1: 12, 2: 11, 3: 10, 4: 9, 5: 8, 6: 7, 7: 6, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1,
  13: 20, 14: 19, 15: 18, 16: 17, 17: 16, 18: 15, 19: 14, 20: 13,
};

function sealNumberOf(kin: number): number {
  const r = kin % 20;
  return r === 0 ? 20 : r;
}

function toneNumberOf(kin: number): number {
  const r = kin % 13;
  return r === 0 ? 13 : r;
}

export function getAntipodeKin(userKin: number): number {
  let k = userKin + 130;
  if (k > 260) k -= 260;
  return k;
}

export function getOccultKin(userKin: number): number {
  return 261 - userKin;
}

export function getAnalogKin(userKin: number): number {
  const userSeal = sealNumberOf(userKin);
  const userTone = toneNumberOf(userKin);
  const analogSeal = ANALOG_PAIRS[userSeal];
  for (let k = 1; k <= 260; k++) {
    if (sealNumberOf(k) === analogSeal && toneNumberOf(k) === userTone) {
      return k;
    }
  }
  throw new Error(`No analog kin for ${userKin}`);
}

export type PartnerType = "antipode" | "analog" | "occult";

export interface DestinyPartner {
  type: PartnerType;
  kinResult: KinResult;
  typeLabel: string;
  description: string;
}

const PARTNER_TYPE_LABEL: Record<PartnerType, string> = {
  antipode: "対極の人（あなたを成長させる）",
  analog: "響き合う人（価値観の合うパートナー）",
  occult: "運命の人（魂の双子のような縁）",
};

const PARTNER_BASE_DESC: Record<PartnerType, string> = {
  antipode:
    "あなたとは正反対のエネルギーを持ち、出会うと最初は違和感や葛藤を感じやすい相手。しかし向き合うほど、あなたの中の足りない部分を補い、人としての器を大きく育ててくれる存在です。",
  analog:
    "あなたと感性や価値観が似ていて、自然体でいられる相手。「分かってくれる」と感じやすく、仲間としてもパートナーとしても安らぎをくれる存在です。",
  occult:
    "説明できない引力で結ばれる、運命的な相手。出会った瞬間に何かを感じる、不思議な縁の持ち主。深いレベルで魂が共鳴する関係になります。",
};

export function getDestinyPartners(userKin: number): DestinyPartner[] {
  const types: PartnerType[] = ["analog", "antipode", "occult"];
  const fns: Record<PartnerType, (k: number) => number> = {
    analog: getAnalogKin,
    antipode: getAntipodeKin,
    occult: getOccultKin,
  };
  return types.map((type) => {
    const kin = fns[type](userKin);
    const kinResult = resolveKin(kin);
    return {
      type,
      kinResult,
      typeLabel: PARTNER_TYPE_LABEL[type],
      description: `${PARTNER_BASE_DESC[type]} ${kinResult.seal.nameJa}（${kinResult.tone.nameJa}）の特性を持ち、${kinResult.seal.keyword.split(" / ")[0]}のエネルギーを纏う人です。`,
    };
  });
}

// =========================================
// 未来の好機タイミング
// =========================================

export interface FavorableYear {
  year: number;
  age: number;
  themeKin: KinResult;
  relation: KinRelation;
  reason: string;
}

function ageInYear(birth: BirthDate, year: number): number {
  return Math.max(year - birth.year, 0);
}

function buildOutlooks(birth: BirthDate, futureYears: number, currentYear: number) {
  const userKin = calculateKin(birth.year, birth.month, birth.day);
  const list: { year: number; themeKin: KinResult; relation: KinRelation; tone: number; color: string }[] = [];
  for (let i = 1; i <= futureYears; i++) {
    const y = currentYear + i;
    const themeKinNumber = calculateKin(y, birth.month, birth.day);
    const themeKin = resolveKin(themeKinNumber);
    const relation = detectRelation(userKin, themeKinNumber);
    list.push({
      year: y,
      themeKin,
      relation,
      tone: themeKin.tone.number,
      color: themeKin.seal.color,
    });
  }
  return { userKin, list };
}

// 出会いに向く年: 同調 / 学び / 協力 / ひらめき
export function getFavorableLoveYears(
  birth: BirthDate,
  today: Date,
  futureYears = 10,
): FavorableYear[] {
  const { list } = buildOutlooks(birth, futureYears, today.getFullYear());
  return list
    .filter(
      (o) =>
        o.relation === "same" ||
        o.relation === "guide" ||
        o.relation === "analog" ||
        o.relation === "occult",
    )
    .map((o) => {
      const reason = loveReasonOf(o.relation, o.themeKin);
      return {
        year: o.year,
        age: ageInYear(birth, o.year),
        themeKin: o.themeKin,
        relation: o.relation,
        reason,
      };
    });
}

const LOVE_RELATION_PREFIX: Record<KinRelation, string> = {
  same: "あなた本来の魅力が最も輝く、本領発揮の年。",
  guide: "出会いから大切な気づきを得る、学びの年。",
  analog: "価値観の合う相手と縁が深まる、協奏の年。",
  occult: "運命的な縁や偶然の出会いが訪れやすい、ひらめきの年。",
  antipode: "",
  neutral: "",
};

// その年の年齢KINの紋章が示す「縁が深まる相手の人物像」
const LOVE_SEAL_PARTNER: Record<number, string> = {
  1: "あなたを母性的に育み包んでくれる、慈しみと包容力の人。",
  2: "心を察し優しい言葉で繋がる、感受性豊かな人。",
  3: "静かな深さと夢見る感性を持つ、内省的でロマンチックな人。",
  4: "一筋に物事を深掘りする、知的で誠実な人。",
  5: "情熱と本能で生きる、一途で粘り強い人。",
  6: "異なる世界をつなぐ、もてなしの心が深い人。",
  7: "癒しと優しさで寄り添ってくれる、繊細で器用な人。",
  8: "美的センスが高く完璧主義の、繊細でこだわりの強い人。",
  9: "信念と使命感で動く、改革者の情熱を秘めた人。",
  10: "誠実で家族思いの、信頼でじっくり縁を育む人。",
  11: "ユーモアと閃きにあふれた、一緒にいて楽しい人。",
  12: "自分の道を堂々と歩む、意志が強く影響力のある人。",
  13: "向上心と探究心を持つ、ナチュラルで誠実な人。",
  14: "受容力と魅力で惹きつける、一緒にいて安心できる人。",
  15: "視野が広く本質を見抜く、論理的だが情に厚い人。",
  16: "知性と挑戦を愛する、共に高め合える人。",
  17: "シンクロを起こす感性を持つ、出会うべくして出会った縁の人。",
  18: "真実を映す誠実さと、秩序を重んじる凛とした人。",
  19: "エネルギッシュで変革を起こす、刺激的な人。",
  20: "太陽のように明るく公平な、輝きを分けてくれる中心人物。",
};

// 音位相が示す「出会いの場面・タイミングの空気」
const LOVE_TONE_PHRASE: Record<number, string> = {
  1: "新たな始まりの時期",
  2: "揺れの中で本物を選ぶ時期",
  3: "行動と勢いの時期",
  4: "土台や形を整える時期",
  5: "存在感が広がる時期",
  6: "リズムを整える時期",
  7: "深く共振する時期",
  8: "信頼の絆が花開く時期",
  9: "情熱が脈打つ時期",
  10: "実りが見えてくる時期",
  11: "古いものを手放した先の時期",
  12: "分かち合いと共有の時期",
  13: "集大成と次への移行の時期",
};

function loveReasonOf(rel: KinRelation, themeKin: KinResult): string {
  const prefix = LOVE_RELATION_PREFIX[rel];
  if (!prefix) return "";
  const tonePhrase = LOVE_TONE_PHRASE[themeKin.tone.number] ?? "";
  const partner = LOVE_SEAL_PARTNER[themeKin.seal.number] ?? "";
  return `${prefix}${tonePhrase}に出会うのは、${partner}`;
}

// 転職に向く年: 反対(挑戦) / スペクトル音(11) / 青色（転）
export function getFavorableJobChangeYears(
  birth: BirthDate,
  today: Date,
  futureYears = 10,
): FavorableYear[] {
  const { list } = buildOutlooks(birth, futureYears, today.getFullYear());
  return list
    .filter(
      (o) => o.relation === "antipode" || o.tone === 11 || o.color === "blue",
    )
    .map((o) => {
      const reason = jobChangeReasonOf(o, o.themeKin);
      return {
        year: o.year,
        age: ageInYear(birth, o.year),
        themeKin: o.themeKin,
        relation: o.relation,
        reason,
      };
    });
}

// その年の紋章が示す「年の傾向」（ユーザーの職種とは独立、できるだけ具体的に）
const JOB_SEAL_FLAVOR: Record<number, string> = {
  1: "何かを育てたり、新しく始めたくなる年です。",
  2: "発信や対話が活発になり、人との繋がりが広がる年です。",
  3: "本当にやりたいことを見つめ直したくなる年です。",
  4: "一つのことを深く掘り下げたくなる年です。",
  5: "直感や本能のままに動きたくなる年です。",
  6: "人と人をつなぐ役割が増えやすい年です。",
  7: "誰かを支えたり、丁寧に物事を仕上げたくなる年です。",
  8: "美意識やクオリティを磨きたくなる年です。",
  9: "流れを変えたい・改革したいという気持ちが強まる年です。",
  10: "誠実な絆や信頼関係を築きたくなる年です。",
  11: "遊び心や新しいアイディアが湧きやすい年です。",
  12: "自分の道を貫きたい気持ちが強まる年です。",
  13: "向上心と探究心が高まる年です。",
  14: "人を惹きつける魅力が高まる年です。",
  15: "視野を広げて、全体を見渡したくなる年です。",
  16: "挑戦したい気持ちが強まる年です。",
  17: "人をまとめる役割や、不思議な縁が増える年です。",
  18: "真実を見極めたい・秩序を整えたくなる年です。",
  19: "大きく環境を変えたくなる、変革の年です。",
  20: "中心的役割や、人を照らすような場面が増える年です。",
};

// 音位相が示す「転職タイミングの傾向」（完全な文として読める形）
const JOB_TONE_PHRASE: Record<number, string> = {
  1: "新しい何かを始めたくなる時期です。",
  2: "選択肢のあいだで揺れながら、踏み出したくなる時期です。",
  3: "とにかく動き出したくなる時期です。",
  4: "土台や仕組みを整えたくなる時期です。",
  5: "存在感や実績を発揮したくなる時期です。",
  6: "リズムやペースを整えたくなる時期です。",
  7: "直感と情報の両方が冴える時期です。",
  8: "信頼関係から新しい仕事が広がりやすい時期です。",
  9: "強い意図で道を切り拓きたくなる時期です。",
  10: "これまでの努力が形になりやすい時期です。",
  11: "古い役割を手放したくなる時期です。",
  12: "チームで動きたくなる時期です。",
  13: "ひとつを完了させ、次へ移りたくなる時期です。",
};

function jobChangeReasonOf(
  o: { relation: KinRelation; tone: number; color: string },
  _themeKin: KinResult,
): string {
  const reasons: string[] = [];
  if (o.relation === "antipode") reasons.push("挑戦の年");
  if (o.tone === 11) reasons.push("スペクトル音の年");
  if (o.color === "blue") reasons.push("青・転の年");

  const tonePhrase = JOB_TONE_PHRASE[_themeKin.tone.number] ?? "";
  const conditionsText = reasons.length > 0 ? `${reasons.join("・")}。` : "";
  return `${conditionsText}${tonePhrase}`;
}
