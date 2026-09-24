import { formatAnswer, type PracticeTask } from '../features/practice'
import type { Result } from '../features/practice/hooks/usePracticeRound'
import { RefreshIcon } from './icons'

type RoundSummaryProps = {
  onNewRound: () => void
  results: Result[]
  round: PracticeTask[]
  score: number
}

export function RoundSummary({ onNewRound, results, round, score }: RoundSummaryProps) {
  const percentage = Math.round((score / round.length) * 100)
  const heading = percentage >= 80
    ? 'Strong work.'
    : percentage >= 60 ? 'Good progress.' : 'Keep practising.'

  return (
    <section className="summary-card">
      <div className="summary-score"><span>{score}</span><small>/ {round.length}</small></div>
      <p className="eyebrow">Round complete</p>
      <h1>{heading}</h1>
      <p className="summary-lead">You answered {score} of {round.length} tasks correctly.</p>
      <button className="button button--primary summary-button" type="button" onClick={onNewRound}>
        <RefreshIcon /> New round
      </button>

      <div className="review-list">
        {round.map((task, index) => {
          const result = results.find((item) => item.taskId === task.id)
          return (
            <div className="review-row" key={task.id}>
              <span className={`review-status ${result?.correct ? 'review-status--correct' : 'review-status--wrong'}`}>
                {result?.correct ? '✓' : '×'}
              </span>
              <div>
                <strong>{index + 1}. {task.category}</strong>
                <span>Correct answer: {formatAnswer(task.answer, task.answerKind)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
