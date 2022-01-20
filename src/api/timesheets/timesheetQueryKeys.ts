export const timesheetQueryKeys = {
  all: ['timesheets'] as const,
  lists: () => [...timesheetQueryKeys.all, 'list'] as const,
  list: (employee: string) =>
    [...timesheetQueryKeys.lists(), { employee }] as const,
  details: () => [...timesheetQueryKeys.all, 'detail'] as const,
  detail: (args: { employee: string; payPeriodEnd: string }) =>
    [...timesheetQueryKeys.details(), args] as const,
}

type TimesheetsListQuery = ReturnType<typeof timesheetQueryKeys.list>

export type TimesheetQuery = ReturnType<typeof timesheetQueryKeys.detail>
export type TimesheetsQuery = TimesheetQuery | TimesheetsListQuery

export const isTimesheetQuery = (o: any): o is TimesheetQuery => {
  return (
    Array.isArray(o) &&
    o.length === 3 &&
    typeof o[2] === 'object' &&
    'employee' in o[2] &&
    'payPeriodEnd' in o[2]
  )
}
