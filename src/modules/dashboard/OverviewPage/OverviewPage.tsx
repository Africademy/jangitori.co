import { Flex, Heading, VStack } from '@chakra-ui/react'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import BasePadding from '@/ui/atoms/BasePadding'

import { LastClockedIn } from './LastClockedIn'
import { TotalHoursForCurrentPayPeriod } from './TotalHoursForCurrentPayPeriod'

export const OverviewPage = function OverviewPage(
  props: AuthenticatedPageProps,
) {
  return (
    <>
      <Flex px={5} pt={8} pb={1} align="center" gap={3} justify="center">
        <Heading size="md" fontWeight="medium" textAlign="center">
          Overview
        </Heading>
      </Flex>
      <BasePadding>
        <VStack w="100%" gap={3} px={12}>
          <LastClockedIn employee={props.user} />
          <TotalHoursForCurrentPayPeriod employee={props.user} />
        </VStack>
      </BasePadding>
    </>
  )
}
