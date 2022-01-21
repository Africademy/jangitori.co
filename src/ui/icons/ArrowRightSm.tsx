import classnames from 'classnames'
import { SVGProps } from 'react'

export function ArrowRightSm({
  className,
  strokeWidth = 2,
  stroke = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke={stroke}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  )
}
