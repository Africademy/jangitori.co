export function Table({ children }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  )
}

Table.Head = function TableHead({ children }) {
  return <thead className="bg-gray-100">{children}</thead>
}

Table.HeadCell = function TableHeadCell({ children }) {
  return (
    <th className="px-5 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  )
}

Table.Body = function TableBody({ children }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
      {children}
    </tbody>
  )
}

Table.Cell = function TableCell({ children }) {
  return (
    <td className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {children}
    </td>
  )
}
