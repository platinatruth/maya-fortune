export interface ParsedBirthdate {
  year: number;
  month: number;
  day: number;
}

export function parseBirthdate(input: string | undefined | null): ParsedBirthdate | null {
  if (!input) return null;
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(input);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (year < 1900 || year > 2100) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  return { year, month, day };
}

export function formatBirthdate({ year, month, day }: ParsedBirthdate): string {
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}
