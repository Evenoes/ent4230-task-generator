import { CalculatorIcon, RefreshIcon } from './icons'

type AppHeaderProps = {
  onNewRound: () => void
  showNewRound?: boolean
}

export function AppHeader({ onNewRound, showNewRound = true }: AppHeaderProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark"><CalculatorIcon /></div>
        <div className="brand-copy">
          <span>ENT4230</span>
          <strong>Formula practice</strong>
        </div>
      </div>
      {showNewRound && (
        <button className="button button--quiet" type="button" onClick={onNewRound}>
          <RefreshIcon /> New round
        </button>
      )}
    </header>
  )
}
