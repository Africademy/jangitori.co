import { ParsedUrlQuery } from 'querystring'

export type NormalizedQuery<
  T extends Record<string, string | string[] | undefined>,
> = { [Properties in keyof T as string]: string }

export function normalizeQueryParam<T extends string = string>(
  value: string | string[] | undefined,
): T {
  return value as T
}

export function normalizeApiQuery<TargetType = {}>(
  rawParams: ParsedUrlQuery,
): TargetType {
  const params = {} as any
  Object.entries(rawParams).forEach(([key, value]) => {
    params[key as keyof typeof params] = normalizeQueryParam(value)
  })
  return params as TargetType
}

export function buildQueryKey(queries: any): string {
  return `/api/${queries
    .map((query) => (query.length === 1 ? query[0] : query.join('=')))
    .join('&')}`
}
