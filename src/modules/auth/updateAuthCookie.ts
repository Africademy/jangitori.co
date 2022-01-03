import { AuthChangeEvent, Session } from '@supabase/gotrue-js'

async function updateAuthCookie(
  event: AuthChangeEvent,
  session: Session | null,
) {
  await fetch('/api/auth/set', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session }),
  }).then((res) => res.json())
}

export default updateAuthCookie
