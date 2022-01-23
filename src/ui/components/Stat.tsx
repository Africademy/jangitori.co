import { Stat as ExternalStat, StatLabel, StatNumber } from '@chakra-ui/react'
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
    <ExternalStat className="stat">
      <StatLabel>{label}</StatLabel>
      <StatNumber>{`${data}`}</StatNumber>
    </ExternalStat>
  )
}
