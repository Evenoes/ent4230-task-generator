import './App.css'
import { AppHeader } from './components/AppHeader'
import { PracticeCard } from './components/PracticeCard'
import { RoundSummary } from './components/RoundSummary'
import { usePracticeRound } from './features/practice/hooks/usePracticeRound'

function App() {
  const session = usePracticeRound()

  return (
    <main className="app-shell">
      <AppHeader
        onNewRound={session.startNewRound}
        showNewRound={!session.finished}
      />
      {session.finished ? (
        <RoundSummary
          onNewRound={session.startNewRound}
          results={session.results}
          round={session.round}
          score={session.score}
        />
      ) : (
        <PracticeCard session={session} />
      )}
    </main>
  )
}

export default App
