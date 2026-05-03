import { calculateKin, resolveKin } from "./tzolkin";
import { detectRelation } from "./fortune";
import { KinRelation } from "./fortune-types";
import { KinResult } from "./types";
import {
  RELATION_SCORE,
  TONE_PHASE_SCORE,
  COLOR_PHASE_SCORE,
  RELATION_TEMPLATES,
  TONE_PHASE_TEMPLATES,
  COLOR_PHASE_TEMPLATES,
  SCORE_RANGE,
} from "./data/biorhythm-templates";
import { CYCLE_PHASE_DESCRIPTIONS } from "./data/fortune-templates";

interface BirthDate {
  year: number;
  month: number;
  day: number;
}

export interface YearOutlookText {
  relation: string;
  tonePhase: string;
  colorPhase: string;
}

export interface ScoreBreakdown {
  relation: number;
  tone: number;
  color: number;
}

export interface YearOutlook {
  year: number;
  age: number;
  themeKin: KinResult;
  relation: KinRelation;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  cycleNumber: number;
  positionInCycle: number; // 1-13
  cyclePhaseLabel: string;
  isCurrent: boolean;
  isPast: boolean;
  text: YearOutlookText;
}

export const BIORHYTHM_SCORE_RANGE = SCORE_RANGE;

function ageInYear(birth: BirthDate, year: number): number {
  return Math.max(year - birth.year, 0);
}

function buildYearOutlook(
  birth: BirthDate,
  userKin: number,
  year: number,
  currentYear: number,
): YearOutlook {
  const themeKinNumber = calculateKin(year, birth.month, birth.day);
  const themeKin = resolveKin(themeKinNumber);
  const relation = detectRelation(userKin, themeKinNumber);

  const toneNumber = themeKin.tone.number;
  const color = themeKin.seal.color;

  const relationScore = RELATION_SCORE[relation];
  const toneScore = TONE_PHASE_SCORE[toneNumber];
  const colorScore = COLOR_PHASE_SCORE[color];
  const score = relationScore + toneScore + colorScore;

  const age = ageInYear(birth, year);
  const positionInCycle = (age % 13) + 1;
  const cycleNumber = Math.floor(age / 13) + 1;
  const cyclePhaseLabel = CYCLE_PHASE_DESCRIPTIONS[positionInCycle].label;

  const isCurrent = year === currentYear;
  const isPast = year < currentYear;
  const direction: "past" | "future" = isPast ? "past" : "future";

  const text: YearOutlookText = {
    relation: RELATION_TEMPLATES[direction][relation],
    tonePhase: TONE_PHASE_TEMPLATES[direction][toneNumber],
    colorPhase: COLOR_PHASE_TEMPLATES[direction][color],
  };

  return {
    year,
    age,
    themeKin,
    relation,
    score,
    scoreBreakdown: { relation: relationScore, tone: toneScore, color: colorScore },
    cycleNumber,
    positionInCycle,
    cyclePhaseLabel,
    isCurrent,
    isPast,
    text,
  };
}

export function getBiorhythmRange(
  birth: BirthDate,
  today: Date,
  range = 20,
): YearOutlook[] {
  const userKin = calculateKin(birth.year, birth.month, birth.day);
  const currentYear = today.getFullYear();
  const startYear = Math.max(birth.year, currentYear - range);
  const endYear = currentYear + range;

  const outlooks: YearOutlook[] = [];
  for (let y = startYear; y <= endYear; y++) {
    outlooks.push(buildYearOutlook(birth, userKin, y, currentYear));
  }
  return outlooks;
}

export function getLifeTimeline(
  birth: BirthDate,
  today: Date,
  pastYears = 5,
  futureYears = 10,
): { past: YearOutlook[]; future: YearOutlook[] } {
  const userKin = calculateKin(birth.year, birth.month, birth.day);
  const currentYear = today.getFullYear();

  const past: YearOutlook[] = [];
  for (let i = pastYears; i >= 1; i--) {
    const y = currentYear - i;
    if (y < birth.year) continue;
    past.push(buildYearOutlook(birth, userKin, y, currentYear));
  }

  const future: YearOutlook[] = [];
  for (let i = 1; i <= futureYears; i++) {
    const y = currentYear + i;
    future.push(buildYearOutlook(birth, userKin, y, currentYear));
  }

  return { past, future };
}

export type MilestoneRelation = "same" | "guide" | "antipode" | "occult";

export function isMilestone(relation: string): relation is MilestoneRelation {
  return (
    relation === "same" ||
    relation === "guide" ||
    relation === "antipode" ||
    relation === "occult"
  );
}

export function findMilestoneYears(outlooks: YearOutlook[]): YearOutlook[] {
  return outlooks.filter((o) => isMilestone(o.relation));
}
