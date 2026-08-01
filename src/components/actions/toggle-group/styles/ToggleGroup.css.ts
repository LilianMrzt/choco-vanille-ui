import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { radius } from '@theme/tokens/radii.ts'

export const TOGGLE_GROUP_STYLES = {
    recipe: recipe({
        base: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: vars.space.xxs,
            backgroundColor: vars.color.card,
            borderRadius: radius.md,
        },
        variants: {
            orientation: {
                horizontal: {
                    flexDirection: 'row',
                },
                vertical: {
                    flexDirection: 'column',
                    alignItems: 'stretch',
                },
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
        },
    }),
}
