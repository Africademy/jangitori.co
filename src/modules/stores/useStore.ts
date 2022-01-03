import RootStore from './RootStore'
import { useRootStore } from './useRootStore'

export function useStore<K extends keyof RootStore = keyof RootStore>(
  key: K,
): RootStore[K] {
  const store = useRootStore()
  return store[key]
}
