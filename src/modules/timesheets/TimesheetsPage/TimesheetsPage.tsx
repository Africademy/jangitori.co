import { Box, Flex, Heading } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

import { Timesheet } from '@/data/models/timesheet'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { useServices } from '@/modules/stores'
import { timesheetQueryKeys } from '@/modules/timesheets/timesheetQueryKeys'
import Padding from '@/ui/atoms/Padding'
import { ErrorMessage } from '@/ui/components/ErrorMessage'

import TimesheetsTable from './TimesheetsTable'

const BackButton = dynamic(() => import('@/ui/molecules/BackButton'))

export const TimesheetsPage = ({ user }: AuthenticatedPageProps) => {
  const services = useServices()

  const { data: timesheets, error } = useSWR<Timesheet[], Error>(
    timesheetQueryKeys.list(user.uid),
    async (): Promise<Timesheet[]> => {
      return await services.timesheet.getTimesheetsByEmployee(user.uid)
    },
  )

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>

  return (
    <>
      <Flex px={5} pt={8} pb={1} align="center" gap={3} justify="center">
        <Box position="absolute" left={6}>
          <BackButton />
        </Box>
        <Heading size="md" fontWeight="medium" textAlign="center">
          Timesheets
        </Heading>
      </Flex>
      <Padding>{timesheets && <TimesheetsTable data={timesheets} />}</Padding>
    </>
  )
}
