export type NameObject = { firstName: string; lastName: string }

export type GenericUser = NameObject & { role: string }

export function getFullName<U extends NameObject>(user: U): string {
  return `${user.firstName} ${user.lastName}`
}
