import { NumberBank, shuffle, type PracticeTask, type Template } from './core'
import { templates } from './templates'

function takeRandom(templatesToUse: Template[], count: number) {
  return shuffle(templatesToUse).slice(0, count)
}

export function generateRound(): PracticeTask[] {
  const numbers = new NumberBank()
  const highPriority = templates.filter((template) => template.priority === 'high')
  const standard = templates.filter((template) => template.priority === 'standard')
  const selected = shuffle([
    ...takeRandom(highPriority, 7),
    ...takeRandom(standard, 3),
  ])

  return selected.map((template, index) => ({
    ...template.generate(numbers),
    id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
    templateId: template.id,
    priority: template.priority,
  }))
}
