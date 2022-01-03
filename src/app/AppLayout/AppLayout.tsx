import React, { ReactElement } from 'react'

import { CoreHead } from './CoreHead'

interface Props {
  children: React.ReactNode
}

export function AppLayout({ children }: Props): ReactElement {
  return (
    <div>
      <CoreHead />
      {children}
    </div>
  )
}
