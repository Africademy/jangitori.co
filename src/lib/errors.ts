export class NullResponsePropertyError extends Error {
  constructor(propertyKey: string) {
    const msg = `Expected ${propertyKey} in response but was null`
    super(msg)
  }
}

export const mergeErrorMessages = (...errors: (Error | Falsy)[]): string => {
  const filteredErrors: Error[] = errors.filter(
    (error) => error instanceof Error,
  ) as Error[]

  const msg = filteredErrors.map((error) => error.message).join('\n')
  return msg
}
