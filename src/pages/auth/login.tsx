const LoginPage = dynamic(() => import('@/modules/auth/LoginPage'))
import dynamic from 'next/dynamic'

const IsLogoutRequired = dynamic(
  () => import('@/modules/core/IsLogoutRequired'),
)

const LoginRoute = function LoginRoute(props) {
  return (
    <IsLogoutRequired>
      <LoginPage {...props} />
    </IsLogoutRequired>
  )
}

export default LoginRoute
