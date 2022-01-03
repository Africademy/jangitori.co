import { css } from '@emotion/react'
import { ButtonHTMLAttributes, forwardRef, Ref } from 'react'

import { theme } from '@/app/theme'
import { usePayPeriodEnd } from '@/common/hooks/usePayPeriodEnd'
import { spacing } from '@/common/utils/spacing'
import { shouldClockIn } from '@/modules/timeCards/shouldClockIn'
import { useTimeCardQuery } from '@/modules/timeCards/useTimeCardQuery'
const Button = dynamic(() => import('@/ui/Button/Button'))
import dynamic from 'next/dynamic'

import { useAddTimeEntryButton } from '../useAddTimeEntryButton'

interface NewTimeEntryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  employee: string
}

const NewTimeEntryButton = forwardRef(
  ({ employee }: NewTimeEntryButtonProps, ref: Ref<HTMLButtonElement>) => {
    const payPeriodEnd = usePayPeriodEnd()
    const { data: timeCard } = useTimeCardQuery({ employee, payPeriodEnd })
    const { onClick, isAddingTimeEntry, isAddTimeEntryDisabled } =
      useAddTimeEntryButton(employee)

    const text = shouldClockIn(timeCard) ? 'Clock in' : 'Clock out'

    return (
      <Button
        ref={ref}
        isLoading={isAddingTimeEntry}
        disabled={isAddTimeEntryDisabled}
        variant="primary"
        css={css`
          max-height: 2.5rem !important;
          font-size: ${spacing(3.5)};
          ${isAddTimeEntryDisabled &&
          css`
            cursor: default !important;
            background-color: ${theme.colors.gray[300]} !important;
            color: ${theme.colors.gray[500]} !important;
          `}
        `}
        onClick={onClick}
      >
        {text}
      </Button>
    )
  },
)

NewTimeEntryButton.displayName = 'NewTimeEntryButton'

export default NewTimeEntryButton
