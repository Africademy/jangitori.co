import { Flex, Tag, ThemingProps } from '@chakra-ui/react'

interface StatusTagProps {
  children: React.ReactText
  leftIcon: React.ComponentType<any>
  colorScheme: ThemingProps['colorScheme']
}

export const StatusTag = ({
  children,
  leftIcon: LeftIcon,
  colorScheme,
}: StatusTagProps) => {
  return (
    <Tag colorScheme={colorScheme}>
      <Flex display="flex" gap={1.5}>
        <LeftIcon />
        {children}
      </Flex>
    </Tag>
  )
}
