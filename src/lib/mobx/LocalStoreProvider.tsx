import React, { ReactElement, useContext } from 'react'

const LocalStoreProviderContext = React.createContext(null)

export const useLocalMobXStore = <T,>(): T => {
  const value = useContext(LocalStoreProviderContext)

  if (value === null) {
    throw new Error(
      'useLocalStoreContext must be used within LocalStoreProviderContext',
    )
  }

  return value
}

interface IProps<T> {
  localStore: T
}

export const LocalStoreProvider = <T,>(
  props: React.PropsWithChildren<IProps<T>>,
): ReactElement => {
  return (
    <LocalStoreProviderContext.Provider value={props.localStore as any}>
      {props.children}
    </LocalStoreProviderContext.Provider>
  )
}

LocalStoreProvider.displayName = 'LocalStoreProvider'
LocalStoreProvider.defaultProps = {}
