import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { RADIUS } from '@theme/tokens/radius/radius.const.ts'

export const TOGGLE_GROUP_STYLES = {
    recipe: recipe({
        base: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: vars.space[2],
            backgroundColor: vars.color.surface.main,
            borderRadius: RADIUS[8],
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
