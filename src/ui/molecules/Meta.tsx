import { Flex } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'

import { Typography } from '@/ui/atoms/Typography'

interface MetaProps {
  leftIcon: React.ComponentType<any>
  text: string
}

export const Meta = ({ leftIcon: LeftIcon, text }: MetaProps) => {
  const theme = useTheme()
  return (
    <Flex
      gap={2}
      align="center"
      color={theme.colors.gray[600]}
      css={css`
        svg {
          color: ${theme.colors.gray[400]};
          height: 1.25rem !important;
          width: 1.25rem !important;
        }
      `}
    >
      <LeftIcon />
      <Typography lineHeight={1} fontSize={theme.fontSizes.sm}>
        {text}
      </Typography>
    </Flex>
  )
}
