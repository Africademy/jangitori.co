import { PageProps } from '@/layouts/core/types/PageProps'
import { EmailPasswordCreds } from '@/modules/auth/types'
import { Account } from '@/modules/models/Account'

export type AuthPageProps = PageProps<{ account?: Account }>

export interface AuthFormData extends EmailPasswordCreds {
  email: string
  password: string
}

export type AuthFormFieldName = keyof AuthFormData
