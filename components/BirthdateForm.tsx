"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export default function BirthdateForm() {
  const router = useRouter();
  const [year, setYear] = useState<number>(1990);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const maxDay = daysInMonth(year, month);
  const days = Array.from({ length: maxDay }, (_, i) => i + 1);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (day > maxDay) {
      setError("日付が不正です。");
      return;
    }
    const m = String(month).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    router.push(`/result?date=${year}-${m}-${d}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1.5 flex-1 min-w-[110px]">
          <label className="text-sm text-ink-soft font-medium">年</label>
          <select
            className="rounded-xl border border-line bg-surface px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-turquoise/40"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}年
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[90px]">
          <label className="text-sm text-ink-soft font-medium">月</label>
          <select
            className="rounded-xl border border-line bg-surface px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-turquoise/40"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}月
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[90px]">
          <label className="text-sm text-ink-soft font-medium">日</label>
          <select
            className="rounded-xl border border-line bg-surface px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-turquoise/40"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
          >
            {days.map((d) => (
              <option key={d} value={d}>
                {d}日
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-maya-red">{error}</p>}

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-turquoise hover:bg-turquoise-deep transition-colors text-white font-medium py-3.5 text-base shadow-sm"
      >
        鑑定する
      </button>
    </form>
  );
}
