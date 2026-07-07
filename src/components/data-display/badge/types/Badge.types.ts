import type { BADGE_COLORS, BADGE_VARIANTS } from '@components/data-display/badge/constants'

/** Visual style variants for the Badge component. */
export type BadgeVariant = (typeof BADGE_VARIANTS)[keyof typeof BADGE_VARIANTS]

/** Color intents for the Badge component, mapped to theme semantic colors. */
export type BadgeColor = (typeof BADGE_COLORS)[keyof typeof BADGE_COLORS]

/** Size variants for the Badge component. */
export type BadgeSize = 'sm' | 'md' | 'lg'
