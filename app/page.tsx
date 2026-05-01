"use client";

import { useEffect, useState } from "react";

type Habit = "noLiquidCalories" | "noSnacks" | "walked" | "workout";

type DayLog = {
  date: string;
  noLiquidCalories: boolean;
  noSnacks: boolean;
  walked: boolean;
  workout: boolean;
};

const HABITS: { key: Habit; label: string; emoji: string }[] = [
  { key: "noLiquidCalories", label: "No liquid calories", emoji: "🥤" },
  { key: "noSnacks", label: "No snacks after dinner", emoji: "🌙" },
  { key: "walked", label: "Walked / hit steps", emoji: "🚶" },
  { key: "workout", label: "Workout", emoji: "💪" },
];

const FEEDBACK: Record<number, string> = {
  0: "Rough day, reset tomorrow",
  1: "Start somewhere",
  2: "Not bad",
  3: "Good job",
  4: "Perfect day",
};

const STORAGE_KEY = "lazy-fat-loss-tracker:v1";

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function emptyLog(date: string): DayLog {
  return {
    date,
    noLiquidCalories: false,
    noSnacks: false,
    walked: false,
    workout: false,
  };
}

export default function Home() {
  const [log, setLog] = useState<DayLog | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const date = todayKey();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DayLog;
        if (parsed.date === date) {
          setLog(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setLog(emptyLog(date));
  }, []);

  useEffect(() => {
    if (!log) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  }, [log]);

  const toggle = (key: Habit) => {
    setLog((prev) => (prev ? { ...prev, [key]: !prev[key] } : prev));
  };

  if (!mounted || !log) {
    return <div className="flex flex-1 items-center justify-center" />;
  }

  const score =
    Number(log.noLiquidCalories) +
    Number(log.noSnacks) +
    Number(log.walked) +
    Number(log.workout);

  const prettyDate = new Date(log.date + "T00:00:00").toLocaleDateString(
    undefined,
    { weekday: "long", month: "long", day: "numeric" }
  );

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          {prettyDate}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Today&apos;s habits
        </h1>
      </header>

      <ul className="flex flex-col gap-3">
        {HABITS.map(({ key, label, emoji }) => {
          const done = log[key];
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => toggle(key)}
                aria-pressed={done}
                className={
                  "flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors " +
                  (done
                    ? "border-emerald-500/60 bg-emerald-500/10 text-foreground"
                    : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900")
                }
              >
                <span className="text-2xl" aria-hidden>
                  {emoji}
                </span>
                <span className="flex-1 text-base font-medium">{label}</span>
                <span
                  className={
                    "flex h-6 w-6 items-center justify-center rounded-full border text-xs " +
                    (done
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-zinc-300 dark:border-zinc-700")
                  }
                  aria-hidden
                >
                  {done ? "✓" : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-5xl font-semibold tabular-nums">
          {score}
          <span className="text-zinc-400">/4</span>
        </div>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {FEEDBACK[score]}
        </p>
      </section>
    </main>
  );
}
