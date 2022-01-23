import { makeAutoObservable } from 'mobx'

export class RequestStore {
  error: string | null = null
  busy = false

  setError(val: string | null) {
    this.error = val
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
