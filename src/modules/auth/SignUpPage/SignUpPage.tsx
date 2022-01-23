import { Container, Heading } from '@chakra-ui/layout'
import styled from '@emotion/styled'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { routes } from '@/lib/routes'
import { useAuthStore } from '@/modules/stores'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { smallerThan } from '@/ui/utils/breakpoints'
import { spacing } from '@/ui/utils/spacing'

const LabeledInput = dynamic(() => import('@/ui/components/Input/LabeledInput'))

import dynamic from 'next/dynamic'

import AuthForm from '@/modules/auth/AuthForm'
import { AuthFormVM } from '@/modules/auth/AuthFormVM'
import { Typography } from '@/ui/atoms/Typography'
import {
  Form,
  FormField,
  FormFields,
  FormHeader,
  FormSubmit,
} from '@/ui/components/Form'
import { defaultFields, FieldID } from '@/ui/components/Form/defaultFields'

import { SignUpAuthFormCopy, SignUpStep } from './constants'
import { FormFieldProps } from './FormFieldProps'
import { SignUpStore } from './SignUpStore'

export const ConfirmationFormCopy = {
  title: 'Confirm Information',
  subtitle:
    'Before finishing up, make sure the information we have for you is correct.',
  submitCaption: 'Confirm',
  actionHref: routes.authPage('login'),
}

const confirmationFormFields: FormFieldProps[] = [
  defaultFields.email,
  defaultFields.firstName,
  defaultFields.lastName,
]

export const SignUpPage = observer(function SignUpPage() {
  const authStore = useAuthStore()

  const authFormVM = useMobXStore(() => new AuthFormVM())

  const signUpStore = useMobXStore(() => new SignUpStore(authStore))

  const handleChange =
    (field: FieldID) => (event: React.ChangeEvent<HTMLInputElement>) => {
      runInAction(
        () => (signUpStore.invariantInitialUser[field] = event.target.value),
      )
    }

  if (signUpStore.currentStep === SignUpStep.Auth) {
    const initialUser = signUpStore.invariantInitialUser
    return (
      <SContainer>
        <Form onSubmit={signUpStore.onSubmitConfirmation}>
          <FormHeader>
            <Heading>{ConfirmationFormCopy.title}</Heading>
            <Typography>{ConfirmationFormCopy.subtitle}</Typography>
          </FormHeader>
          <FormFields>
            {confirmationFormFields.map((field) => (
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
                  value={initialUser[field.id]}
                />
              </FormField>
            ))}
          </FormFields>
          <ErrorMessage>{signUpStore.error}</ErrorMessage>
          <FormSubmit
            disabled={signUpStore.isConfirmDisabled}
            isLoading={signUpStore.isLoading}
          >
            {ConfirmationFormCopy.submitCaption}
          </FormSubmit>
        </Form>
      </SContainer>
    )
  }

  return (
    <SContainer>
      <AuthForm
        copy={SignUpAuthFormCopy}
        vm={authFormVM}
        onSubmit={signUpStore.onSubmitUserCredentials}
      />
    </SContainer>
  )
})

const SContainer = styled(Container)`
  ${smallerThan('md')} {
    padding-left: 0;
    padding-right: 0;
    min-height: 100vh;
    display: flex;
  }
  form {
    padding: ${spacing(12, 8)};
    margin: ${spacing('auto')};
    max-width: 36rem;
    ${smallerThan('md')} {
      min-height: 100%;
      margin: 0;
    }
  }
`
