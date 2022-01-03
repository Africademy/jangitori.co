export function isBrowser() {
  return typeof window !== 'undefined'
}

export function isServer() {
  return typeof window === 'undefined'
}

export function isDevelopment() {
  return process.env.NODE_ENV !== 'production'
}

export function isProduction() {
  return process.env.NODE_ENV === 'production'
}
