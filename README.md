# Lazy Fat Loss Tracker (LFLT)

Consistency over perfection. No calorie counting, no complexity.

## Core Idea
A simple daily checklist app designed to track 4 key habits that drive fat loss without the friction of traditional tracking apps. The goal is a tool you actually use daily, not another abandoned project.

## 4 Key Habits
- **🥤 No liquid calories**: Stick to water, black coffee, or zero-calorie drinks.
- **🌙 No snacks after dinner**: Close the kitchen after your last meal.
- **🚶 Walking / steps**: Hit your movement goal for the day.
- **💪 Workout**: Any form of intentional exercise.

## Features
- **Daily Checklist**: 4 large toggles for quick entry (<10 seconds/day).
- **Instant Scoring**: Automatic score calculation (0–4) with motivational feedback.
- **PWA Ready**: Installable on mobile for a native-app feel with offline support.
- **Privacy First**: Data is persisted locally in your browser via `localStorage`.

## Feedback System
- **0/4**: Rough day, reset tomorrow
- **1/4**: Start somewhere
- **2/4**: Not bad
- **3/4**: Good job
- **4/4**: Perfect day

## Tech Stack
- **Framework**: Next.js (App Router)
- **State**: React Hooks (useState, useEffect)
- **Persistence**: LocalStorage
- **PWA**: Custom Service Worker + Manifest

## Development

```bash
pnpm install
pnpm dev
```

## Rules for Success
1. **Keep it simple**: No over-engineering.
2. **Speed is king**: Must take less than 10 seconds to log a day.
3. **Consistency over features**: Optimize for long-term habit formation.
