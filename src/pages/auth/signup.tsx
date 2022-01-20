const SignUpPage = dynamic(() => import('@/modules/auth/SignUpPage'))
import dynamic from 'next/dynamic'

const IsLogoutRequired = dynamic(
  () => import('@/modules/core/IsLogoutRequired'),
)

const SignUpRoute = function LoginRoute(props) {
  return (
    <IsLogoutRequired>
      <SignUpPage {...props} />
    </IsLogoutRequired>
  )
}

export default SignUpRoute
