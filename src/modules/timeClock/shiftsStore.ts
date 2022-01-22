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

export class ShiftsStore {
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
        date,
        clockInTime: date,
        clockInLocation: location,
      }

      /* Save new shift data remotely */
      const newShift = await this.shiftService.createShift(initialShift)

      this.request = { ...this.request, data: newShift, error: null }
    } catch (err) {
      this.request = { ...this.request, data: null, error: err as IError }
      console.error('Failed to start shift: ' + err)
      alert((err as IError).message)
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
