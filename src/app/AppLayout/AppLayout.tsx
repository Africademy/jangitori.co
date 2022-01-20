import React, { ReactElement } from 'react'
import { Toaster } from 'react-hot-toast'

import { CoreHead } from './CoreHead'

const TOAST_DURATION = 1750

interface Props {
  children: React.ReactNode
}

export function AppLayout({ children }: Props): ReactElement {
  return (
    <div>
      <CoreHead />
      {children}
      <Toaster
        position="bottom-left"
        toastOptions={{ duration: TOAST_DURATION }}
      />
    </div>
  )
}
