import classNames from 'classnames'
import Link from 'next/link'

const ChevronRightIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}

function Breadcrumbs({
  pages,
}: {
  pages: Array<{ name: string; href: string; current: boolean }>
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-3 list-none p-0 m-0">
        {pages.map((page, index) => (
          <li key={page.name} className="list-none p-0 m-0">
            <div className="flex items-center">
              {Boolean(index) && (
                <ChevronRightIcon
                  className="flex-shrink-0 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              )}
              <Link href={page.href}>
                <a
                  className={classNames(
                    index && 'ml-3',
                    'text-sm font-medium text-gray-500 hover:text-gray-700',
                  )}
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
