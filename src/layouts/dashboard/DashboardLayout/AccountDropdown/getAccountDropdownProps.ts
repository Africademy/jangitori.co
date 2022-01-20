import { GenericAccount, getFullName } from '@/modules/lib/types/GenericAccount'

import { AccountDropdownProps } from './AccountDropdown'

export function getAccountDropdownProps<U extends GenericAccount>(
  account: U,
): AccountDropdownProps {
  return {
    fullName: getFullName(account),
    role: account.role,
  }
}
