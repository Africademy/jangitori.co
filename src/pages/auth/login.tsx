const LoginPage = dynamic(() => import('@/layouts/auth/LoginPage'))
import dynamic from 'next/dynamic'

const IsLogoutRequired = dynamic(
  () => import('@/layouts/core/IsLogoutRequired'),
)

const LoginRoute = function LoginRoute(props) {
  return (
    <IsLogoutRequired>
      <LoginPage {...props} />
    </IsLogoutRequired>
  )
}

export default LoginRoute
