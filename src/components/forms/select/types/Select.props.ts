import type * as React from 'react'
import type { Select as BaseSelect } from '@base-ui/react/select'
import type { IconifyIcon } from '@components/foundation/icon'

import type { TextFieldSize } from '@components/forms/text-field/types/TextField.types.ts'

/**
 * Props for the convenience `SelectField` wrapper.
 *
 * Mirrors the TextField API where possible (label, helperText, error, size,
 * width, startIcon, disabled) and adds select-specific props (value,
 * defaultValue, onValueChange, placeholder, options).
 */
export type SelectFieldProps = {
    /** Controlled value. */
    value?: string
    /** Default uncontrolled value. */
    defaultValue?: string
    /** Called when the selected value changes. */
    onValueChange?: (value: string) => void
    /** Controlled open state. */
    open?: boolean
    /** Default uncontrolled open state. */
    defaultOpen?: boolean
    /** Called when the open state changes. */
    onOpenChange?: (open: boolean) => void
    /** HTML name attribute for form submission. */
    name?: string
    /** Additional class name for the outer wrapper. */
    className?: string
    /** Text label rendered above the trigger, linked to it for accessibility. */
    label?: string
    /** Helper text rendered below the trigger. Hidden when `error` is provided. */
    helperText?: string
    /** Error message rendered below the trigger. When set, the trigger is styled in its error state. */
    error?: string
    /** local Iconify data rendered on the left side of the trigger. */
    startIcon?: IconifyIcon
    /** Placeholder shown when no option is selected. */
    placeholder?: string
    /** Visual size of the trigger. */
    size?: TextFieldSize
    /** CSS width of the outer wrapper. Defaults to `100%`. */
    width?: React.CSSProperties['width']
    /** Whether the field is disabled. */
    disabled?: boolean
    /** Whether the field is required. */
    required?: boolean
    /** Accessible name for the select listbox popup. */
    listboxAriaLabel?: string
    /**
     * How the listbox popup avoids viewport collisions.
     * @default { side: 'flip', align: 'none' }
     */
    collisionAvoidance?: BaseSelect.Positioner.Props['collisionAvoidance']
    /** Flat or grouped options. */
    options: SelectOption[]
}

/** A single select option or group. */
export type SelectOption =
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
