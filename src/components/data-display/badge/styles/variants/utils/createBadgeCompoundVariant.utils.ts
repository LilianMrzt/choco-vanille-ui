import { type StyleRule } from '@vanilla-extract/css'

import { BADGE_COLORS_ARRAY } from '@components/data-display/badge/constants'
import type { BadgeCompoundVariant } from '@components/data-display/badge/styles/variants/types'
import type {
    BadgeColor,
    BadgeVariant,
} from '@components/data-display/badge/types'

/**
 * Builds the compound-variant entries for a single visual variant across every badge color.
 * The array is generated once at module evaluation time (build time for Vanilla Extract),
 * so there is no per-render runtime cost in the browser.
 */
export const createBadgeCompoundVariantUtils = (
    variant: BadgeVariant,
    getStyle: (color: BadgeColor) => StyleRule,
): BadgeCompoundVariant[] =>
    BADGE_COLORS_ARRAY.map((color) => ({
        variants: { variant, color },
        style: getStyle(color),
    }))
