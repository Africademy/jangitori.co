import { Session, User as AuthUser, UserCredentials } from '@supabase/gotrue-js'
import { SupabaseClient } from '@supabase/supabase-js'

import { NullResponsePropertyError } from '@/lib/errors'
import { createLogger } from '@/lib/logger'
import supabase from '@/lib/supabase'

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
  private constructor(private client: SupabaseClient = supabase) {}

  private static _instance: AuthService | null = null

  static instance(): AuthService {
    if (this._instance) return this._instance

    this._instance = new AuthService()

    return this._instance
  }

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

  signUp = async (
    creds: UserCredentials,
  ): Promise<{ authUser: AuthUser; session: Session }> => {
    const { session } = await this.client.auth
      .signUp(creds)
      .then(handleResponse)

    if (!session) throw new NullResponsePropertyError('session')

    const authUser = await this.getSessionUser(session.access_token)

    return { authUser, session }
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
