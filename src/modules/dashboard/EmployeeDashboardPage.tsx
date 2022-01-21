export enum EmployeeTabKey {
  OVERVIEW = 'overview',
  TIMESHEETS = 'timesheets',
}

export const employeeTabKeys = [
  EmployeeTabKey.OVERVIEW,
  EmployeeTabKey.TIMESHEETS,
]

export const employeeTabLabels = {
  [EmployeeTabKey.OVERVIEW]: 'Overview',
  [EmployeeTabKey.TIMESHEETS]: 'Timesheets',
} as const

export const employeeTabs = Object.entries(employeeTabLabels).map(
  ([tabKey, tabLabel]) => ({
    id: tabKey,
    label: tabLabel,
  }),
)
