import { TimeCardApiUrlBuilder } from './TimeCardApiUrlBuilder'

/**
 * @group unit
 * @group api
 * @group utils
 * @group timeCards
 */
describe('TimeCardApiUrlBuilder', () => {
  it('should build url given initial query object', () => {
    const query = {
      date: '12/11/2021',
      payPeriodEnd: '12/15/2021',
    }
    expect(new TimeCardApiUrlBuilder(query).build()).toEqual(
      `/api/timeCards?date=${query.date}&payPeriodEnd=${query.payPeriodEnd}`,
    )
  })

  it('should build url given initial query object + using addFilter', () => {
    const query = {
      date: '12/11/2021',
      payPeriodEnd: '12/15/2021',
    }
    expect(
      new TimeCardApiUrlBuilder({ date: query.date })
        .addFilter('payPeriodEnd', query.payPeriodEnd)
        .build(),
    ).toEqual(
      `/api/timeCards?date=${query.date}&payPeriodEnd=${query.payPeriodEnd}`,
    )
  })

  it('should build url given only using addFilter', () => {
    const query = {
      payPeriodEnd: '12/15/2021',
      employee: '12341234',
    }
    expect(
      new TimeCardApiUrlBuilder()
        .addFilter('payPeriodEnd', query.payPeriodEnd)
        .addFilter('employee', query.employee)
        .build(),
    ).toEqual(
      `/api/timeCards?payPeriodEnd=${query.payPeriodEnd}&employee=${query.employee}`,
    )
  })
})
