// 計算ロジック検算スクリプト
// 使い方: node scripts/verify-kin.mjs
// 期待値は YOKAI.JP / mayareki.biz / unkoi.com の3サイトでクロスチェックすべし

const MONTH_OFFSET = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function calculateKin(year, month, day) {
  let normalizedDay = day;
  if (month === 2 && day === 29) normalizedDay = 28;
  const yearMod = (((year - 2016) % 52) + 52) % 52;
  let kin = (12 + yearMod * 365 + MONTH_OFFSET[month - 1] + normalizedDay) % 260;
  if (kin <= 0) kin += 260;
  if (isLeapYear(year) && month >= 3) {
    kin = kin === 260 ? 1 : kin + 1;
  }
  return kin;
}

function getSeal(kin) {
  const r = kin % 20;
  return r === 0 ? 20 : r;
}

function getTone(kin) {
  const r = kin % 13;
  return r === 0 ? 13 : r;
}

const cases = [
  { date: [1980, 3, 21], expectedKin: 213, source: "mayareki.biz" },
  { date: [2020, 2, 28] },
  { date: [2020, 2, 29] },
  { date: [2020, 3, 1] },
  { date: [2016, 1, 1] },
  { date: [2016, 7, 26] },
  { date: [2026, 5, 1] },
  { date: [1990, 7, 7] },
  { date: [2000, 1, 1] },
  { date: [1980, 1, 1] },
];

console.log("Date".padEnd(15) + "KIN  Seal  Tone  Note");
console.log("-".repeat(60));
for (const c of cases) {
  const [y, m, d] = c.date;
  const kin = calculateKin(y, m, d);
  const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const seal = getSeal(kin);
  const tone = getTone(kin);
  let note = "";
  if (c.expectedKin) {
    note = kin === c.expectedKin ? `OK (${c.source})` : `NG expected=${c.expectedKin} (${c.source})`;
  }
  console.log(`${dateStr}     ${String(kin).padStart(3)}  ${String(seal).padStart(3)}   ${String(tone).padStart(2)}    ${note}`);
}
