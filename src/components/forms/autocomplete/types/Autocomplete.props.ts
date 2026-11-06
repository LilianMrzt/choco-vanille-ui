import type * as React from 'react'
import type { IconComponent } from '@components/foundation/icon'

import type { TextFieldSize } from '@components/forms/text-field/types/TextField.types.ts'

/**
 * Props for the convenience `AutocompleteField` wrapper.
 *
 * Mirrors the TextField API where possible (label, helperText, error, size,
 * width, startIcon, disabled) and adds autocomplete-specific props (value,
 * defaultValue, onValueChange, placeholder, options).
 */
export type AutocompleteFieldProps = {
    /** Controlled input value. */
    value?: string
    /** Default uncontrolled input value. */
    defaultValue?: string
    /** Called when the input value changes. */
    onValueChange?: (value: string) => void
    /** Controlled open state of the popup. */
    open?: boolean
    /** Default uncontrolled open state. */
    defaultOpen?: boolean
    /** Called when the popup open state changes. */
    onOpenChange?: (open: boolean) => void
    /** HTML name attribute for form submission. */
    name?: string
    /** Additional class name for the outer wrapper. */
    className?: string
    /** Text label rendered above the input, linked to it for accessibility. */
    label?: string
    /** Helper text rendered below the input. Hidden when `error` is provided. */
    helperText?: string
    /** Error message rendered below the input. When set, the input is styled in its error state. */
    error?: string
    /** Iconify icon name rendered on the left side of the input. */
    startIcon?: IconComponent
    /** Placeholder shown when the input is empty. */
    placeholder?: string
    /** Visual size of the input. */
    size?: TextFieldSize
    /** CSS width of the outer wrapper. Defaults to `100%`. */
    width?: React.CSSProperties['width']
    /** Whether the field is disabled. */
    disabled?: boolean
    /** Whether the field is required. */
    required?: boolean
    /** Accessible name for the autocomplete listbox popup. */
    listboxAriaLabel?: string
    /** Text shown when filtering yields no items. */
    emptyText?: string
    /** Flat or grouped options. */
    options: AutocompleteOption[]
}

/** A single autocomplete option or group. */
export type AutocompleteOption =
    | {
          type?: undefined
          value: string
          label: string
          disabled?: boolean
      }
    | {
          type: 'group'
          label: string
          options: Array<{
              value: string
              label: string
              disabled?: boolean
          }>
      }
    | {
          type: 'separator'
      }
