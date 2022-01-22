import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { PageBody } from '@/modules/dashboard/Page'
import { Timesheet } from '@/modules/models/Timesheet'
import { useServices } from '@/modules/stores'
import { timesheetQueryKeys } from '@/modules/timesheets/timesheetQueryKeys'
import { ErrorMessage } from '@/ui/components/ErrorMessage'
import { ChevronLeftIcon } from '@/ui/icons/ChevronIcon'

import TimesheetsTable from './TimesheetsTable'

export const TimesheetsPage = ({ account }: AuthenticatedPageProps) => {
  const services = useServices('timesheet')

  const { data: timesheets, error } = useSWR<Timesheet[], Error>(
    timesheetQueryKeys.list(account.uid),
    async (): Promise<Timesheet[]> => {
      return await services.timesheet.getTimesheetsByEmployee(account.uid)
    },
  )

  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>

  return (
    <>
      <Flex px={5} pt={8} pb={1} align="center" gap={3} justify="center">
        <Box position="absolute" left={6}>
          <IconButton
            aria-label="Go back"
            bg="transparent"
            size="lg"
            icon={<ChevronLeftIcon className="w-6 h-6" strokeWidth={3} />}
            onClick={goBack}
          />
        </Box>
        <Heading
          size="md"
          fontWeight="medium"
          lineHeight={1}
          textAlign="center"
        >
          Timesheets
        </Heading>
      </Flex>
      <PageBody>{timesheets && <TimesheetsTable data={timesheets} />}</PageBody>
    </>
  )
}
