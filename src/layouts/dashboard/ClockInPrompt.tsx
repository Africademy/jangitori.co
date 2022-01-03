import { css } from '@emotion/react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'

// UI Utils
import { spacing } from '@/common/utils/spacing'

const WideButton = dynamic(() => import('@/ui/Button/WideButton'))
const ClockIcon = dynamic(() => import('@/ui/ClockIcon'))

import Card from '@/ui/Card'
import { ErrorMessage } from '@/ui/error-message'

import { useAddTimeEntryButton } from './useAddTimeEntryButton'

export const TimeCardEmptyCopy = {
  title: 'No entries found',
  description: 'Get started by clocking in.',
  action: 'Clock in',
}

export const ClockInPrompt = function ClockInPrompt({
  employee,
}: {
  employee: string
}) {
  const {
    onClick,
    isAddingTimeEntry,
    isAddTimeEntryDisabled,
    addTimeEntryError,
  } = useAddTimeEntryButton(employee)

  return (
    <Card>
      <Card.Body>
        <Card.Header>
          <IconBox>
            <ClockIcon />
          </IconBox>
          <TopTextWrapper>
            <H2>{TimeCardEmptyCopy.title}</H2>
            <Card.Subtitle>{TimeCardEmptyCopy.description}</Card.Subtitle>
          </TopTextWrapper>
        </Card.Header>
        <Card.Body>
          <ErrorMessage>{addTimeEntryError?.message}</ErrorMessage>
        </Card.Body>
        <SCardFooter>
          <WideButton disabled={isAddTimeEntryDisabled} onClick={onClick}>
            {isAddingTimeEntry ? 'Loading...' : TimeCardEmptyCopy.action}
          </WideButton>
        </SCardFooter>
      </Card.Body>
    </Card>
  )
}

const H2 = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
`

const SCardFooter = styled(Card.Footer)`
  padding-top: ${spacing(2)};
`

const TopTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing(3)};
`

const IconBox = styled.div`
  ${({ theme }) =>
    css`
      color: ${theme.colors.gray[400]};
      margin: 0 auto;
      padding-bottom: 1rem;
      font-size: 1rem;
      svg {
        height: 3em;
        width: 3em;
      }
    `}
`
