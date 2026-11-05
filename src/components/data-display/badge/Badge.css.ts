import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    BADGE_COLORS,
    BADGE_COLORS_ARRAY,
    BADGE_VARIANTS,
} from '@components/data-display/badge/constants'
import { createBadgeCompoundVariants } from '@components/data-display/badge/utils/create-badge-compound-variants/createBadgeCompoundVariants.utils.ts'

const badgeRecipe = recipe({
    base: {
        whiteSpace: 'nowrap',
        border: '1px solid transparent',
        fontFamily: vars.fontFamily.sans,
        lineHeight: '1',
        flexShrink: 0,
    },

    variants: {
        size: {
            sm: {},
            md: {},
            lg: {},
        },

        variant: {
            [BADGE_VARIANTS.contained]: {},
            [BADGE_VARIANTS.subtle]: {},
            [BADGE_VARIANTS.outlined]: {
                backgroundColor: 'transparent',
            },
            [BADGE_VARIANTS.outlinedSubtle]: {},
        },

        color: Object.fromEntries(BADGE_COLORS_ARRAY.map((color) => [color, {}])),
    },

    compoundVariants: createBadgeCompoundVariants(),

    defaultVariants: {
        variant: BADGE_VARIANTS.outlinedSubtle,
        color: BADGE_COLORS.primary,
        size: 'md',
    },
})

/** Badge recipe classes; consumer className and style remain customizable. */
export const BADGE_STYLES = {
    recipe: badgeRecipe,
}
