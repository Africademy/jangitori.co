import { logger } from '@/infra/logger'

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init)
  if (res.status === 200) return res.json()
  const data = await res.json()
  logger.error('❌ Error: ', JSON.stringify(data, null, 4))
  throw data
}
