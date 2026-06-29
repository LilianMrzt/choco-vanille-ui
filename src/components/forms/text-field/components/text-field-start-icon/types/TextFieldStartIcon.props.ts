import type { TextFieldSize } from '@components'

/** Maps field size to the Icon size rendered in the start slot. */
export const fieldSizeToIconSize: Record<NonNullable<TextFieldSize>, 'sm' | 'md'> = {
    sm: 'md',
    md: 'md',
    lg: 'md',
}
