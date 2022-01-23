import { Skeleton, Stack } from '@chakra-ui/react'
import { environment } from '@configs/environment'
import { observer } from 'mobx-react-lite'

import { useShiftStore } from '@/modules/stores'
import { Redirect } from '@/ui/components/Redirect'

import { ShiftStep } from '../shifts/shiftStore'
import { StartShift } from './StartShift'

export const TimeClock = observer(function TimeClockFeature() {
  const shiftStore = useShiftStore()

  if (shiftStore.step === ShiftStep.Initializing)
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    )

  if (shiftStore.step === ShiftStep.Idle) return <StartShift />

  if (shiftStore.step === ShiftStep.ClockedIn)
    return <Redirect to={`/dashboard/employee/time-clock`} />

  return <Redirect to={`/dashboard/employee/overview`} />
})

import { GoogleApiWrapper, IProvidedProps } from 'google-maps-react'

export type PropsWithGoogleMaps = IProvidedProps

const withGoogleMaps = (
  Component: React.ComponentType<PropsWithGoogleMaps>,
) => {
  return GoogleApiWrapper({ apiKey: environment.googleMaps.apiKey })(Component)
}

export const TimeClockFeature = withGoogleMaps(TimeClock)
