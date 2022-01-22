import { Box, Flex, VStack } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import {
  prettyCalendarDate,
  prettyCalendarDateWithoutYear,
} from '@/lib/date/calendarDate'
import { mergeErrorMessages } from '@/lib/errors'
import { routes } from '@/lib/routes'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { ReviewStatus } from '@/modules/reviewStatus'
import { StatusTag } from '@/modules/reviewStatus/StatusTag'
import { useAuthStore } from '@/modules/stores'
import { computeHoursWorked } from '@/modules/time-entries/computeTimeWorked'
import { TimeClockButton } from '@/modules/timeClock/TimeClockButton'
import { useTimesheetDetails } from '@/modules/timesheets/TimesheetDetailsPage/useTimesheetDetails'
import BasePadding from '@/ui/atoms/BasePadding'
import { H3 } from '@/ui/atoms/Typography'
import Breadcrumbs from '@/ui/components/Breadcrumbs'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { LoadingVStack } from '@/ui/components/LoadingVStack'
import { CalculatorIconSolid } from '@/ui/icons/CalculatorIcon'
import { CalendarIconSolid } from '@/ui/icons/CalendarIcon'
import { Meta } from '@/ui/molecules/Meta'
import { largerThan, only } from '@/ui/utils/breakpoints'

import { TimesheetDetailsQuery } from '../timesheetDetailsQuery'
import { TimeEntriesTable } from './TimeEntriesTable'

export const TimesheetDetailsPage = function TimesheetDetailsPage({
  query,
}: AuthenticatedPageProps & { query: TimesheetDetailsQuery }) {
  const router = useRouter()

  const { timesheet, timeEntries } = useTimesheetDetails(query)
  const authStore = useAuthStore()

  const role = authStore.account?.role
  if (timesheet.error || timeEntries.error || !role) {
    return (
      <ErrorMessage>
        {mergeErrorMessages(timesheet.error, timeEntries.error)}
      </ErrorMessage>
    )
  }

  const timesheetData = timesheet.data
  const timeEntriesData = timeEntries.data

  if (!timesheetData || !timeEntriesData) return <LoadingVStack />

  const { payPeriodEnd, status } = timesheetData

  const title =
    status === ReviewStatus.PENDING
      ? 'Current Pay Period'
      : `${prettyCalendarDate(payPeriodEnd)}`

  const pages = [
    {
      name: 'Timesheets',
      href: routes.dashboardTab(role, 'timesheets'),
      current: false,
    },
    {
      name: title,
      href:
        routes.dashboardTab(role, 'timesheets') +
        `?payPeriodEnd=${query.payPeriodEnd}`,
      current: true,
    },
  ]

  const handleLinkClick = (url: string) => {
    console.log('handleLinkClick - url: ' + url)

    router.push(url, routes.dashboardPresented(url.split('/')[2]))
  }

  return (
    <>
      <PageHeading>
        <VStack w="100%" align="start" gap={1}>
          <Breadcrumbs pages={pages} onLinkClick={handleLinkClick} />
          <Flex justify="space-between" w="100%">
            <H3>{title}</H3>
            <StatusTag status={timesheetData.status} />
          </Flex>
          <VStack w="100%" align="start" gap={0}>
            <Meta
              leftIcon={CalendarIconSolid}
              text={`Due on ${prettyCalendarDateWithoutYear(payPeriodEnd)}`}
            />
            <Meta
              leftIcon={CalculatorIconSolid}
              text={`Total ${computeHoursWorked(timeEntriesData)} hours`}
            />
          </VStack>
          <Box
            css={css`
              ${only('mobile')} {
                padding-top: 0.75rem;
                display: flex;
                align-items: center;
                gap: 1rem;
              }
            `}
          >
            <TimeClockButton />
          </Box>
        </VStack>
      </PageHeading>
      <BasePadding>
        <TimeEntriesTable data={timeEntriesData} />
      </BasePadding>
    </>
  )
}

const PageHeadingBox = styled.div`
  background: #fff;
  line-height: none !important;
  width: 100%;
  min-height: 21vh;
  padding: 1.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) =>
    css`
      border-bottom: 0.8px solid ${theme.colors.gray[200]};
    `};
`

const PageHeading = ({ children }) => (
  <PageHeadingBox>
    <Box
      width="85vw"
      mx="auto"
      css={css`
        ${largerThan('mobile')} {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}
    >
      {children}
    </Box>
  </PageHeadingBox>
)
