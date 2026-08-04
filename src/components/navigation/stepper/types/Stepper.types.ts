import type { STEPPER_ORIENTATIONS } from '@components/navigation/stepper/constants'

export type StepperOrientation =
  (typeof STEPPER_ORIENTATIONS)[keyof typeof STEPPER_ORIENTATIONS];
