export enum AdminTabKey {
  OVERVIEW = 'overview',
  TIMESHEETS = 'timesheets',
}

export const adminTabKeys = [AdminTabKey.OVERVIEW, AdminTabKey.TIMESHEETS]

export const adminTabLabels = {
  [AdminTabKey.OVERVIEW]: 'Overview',
  [AdminTabKey.TIMESHEETS]: 'Timesheets',
} as const

export const adminTabs = Object.entries(adminTabLabels).map(
  ([tabKey, tabLabel]) => ({
    id: tabKey,
    label: tabLabel,
  }),
)
