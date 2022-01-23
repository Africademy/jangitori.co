import { Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'

import { RoleIds } from '@/data/models/role'
import { routes } from '@/lib/routes'
import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { Col } from '@/ui/atoms/Flex'
import Padding from '@/ui/atoms/Padding'
import { ClockIcon } from '@/ui/icons/ClockIcon'

import { LastClockedIn } from './LastClockedIn'
import { TotalHoursForCurrentPayPeriod } from './TotalHoursForCurrentPayPeriod'

export const OverviewPage = function OverviewPage(
  props: AuthenticatedPageProps,
) {
  return (
    <>
      <Padding px={12}>
        <Col gap={6}>
          <Flex justify="start" w="100%">
            <Heading size="md" fontWeight="medium" textAlign="left">
              Overview
            </Heading>
          </Flex>
          <TimeClockLink />
        </Col>
      </Padding>
      <Padding px={12}>
        <Col gap={6}>
          <LastClockedIn employee={props.user} />
          <TotalHoursForCurrentPayPeriod employee={props.user} />
        </Col>
      </Padding>
    </>
  )
}

const TimeClockLink = () => {
  return (
    <Link href={routes.dashboardPage(RoleIds.Employee, 'timeClock')}>
      <a className="flex items-center justify-center w-9/12 min-h-[2.5rem] gap-3 py-2 mx-auto bg-blue-100 rounded-full hover:bg-blue-200 active:bg-blue-300">
        <ClockIcon className="text-blue-700" />
        <span className="font-medium text-gray-700">Time Clock</span>
      </a>
    </Link>
  )
}
