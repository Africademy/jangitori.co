import { GetServerSideProps } from 'next'

import { Account } from '@/db/models/Account'
import { TableKeys } from '@/db/tables'
import { routes } from '@/modules/lib/routes'
import supabase from '@/modules/lib/supabase'

export interface AuthRequiredProps {
  account: Account
}

export type GetAuthRequiredSSProps = GetServerSideProps<AuthRequiredProps>

export const enforceAuthenticated =
  (): GetAuthRequiredSSProps =>
  async ({ req }) => {
    const { user: authUser } = await supabase.auth.api.getUserByCookie(req)

    if (!authUser)
      return {
        props: {},
        redirect: { destination: routes.authPage('login'), permanent: false },
      }

    let account: Account | null = null

    const { data, error } = await supabase
      .from<Account>(TableKeys.Accounts)
      .select('*')
      .eq('uid', authUser.id)
      .maybeSingle()

    if (error) throw error

    account = data

    if (!account)
      return {
        props: {},
        redirect: { destination: routes.authPage('login'), permanent: false },
      }

    return { props: { account } }
  }
