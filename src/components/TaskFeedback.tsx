import { formatAnswer, type PracticeTask } from '../features/practice'
import type { Result } from '../features/practice/hooks/usePracticeRound'

type TaskFeedbackProps = {
  result: Result
  task: PracticeTask
}

export function TaskFeedback({ result, task }: TaskFeedbackProps) {
  return (
    <div className={`feedback ${result.correct ? 'feedback--correct' : 'feedback--wrong'}`} aria-live="polite">
      <div className="feedback-icon">{result.correct ? '✓' : '×'}</div>
      <div>
        <strong>
          {result.correct ? 'Correct' : `Correct answer: ${formatAnswer(task.answer, task.answerKind)}`}
        </strong>
        <p>{task.solution}</p>
      </div>
    </div>
  )
}
