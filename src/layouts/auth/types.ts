import { Account } from '@/domains/models/Account'
import { PageProps } from '@/layouts/core/types/PageProps'
import { EmailPasswordCreds } from '@/modules/auth/types'

export type AuthPageProps = PageProps<{ account?: Account }>

export interface AuthFormData extends EmailPasswordCreds {
  email: string
  password: string
}

export type AuthFormFieldName = keyof AuthFormData
