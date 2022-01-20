import { Session, User as AuthUser, UserCredentials } from '@supabase/gotrue-js'

import { NullResponsePropertyError } from '@/modules/lib/errors'
import { createLogger } from '@/modules/logging/logger'
import supabase from '@/modules/supabase'

const logger = createLogger({ fileLabel: 'modules/auth/auth-service' })

function handleResponse<
  Err extends { message: string } = { message: string },
  Res extends { error: Err | null } = { error: Err | null },
>(response: Res): Omit<Res, 'error'> {
  const { error, ...rest } = response
  if (error) {
    logger.error(error)
    throw error
  }
  return rest
}

export class AuthService {
  constructor(private client = supabase) {}

  getSessionUser = async (sessionAccessToken: string): Promise<AuthUser> => {
    const { data, error } = await this.client.auth.api.getUser(
      sessionAccessToken,
    )

    if (error) throw error

    if (!data) throw new NullResponsePropertyError('data')

    return data
  }

  signIn = async (
    creds: UserCredentials,
  ): Promise<{ authUser: AuthUser; session: Session }> => {
    const { session } = await this.client.auth
      .signIn(creds)
      .then(handleResponse)

    if (!session) throw new NullResponsePropertyError('session')

    const authUser = await this.getSessionUser(session.access_token)

    return { authUser, session }
  }

  signUp = async (creds: UserCredentials): Promise<AuthUser> => {
    const { session } = await this.client.auth
      .signUp(creds)
      .then(handleResponse)

    if (!session) throw new NullResponsePropertyError('session')

    const authAccount = await this.getSessionUser(session.access_token)

    return authAccount
  }

  signOut = async (): Promise<void> => {
    await this.client.auth.signOut().then(({ error }) => {
      if (error) {
        console.error('Failed to sign out: ', JSON.stringify(error))
        throw error
      }
    })
  }
}
