import { useLocationStore, useShiftStore } from '@/modules/stores'

export interface ShiftToggleButtonProps {
  onEndShift?: () => void
}

export const ShiftToggleButton = function ShiftToggleButton({
  onEndShift,
}: ShiftToggleButtonProps) {
  const shiftStore = useShiftStore()
  const locationStore = useLocationStore()

  const isClockIn = !Boolean(onEndShift)

  const handleClick = async () => {
    if (isClockIn) return shiftStore.startShift(locationStore.invariantCoords)

    const res = await shiftStore.endShift(locationStore.invariantCoords)
    if (onEndShift) {
      res && onEndShift()
    }
  }

  return (
    <button
      className="bg-primary-600 text-white shadow-md rounded-xl py-3 flex-1 w-full font-medium text-lg"
      onClick={handleClick}
    >
      {isClockIn ? 'Start Shift' : 'End Shift'}
    </button>
  )
}
