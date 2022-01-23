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
    <ExternalStat className="stat" w="100%">
      <StatLabel>{label}</StatLabel>
      <StatNumber>{`${data}`}</StatNumber>
    </ExternalStat>
  )
}
