import type * as React from 'react'

import type { BoxProps } from '@components/layout/box'

import type { BadgeColor, BadgeSize, BadgeVariant } from '@components/data-display/badge/types/Badge.types.ts'
import type { IconComponent } from '@components/foundation/icon'

export type BadgeProps = Omit<BoxProps, 'as' | 'children' | 'ref'> & {
    /** Ref forwarded to the underlying `<span>` element. */
    ref?: React.Ref<HTMLSpanElement>
    /** The text content rendered inside the badge. */
    label: string
    /** Visual style variant. Defaults to `outlinedSubtle`. */
    variant?: BadgeVariant
    /** Semantic color intent. Defaults to `primary`. */
    color?: BadgeColor
    /** Size variant. Defaults to `md`. */
    size?: BadgeSize
    /** SVG component rendered before the label. */
    startIcon?: IconComponent
    /** SVG component rendered after the label. */
    endIcon?: IconComponent
}
