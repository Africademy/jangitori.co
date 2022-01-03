export class UnauthorizedUserCredentialsError extends Error {
  constructor() {
    super(
      'Unauthorized for registration. Must be an active employee in our records.',
    )
  }
}
