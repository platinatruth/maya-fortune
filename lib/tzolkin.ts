import { KinResult } from "./types";
import { SEALS } from "./data/seals";
import { TONES } from "./data/tones";

const MONTH_OFFSET = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

export function calculateKin(year: number, month: number, day: number): number {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}`);
  }
  const lastDayOfMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  if (day < 1 || day > lastDayOfMonth) {
    throw new Error(`Invalid day: ${year}-${month}-${day}`);
  }

  let normalizedDay = day;
  if (month === 2 && day === 29) {
    normalizedDay = 28;
  }

  const yearMod = (((year - 2016) % 52) + 52) % 52;
  let kin = (12 + yearMod * 365 + MONTH_OFFSET[month - 1] + normalizedDay) % 260;
  if (kin <= 0) kin += 260;

  if (isLeapYear(year) && month >= 3) {
    kin = kin === 260 ? 1 : kin + 1;
  }

  return kin;
}

export function getSealNumber(kin: number): number {
  const r = kin % 20;
  return r === 0 ? 20 : r;
}

export function getToneNumber(kin: number): number {
  const r = kin % 13;
  return r === 0 ? 13 : r;
}

export function resolveKin(kin: number): KinResult {
  const sealNumber = getSealNumber(kin);
  const toneNumber = getToneNumber(kin);
  const seal = SEALS.find((s) => s.number === sealNumber);
  const tone = TONES.find((t) => t.number === toneNumber);
  if (!seal || !tone) {
    throw new Error(`Cannot resolve KIN ${kin}`);
  }
  return { kin, seal, tone };
}

export function calculateKinResult(year: number, month: number, day: number): KinResult {
  return resolveKin(calculateKin(year, month, day));
}
