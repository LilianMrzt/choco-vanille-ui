import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

const cardRecipe = recipe({
    base: {
        boxSizing: 'border-box',
        borderColor: vars.color.border.muted,
    },
    variants: {
        variant: {
            info: {},
            success: {},
            warning: {},
            error: {},
        },
    },
    defaultVariants: {
        variant: 'info',
    },
})

/** Notification card root classes, keyed by visual intent. */
export const NOTIFICATION_CARD_STYLES = {
    recipe: cardRecipe,
}
