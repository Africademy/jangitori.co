import { Center, Heading } from '@chakra-ui/react'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'

import { GoToTimeClock } from './GoToTimeClock'
import { LastClockedIn } from './LastClockedIn'
import { TotalHoursForCurrentPayPeriod } from './TotalHoursForCurrentPayPeriod'

export const OverviewPage = function OverviewPage(
  props: AuthenticatedPageProps,
) {
  return (
    <div className="flex flex-col gap-8 py-8">
      <section>
        <div className="layout">
          <Heading as="h1" size="md" fontWeight="normal" textAlign="left">
            Hello, {props.user.firstName + ' ' + props.user.lastName}.
          </Heading>
        </div>
      </section>
      <section>
        <div className="layout flex flex-col gap-3">
          <LastClockedIn employee={props.user} />
          <TotalHoursForCurrentPayPeriod employee={props.user} />
        </div>
      </section>
      <section>
        <div className="layout">
          <Center>
            <GoToTimeClock />
          </Center>
        </div>
      </section>
    </div>
  )
}
