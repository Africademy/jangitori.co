import {
  Box,
  Stat as ExternalStat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import React from 'react'

import { Padding } from '../atoms/Padding'

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

export const StatCard: React.FunctionComponent<StatProps> = ({
  label,
  data,
}) => {
  return (
    <Box bg="white" shadow="sm" borderRadius="md">
      <Padding px={5} py={4}>
        <BasicStat label={label} data={data} />
      </Padding>
    </Box>
  )
}
