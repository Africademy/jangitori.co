import { Flex, Heading, VStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import useSWR from 'swr'

import { useServices } from '@/app/appContext'
import { timesheetQueryKeys } from '@/db/api/timesheets/timesheetQueryKeys'
import { Timesheet } from '@/db/models/Timesheet'
import { AuthenticatedPageProps } from '@/layouts/core/types/AuthenticatedPageProps'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { only } from '@/ui/utils/breakpoints'

import TimesheetsTable from './TimesheetsTable'

export const TimesheetsView = function TimesheetsView({
  account,
}: AuthenticatedPageProps) {
  const services = useServices('timesheet')

  const { data: timesheets, error } = useSWR<Timesheet[], Error>(
    timesheetQueryKeys.list(account.uid),
    async (): Promise<Timesheet[]> => {
      return await services.timesheet.getTimesheetsByEmployee(account.uid)
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
