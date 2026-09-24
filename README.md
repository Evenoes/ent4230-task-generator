# ENT4230 Task Generator

A small study app for practising formulas from ENT4230 Topics 1–4.

Each round contains 10 calculation tasks with realistic randomized values. Tasks marked as high priority in the lecture material appear more frequently, while standard tasks are still included for broader practice.

## Features

- 10 different tasks per round
- Randomized values within realistic ranges
- Seven high-priority and three standard tasks per round
- Financial information displayed as income statements, balance sheets, budgets, or other suitable schedules
- Single-formula and multi-step calculations
- Formula hints shown in a dismissible popup
- Immediate answer feedback and an end-of-round summary
- Responsive layout for desktop and mobile
- Norwegian number formatting with answers accepted using commas or decimal points

## Getting started

The project uses [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in a browser.

## Commands

```bash
pnpm dev      # Start the development server
pnpm lint     # Run ESLint
pnpm build    # Type-check and create a production build
pnpm preview  # Preview the production build
```

## Project structure

```text
src/
├── components/                    Reusable interface components
├── features/
│   └── practice/
│       ├── hooks/                 Round state and answer handling
│       ├── templates/             Task generators grouped by topic
│       ├── core.ts                Shared task types, formatting, and random values
│       ├── generateRound.ts       Round selection and priority weighting
│       └── parseAnswer.ts         User-input normalization
├── App.tsx                        Application composition
├── App.css                        Component styling
├── index.css                      Global styling
└── main.tsx                       React entry point
```

The task templates are divided into:

- `topic1.ts` — financial statements and cash flow
- `topic2Analysis.ts` — financial-statement analysis and profitability
- `topic2Ratios.ts` — leverage, liquidity, activity, and per-share ratios
- `topic3.ts` — cost-volume-profit analysis, forecasting, and budgets
- `topic4.ts` — working capital, inventory, discounts, and cash management

## Task generation

A new round randomly selects:

- 7 high-priority templates
- 3 standard-priority templates

A template can only appear once in a round. `NumberBank` generates values from the ranges defined by each template and avoids recently used values where possible.

Each template defines:

- The question and optional instructions
- The financial statement or schedule shown to the student
- The correct answer and accepted tolerance
- One or more formula hints
- The explanation displayed after answering

## Adding or changing a task

1. Open the appropriate file in `src/features/practice/templates/`.
2. Add or update a template with a unique `id`.
3. Set its priority to `high` or `standard`.
4. Generate inputs through the supplied `NumberBank`.
5. Use the `task` helper to define the answer type, statement rows, hints, and solution.
6. Keep terminology consistent with the lecture slides.
7. Run `pnpm lint` and `pnpm build` before committing.

Authored source files should remain focused and stay below approximately 250 lines.

