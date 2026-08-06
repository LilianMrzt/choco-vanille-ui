import type * as React from 'react'

import type { StepperItemSize } from '@components/navigation/stepper/types/StepperItem.types.ts'

export type StepperItemProps = Omit<
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
    )
