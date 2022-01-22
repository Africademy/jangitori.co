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
  request: RequestState<Shift> = { isLoading: true }

  setRequest(value: RequestState<Shift>) {
    this.request = value
  }

  initialized = false

  async init() {
    const account = this.root.authStore.invariantAccount
    const response = await this.shiftService.findActiveShift({
      employee: account.uid,
    })
    this.setRequest({ ...response, isLoading: false })
    this.initialized = true
  }

  reset() {
    this.request = {}
  }

  get shift(): Shift | undefined | null {
    return this.request.data
  }

  get isClockIn(): boolean {
    return !this.request.isLoading && this.request.data === null
  }

  get isClockOut(): boolean {
    const { isLoading, data } = this.request

    return !isLoading && data?.clockOut === null
  }

  async startShift(location: Coordinates) {
    const date = new Date()
    const initialShift: Omit<Shift, 'id'> = {
      employee: this.root.authStore.invariantAccount.uid,
      date: date.toISOString(),
      hours: 0,
      clockIn: { timestamp: date.toISOString(), location: location },
    }

    this.request.isLoading = true

    const response = await this.shiftService.createShift(initialShift)

    this.setRequest({ ...response, isLoading: false })
  }

  async endShift(location: Coordinates) {
    const shiftId = this.request.data?.id
    invariant(typeof shiftId !== 'undefined', 'Initial shift data required')

    this.request.isLoading = true

    const response = await this.shiftService.updateShift(shiftId, {
      clockOut: { location, timestamp: new Date().toISOString() },
    })

    this.setRequest({ ...response, isLoading: false })

    response.data && this.reset()

    return response.data
  }

  constructor(private root: RootStore, private shiftService: ShiftService) {
    makeAutoObservable(this)
  }
}
