import { recipe } from '@vanilla-extract/recipes'

import {
    AVATAR_SIZES,
    AVATAR_STATUS,
    AVATAR_STATUS_ARRAY,
} from '@components/data-display/avatar/constants'
import { vars } from '@theme/styles/contract/contract.css.ts'

const statusInset = {
    sm: '-0.125rem',
    md: '-0.125rem',
    lg: '-0.1875rem',
    xl: '-0.1875rem',
} as const

const statusColorMap = {
    [AVATAR_STATUS.online]: vars.color.success.main,
    [AVATAR_STATUS.offline]: vars.color.text.tertiary,
    [AVATAR_STATUS.busy]: vars.color.danger.main,
    [AVATAR_STATUS.away]: vars.color.warning.main,
} as const

const statusRecipe = recipe({
    base: {
        pointerEvents: 'none',
    },

    variants: {
        size: {
            sm: {
                right: statusInset.sm,
                bottom: statusInset.sm,
            },
            md: {
                right: statusInset.md,
                bottom: statusInset.md,
            },
            lg: {
                right: statusInset.lg,
                bottom: statusInset.lg,
            },
            xl: {
                right: statusInset.xl,
                bottom: statusInset.xl,
            },
        },

        status: Object.fromEntries(
            AVATAR_STATUS_ARRAY.map((status) => [
                status,
                {
                    backgroundColor: statusColorMap[status],
                },
            ]),
        ),
    },

    defaultVariants: {
        size: AVATAR_SIZES.md,
        status: AVATAR_STATUS.online,
    },
})

/** Presence colors and edge inset classes for Avatar.Status customization. */
export const AVATAR_STATUS_STYLES = {
    recipe: statusRecipe,
}
