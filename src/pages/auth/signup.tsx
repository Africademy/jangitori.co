const SignUpPage = dynamic(() => import('@/layouts/auth/SignUpPage'))
import dynamic from 'next/dynamic'

const IsLogoutRequired = dynamic(
  () => import('@/layouts/core/IsLogoutRequired'),
)

const SignUpRoute = function LoginRoute(props) {
  return (
    <IsLogoutRequired>
      <SignUpPage {...props} />
    </IsLogoutRequired>
  )
}

export default SignUpRoute
