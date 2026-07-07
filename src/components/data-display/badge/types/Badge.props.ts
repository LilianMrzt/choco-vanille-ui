import type * as React from 'react'

import type { BoxProps } from '@components/layout/box'

import type { BadgeColor, BadgeSize, BadgeVariant } from '@components/data-display/badge/types/Badge.types.ts'

export type BadgeProps = Omit<BoxProps, 'as' | 'children' | 'ref'> & {
    /** Ref forwarded to the underlying `<span>` element. */
    ref?: React.Ref<HTMLSpanElement>
    /** The text content rendered inside the badge. */
    label: string
    /** Visual style variant. Defaults to `subtle`. */
    variant?: BadgeVariant
    /** Semantic color intent. Defaults to `primary`. */
    color?: BadgeColor
    /** Size variant. Defaults to `md`. */
    size?: BadgeSize
    /** Iconify icon name rendered before the label. Size is derived from the Badge size. */
    startIcon?: string
    /** Iconify icon name rendered after the label. Size is derived from the Badge size. */
    endIcon?: string
}
