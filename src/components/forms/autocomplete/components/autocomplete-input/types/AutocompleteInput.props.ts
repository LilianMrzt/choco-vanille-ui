import type * as React from 'react'
import type { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import type { TextFieldSize } from '@components/forms/text-field/types/TextField.types.ts'

/** Props for the styled autocomplete input. */
export type AutocompleteInputProps = Omit<BaseAutocomplete.Input.Props, 'size'> & {
    /** Placeholder shown when the input is empty. */
    placeholder?: string
    /** local Iconify data rendered on the left side of the input. */
    startIcon?: IconifyIcon
    /** Visual size of the input. */
    size?: TextFieldSize
    /** Whether the input should be styled in its error state. */
    hasError?: boolean
    /** CSS width of the input. */
    width?: React.CSSProperties['width']
}
import type { IconifyIcon } from '@components/foundation/icon'
