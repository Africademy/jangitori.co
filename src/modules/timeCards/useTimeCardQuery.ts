import useSWR from 'swr'

import { TableKeys } from '@/common/constants/tables'
import { TimeCard } from '@/common/models/TimeCard'
import { IApiError } from '@/common/utils/interfaces/ApiResponse'
import supabase from '@/modules/supabase'
import { timeCardsApi } from '@/modules/timeCards/timeCardsQueryBuilder'

export function useTimeCardQuery(args: {
  employee: string
  payPeriodEnd: string
}) {
  const swr = useSWR<TimeCard | null, IApiError>(
    timeCardsApi.detail(args),
    async function getTimeCardByEmployeeAndPayPeriodEnd() {
      const response = await supabase
        .from<TimeCard>(TableKeys.TimeCards)
        .select('*')
        .eq('employee', args.employee)
        .eq('payPeriodEnd', args.payPeriodEnd)
        .maybeSingle()

      if (response.error) throw response.error
      return response.data
    },
  )
  const isTimeCardLoading =
    typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

  return { ...swr, isLoading: isTimeCardLoading }
}
