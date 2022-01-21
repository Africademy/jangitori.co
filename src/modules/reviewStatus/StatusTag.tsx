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

const ReviewStatusIcon: Record<ReviewStatus, React.ReactNode> = {
  [ReviewStatus.PENDING]: <RefreshIconSolid />,
  [ReviewStatus.APPROVED]: <CheckIconSolid />,
  [ReviewStatus.CHANGE_REQUESTED]: <AnnotateIcon />,
}

export const StatusTag = ({ status }: StatusTagProps) => {
  const colorScheme = ReviewStatusColor[status]
  const label = ReviewStatusLabel[status]
  const leftIcon = ReviewStatusIcon[status]

  return (
    <Tag colorScheme={colorScheme}>
      <Flex display="flex" gap={1.5}>
        {leftIcon}
        {label}
      </Flex>
    </Tag>
  )
}
