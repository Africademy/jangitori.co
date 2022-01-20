import { Timesheet } from '@/db/models/Timesheet'

export const timeEntryQueryKeys = {
  all: ['timeEntries'] as const,
  lists: () => [...timeEntryQueryKeys.all, 'list'] as const,
  list: (timesheet: Timesheet['id']) =>
    [...timeEntryQueryKeys.lists(), { timesheet }] as const,
  details: () => [...timeEntryQueryKeys.all, 'detail'] as const,
  detail: (args: { employee: string; payPeriodEnd: string }) =>
    [...timeEntryQueryKeys.details(), args] as const,
}
