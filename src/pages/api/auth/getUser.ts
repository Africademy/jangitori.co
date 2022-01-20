import type { User as AuthUser } from '@supabase/gotrue-js'
import type { NextApiRequest, NextApiResponse } from 'next'

import supabase from '@/lib/supabase'

type Err = {
  error: string
}

type Data = Err | AuthUser | null

// Example of how to verify and get user data server-side.
export default async function user(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const token = req.headers.token ?? ''

  const { data: user, error } = await supabase.auth.api.getUser(token as string)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(user)
}
