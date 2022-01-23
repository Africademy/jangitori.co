import { css } from '@emotion/react'
import classNames from 'classnames'
import Link from 'next/link'

import { RoleIds } from '@/data/models/role'
import { routes } from '@/lib/routes'
import { ClockIcon } from '@/ui/icons/ClockIcon'
import { spacing } from '@/ui/utils/spacing'

export const GoToTimeClock = () => {
  return (
    <Link href={routes.dashboardPage(RoleIds.Employee, 'timeClock')}>
      <a
        className={classNames(
          'bg-blue-100 rounded-full hover:bg-blue-200 active:bg-blue-300',
          'text-lg',
        )}
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 75%;
          min-height: 3.5rem;
          gap: ${spacing(3)};
        `}
      >
        <ClockIcon className="text-blue-700" />
        <span className="font-medium text-gray-700">Time Clock</span>
      </a>
    </Link>
  )
}
