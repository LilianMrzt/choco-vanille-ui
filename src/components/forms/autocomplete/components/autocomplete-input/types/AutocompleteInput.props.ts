import type * as React from 'react'
import type { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import type { TextFieldSize } from '@components/forms/text-field/types/TextField.types.ts'
import type { TypographySize } from '@components/foundation/typography/types/Typography.types.ts'

/** Props for the styled autocomplete input. */
export type AutocompleteInputProps = Omit<BaseAutocomplete.Input.Props, 'size'> & {
    /** Placeholder shown when the input is empty. */
    placeholder?: string
    /** Iconify icon name rendered on the left side of the input. */
    startIcon?: IconComponent
    /** Visual size of the input. */
    size?: TextFieldSize
    /** Font size applied to the input text. @default 'md' */
    fontSize?: TypographySize
    /** Whether the input should be styled in its error state. */
    hasError?: boolean
    /** CSS width of the input. */
    width?: React.CSSProperties['width']
}
import type { IconComponent } from '@components/foundation/icon'
