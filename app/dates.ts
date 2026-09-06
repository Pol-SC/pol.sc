// Whole years elapsed between `from` and now, accounting for month/day.
export function yearsSince(from: Date, now = new Date()): number {
  let years = now.getFullYear() - from.getFullYear();
  const beforeAnniversary =
    now.getMonth() < from.getMonth() ||
    (now.getMonth() === from.getMonth() && now.getDate() < from.getDate());
  if (beforeAnniversary) years -= 1;
  return years;
}

export const BIRTHDAY = new Date(2007, 2, 15);

// Calendar-accurate years/months/days between `from` and now.
export function durationSince(from: Date, now = new Date()) {
  let years = now.getFullYear() - from.getFullYear();
  let months = now.getMonth() - from.getMonth();
  let days = now.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    // Days in the month before `now`.
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export function formatDuration(d: ReturnType<typeof durationSince>): string {
  const unit = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const parts = [
    d.years > 0 && unit(d.years, "year"),
    (d.years > 0 || d.months > 0) && unit(d.months, "month"),
    unit(d.days, "day"),
  ].filter(Boolean);
  return parts.join(", ");
}
