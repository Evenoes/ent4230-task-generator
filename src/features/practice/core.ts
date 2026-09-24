export type ValueFormat = 'currency' | 'number' | 'decimal' | 'percent' | 'text'
export type AnswerKind = 'currency' | 'ratio' | 'percent' | 'days' | 'units' | 'number'

export type StatementRow = {
  label: string
  value: number | string
  format?: ValueFormat
  emphasis?: boolean
  indent?: boolean
}

export type StatementSection = {
  title?: string
  rows: StatementRow[]
}

export type PracticeTask = {
  id: string
  templateId: string
  topic: string
  category: string
  priority: 'high' | 'standard'
  question: string
  instruction?: string
  statementTitle: string
  statementNote: string
  sections: StatementSection[]
  answer: number
  answerKind: AnswerKind
  tolerance: number
  placeholder: string
  inputSuffix: string
  hints: string[]
  solution: string
}

export type GeneratedTask = Omit<PracticeTask, 'id' | 'templateId' | 'priority'>
export type Template = {
  id: string
  priority: 'high' | 'standard'
  generate: (numbers: NumberBank) => GeneratedTask
}

const integerFormatter = new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 })
const decimalFormatter = new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 2 })
const recentNumbers = new Set<number>()

export function roundTo(value: number, step = 1) {
  return Math.round(value / step) * step
}

export function fixed(value: number, decimals = 2) {
  return Number(value.toFixed(decimals))
}

export function shuffle<T>(values: T[]) {
  const copy = [...values]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }
  return copy
}

export class NumberBank {
  private used = new Set<number>()

  pick(min: number, max: number, step = 1) {
    const count = Math.floor((max - min) / step)
    for (let attempt = 0; attempt < 80; attempt += 1) {
      const value = min + Math.floor(Math.random() * (count + 1)) * step
      if (!this.used.has(value) && !recentNumbers.has(value)) {
        this.used.add(value)
        recentNumbers.add(value)
        if (recentNumbers.size > 700) recentNumbers.clear()
        return value
      }
    }
    const fallback = min + Math.floor(Math.random() * (count + 1)) * step
    this.used.add(fallback)
    return fallback
  }

  money(min: number, max: number, step = 1000) {
    return this.pick(min, max, step)
  }

  whole(min: number, max: number, step = 1) {
    return this.pick(min, max, step)
  }
}

export function money(value: number) {
  return `NOK ${integerFormatter.format(value)}`
}

export function number(value: number) {
  return decimalFormatter.format(value)
}

export function formatAnswer(value: number, kind: AnswerKind) {
  if (kind === 'currency') return money(Math.round(value))
  if (kind === 'percent') return `${number(value)}%`
  if (kind === 'days') return `${number(value)} days`
  if (kind === 'units') return `${integerFormatter.format(Math.ceil(value))} units`
  return number(value)
}

export function formatStatementValue(row: StatementRow) {
  if (typeof row.value === 'string') return row.value
  if (row.format === 'currency') return money(row.value)
  if (row.format === 'percent') return `${number(row.value)}%`
  if (row.format === 'decimal') return number(row.value)
  return integerFormatter.format(row.value)
}

function defaults(kind: AnswerKind) {
  const map: Record<AnswerKind, Pick<GeneratedTask, 'tolerance' | 'placeholder' | 'inputSuffix'>> = {
    currency: { tolerance: 1, placeholder: 'Enter amount', inputSuffix: 'NOK' },
    ratio: { tolerance: 0.015, placeholder: 'Enter ratio', inputSuffix: '' },
    percent: { tolerance: 0.06, placeholder: 'Enter percentage', inputSuffix: '%' },
    days: { tolerance: 0.55, placeholder: 'Enter number of days', inputSuffix: 'days' },
    units: { tolerance: 0.55, placeholder: 'Enter whole units', inputSuffix: 'units' },
    number: { tolerance: 0.06, placeholder: 'Enter answer', inputSuffix: '' },
  }
  return map[kind]
}

export function task(
  kind: AnswerKind,
  data: Omit<GeneratedTask, 'answerKind' | 'tolerance' | 'placeholder' | 'inputSuffix'>,
): GeneratedTask {
  return { ...data, answerKind: kind, ...defaults(kind) }
}


