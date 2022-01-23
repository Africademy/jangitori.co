import { makeAutoObservable } from 'mobx'

export class FormStore<
  Data extends Record<string, string> = Record<string, string>,
> {
  data: Data
  error: string | null = null
  busy = false

  constructor(initialData: Data) {
    this.data = initialData
    makeAutoObservable(this)
  }

  get isConfirmDisabled(): boolean {
    return !Object.values(this.data).every(Boolean)
  }

  onChange(field: keyof Data, value: Data[keyof Data]) {
    this.data[field] = value
  }
}
