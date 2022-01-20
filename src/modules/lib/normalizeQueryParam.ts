export function normalizeQueryParam<T extends string = string>(
  value: string | string[] | undefined,
): T {
  return value as T
}
