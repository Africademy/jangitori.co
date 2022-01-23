import { makeAutoObservable } from 'mobx'

export class RequestStore {
  error: Error | null = null
  busy = false

  setError(val: unknown | null) {
    this.error = val === null ? null : (val as Error)
  }

  setBusy(val: boolean) {
    this.busy = val
  }

  start() {
    this.setBusy(true)
    this.setError(null)
  }

  constructor() {
    makeAutoObservable(this)
  }
}
