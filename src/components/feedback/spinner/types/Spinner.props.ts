import type * as React from 'react'

import type {
    SpinnerColor,
    SpinnerSize,
} from '@components/feedback/spinner/types/Spinner.types.ts'

export type SpinnerProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'color'
> &
  React.RefAttributes<HTMLSpanElement> & {
    /** Size variant. Defaults to `md`. */
    size?: SpinnerSize
    /** Semantic color intent. Defaults to `primary`. */
    color?: SpinnerColor
  }
