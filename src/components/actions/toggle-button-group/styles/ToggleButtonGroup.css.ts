import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { radius } from '@theme/tokens/radii.ts'

export const TOGGLE_BUTTON_GROUP_STYLES = {
    recipe: recipe({
        base: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: vars.space.xxs,
            backgroundColor: vars.color.card,
            borderRadius: radius.md,
            vars: {
                '--toggle-button-group-item-radius': radius.sm,
            },
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
            bordered: {
                true: {
                    border: `1px solid ${vars.color.border}`,
                },
                false: {
                    border: '1px solid transparent',
                },
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
            bordered: true,
        },
    }),
}

export type ToggleButtonGroupRecipeVariants = NonNullable<RecipeVariants<typeof TOGGLE_BUTTON_GROUP_STYLES.recipe>>
