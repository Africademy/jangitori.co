import styled from '@emotion/styled'
import React from 'react'

import CoreMeta from './CoreMeta'
import CoreToaster from './CoreToaster'

export const CoreLayout: React.FC = ({ children }) => {
  return (
    <>
      <CoreMeta />
      <SMain>{children}</SMain>
      <CoreToaster />
    </>
  )
}

const SMain = styled.main`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  overflow: hidden;
`
