import styled from '@emotion/styled'
import React, { ReactElement } from 'react'
import { Toaster } from 'react-hot-toast'

import { CoreHead } from './CoreHead'

const TOAST_DURATION = 1750

interface Props {
  children: React.ReactNode
}

export function AppLayout({ children }: Props): ReactElement {
  return (
    <>
      <CoreHead />
      <Main>{children}</Main>
      <Toaster
        position="bottom-left"
        toastOptions={{ duration: TOAST_DURATION }}
      />
    </>
  )
}

const Main = styled.main`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vh;
  overflow: hidden;
`
