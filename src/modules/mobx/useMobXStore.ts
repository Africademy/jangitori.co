import { useState } from 'react'

export const useMobXStore = <T>(fn: () => T): T => {
  const [store] = useState(fn)
  return store
}
