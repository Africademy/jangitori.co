import { TimeCard } from '@/common/models/TimeCard'

export type TimeCardFilterType = Partial<TimeCard> &
  Partial<{
    year: number
    month: number
    day: number
  }>

const mergeSubObject = <S, K extends keyof S>(
  originalObject: S,
  changes: Pick<S, K>,
): S => Object.assign({}, originalObject, changes)

export class TimeCardApiUrlBuilder {
  private filterResult: TimeCardFilterType
  private basePath = '/time-cards'
  constructor(current: TimeCardFilterType = {}) {
    this.filterResult = current
  }

  appendPath(value: string) {
    this.basePath += value
    return this
  }

  addFilter<K extends keyof TimeCardFilterType = keyof TimeCardFilterType>(
    key: K,
    value: TimeCardFilterType[K],
  ) {
    return new TimeCardApiUrlBuilder(
      mergeSubObject(this.filterResult, {
        [key]: value ? value : undefined,
      }),
    )
  }

  build() {
    const filters = Object.entries(this.filterResult)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,
      .filter(([_, value]) => Boolean(value))
      .map(([key, value]) => `${key}=${value}`)
    const filterString = filters?.length > 0 ? filters.join(`&`) : ''
    const result = `${this.basePath}?${filterString}`
    return result
  }
}
