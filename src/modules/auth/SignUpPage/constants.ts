import { routes } from '@/lib/routes'

export enum SignUpStep {
  Auth,
  Confirm,
}

export const SignUpAuthFormCopy = {
  title: 'Sign up',
  question: 'Already have an user?',
  action: 'Sign in.',
  actionHref: routes.authPage('login'),
}
