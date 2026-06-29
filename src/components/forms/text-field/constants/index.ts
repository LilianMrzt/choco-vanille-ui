import type { TextFieldSize } from '@components'

/** Maps field size to the IconButton size used in the end-action slot. */
export const fieldSizeToActionSize: Record<NonNullable<TextFieldSize>, 'sm' | 'md'> = {
    sm: 'sm',
    md: 'sm',
    lg: 'md',
}
