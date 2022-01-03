export interface RawPaginationParams {
  limit: number | string | string[]
  offset: number | string | string[]
}

export interface NormalizedPaginationParams {
  limit: number
  offset: number
}

export function normalizePaginationParams(
  args: RawPaginationParams,
): NormalizedPaginationParams {
  if (Array.isArray(args.limit) || Array.isArray(args.offset)) {
    throw new Error(
      'Invalid pagination params: limit or offset is an Array. Must be string or number.',
    )
  }
  const limit =
    typeof args.limit === 'string' ? parseInt(args.limit) : args.limit
  const offset =
    typeof args.offset === 'string' ? parseInt(args.offset) : args.offset

  return { limit, offset }
}
