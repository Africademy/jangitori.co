import { action, makeAutoObservable } from 'mobx'

import { EmailPasswordCreds } from '@/modules/auth/types'

import { AuthFormFieldName } from '../types'

export class AuthFormVM {
  isLoading = false
  error: string | null = null
  email = ''
  password = ''

  setIsLoading(val: boolean) {
    this.isLoading = val
  }

  setError(val: string | null) {
    this.error = val
  }

  onChange(field: AuthFormFieldName, value: string) {
    this[field] = value
  }

  get isSubmitDisabled(): boolean {
    const { password, email } = this
    return password.length < 8 || !email.length
  }

  get formData(): EmailPasswordCreds {
    return { email: this.email, password: this.password }
  }

  reset() {
    this.isLoading = false
    this.error = null
    this.email = ''
    this.password = ''
  }

  constructor() {
    makeAutoObservable(this, { onChange: action.bound }, { name: 'AuthFormVM' })
  }
}
