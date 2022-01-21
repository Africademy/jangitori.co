import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import React from 'react'

import { truncateCalendarDate } from '@/lib/date/calendarDate'
import { CalendarIcon, ChevronDownIcon } from '@/ui/icons'
import { largerThan } from '@/ui/utils/breakpoints'

export interface PayPeriodSelectProps {
  payPeriodEnd: string
  onSelect: (value: string) => void
}

export const PayPeriodSelect: React.FunctionComponent<PayPeriodSelectProps> = ({
  payPeriodEnd,
  onSelect,
}) => {
  const theme = useTheme()
  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        leftIcon={<CalendarIcon />}
        rightIcon={<ChevronDownIcon />}
        css={css`
          display: flex;
          align-items: center;
          gap: 0.25rem;

          font-weight: ${theme.fontWeights.medium};
          font-size: ${theme.fontSizes['md']};
          ${largerThan('mobile')} {
            font-size: ${theme.fontSizes['lg']};
          }

          svg {
            height: 1rem !important;
            width: 1rem !important;
          }
        `}
      >
        Pay period end {truncateCalendarDate(payPeriodEnd)}
      </MenuButton>
    </Menu>
  )
}
