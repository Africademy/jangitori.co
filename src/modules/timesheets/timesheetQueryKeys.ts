export const timesheetQueryKeys = {
  all: ['timesheets'] as const,
  lists: () => [...timesheetQueryKeys.all, 'list'] as const,
  list: (employee: string) =>
    [...timesheetQueryKeys.lists(), { employee }] as const,
  details: () => [...timesheetQueryKeys.all, 'details'] as const,
  detail: (args: { employee: string; payPeriodEnd: string }) =>
    [...timesheetQueryKeys.details(), args] as const,
}

type TimesheetsListQuery = ReturnType<typeof timesheetQueryKeys.list>

export type TimesheetQuery = ReturnType<typeof timesheetQueryKeys.detail>
export type TimesheetsQuery = TimesheetQuery | TimesheetsListQuery
