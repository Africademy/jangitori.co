export class NullResponsePropertyError extends Error {
  constructor(propertyKey: string) {
    const msg = `Expected ${propertyKey} in response but was null`
    super(msg)
  }
}
