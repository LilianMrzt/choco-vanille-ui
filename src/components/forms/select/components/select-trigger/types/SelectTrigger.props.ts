import type * as React from 'react'
import type * as RadixSelect from '@radix-ui/react-select'

import type { TextFieldSize } from '@components/forms/text-field/types/TextField.types.ts'

/** Props for the styled trigger subcomponent. */
export type SelectTriggerProps = RadixSelect.SelectTriggerProps & {
    /** Placeholder shown when no option is selected. */
    placeholder?: string
    /** Iconify icon name rendered on the left side of the trigger. */
    startIcon?: string
    /** Visual size of the trigger. */
    size?: TextFieldSize
    /** Whether the trigger should be styled in its error state. */
    hasError?: boolean
    /** CSS width of the trigger. */
    width?: React.CSSProperties['width']
}
