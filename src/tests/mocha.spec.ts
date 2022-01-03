import { Suite } from 'mocha'

import computeMinutesWorkedUnit from '../modules/timeCards/computeMinutesWorked.spec'

describe('Server unit testing', function (this: Suite) {
  describe('ComputeTotalHoursUnit', computeMinutesWorkedUnit)
})
