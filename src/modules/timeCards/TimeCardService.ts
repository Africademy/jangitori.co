import { TableKeys } from '@/common/constants/tables'
import { TimeCard, TimeCardEntry } from '@/common/models/TimeCard'
import { toDateString } from '@/common/utils/date-fns'
import { NullResponsePropertyError } from '@/common/utils/errors'
import { createLogger } from '@/common/utils/logging/logger'
import supabase from '@/modules/supabase'
import {
  buildTimeCard,
  BuildTimeCardParams,
} from '@/modules/timeCards/buildTimeCard'

const logger = createLogger({
  fileLabel: 'modules/timeCards/TimeCardService',
})

export interface AppendEntryParams {
  id: TimeCard['id']
  entry: TimeCardEntry
}

export class TimeCardService {
  constructor(private client = supabase) {}

  getTimeCardById = async (args: { id: TimeCard['id'] }): Promise<TimeCard> => {
    const { data, error } = await this.client
      .from<TimeCard>(TableKeys.TimeCards)
      .select('*')
      .match(args)
      .single()

    if (error) throw error

    if (!data) throw new NullResponsePropertyError('data')

    return data
  }

  getTimeCard = async ({
    date = new Date(),
    ...restArgs
  }: Partial<
    Omit<TimeCard, 'employeee' | 'date'> & { date: Date }
  >): Promise<TimeCard | null> => {
    const args = { date: toDateString(date), ...restArgs }
    const { data, error } = await supabase
      .from<TimeCard>(TableKeys.TimeCards)
      .select('*')
      .match(args)
      .limit(1)

    if (error) throw error

    return data ? data[0] : null
  }

  createTimeCard = async (params: BuildTimeCardParams): Promise<TimeCard> => {
    const args = buildTimeCard(params)
    const { data, error } = await supabase
      .from<TimeCard>(TableKeys.TimeCards)
      .insert(args)
      .maybeSingle()
    if (error) throw error

    if (!data) throw new NullResponsePropertyError('data')

    return data
  }

  async appendEntry(args: AppendEntryParams): Promise<TimeCard> {
    logger.info('timeCardService.appendEntry() called with args: ', args)

    const timeCard = await this.getTimeCard({ id: args.id })
    if (!timeCard)
      throw new Error(
        `Tried to update non-existent timeCard with ID ${args.id}`,
      )

    const { data, error } = await this.client
      .from<TimeCard>(TableKeys.TimeCards)
      .update({ entries: [...timeCard.entries, args.entry] })
      .eq('id', args.id)
      .single()

    if (error) throw error

    if (!data) throw new NullResponsePropertyError('data')

    return data
  }
}
