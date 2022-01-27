import React from 'react'

export interface StatProps {
  label: string
  data: any
}

export const BasicStat: React.FunctionComponent<StatProps> = ({
  label,
  data,
}) => {
  return (
    <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">{`${data}`}</dd>
    </div>
  )
}

export const StatCard: React.FunctionComponent<StatProps> = ({
  label,
  data,
}) => {
  return <BasicStat label={label} data={data} />
}
