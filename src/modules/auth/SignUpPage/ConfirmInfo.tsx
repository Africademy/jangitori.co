import { Container, Heading } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { runInAction } from 'mobx'

import { FormFieldProps } from '@/lib/form/FormFieldProps'
import { FormStore } from '@/lib/mobx/FormStore'
import { useMobXStore } from '@/lib/mobx/useMobXStore'
import { routes } from '@/lib/routes'
import { Typography } from '@/ui/atoms/Typography'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import {
  Form,
  FormField,
  FormFields,
  FormHeader,
  FormSubmit,
} from '@/ui/components/Form'
import { defaultFields, FieldID } from '@/ui/components/Form/defaultFields'
import LabeledInput from '@/ui/components/Input/LabeledInput'
import { below } from '@/ui/utils/breakpoints'
import { spacing } from '@/ui/utils/spacing'

import { UserInfo } from '../types'
import { ConfirmInfoVM } from './ConfirmInfoVM'

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

export interface ConfirmInfoProps {
  vm: ConfirmInfoVM
  onConfirm: (data: UserInfo) => any
}

export const ConfirmInfo: React.FunctionComponent<ConfirmInfoProps> = ({
  vm,
  onConfirm,
}) => {
  const form = useMobXStore(() => new FormStore(vm.userInfo, onConfirm))

  const handleChange =
    (field: FieldID) => (event: React.ChangeEvent<HTMLInputElement>) => {
      runInAction(() => (form.data[field] = event.target.value))
    }

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    vm.onConfirmInfo(form.data)
  }

  return (
    <SContainer>
      <Form onSubmit={handleSubmit}>
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
                value={form.data[field.id]}
              />
            </FormField>
          ))}
        </FormFields>
        <ErrorMessage>{form.request.error?.message}</ErrorMessage>
        <FormSubmit
          disabled={form.isConfirmDisabled}
          isLoading={form.request.busy}
        >
          {ConfirmationFormCopy.submitCaption}
        </FormSubmit>
      </Form>
    </SContainer>
  )
}

const SContainer = styled(Container)`
  ${below('md')} {
    padding-left: 0;
    padding-right: 0;
    min-height: 100vh;
    display: flex;
  }
  form {
    padding: ${spacing(12, 8)};
    margin: ${spacing('auto')};
    max-width: 36rem;
    ${below('md')} {
      min-height: 100%;
      margin: 0;
    }
  }
`
