import type { Ref } from 'react'

import type { BADGE_COLORS, BADGE_SIZES, BADGE_VARIANTS } from '@components/data-display/badge/constants'
import type { IconComponent } from '@components/foundation/icon'
import type { BoxProps } from '@components/layout/box'

/** Visual treatments supported by Badge. */
export type BadgeVariant = (typeof BADGE_VARIANTS)[keyof typeof BADGE_VARIANTS]

/** Semantic color intentions mapped to the supplied theme. */
export type BadgeColor = (typeof BADGE_COLORS)[keyof typeof BADGE_COLORS]

/** Badge sizes, independent of the typography and icon token scales. */
export type BadgeSize = (typeof BADGE_SIZES)[keyof typeof BADGE_SIZES]

/** Native span attributes and layout customization for a noninteractive label. */
export type BadgeProps = Readonly<Omit<BoxProps, 'as' | 'children' | 'color' | 'ref'> & {
    /** Ref forwarded to the outer span. */
    ref?: Ref<HTMLSpanElement>
    /** Visible text; icons are decorative and do not replace this label. */
    label: string
    /** Visual treatment. Defaults to `outlinedSubtle`. */
    variant?: BadgeVariant
    /** Semantic color intent. Defaults to `primary`. */
    color?: BadgeColor
    /** Size preset. Defaults to `md`. */
    size?: BadgeSize
    /** Decorative SVG component displayed before the text. */
    startIcon?: IconComponent
    /** Decorative SVG component displayed after the text. */
    endIcon?: IconComponent
}>
