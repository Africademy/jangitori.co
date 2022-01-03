import { Flex, Heading, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import useSWR from 'swr'

import { Timesheet } from '@/common/models/Timesheet'
import { only } from '@/common/utils/breakpoints'
import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'
import { useTimesheetService } from '@/modules/services'
import { timesheetsQueryBuilder } from '@/modules/timesheets/timesheetsQueryBuilder'
import { ErrorMessage } from '@/ui/error-message'

import TimesheetsTable from './TimesheetsTable'

export const TimesheetsView = function TimesheetsView({
  account,
}: AuthenticatedPageProps) {
  const timesheetService = useTimesheetService()

  const { data: timesheets, error } = useSWR<Timesheet[], Error>(
    timesheetsQueryBuilder.list(account.uid),
    async (): Promise<Timesheet[]> => {
      return await timesheetService.getTimesheetsByEmployee(account.uid)
    },
  )

  const theme = useTheme()

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>

  return (
    <VStack minW="100%">
      <Flex align="center" minW="100%" py={2} pb={5}>
        <Heading
          textAlign="left"
          fontWeight={theme.fontWeights.medium}
          css={css`
            ${only('mobile')} {
              font-size: ${theme.fontSizes['2xl']};
            }
          `}
        >
          Timesheets
        </Heading>
      </Flex>
      <>{timesheets && <TimesheetsTable data={timesheets} />}</>
    </VStack>
  )
}
