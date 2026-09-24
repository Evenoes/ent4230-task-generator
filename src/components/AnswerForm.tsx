import type { FormEventHandler, RefObject } from 'react'
import type { PracticeTask } from '../features/practice'
import type { Result } from '../features/practice/hooks/usePracticeRound'

type AnswerFormProps = {
  answer: string
  currentIndex: number
  currentResult?: Result
  error: string
  inputRef: RefObject<HTMLInputElement | null>
  onAnswerChange: (answer: string) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  task: PracticeTask
  totalTasks: number
}

export function AnswerForm({
  answer,
  currentIndex,
  currentResult,
  error,
  inputRef,
  onAnswerChange,
  onSubmit,
  task,
  totalTasks,
}: AnswerFormProps) {
  const buttonLabel = currentResult
    ? currentIndex === totalTasks - 1 ? 'See results' : 'Next task'
    : 'Check answer'

  return (
    <form className="answer-area" onSubmit={onSubmit}>
      <label htmlFor="answer">Your answer</label>
      <div className="answer-row">
        <div className={`input-wrap ${error ? 'input-wrap--error' : ''}`}>
          <input
            ref={inputRef}
            id="answer"
            inputMode="decimal"
            autoComplete="off"
            value={answer}
            disabled={Boolean(currentResult)}
            onChange={(event) => onAnswerChange(event.target.value)}
            placeholder={task.placeholder}
          />
          <span>{task.inputSuffix}</span>
        </div>
        <button className="button button--primary check-button" type="submit">{buttonLabel}</button>
      </div>
      {error && <p className="field-error">{error}</p>}
    </form>
  )
}
