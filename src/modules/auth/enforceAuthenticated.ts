import { GetServerSideProps } from 'next'

import { User } from '@/data/models/user'
import { Tables } from '@/data/tables'
import { routes } from '@/lib/routes'
import supabase from '@/lib/supabase'

export interface AuthRequiredProps {
  user: User
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

    let user: User | null = null

    const { data, error } = await supabase
      .from<User>(Tables.USERS)
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle()

    if (error) throw error

    user = data

    if (!user)
      return {
        props: {},
        redirect: { destination: routes.authPage('login'), permanent: false },
      }

    return { props: { user } }
  }
