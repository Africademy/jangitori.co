import { GenericUser, getFullName } from '@/lib/types/GenericUser'

import { AccountDropdownProps } from './AccountDropdown'

export function getAccountDropdownProps<U extends GenericUser>(
  user: U,
): AccountDropdownProps {
  return {
    fullName: getFullName(user),
    role: user.role,
  }
}
