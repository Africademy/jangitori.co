import { useRootStore } from './RootStoreContext'
import { Services } from './services'

export function useServices(): Services {
  const { services } = useRootStore()
  return services
}

export function useAuthService() {
  return useRootStore().services.auth
}

export function useUserService() {
  return useRootStore().services.user
}

export function useShiftService() {
  return useServices().shift
}

export function useTimesheetService() {
  return useServices().timesheet
}
