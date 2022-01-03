import { isTabKey } from './tabs'

/**
 * @group unit
 * @group dashboard
 */
describe('dashboard.constants checks', () => {
  describe('isTabKey', () => {
    it("should return true given 'overview'", () => {
      const input = 'overview'
      const result = isTabKey(input)
      expect(result).toBeTruthy()
    })
  })
})
