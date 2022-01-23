import { useRootStore } from './RootStoreContext'

export function useLocationStore() {
  return useRootStore().locationStore
}

export function useAuthStore() {
  return useRootStore().authStore
}

export function useShiftStore() {
  return useRootStore().shiftStore
}
