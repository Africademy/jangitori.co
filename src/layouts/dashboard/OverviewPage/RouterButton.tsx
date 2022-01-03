import { Button as ChakraButton } from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'
import styled from '@emotion/styled'
import React from 'react'

import { pseudo } from '@/common/utils/pseudo'

export interface RouterButtonProps {
  onClick: () => void
}

export const RouterButton: React.FunctionComponent<RouterButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <SChakraButton
      fontSize="14px"
      opacity={'0.8'}
      shadow="sm"
      variant="outline"
      colorScheme={'gray'}
      onClick={onClick}
    >
      {children}
    </SChakraButton>
  )
}

const SChakraButton = styled(ChakraButton)`
  opacity: 0.8;
  ${pseudo('_hover')} {
    opacity: 0.9;
    background-color: ${transparentize('#fff', 20)};
  }

  ${pseudo('_active')} {
    opacity: 1;
    background-color: ${transparentize('#fff', 10)};
  }
`
