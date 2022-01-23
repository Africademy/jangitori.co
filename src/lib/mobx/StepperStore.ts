import { makeAutoObservable } from 'mobx'

export class StepperStore {
  stepIndex = 0
  steps: string[]

  get step(): string {
    return this.steps[this.stepIndex]
  }

  constructor(steps: string[]) {
    this.steps = steps
    makeAutoObservable(this)
  }

  increment() {
    const stepIndex = this.stepIndex
    const steps = this.steps
    if (stepIndex === steps.length - 1) {
      console.log('WARNING: Already at final step. Aborting next() call.')
      return
    }
    this.stepIndex = stepIndex + 1
  }

  decrement() {
    const stepIndex = this.stepIndex
    const steps = this.steps
    if (stepIndex === steps.length - 1) {
      console.log('WARNING: Already at first step. Aborting back() call.')
      return
    }
    this.stepIndex = stepIndex - 1
  }
}
