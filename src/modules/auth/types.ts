import { User } from '@/data/models/user'
import { PageProps } from '@/modules/core/types/PageProps'

export type UserInfo = {
  email: string
  phone: string
  firstName: string
  lastName: string
}

export type AuthPageProps = PageProps<{ user?: User }>

export type EmailPasswordCreds = {
  email: string
  password: string
}

export interface AuthFormData extends EmailPasswordCreds {
  email: string
  password: string
}

export type AuthFormFieldName = keyof AuthFormData
