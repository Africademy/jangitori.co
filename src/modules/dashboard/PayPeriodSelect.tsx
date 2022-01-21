import { Box, Button, Menu, MenuButton, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import React from 'react'

import { truncateCalendarDate } from '@/lib/date/calendarDate'
import Typography from '@/ui/atoms/Typography/Typography'
import { CalendarIcon, ChevronDownIcon } from '@/ui/icons'
import { largerThan } from '@/ui/utils/breakpoints'
import { isMobile } from '@/ui/utils/isMobile'

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
    <VStack align="start" w="100%">
      <Typography fontWeight="medium" color={theme.colors.gray[600]}>
        Select pay period
      </Typography>
      <Menu isLazy>
        <MenuButton
          as={Button}
          leftIcon={<CalendarIcon />}
          rightIcon={<ChevronDownIcon />}
          color={theme.colors.gray[700]}
          {...(isMobile() ? { size: 'lg' } : {})}
          css={css`
            display: flex;
            align-items: center;
            gap: 0.25rem;
            background: #fff;
            box-shadow: ${theme.shadows.sm};
            font-size: ${theme.fontSizes['lg']};
            font-weight: ${theme.fontWeights.medium};
            ${largerThan('mobile')} {
              font-size: ${theme.fontSizes['lg']};
            }
            ${isMobile() &&
            css`
              min-width: 100%;
            `}

            svg {
              height: 1rem !important;
              width: 1rem !important;
            }
          `}
        >
          {truncateCalendarDate(payPeriodEnd)}
        </MenuButton>
      </Menu>
    </VStack>
  )
}
