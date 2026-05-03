import { calculateKin, resolveKin } from "./tzolkin";
import { KinResult, MayaColor, Tone } from "./types";
import { TONES } from "./data/tones";
import {
  FORTUNE_TEMPLATES,
  RELATION_LABEL,
  RELATION_BADGE,
  CYCLE_PHASE_DESCRIPTIONS,
} from "./data/fortune-templates";
import { KinRelation } from "./fortune-types";

export type { KinRelation } from "./fortune-types";
export { RELATION_LABEL, RELATION_BADGE };

interface BirthDate {
  year: number;
  month: number;
  day: number;
}

function sealNumberOf(kin: number): number {
  const r = kin % 20;
  return r === 0 ? 20 : r;
}

function toneNumberOf(kin: number): number {
  const r = kin % 13;
  return r === 0 ? 13 : r;
}

function colorOfSeal(seal: number): MayaColor {
  const idx = (seal - 1) % 4;
  return (["red", "white", "blue", "yellow"] as MayaColor[])[idx];
}

export function detectRelation(userKin: number, otherKin: number): KinRelation {
  if (userKin === otherKin) return "same";
  if (userKin + otherKin === 261) return "occult";

  const userSeal = sealNumberOf(userKin);
  const otherSeal = sealNumberOf(otherKin);
  const userTone = toneNumberOf(userKin);
  const otherTone = toneNumberOf(otherKin);

  if (userTone === otherTone && Math.abs(userSeal - otherSeal) === 10) {
    return "antipode";
  }
  if (userTone === otherTone) return "guide";
  if (colorOfSeal(userSeal) === colorOfSeal(otherSeal)) return "analog";

  return "neutral";
}

// =========================================
// 今日の運勢
// =========================================
export interface DailyFortune {
  date: string;
  todayKin: KinResult;
  userKin: KinResult;
  relation: KinRelation;
  theme: string;
  advice: string;
  caution: string;
}

export function getDailyFortune(birth: BirthDate, today: Date): DailyFortune {
  const userKin = resolveKin(calculateKin(birth.year, birth.month, birth.day));
  const todayKin = resolveKin(
    calculateKin(today.getFullYear(), today.getMonth() + 1, today.getDate()),
  );
  const relation = detectRelation(userKin.kin, todayKin.kin);
  const tpl = FORTUNE_TEMPLATES.today[relation];

  return {
    date: formatDate(today),
    userKin,
    todayKin,
    relation,
    theme: tpl.theme,
    advice: tpl.advice,
    caution: tpl.caution,
  };
}

// =========================================
// 月/年/来年の運勢
// =========================================
export interface PeriodFortune {
  label: string;
  periodLabel: string;
  themeKin: KinResult;
  relation: KinRelation;
  theme: string;
  advice: string;
  caution: string;
}

export function getMonthFortune(birth: BirthDate, today: Date): PeriodFortune {
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const themeKin = resolveKin(calculateKin(y, m, 1));
  const userKin = calculateKin(birth.year, birth.month, birth.day);
  const relation = detectRelation(userKin, themeKin.kin);
  const tpl = FORTUNE_TEMPLATES.month[relation];

  return {
    label: "今月の運勢",
    periodLabel: `${y}年${m}月`,
    themeKin,
    relation,
    theme: tpl.theme,
    advice: tpl.advice,
    caution: tpl.caution,
  };
}

// 年齢KIN: その年の誕生日のKIN
function yearThemeKinFor(birth: BirthDate, targetYear: number) {
  return resolveKin(calculateKin(targetYear, birth.month, birth.day));
}

export function getYearFortune(birth: BirthDate, today: Date): PeriodFortune {
  const y = today.getFullYear();
  const themeKin = yearThemeKinFor(birth, y);
  const userKin = calculateKin(birth.year, birth.month, birth.day);
  const relation = detectRelation(userKin, themeKin.kin);
  const tpl = FORTUNE_TEMPLATES.year[relation];

  return {
    label: "今年の運勢",
    periodLabel: `${y}年`,
    themeKin,
    relation,
    theme: tpl.theme,
    advice: tpl.advice,
    caution: tpl.caution,
  };
}

export function getNextYearFortune(birth: BirthDate, today: Date): PeriodFortune {
  const y = today.getFullYear() + 1;
  const themeKin = yearThemeKinFor(birth, y);
  const userKin = calculateKin(birth.year, birth.month, birth.day);
  const relation = detectRelation(userKin, themeKin.kin);
  const tpl = FORTUNE_TEMPLATES.nextYear[relation];

  return {
    label: "来年の運勢",
    periodLabel: `${y}年`,
    themeKin,
    relation,
    theme: tpl.theme,
    advice: tpl.advice,
    caution: tpl.caution,
  };
}

// =========================================
// 13年サイクル位置
// =========================================
export interface CyclePosition {
  age: number;
  cycleNumber: number;
  positionInCycle: number; // 1-13
  phaseTone: Tone;
  phaseLabel: string;
  description: string;
  yearsToCycleEnd: number;
}

function ageAt(birth: BirthDate, today: Date): number {
  let age = today.getFullYear() - birth.year;
  const hasPassedBirthday =
    today.getMonth() + 1 > birth.month ||
    (today.getMonth() + 1 === birth.month && today.getDate() >= birth.day);
  if (!hasPassedBirthday) age -= 1;
  return Math.max(age, 0);
}

export function getCyclePosition(birth: BirthDate, today: Date): CyclePosition {
  const age = ageAt(birth, today);
  const positionInCycle = (age % 13) + 1; // 1-13
  const cycleNumber = Math.floor(age / 13) + 1;
  const phaseTone = TONES.find((t) => t.number === positionInCycle)!;
  const desc = CYCLE_PHASE_DESCRIPTIONS[positionInCycle];

  return {
    age,
    cycleNumber,
    positionInCycle,
    phaseTone,
    phaseLabel: desc.label,
    description: desc.body,
    yearsToCycleEnd: 13 - positionInCycle,
  };
}

// =========================================
// ハイライト日
// =========================================
export interface HighlightDay {
  dayOfMonth: number;
  date: Date;
  relation: Exclude<KinRelation, "neutral" | "analog">;
  todayKin: KinResult;
}

export function getMonthHighlights(
  birth: BirthDate,
  year: number,
  month: number,
): HighlightDay[] {
  const userKin = calculateKin(birth.year, birth.month, birth.day);
  const lastDay = new Date(year, month, 0).getDate();
  const highlights: HighlightDay[] = [];

  for (let d = 1; d <= lastDay; d++) {
    const dayKin = calculateKin(year, month, d);
    const rel = detectRelation(userKin, dayKin);
    if (rel === "neutral" || rel === "analog") continue;
    highlights.push({
      dayOfMonth: d,
      date: new Date(year, month - 1, d),
      relation: rel,
      todayKin: resolveKin(dayKin),
    });
  }
  return highlights;
}

// =========================================
// utils
// =========================================
function formatDate(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
