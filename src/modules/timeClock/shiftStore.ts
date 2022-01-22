import { makeAutoObservable } from 'mobx'

import { Coordinates } from '../geolocation/Coordinates'
import { RootStore } from '../stores'
import { Shift, ShiftService } from './shiftService'

export enum RequestStatus {
  IDLE = 'idle',
  BUSY = 'busy',
  ERROR = 'error',
}

export interface IError {
  message: string
}

export interface RequestState<D, E extends IError = IError> {
  data?: D | null
  error?: E | null
  isLoading?: boolean
}

export class ShiftStore {
  request: RequestState<Shift> = {}

  get shift(): Shift | Falsy {
    return this.request.data
  }

  async startShift(location: Coordinates) {
    try {
      this.request = { isLoading: true }
      const date = new Date()
      const initialShift: Omit<Shift, 'id'> = {
        employee: this.root.invariantAccount.uid,
        date: date.toISOString(),
        clockIn: { timestamp: date.toISOString(), location: location },
      }

      /* Save new shift data remotely */
      const newShift = await this.shiftService.createShift(initialShift)

      this.request = { ...this.request, data: newShift, error: null }
    } catch (err) {
      this.request = { ...this.request, data: null, error: err as IError }
      console.error('Failed to start shift: ' + err)
    } finally {
      this.request = { ...this.request, isLoading: false }
    }
  }

  async loadCurrentShift() {
    this.request = { isLoading: true }

    let found: Shift | null = null
    let error: IError | null = null
    try {
      const account = this.root.invariantAccount

      found = await this.shiftService.findActiveShift({
        employee: account.uid,
      })
    } catch (err) {
      error = err as IError
    } finally {
      this.request = { isLoading: false, data: found, error }
    }
  }

  constructor(
    private root: RootStore,
    private shiftService = new ShiftService(),
  ) {
    makeAutoObservable(this)
  }
}
