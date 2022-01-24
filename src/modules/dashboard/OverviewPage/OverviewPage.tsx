import { Box, Center, Heading } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { QuestionOutlineIcon } from 'tiny-heroicons'

import { AuthenticatedPageProps } from '@/modules/core/types/AuthenticatedPageProps'
import { Col } from '@/ui/atoms/Flex'

import { GoToTimeClock } from './GoToTimeClock'
import { LastClockedIn } from './LastClockedIn'
import { TotalHoursForCurrentPayPeriod } from './TotalHoursForCurrentPayPeriod'

export const OverviewPage = function OverviewPage(
  props: AuthenticatedPageProps,
) {
  return (
    <div
      css={css`
        min-height: 100vh;
        min-width: 100vw;
        position: relative;
      `}
    >
      <Box px={12} py={5}>
        <Col gap={5}>
          <Heading size="md" fontWeight="normal" textAlign="left">
            Hello, {props.user.firstName + ' ' + props.user.lastName}.
          </Heading>
          <QuestionOutlineIcon />
        </Col>
      </Box>
      <Box px={12} py={5}>
        <Col gap={3} flex={1}>
          <LastClockedIn employee={props.user} />
          <TotalHoursForCurrentPayPeriod employee={props.user} />
        </Col>
      </Box>
      <Center mt={'3rem'}>
        <GoToTimeClock />
      </Center>
    </div>
  )
}
