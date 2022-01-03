export const timesheetsQueryBuilder = {
  all: ['timesheets'] as const,
  lists: () => [...timesheetsQueryBuilder.all, 'list'] as const,
  list: (employee: string) =>
    [...timesheetsQueryBuilder.lists(), { employee }] as const,
  details: () => [...timesheetsQueryBuilder.all, 'detail'] as const,
  detail: (args: { employee: string; payPeriodEnd: string }) =>
    [...timesheetsQueryBuilder.details(), args] as const,
}

export type TimesheetsListQuery = ReturnType<typeof timesheetsQueryBuilder.list>

export type TimesheetDetailsQuery = ReturnType<
  typeof timesheetsQueryBuilder.detail
>
export type TimesheetsQuery = TimesheetDetailsQuery | TimesheetsListQuery

export const isTimesheetDetailsQuery = (o: any): o is TimesheetDetailsQuery => {
  return (
    Array.isArray(o) &&
    o.length === 3 &&
    typeof o[2] === 'object' &&
    'employee' in o[2] &&
    'payPeriodEnd' in o[2]
  )
}
