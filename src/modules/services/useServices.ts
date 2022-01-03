import { useContext } from 'react'

import { TimesheetService } from '@/modules/timesheets/TimesheetService'

import { Services } from './services'
import { ServicesContext } from './services-context'

const useServicesContext = () => useContext(ServicesContext)

export const useTimesheetService = (): TimesheetService => {
  return useServicesContext().timesheet
}

export function useServices<K extends keyof Services>(
  ...keys: K[]
): Pick<Services, K> {
  const services = useServicesContext()
  const result = {} as Pick<Services, K>
  keys.forEach((key) => (result[key] = services[key]))
  return result
}

export function useService<K extends keyof Services>(key: K): Services[K] {
  const services = useServicesContext()
  return services[key]
}
