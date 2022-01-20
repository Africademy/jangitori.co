import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { ChangeEvent } from 'react'

import { EmailPasswordCreds } from '@/modules/auth/types'
import { ErrorMessage } from '@/ui/components/ErrorMessage'

import { AuthFormFieldName } from '../types'
import { AuthFormVM } from './AuthFormVM'

const AuthFormCard = observer(function AuthFormCard({
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
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="h-screen min-h-screen max-h-screen flex md:items-center justify-center px-4 sm:px-6 lg:px-8 pb-36 md:pb-20">
        <div className="max-w-md w-full space-y-8 my-auto">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {copy.title}
            </h2>
            <p className="mt-2 text-center text-lg  text-gray-600">
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
            <div className="rounded-md shadow-sm -space-y-px">
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange('password')}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default AuthFormCard
