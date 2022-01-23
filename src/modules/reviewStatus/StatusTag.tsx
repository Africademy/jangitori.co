import { Flex, Tag } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'

import {
  ReviewStatus,
  ReviewStatusColor,
  ReviewStatusLabel,
} from './reviewStatus'

// import { AnnotateIcon } from '@/ui/icons/AnnotateIcon'
// import { CheckIconSolid } from '@/ui/icons/CheckIcon'
// import { RefreshIconSolid } from '@/ui/icons/RefreshIcon'

// const renderLeftIcon = (status: ReviewStatus): JSX.Element => {
//   switch (status) {
//     case ReviewStatus.PENDING:
//       return <RefreshIconSolid />
//     case ReviewStatus.APPROVED:
//       return <CheckIconSolid />
//     case ReviewStatus.CHANGE_REQUESTED:
//       return <AnnotateIcon />
//   }
// }
interface StatusTagProps {
  status: ReviewStatus
}

export const StatusTag = ({ status }: StatusTagProps) => {
  const colorScheme = ReviewStatusColor[status]
  const label = ReviewStatusLabel[status]
  const theme = useTheme()

  return (
    <Tag
      colorScheme={colorScheme}
      borderRadius={theme.radii['3xl']}
      fontSize="sm"
      px={3}
    >
      <Flex
        display="flex"
        align="center"
        gap={1}
        css={css`
          svg {
            color: ${theme.colors.cyan[700]} !important;
            height: 0.875rem !important;
            width: 0.875rem !important;
          }
        `}
      >
        {/* {renderLeftIcon(status)} */}
        {label}
      </Flex>
    </Tag>
  )
}
