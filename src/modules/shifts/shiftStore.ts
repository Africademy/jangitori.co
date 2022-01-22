import { makeAutoObservable } from 'mobx'
import invariant from 'tiny-invariant'

import { Coordinates } from '@/modules/geolocation/Coordinates'
import { Shift } from '@/modules/models/Shift'
import { RootStore } from '@/modules/stores'

import { ShiftService } from './shiftService'

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

  setRequest(value: RequestState<Shift>) {
    this.request = value
  }

  get shift(): Shift | undefined | null {
    return this.request.data
  }

  async startShift(location: Coordinates) {
    try {
      this.setRequest({ isLoading: true })
      const date = new Date()
      const initialShift: Omit<Shift, 'id'> = {
        employee: this.root.authStore.invariantAccount.uid,
        date: date.toISOString(),
        clockIn: { timestamp: date.toISOString(), location: location },
      }

      /* Save new shift data remotely */
      const newShift = await this.shiftService.createShift(initialShift)

      this.setRequest({ ...this.request, data: newShift, error: null })
    } catch (err) {
      this.setRequest({ ...this.request, data: null, error: err as IError })
      console.error('Failed to start shift: ' + err)
    } finally {
      this.setRequest({ ...this.request, isLoading: false })
    }
  }

  async endShift(location: Coordinates) {
    const initialShift = this.request.data
    invariant(initialShift, 'Initial shift data required')

    try {
      this.setRequest({ isLoading: true })

      /* Save new shift data remotely */
      const shiftId = initialShift.id

      const newShift = await this.shiftService.updateShift(shiftId, {
        clockOut: { location, timestamp: new Date().toISOString() },
      })

      this.setRequest({ ...this.request, data: newShift, error: null })
    } catch (err) {
      this.setRequest({
        ...this.request,
        data: initialShift,
        error: err as IError,
      })
      console.error('Failed to start shift: ' + err)
    } finally {
      this.setRequest({ ...this.request, isLoading: false })
    }
  }

  async loadCurrentShift() {
    this.setRequest({ isLoading: true })

    let found: Shift | null = null
    let error: IError | null = null
    try {
      const account = this.root.authStore.invariantAccount

      found = await this.shiftService.findActiveShift({
        employee: account.uid,
      })
    } catch (err) {
      error = err as IError
    } finally {
      this.setRequest({ isLoading: false, data: found, error })
    }
  }

  reset() {
    this.request = {}
  }

  constructor(
    private root: RootStore,
    private shiftService = new ShiftService(),
  ) {
    makeAutoObservable(this)
  }
}
