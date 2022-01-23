import { action, makeAutoObservable } from 'mobx'

import { RequestStore } from '@/lib/request/RequestStore'

export class FormStore<Data extends { [k: string]: string }> {
  data: Data
  request: RequestStore = new RequestStore()

  _onSubmit: (data: Data) => Promise<void>

  async onSubmit(): Promise<void> {
    const data = this.data
    this.request.start()
    try {
      await this._onSubmit(data)
    } catch (error) {
      this.request.setError(error)
    } finally {
      this.request.setBusy(false)
    }
  }

  get isConfirmDisabled(): boolean {
    return !Object.values(this.data).every(Boolean)
  }

  constructor(initialData: Data, onSubmit: (data: Data) => Promise<void>) {
    this.data = initialData
    this._onSubmit = onSubmit
    makeAutoObservable(this, {
      onSubmit: action.bound,
      _onSubmit: false,
    })
  }

  onChange(field: keyof Data, value: string) {
    this.data[field] = value as Data[keyof Data]
  }
}
