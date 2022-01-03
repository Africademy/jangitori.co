import {
  GenericAccount,
  getFullName,
} from '@/common/utils/interfaces/GenericAccount'

import { AccountDropdownProps } from './AccountDropdown'

export function getAccountDropdownProps<U extends GenericAccount>(
  account: U,
): AccountDropdownProps {
  return {
    fullName: getFullName(account),
    role: account.role,
  }
}
