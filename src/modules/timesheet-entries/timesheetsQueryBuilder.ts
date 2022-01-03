import { Timesheet } from '@/common/models/Timesheet'

export const timesheetEntriesApi = {
  all: ['timesheet-entries'] as const,
  lists: () => [...timesheetEntriesApi.all, 'list'] as const,
  list: (timesheet: Timesheet['id']) =>
    [...timesheetEntriesApi.lists(), { timesheet }] as const,
  details: () => [...timesheetEntriesApi.all, 'detail'] as const,
  detail: (args: { employee: string; payPeriodEnd: string }) =>
    [...timesheetEntriesApi.details(), args] as const,
}
