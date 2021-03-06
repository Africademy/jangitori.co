import { Text } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import Downshift, { GetRootPropsOptions } from 'downshift'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { logger } from '@/infra/logger'
import { routes } from '@/lib/routes'
import { useRootStore, useServices } from '@/modules/stores'

import { Avatar } from './Avatar'

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
  const { auth: authService } = useServices()
  const [, setBusy] = useState(false)

  async function signOut() {
    setBusy(true)
    try {
      await authService.signOut()
      authStore.reset()
      router.push(routes.authPage('login'))
    } catch (error) {
      logger.error(error)
      alert(`Failed to sign out: ${(error as Error).message}`)
    } finally {
      setBusy(false)
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
              <div className="hidden h-full md:block">
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
              <ul {...getMenuProps()} className="absolute z-50 list-none">
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
                    className="p-3 bg-white divide-y divide-gray-300 rounded-md shadow-md"
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
