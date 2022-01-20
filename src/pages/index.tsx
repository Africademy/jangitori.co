import { routes } from '@/lib/routes'
import { Redirect } from '@/ui/redirect'

const IndexRoute = () => {
  return <Redirect to={routes.authPage('login')} />
}

export default IndexRoute
