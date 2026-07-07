import type * as React from 'react'
import type { RefAttributes } from 'react'

import type { TextAreaRecipeVariants } from '@components/forms/text-area/styles/TextArea.css.ts'

export type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> &
  RefAttributes<HTMLTextAreaElement> &
  Pick<TextAreaRecipeVariants, 'size'> & {
    /** Text label rendered above the textarea, linked via Radix Label for accessibility. */
    label?: string
    /** Helper text rendered below the textarea. Hidden when `error` is provided. */
    helperText?: string
    /** Error message rendered below the textarea. When set, the textarea is styled in its error state. */
    error?: string
    /** Iconify icon name rendered on the left side of the textarea. */
    startIcon?: string
    /** Custom action element (e.g. `<IconButton>`) rendered on the right side of the textarea. */
    endAction?: React.ReactNode
    /** CSS width of the outer wrapper. Defaults to `100%`. */
    width?: React.CSSProperties['width']
    /** Number of visible text lines. Maps to the native `rows` attribute. */
    rows?: number
    /** Minimum number of visible text lines when auto-resizing. */
    minRows?: number
    /** Maximum number of visible text lines before the textarea stops expanding. */
    maxRows?: number
  }
