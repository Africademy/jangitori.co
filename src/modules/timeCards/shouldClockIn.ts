import { TimeCard } from '../../common/models/TimeCard'

export function shouldClockIn(timeCard: TimeCard | undefined | null) {
  if (!timeCard) return true
  return Boolean(timeCard.entries && timeCard.entries.length % 2 === 0)
}
