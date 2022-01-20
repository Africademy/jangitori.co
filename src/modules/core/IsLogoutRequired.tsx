import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'

import { routes } from '@/lib/routes'
import { useRootStore } from '@/modules/stores'
import { RedirectIf } from '@/ui/components/Redirect/RedirectIf'

const IsLogoutRequired = observer(function IsLogoutRequired({ children }) {
  const { authStore } = useRootStore()

  const getTo = () =>
    computed(() =>
      routes.dashboardPage(authStore.account!.role, 'overview'),
    ).get()

  return (
    <RedirectIf getTo={getTo} condition={authStore.isAuthenticated}>
      {children}
    </RedirectIf>
  )
})

export default IsLogoutRequired
