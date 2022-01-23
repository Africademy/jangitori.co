import { useState } from 'react'

export function useStepper<Steps extends readonly string[]>(
  steps: Steps,
): {
  step: string
  back: () => void
  next: () => void
} {
  const [stepIndex, setStepIndex] = useState(0)

  const step = steps[stepIndex]

  const back = () => {
    if (stepIndex === steps.length - 1) {
      console.log('WARNING: Already at first step. Aborting back() call.')
      return
    }
    setStepIndex(stepIndex - 1)
  }

  const next = () => {
    if (stepIndex === steps.length - 1) {
      console.log('WARNING: Already at final step. Aborting next() call.')
      return
    }
    setStepIndex(stepIndex + 1)
  }

  return { step, back, next }
}
