import { makeAutoObservable } from 'mobx'
import invariant from 'tiny-invariant'

import { Shift } from '@/data/models/shift'
import { RequestState } from '@/lib/types/ApiResponse'
import { Coordinates } from '@/modules/geolocation/Coordinates'
import { RootStore } from '@/modules/stores'

import { ShiftService } from './shiftService'

export enum ShiftStep {
  Initializing,
  Idle,
  ClockedIn,
}
export class ShiftStore {
  step: ShiftStep = ShiftStep.Initializing

  setStep(step: ShiftStep) {
    this.step = step
  }

  request: RequestState<Shift> = {}

  setRequest(value: RequestState<Shift>) {
    this.request = value
  }

  reset() {
    this.request = { busy: false }
    this.setStep(ShiftStep.Idle)
  }

  get shift(): Shift | undefined | null {
    return this.request.data
  }

  /**
   * Must initialize after AuthStore is initialized
   */
  async init() {
    this.setStep(ShiftStep.Initializing)
    this.setRequest({ busy: true })
    const user = this.root.authStore.invariantUser
    const response = await this.shiftService.findActiveShift({
      employee: user.id,
    })
    const isClockedIn =
      Boolean(response.data?.clockIn) && response.data?.clockOut === null
    const currentStep = isClockedIn ? ShiftStep.ClockedIn : ShiftStep.Idle
    this.setRequest({ ...response, busy: false })
    this.setStep(currentStep)
  }

  async startShift(location: Coordinates) {
    const date = new Date()
    const initialShift: Omit<Shift, 'id'> = {
      employee: this.root.authStore.invariantUser.id,
      date: date.toISOString(),
      hours: 0,
      clockIn: { timestamp: date.toISOString(), location: location },
    }

    this.request.busy = true

    const response = await this.shiftService.createShift(initialShift)

    this.setRequest({ ...response, busy: false })
    this.setStep(ShiftStep.ClockedIn)
  }

  async endShift(location: Coordinates) {
    const shiftId = this.request.data?.id
    invariant(typeof shiftId !== 'undefined', 'Initial shift data required')

    this.request.busy = true

    const response = await this.shiftService.updateShift(shiftId, {
      clockOut: { location, timestamp: new Date().toISOString() },
    })

    this.setRequest({ ...response, busy: false })

    response.data && this.reset()

    return response.data
  }

  constructor(private root: RootStore, private shiftService: ShiftService) {
    makeAutoObservable(this)
  }
}
