import type { ReactElement, Ref } from 'react'

import type { BadgeColor } from '@components/data-display/badge/types'
import type { STATUS_BADGE_POSITIONS, STATUS_BADGE_SIZES } from '@components/data-display/status-badge/constants'
import type { BoxProps } from '@components/layout/box'

/** Corner occupied by the indicator. */
export type StatusBadgePosition = (typeof STATUS_BADGE_POSITIONS)[keyof typeof STATUS_BADGE_POSITIONS]

/** Indicator sizes independent of the wrapped content. */
export type StatusBadgeSize = (typeof STATUS_BADGE_SIZES)[keyof typeof STATUS_BADGE_SIZES]

/** Native span attributes, layout props and the indicator's accessible content. */
export type StatusBadgeProps = Readonly<Omit<BoxProps, 'as' | 'children' | 'color' | 'position' | 'ref'> & {
    /** Single element displayed beneath the indicator. */
    children: ReactElement
    /** Indicator color intent, matching Badge. Defaults to `primary`. */
    color?: BadgeColor
    /** Indicator corner. Defaults to `top-right`. */
    position?: StatusBadgePosition
    /** Indicator size. Defaults to `md`. */
    size?: StatusBadgeSize
    /** Number displayed without truncation; zero is a valid value. */
    number?: number
    /** Accessible status label. When omitted, a number names the indicator. */
    label?: string
    /** Ref forwarded to the outer span, not the indicator. */
    ref?: Ref<HTMLSpanElement>
}>
