import { routes } from '@/lib/routes'
import { Redirect } from '@/ui/components/Redirect'

const IndexRoute = () => {
  return <Redirect to={routes.authPage('login')} />
}

export default IndexRoute
