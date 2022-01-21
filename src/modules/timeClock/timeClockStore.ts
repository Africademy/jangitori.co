import { makeAutoObservable } from 'mobx'

import { Coordinates } from '../geolocation/Coordinates'
import { RootStore } from '../stores'
import { Shift, ShiftService } from './shiftService'

export enum RequestStatus {
  IDLE = 'idle',
  BUSY = 'busy',
  ERROR = 'error',
}

export interface RequestState<
  D,
  E extends { message: string } = { message: string },
> {
  data?: D | null
  error?: E | null
  isLoading?: boolean
}

export class TimeClockStore {
  request: RequestState<Shift> = {}

  get shift(): Shift | Falsy {
    return this.request.data
  }

  async startShift(date = new Date(), startLocation: Coordinates) {
    const initialShift: Omit<Shift, 'id'> = {
      employee: this.root.invariantAccount.uid,
      date,
      startTime: date,
      startLocation,
    }

    try {
      this.request = { isLoading: true }

      const newShift = await this.shiftService.createShift(initialShift)

      this.request = { ...this.request, data: newShift, error: null }
    } catch (err) {
      this.request = { ...this.request, data: null, error: err as Error }
      console.error('Failed to start shift: ' + err)
      alert((err as Error).message)
    } finally {
      this.request = { ...this.request, isLoading: false }
    }
  }

  constructor(
    private root: RootStore,
    private shiftService = new ShiftService(),
  ) {
    makeAutoObservable(this)
  }
}
