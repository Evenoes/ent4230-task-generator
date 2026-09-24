import { useEffect, type MouseEvent } from 'react'
import type { PracticeTask } from '../features/practice'
import { LightbulbIcon } from './icons'

type HintModalProps = {
  task: PracticeTask
  onClose: () => void
}

export function HintModal({ task, onClose }: HintModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="modal-backdrop" onMouseDown={closeOnBackdrop}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="hint-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close hint">×</button>
        <div className="modal-icon"><LightbulbIcon /></div>
        <p className="eyebrow">Formula hint</p>
        <h2 id="hint-title">{task.category}</h2>
        <div className="formula-list">
          {task.hints.map((hint) => <div className="formula" key={hint}>{hint}</div>)}
        </div>
        <p className="modal-note">Work from the top formula down when more than one step is shown.</p>
        <button className="button button--primary modal-done" type="button" onClick={onClose}>Got it</button>
      </div>
    </div>
  )
}
