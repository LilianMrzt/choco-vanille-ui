import type * as React from 'react'

export type StepperItemProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'children'
> &
  {
    /** Optional supporting text shown below the title. */
    description?: string
    /** Prevents selecting this step when the Stepper is interactive. */
    disabled?: boolean
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
