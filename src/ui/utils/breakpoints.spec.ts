import { above, below, only } from './breakpoints'

/**
 * @group unit
 * @group utils
 */
describe('Breakpoints helper functions', () => {
  describe('above', () => {
    it('should get the identifier LARGER than given a breakpoint alias', () => {
      const breakpointName = 'mobile'
      const result = above(breakpointName)
      const expected = `@media screen and (min-width: 0rem)`

      expect(result).toEqual(expected)
    })
  })
  describe('below', () => {
    it('should get the identifier SMALLER than given a breakpoint alias', () => {
      const breakpointName = 'mobile'
      const result = below(breakpointName)
      const expected = `@media screen and (max-width: 30rem)`

      expect(result).toEqual(expected)
    })
  })
  describe('only', () => {
    it('should get the identifier exactly for given a breakpoint alias', () => {
      const breakpointName = 'mobile'
      const result = only(breakpointName)
      const expected = `@media screen and (min-width: 0rem) and (max-width: 30rem)`

      expect(result).toEqual(expected)
    })
  })
})
