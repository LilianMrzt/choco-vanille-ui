import type * as React from 'react'
import type { RefAttributes } from 'react'

import type { TextFieldSize } from '@components/forms/text-field/types/TextField.types.ts'

export type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  RefAttributes<HTMLInputElement> &
  {
    /** Input size. @default 'md' */
    size?: TextFieldSize
    /** Text label rendered above the input, linked via Radix Label for accessibility. */
    label?: string
    /** Helper text rendered below the input. Hidden when `error` is provided. */
    helperText?: string
    /** Error message rendered below the input. When set, the input is styled in its error state. */
    error?: string
    /** Iconify icon name rendered on the left side of the input. */
    startIcon?: string
    /**
     * Custom action element (e.g. `<IconButton>`) rendered on the right side of the input.
     * Ignored when `type="password"` (the toggle button takes precedence).
     */
    endAction?: React.ReactNode
    /** CSS width of the outer wrapper. Defaults to `100%`. */
    width?: React.CSSProperties['width']
  }
