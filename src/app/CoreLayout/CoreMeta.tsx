import Head from 'next/head'
import { useRouter } from 'next/router'

const pageNames = {
  '/': 'Commercial Cleaning',
  '/auth/login': 'Login',
  '/auth/signup': 'Sign up',
  '/dashboard/employee/overview': 'Overview',
  '/dashboard/employee/timesheets': 'Timesheets',
  '/dashboard/employee/timeClock': 'Time Clock',
}

function getPageName(pathname: string): string {
  if (Object.keys(pageNames).includes(pathname)) {
    return `iJan - ${pageNames[pathname]}`
  }
  return 'iJan'
}

const CoreMeta = () => {
  const router = useRouter()

  const pageName = getPageName(router.pathname)

  return (
    <Head>
      <title>{pageName}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
    </Head>
  )
}

export default CoreMeta
