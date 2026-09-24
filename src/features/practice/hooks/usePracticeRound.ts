import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { generateRound, type PracticeTask } from '..'
import { parseAnswer } from '../parseAnswer'

export type Result = {
  taskId: string
  entered: number
  correct: boolean
}

export function usePracticeRound() {
  const [round, setRound] = useState<PracticeTask[]>(() => generateRound())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [error, setError] = useState('')
  const [hintOpen, setHintOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const finished = currentIndex >= round.length
  const task = finished ? null : round[currentIndex]
  const currentResult = task
    ? results.find((result) => result.taskId === task.id)
    : undefined
  const score = useMemo(
    () => results.filter((result) => result.correct).length,
    [results],
  )

  useEffect(() => {
    if (!hintOpen && !finished && !currentResult) inputRef.current?.focus()
  }, [currentIndex, currentResult, finished, hintOpen])

  const startNewRound = () => {
    setRound(generateRound())
    setCurrentIndex(0)
    setAnswer('')
    setResults([])
    setError('')
    setHintOpen(false)
  }

  const moveNext = () => {
    setCurrentIndex((index) => index + 1)
    setAnswer('')
    setError('')
  }

  const submitAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!task) return
    if (currentResult) {
      moveNext()
      return
    }

    const entered = parseAnswer(answer)
    if (!Number.isFinite(entered)) {
      setError('Enter a number before checking your answer.')
      return
    }

    const correct = Math.abs(entered - task.answer) <= task.tolerance
    setResults((previous) => [
      ...previous,
      { taskId: task.id, entered, correct },
    ])
    setError('')
  }

  return {
    answer,
    closeHint: () => setHintOpen(false),
    currentIndex,
    currentResult,
    error,
    finished,
    hintOpen,
    inputRef,
    openHint: () => setHintOpen(true),
    results,
    round,
    score,
    setAnswer,
    startNewRound,
    submitAnswer,
    task,
  }
}

export type PracticeSession = ReturnType<typeof usePracticeRound>
