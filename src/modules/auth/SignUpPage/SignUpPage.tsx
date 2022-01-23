import { Container, Heading } from '@chakra-ui/layout'
import styled from '@emotion/styled'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { routes } from '@/lib/routes'
import {
  useAccountService,
  useAuthService,
  useAuthStore,
} from '@/modules/stores'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { smallerThan } from '@/ui/utils/breakpoints'
import { spacing } from '@/ui/utils/spacing'

const LabeledInput = dynamic(() => import('@/ui/components/Input/LabeledInput'))

import { FormFieldProps } from './FormFieldProps'
const SignUpForm = dynamic(() => import('./SignUpForm'))
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { AuthFormVM } from '@/modules/auth/AuthFormVM'
import { EmailPasswordCreds } from '@/modules/auth/types'
import { Typography } from '@/ui/atoms/Typography'
import {
  Form,
  FormField,
  FormFields,
  FormHeader,
  FormSubmit,
} from '@/ui/components/Form'
import { defaultFields, FieldID } from '@/ui/components/Form/defaultFields'

import AuthForm from '../AuthForm'
import { SignUpAuthFormCopy, SignUpStep } from './constants'
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
  const authService = useAuthService()
  const accountService = useAccountService()

  const router = useRouter()

  const authFormVM = useMobXStore(() => new AuthFormVM())

  const signUpStore = useMobXStore(() => new SignUpStore(authStore))

  const handleChange =
    (field: FieldID) => (event: React.ChangeEvent<HTMLInputElement>) => {
      runInAction(
        () => (signUpStore.initialAccount[field] = event.target.value),
      )
    }

  if (signUpStore.currentStep === SignUpStep.Auth) {
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

  async function handleSubmitAuthForm(formData: EmailPasswordCreds) {
    try {
      authFormVM.setError(null)
      authFormVM.setIsLoading(true)
      const { authUser, session } = await authService.signIn(formData)
      const account = await accountService.getAccount(authUser.id)
      authStore.setSession(session)
      authStore.setAccount(account)
      router.push(routes.dashboardPage(account.role, 'overview'))
    } catch (error) {
      alert((error as Error).message)
      authFormVM.setError((error as Error).message)
    } finally {
      authFormVM.setIsLoading(false)
    }
  }

  return (
    <SContainer>
      <AuthForm
        copy={SignUpAuthFormCopy}
        vm={authFormVM}
        onSubmit={handleSubmitAuthForm}
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
