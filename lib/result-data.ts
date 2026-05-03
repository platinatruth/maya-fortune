import { calculateKinResult } from "@/lib/tzolkin";
import {
  getMonthFortune,
  getYearFortune,
  getNextYearFortune,
  getCyclePosition,
  getMonthHighlights,
} from "@/lib/fortune";
import { getBiorhythmRange, findMilestoneYears } from "@/lib/biorhythm";
import {
  getDestinyPartners,
  getFavorableLoveYears,
  getFavorableJobChangeYears,
} from "@/lib/destiny";
import type { ParsedBirthdate } from "@/lib/birthdate";

export const BIORHYTHM_RANGE = 20;
export const FUTURE_TIMING_YEARS = 10;

export function buildResultData(birth: ParsedBirthdate, today: Date = new Date()) {
  const userKin = calculateKinResult(birth.year, birth.month, birth.day);
  const monthFortune = getMonthFortune(birth, today);
  const yearFortune = getYearFortune(birth, today);
  const nextYearFortune = getNextYearFortune(birth, today);
  const cycle = getCyclePosition(birth, today);
  const highlights = getMonthHighlights(birth, today.getFullYear(), today.getMonth() + 1);
  const biorhythm = getBiorhythmRange(birth, today, BIORHYTHM_RANGE);
  const milestones = findMilestoneYears(biorhythm);
  const destinyPartners = getDestinyPartners(userKin.kin);
  const loveYears = getFavorableLoveYears(birth, today, FUTURE_TIMING_YEARS);
  const jobChangeYears = getFavorableJobChangeYears(birth, today, FUTURE_TIMING_YEARS);

  return {
    userKin,
    today,
    monthFortune,
    yearFortune,
    nextYearFortune,
    cycle,
    highlights,
    biorhythm,
    milestones,
    destinyPartners,
    loveYears,
    jobChangeYears,
    birthDateLabel: `${birth.year}年${birth.month}月${birth.day}日`,
  };
}

export type ResultData = ReturnType<typeof buildResultData>;
