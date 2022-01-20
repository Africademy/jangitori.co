import styled from '@emotion/styled'

import { largerThan } from '@/common/utils/breakpoints'
import { spacing } from '@/common/utils/spacing'
import { baseCardStyles } from '@/ui/Card/styles'

import {
  FormField,
  FormFields,
  FormHeader,
  FormSubmit,
  FormSubtitle,
} from './Form.components'

const StyledForm = styled.form`
  ${baseCardStyles}
  min-width: 100%;
  gap: ${spacing(3)};
  ${largerThan('mobile')} {
    min-width: 40rem;
    height: min-content;
  }
`

type FormProps = React.HTMLAttributes<HTMLFormElement>
/**
 * Serves as an adapter for external components used to create
 * the app's Form component.
 */
const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return <StyledForm {...props}>{children}</StyledForm>
}

export { Form, FormHeader, FormSubtitle, FormFields, FormField, FormSubmit }
