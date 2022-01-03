import { expect } from 'chai'

import { computeMinutesWorked } from './computeMinutesWorked'
import {buildTimeCardEntry} from './buildTimeCard'

export default function() {
  describe('computeMinutesWorked', () => {
  it('should sum the given time cards hours', () => {
    const timeCard1 = buildTimeCardEntry({ date: new Date(0,0,0,6) })
    const timeCard2 = buildTimeCardEntry({ date: new Date(0,0,0,13) })

    const amount = computeMinutesWorked([timeCard1, timeCard2])

    expect(amount).to.equal(7)
  })
})
}