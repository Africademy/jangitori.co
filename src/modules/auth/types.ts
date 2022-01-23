import { Account } from '@/data/models/account'
import { PageProps } from '@/modules/core/types/PageProps'

export type AuthPageProps = PageProps<{ account?: Account }>

export interface EmailPasswordCreds {
  email: string
  password: string
}
export interface AuthFormData extends EmailPasswordCreds {
  email: string
  password: string
}

export type AuthFormFieldName = keyof AuthFormData
