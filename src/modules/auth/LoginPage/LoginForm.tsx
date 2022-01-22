import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { ChangeEvent } from 'react'

import { EmailPasswordCreds } from '@/modules/auth/types'
import { ErrorMessage } from '@/ui/components/ErrorMessage'

import { AuthFormVM } from '../AuthFormVM'
import { AuthFormFieldName } from '../types'

const LoginForm = observer(function LoginForm({
  copy,
  onSubmit,
  vm,
  error,
}: {
  copy: { title: string; question: string; action: string; actionHref: string }
  vm: AuthFormVM
  error?: string | Falsy
  onSubmit: (formData: EmailPasswordCreds) => void
}) {
  const handleChange =
    (field: AuthFormFieldName) => (event: ChangeEvent<HTMLInputElement>) => {
      vm.onChange(field, event.currentTarget.value)
    }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    runInAction(() => onSubmit({ email: vm.email, password: vm.password }))
  }

  return (
    <>
      <div className="flex justify-center h-screen max-h-screen min-h-screen px-4 md:items-center sm:px-6 lg:px-8 pb-36 md:pb-20">
        <div className="w-full max-w-md my-auto space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              {copy.title}
            </h2>
            <p className="mt-2 text-lg text-center text-gray-600">
              {`${copy.question} `}
              <Link href={copy.actionHref}>
                <a className="font-semibold text-indigo-600 hover:text-indigo-500">
                  {copy.action}
                </a>
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <ErrorMessage>{error ?? vm.error}</ErrorMessage>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange('email')}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange('password')}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {vm.isLoading ? 'Loading...' : copy.title}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
})

export default LoginForm
