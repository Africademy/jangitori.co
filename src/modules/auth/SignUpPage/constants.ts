import { routes } from '@/lib/routes'

export const SignUpSteps = {
  Auth: 'auth',
  Confirm: 'confirm',
} as const

export const SignUpAuthFormCopy = {
  title: 'Sign up',
  question: 'Already have an user?',
  action: 'Sign in.',
  actionHref: routes.authPage('login'),
}
