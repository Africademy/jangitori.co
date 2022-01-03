import classnames from 'classnames'
import { SVGProps } from 'react'

function ClockIcon({
  className,
  strokeWidth = 1.5,
  stroke = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke={stroke}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export default ClockIcon
