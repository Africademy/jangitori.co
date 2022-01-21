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

const StatusTagConfigs = {
  [ReviewStatus.PENDING]: {
    icon: RefreshIconSolid,
    colorScheme: ReviewStatusColor[ReviewStatus.PENDING],
    label: ReviewStatusLabel[ReviewStatus.PENDING],
  },
  [ReviewStatus.APPROVED]: {
    icon: CheckIconSolid,
    colorScheme: ReviewStatusColor[ReviewStatus.APPROVED],
    label: ReviewStatusLabel[ReviewStatus.APPROVED],
  },
  [ReviewStatus.CHANGE_REQUESTED]: {
    icon: AnnotateIcon,
    colorScheme: ReviewStatusColor[ReviewStatus.CHANGE_REQUESTED],
    label: ReviewStatusLabel[ReviewStatus.CHANGE_REQUESTED],
  },
}

export const StatusTag = ({ status }: StatusTagProps) => {
  const { icon: LeftIcon, colorScheme, label } = StatusTagConfigs[status]
  return (
    <Tag colorScheme={colorScheme}>
      <Flex display="flex" gap={1.5}>
        <LeftIcon />
        {label}
      </Flex>
    </Tag>
  )
}
