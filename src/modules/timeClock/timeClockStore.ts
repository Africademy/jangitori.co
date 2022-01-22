import { makeAutoObservable } from 'mobx'

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

export class TimeClockStore {
  request: RequestState<Shift> = {}

  get shift(): Shift | Falsy {
    return this.request.data
  }

  async startShift(date = new Date()) {
    try {
      this.request = { isLoading: true }
      const coords = this.root.geolocationStore.getCoordinatesOrThrow()
      console.log('USER GEO LOCATION: ', coords)

      const initialShift: Omit<Shift, 'id'> = {
        employee: this.root.invariantAccount.uid,
        date,
        clockInTime: date,
        clockInLocation: coords,
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
