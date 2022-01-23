import { IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { ChevronLeftIcon } from '@/ui/icons/ChevronIcon'

const BackButton = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <IconButton
      aria-label="Go back"
      bg="transparent"
      size="sm"
      icon={<ChevronLeftIcon className="w-6 h-6" strokeWidth={3} />}
      onClick={goBack}
    />
  )
}

export default BackButton
