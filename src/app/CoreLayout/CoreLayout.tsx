import React from 'react'

import CoreMeta from './CoreMeta'
import CoreToaster from './CoreToaster'

export const CoreLayout: React.FC = ({ children }) => {
  return (
    <>
      <CoreMeta />
      {children}
      <CoreToaster />
    </>
  )
}
