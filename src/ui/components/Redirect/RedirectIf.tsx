import { Redirect } from './Redirect'

interface RedirectIfProps {
  getTo: () => string
  condition: boolean
  children: React.ReactNode
}

export const RedirectIf = ({ getTo, condition, children }: RedirectIfProps) => {
  if (condition) return <Redirect to={getTo()} />

  return <>{children}</>
}
