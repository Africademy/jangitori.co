import { NextApiRequest, NextApiResponse } from 'next'

import {
  CalendarDateObject,
  calendarDateObjectToDate,
} from '@/common/utils/date-fns/calendarDate'
import { getTimeCardForEmployeeOnDate } from '@/modules/timeCards/timeCardForEmployeeOnDate'

export default async function handler(
  req: NextApiRequest & {
    query: { employee: string; date: CalendarDateObject }
  },
  res: NextApiResponse,
) {
  try {
    const timeCard = await getTimeCardForEmployeeOnDate({
      employee: req.query.employee,
      date: calendarDateObjectToDate(req.query.date),
    })
    if (!timeCard) {
      return res.status(400).json({
        message: `TimeCard not found for date ${JSON.stringify(
          req.query.date,
        )} and employee ${req.query.employee}`,
      })
    }
    res.status(200).json({ timeCard })
  } catch (error) {
    res.status(500).json(error as Error)
  }
}
