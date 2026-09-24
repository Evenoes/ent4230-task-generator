import type { PracticeTask } from '../features/practice'
import type { Result } from '../features/practice/hooks/usePracticeRound'

type ProgressHeaderProps = {
  currentIndex: number
  results: Result[]
  round: PracticeTask[]
  score: number
}

export function ProgressHeader({ currentIndex, results, round, score }: ProgressHeaderProps) {
  return (
    <div className="progress-header">
      <div>
        <p className="eyebrow">Question {currentIndex + 1} of {round.length}</p>
        <div className="progress-track" aria-label={`Question ${currentIndex + 1} of ${round.length}`}>
          {round.map((task, index) => {
            const result = results.find((item) => item.taskId === task.id)
            const className = result
              ? result.correct ? 'progress-step progress-step--correct' : 'progress-step progress-step--wrong'
              : index === currentIndex ? 'progress-step progress-step--current' : 'progress-step'
            return <span className={className} key={task.id} />
          })}
        </div>
      </div>
      <div className="score-chip"><strong>{score}</strong> correct</div>
    </div>
  )
}
