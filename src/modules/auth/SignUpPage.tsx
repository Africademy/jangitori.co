import { Container, Heading } from '@chakra-ui/layout'
import styled from '@emotion/styled'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { routes } from '@/lib/routes'
import { useServices } from '@/modules/stores'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { smallerThan } from '@/ui/utils/breakpoints'
import { spacing } from '@/ui/utils/spacing'

const LabeledInput = dynamic(() => import('@/ui/components/Input/LabeledInput'))

import { FormFieldProps } from './AuthForm/AuthForm'
const AuthForm = dynamic(() => import('./AuthForm/AuthForm'))
import dynamic from 'next/dynamic'

import {
  Form,
  FormField,
  FormFields,
  FormHeader,
  FormSubmit,
} from '@/ui/components/Form'
const Typography = dynamic(() => import('@/ui/atoms/Typography/Typography'))

import { useRootStore } from '@/modules/stores'
import { defaultFields, FieldID } from '@/ui/components/Form/defaultFields'

import { SignUpStore } from './SignUpStore'

const SignUpPageCopy = {
  title: 'Sign up',
  question: 'Already have an account?',
  action: 'Sign in.',
  actionHref: routes.authPage('login'),
}

const authFormFields: FormFieldProps[] = [
  defaultFields.email,
  defaultFields.password,
]

const ConfirmationFormCopy = {
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

const SignUpPage = observer(function SignUpPage() {
  const { authStore } = useRootStore()
  const services = useServices('auth', 'account')

  const signUpStore = useMobXStore(() => new SignUpStore(services, authStore))

  const handleChange =
    (field: FieldID) => (event: React.ChangeEvent<HTMLInputElement>) => {
      runInAction(
        () => (signUpStore.initialAccount[field] = event.target.value),
      )
    }

  if (signUpStore.currentStep === 1) {
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
                  value={signUpStore.initialAccount[field.id]}
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
        fields={authFormFields}
        copy={SignUpPageCopy}
        vm={signUpStore.authCreds}
        onChange={signUpStore.onChange}
        error={signUpStore.error}
        isLoading={signUpStore.isLoading}
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

export default SignUpPage
