import { Heading } from '@chakra-ui/layout'
import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ChangeEvent } from 'react'

import { EmailPasswordCreds } from '@/modules/auth/types'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import {
  Form,
  FormField,
  FormFields,
  FormHeader,
  FormSubmit,
} from '@/ui/components/Form'
import { spacing } from '@/ui/utils/spacing'

const LabeledInput = dynamic(() => import('@/ui/components/Input/LabeledInput'))

export type FormFieldProps<K extends string | number | symbol = any> = {
  id: K
  type: string
  label: string
  placeholder: string
}

const AuthForm = function AuthForm<
  VM extends EmailPasswordCreds = EmailPasswordCreds,
  K extends keyof VM = keyof VM,
>({
  copy,
  onSubmit,
  vm,
  error,
  isLoading,
  onChange,
  fields,
}: {
  fields: Array<FormFieldProps<K>>
  copy: { title: string; question: string; action: string; actionHref: string }
  vm: VM
  isLoading: boolean
  error?: string | Falsy
  onSubmit: (formData: VM) => void
  onChange: (field: K, value: string) => void
}) {
  const handleChange = (field: K) => (event: ChangeEvent<HTMLInputElement>) => {
    onChange(field, event.currentTarget.value)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit(vm)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader>
        <Heading
          css={css`
            text-align: center;
            font-size: ${spacing(8)};
            margin-bottom: ${spacing(3)};
          `}
        >
          {copy.title}
        </Heading>
        <p className="mt-2 text-lg text-center text-gray-600">
          {`${copy.question} `}
          <Link href={copy.actionHref}>
            <a className="font-semibold text-indigo-600 hover:text-indigo-500">
              {copy.action}
            </a>
          </Link>
        </p>
      </FormHeader>
      <input type="hidden" name="remember" defaultValue="true" />
      <FormFields>
        {fields.map((field) => (
          <FormField key={`${field.id}`}>
            <LabeledInput
              id={`${field.id}`}
              text={field.label}
              name={`${field.id}`}
              type={field.type}
              autoComplete={field.type}
              required
              placeholder={field.placeholder}
              onChange={handleChange(field.id)}
            />
          </FormField>
        ))}
      </FormFields>

      <ErrorMessage>{error}</ErrorMessage>
      <FormSubmit>{isLoading ? 'Loading...' : copy.title}</FormSubmit>
    </Form>
  )
}

export default AuthForm
