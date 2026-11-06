import type * as React from 'react'

import type { STEPPER_ITEM_SIZES } from '@components/navigation/stepper/constants'

/** Step marker size. */
export type StepperItemSize = (typeof STEPPER_ITEM_SIZES)[keyof typeof STEPPER_ITEM_SIZES]

export type StepperItemProps = Readonly<Omit<
  React.HTMLAttributes<HTMLElement>,
  'children'
> &
  {
    /** Optional supporting text shown below the title. */
    description?: string
    /** Prevents selecting this step when the Stepper is interactive. */
    disabled?: boolean
    /** Size of the marker and its default content. Defaults to `md`. */
    size?: StepperItemSize
  } &
  (
        | {
              /** Visible title of the step when using the default visuals. */
              label: string
              children?: never
          }
        | {
              /** Custom content replacing the marker and default label visuals. */
              children: React.ReactNode
              label?: string
          }
    )>
