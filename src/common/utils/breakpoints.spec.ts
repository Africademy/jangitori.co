import { BreakpointAlias, largerThan, only, smallerThan } from './breakpoints'

/**
 * @group unit
 * @group utils
 */
describe('Breakpoints helper functions', () => {
  describe('largerThan', () => {
    it('should get the identifier LARGER than given a breakpoint alias', () => {
      const breakpointAlias: BreakpointAlias = 'mobile'
      const result = largerThan(breakpointAlias)

      expect(result).toEqual(`@media screen and (min-width: 0px)`)
    })
  })
  describe('smallerThan', () => {
    it('should get the identifier SMALLER than given a breakpoint alias', () => {
      const breakpointAlias: BreakpointAlias = 'mobile'
      const result = smallerThan(breakpointAlias)

      expect(result).toEqual(`@media screen and (max-width: 480px)`)
    })
  })
  describe('only', () => {
    it('should get the identifier exactly for given a breakpoint alias', () => {
      const breakpointAlias: BreakpointAlias = 'mobile'
      const result = only(breakpointAlias)

      expect(result).toEqual(
        `@media screen and (min-width: 0px) and (max-width: 480px)`,
      )
    })
  })
})
