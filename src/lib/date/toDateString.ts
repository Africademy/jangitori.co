import memoizeOne from 'memoize-one'

function toDateStringFn(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const nowDate = new Date(year, month, day, 0, 0, 0, 0)
  return nowDate.toLocaleDateString()
}

export const toDateString = memoizeOne(toDateStringFn)
export const todayDateString = toDateString(new Date())
