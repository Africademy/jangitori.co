export interface IPayPeriod {
  start: CalendarDate // eg. "2020-01-15"
  end: CalendarDate // eg. "2020-01-15"
}

export interface IEmployeeReport {
  employee: string
  timeCards: string[]
  payPeriodEnd: IPayPeriod['end']
  createdAt: DateISOString
}

export interface IPayroll {
  payPeriodEnd: IPayPeriod['end']
  payPeriodStart: IPayPeriod['start']
  employeeReports: IEmployeeReport[]
  createdAt: DateISOString
}
