import type { STEPPER_ITEM_SIZES } from '@components/navigation/stepper/constants'

export type StepperItemSize = (typeof STEPPER_ITEM_SIZES)[keyof typeof STEPPER_ITEM_SIZES]
