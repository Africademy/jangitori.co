import { IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@icons/ChevronIcon'
import { useRouter } from 'next/router'

const BackButton = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <IconButton
      aria-label="Go back"
      bg="transparent"
      size="lg"
      icon={<ChevronLeftIcon className="w-6 h-6" strokeWidth={3} />}
      onClick={goBack}
    />
  )
}

export default BackButton
