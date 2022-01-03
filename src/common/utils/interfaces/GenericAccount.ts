export type NameObject = { firstName: string; lastName: string }

export type GenericAccount = NameObject & { role: string }

export function getFullName<U extends NameObject>(account: U): string {
  return `${account.firstName} ${account.lastName}`
}
