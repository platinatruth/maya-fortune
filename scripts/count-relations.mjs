// 2026年の関係性分布を実際に計算
const MONTH_OFFSET = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
function isLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
function calcKin(y, m, d) {
  let dd = d; if (m === 2 && d === 29) dd = 28;
  const ym = (((y - 2016) % 52) + 52) % 52;
  let k = (12 + ym * 365 + MONTH_OFFSET[m - 1] + dd) % 260;
  if (k <= 0) k += 260;
  if (isLeap(y) && m >= 3) k = k === 260 ? 1 : k + 1;
  return k;
}
function sealOf(k) { const r = k % 20; return r === 0 ? 20 : r; }
function toneOf(k) { const r = k % 13; return r === 0 ? 13 : r; }
function colorOf(s) { return ["red", "white", "blue", "yellow"][(s - 1) % 4]; }

function detect(u, o) {
  if (u === o) return "same";
  if (u + o === 261) return "occult";
  const us = sealOf(u), os = sealOf(o), ut = toneOf(u), ot = toneOf(o);
  if (ut === ot && Math.abs(us - os) === 10) return "antipode";
  if (ut === ot) return "guide";
  if (colorOf(us) === colorOf(os)) return "analog";
  return "neutral";
}

const counts = { same: 0, guide: 0, antipode: 0, analog: 0, occult: 0, neutral: 0 };
let total = 0;

// 全ての (年齢, 月, 日) パターンを試す
// 月=1〜12、日=1〜28（簡略化）、年齢=0〜100
for (let age = 0; age <= 100; age++) {
  const birthYear = 2026 - age;
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 28; d++) {
      const userKin = calcKin(birthYear, m, d);
      const themeKin = calcKin(2026, m, d);
      const rel = detect(userKin, themeKin);
      counts[rel]++;
      total++;
    }
  }
}

console.log("Total samples:", total);
console.log("Relation distribution for 2026:");
for (const [k, v] of Object.entries(counts)) {
  const pct = ((v / total) * 100).toFixed(1);
  console.log(`  ${k.padEnd(10)} ${String(v).padStart(5)} (${pct}%)`);
}
const nonNeutral = total - counts.neutral;
console.log("");
console.log(`非平穏: ${nonNeutral} / ${total} (${((nonNeutral / total) * 100).toFixed(1)}%)`);
console.log(`平穏:   ${counts.neutral} / ${total} (${((counts.neutral / total) * 100).toFixed(1)}%)`);
