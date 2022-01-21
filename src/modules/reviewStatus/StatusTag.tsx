import { Flex, Tag } from '@chakra-ui/react'

import { AnnotateIcon } from '@/ui/icons/AnnotateIcon'
import { CheckIconSolid } from '@/ui/icons/CheckIcon'
import { RefreshIconSolid } from '@/ui/icons/RefreshIcon'

import {
  ReviewStatus,
  ReviewStatusColor,
  ReviewStatusLabel,
} from './reviewStatus'

interface StatusTagProps {
  status: ReviewStatus
}

const renderLeftIcon = (status: ReviewStatus): JSX.Element => {
  switch (status) {
    case ReviewStatus.PENDING:
      return <RefreshIconSolid />
    case ReviewStatus.APPROVED:
      return <CheckIconSolid />
    case ReviewStatus.CHANGE_REQUESTED:
      return <AnnotateIcon />
  }
}

export const StatusTag = ({ status }: StatusTagProps) => {
  const colorScheme = ReviewStatusColor[status]
  const label = ReviewStatusLabel[status]

  return (
    <Tag colorScheme={colorScheme}>
      <Flex display="flex" gap={1.5}>
        {renderLeftIcon(status)}
        {label}
      </Flex>
    </Tag>
  )
}
