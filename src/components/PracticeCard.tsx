import type { PracticeSession } from '../features/practice/hooks/usePracticeRound'
import { AnswerForm } from './AnswerForm'
import { HintModal } from './HintModal'
import { LightbulbIcon } from './icons'
import { ProgressHeader } from './ProgressHeader'
import { Statement } from './Statement'
import { TaskFeedback } from './TaskFeedback'

export function PracticeCard({ session }: { session: PracticeSession }) {
  const {
    answer,
    closeHint,
    currentIndex,
    currentResult,
    error,
    hintOpen,
    inputRef,
    openHint,
    results,
    round,
    score,
    setAnswer,
    submitAnswer,
    task,
  } = session

  if (!task) return null

  return (
    <section className="practice-card">
      <ProgressHeader
        currentIndex={currentIndex}
        results={results}
        round={round}
        score={score}
      />

      <div className="task-heading">
        <div className="task-tags">
          <span>{task.topic}</span>
          <span>{task.category}</span>
          {task.priority === 'high' && <span className="priority-tag">High priority</span>}
        </div>
        <h1>{task.question}</h1>
        {task.instruction && <p>{task.instruction}</p>}
      </div>

      <div className="statement-card">
        <div className="statement-header">
          <strong>{task.statementTitle}</strong>
          <span>{task.statementNote}</span>
        </div>
        <Statement sections={task.sections} />
      </div>

      <AnswerForm
        answer={answer}
        currentIndex={currentIndex}
        currentResult={currentResult}
        error={error}
        inputRef={inputRef}
        onAnswerChange={setAnswer}
        onSubmit={submitAnswer}
        task={task}
        totalTasks={round.length}
      />

      <div className="task-footer">
        <button className="hint-button" type="button" onClick={openHint}>
          <LightbulbIcon /> Show formula hint
        </button>
        <span>Answers accept commas or decimal points.</span>
      </div>

      {currentResult && <TaskFeedback result={currentResult} task={task} />}
      {hintOpen && <HintModal task={task} onClose={closeHint} />}
    </section>
  )
}
