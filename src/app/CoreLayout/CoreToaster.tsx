import { Toaster as ExternalToaster } from 'react-hot-toast'

const TOAST_DURATION = 1750

const CoreToaster = () => {
  return (
    <ExternalToaster
      position="bottom-left"
      toastOptions={{ duration: TOAST_DURATION }}
    />
  )
}

export default CoreToaster
