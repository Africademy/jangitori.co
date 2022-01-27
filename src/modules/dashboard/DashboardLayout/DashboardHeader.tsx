import { observer } from 'mobx-react-lite'

import { useAuthStore } from '@/modules/stores'

import AccountDropdown, { getAccountDropdownProps } from './AccountDropdown'

export const DashboardHeader = observer(function DashboardHeader() {
  const authStore = useAuthStore()
  return (
    <header className="bg-white h-[var(--header-height)] max-h-[var(--header-height)] w-full px-3">
      <div className="layout w-full relative flex items-center justify-end h-full">
        {authStore.user && (
          <AccountDropdown {...getAccountDropdownProps(authStore.user)} />
        )}
      </div>
    </header>
  )
})
