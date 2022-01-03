import { Text } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import Downshift, { GetRootPropsOptions } from 'downshift'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { createLogger } from '@/common/utils/logging/logger'
import { routes } from '@/modules/lib/routes'
import { useService } from '@/modules/services'
import { useRootStore } from '@/modules/stores/useRootStore'

import { Avatar } from './Avatar'

const logger = createLogger({
  fileLabel: 'layouts/dashboard/dashboard-layout/account-dropdown',
})

interface Item {
  value: string
}

export interface AccountDropdownProps {
  fullName: string
  role: string
}

export const AccountDropdown: React.FunctionComponent<AccountDropdownProps> = ({
  fullName,
}) => {
  const router = useRouter()

  const { authStore } = useRootStore()
  const authService = useService('auth')
  const [isLoading, setIsLoading] = useState(false)

  async function signOut() {
    setIsLoading(true)
    try {
      await authService.signOut()
      authStore.reset()
      router.push(routes.authPage('login'))
    } catch (err) {
      logger.error(err)
      alert(`Failed to sign out: ${(err as Error).message}`)
    } finally {
      setIsLoading(false)
    }
  }

  function handleSelect(selection: { value: string } | null) {
    if (!selection) return
    if (selection.value === 'Logout') {
      signOut()
    }
  }

  function itemToString(item: Item | null): string {
    return item?.value ?? '---'
  }
  const theme = useTheme()

  return (
    <Downshift<{ value: string }>
      onSelect={handleSelect}
      itemToString={itemToString}
    >
      {({
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div className="">
          <div
            className="inline-block"
            {...getRootProps({} as GetRootPropsOptions, {
              suppressRefError: true,
            })}
          >
            <button
              {...getToggleButtonProps()}
              aria-label={'toggle menu'}
              className="flex gap-2.5 items-center"
            >
              <Avatar
                size="sm"
                lineHeight="none"
                bg={theme.colors.gray[400]}
                fontWeight={theme.fontWeights.bold}
                name={fullName}
              />
              <div className="hidden md:block h-full">
                <Text
                  color={theme.colors.gray[700]}
                  fontWeight={theme.fontWeights.semibold}
                  fontSize={'base'}
                  leading={'none'}
                  textAlign={'left'}
                >
                  {fullName}
                </Text>
              </div>
            </button>
          </div>
          <>
            {isOpen && (
              <ul {...getMenuProps()} className="list-none relative">
                {items.map((item, index) => (
                  <li
                    key={item.value}
                    {...getItemProps({
                      key: item.value,
                      index: 0,
                      item,
                      style: getListItemStyle({
                        item,
                        selectedItem,
                        index,
                        highlightedIndex,
                      }),
                    })}
                    className="bg-white rounded-md shadow-md p-3 divide-y divide-gray-300"
                  >
                    <button>{item.value}</button>
                  </li>
                ))}
              </ul>
            )}
          </>
        </div>
      )}
    </Downshift>
  )
}

const items: Item[] = [{ value: 'Logout' }]

function getListItemStyle({ item, highlightedIndex, index, selectedItem }) {
  return {
    backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
    fontWeight: selectedItem === item ? 'bold' : 'normal',
  }
}
