import { createContext } from 'react'

import services from './services'

export const ServicesContext = createContext(services)

export default function ServicesProvider({ children }) {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  )
}
