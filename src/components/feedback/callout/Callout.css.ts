import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import type { StyleRule } from '@vanilla-extract/css'

import type { CalloutVariant } from '@components/feedback/callout/types'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const CALLOUT_VARIANT_STYLES = {
    info: {
        backgroundColor: vars.color.info.subtle,
        borderColor: vars.color.info.subtleHover,
        color: vars.color.info.subtleForeground,
    },
    success: {
        backgroundColor: vars.color.success.subtle,
        borderColor: vars.color.success.subtleHover,
        color: vars.color.success.subtleForeground,
    },
    warning: {
        backgroundColor: vars.color.warning.subtle,
        borderColor: vars.color.warning.subtleHover,
        color: vars.color.warning.subtleForeground,
    },
    error: {
        backgroundColor: vars.color.danger.subtle,
        borderColor: vars.color.danger.subtleHover,
        color: vars.color.danger.subtleForeground,
    },
} satisfies Record<CalloutVariant, StyleRule>

export const CALLOUT_STYLES = {
    recipe: recipe({
        base: {
            position: 'relative',
            padding: vars.space[12],
            borderRadius: vars.radius[6],
            borderWidth: '1px',
            borderStyle: 'solid',
        },
        variants: {
            hasAction: {
                true: {
                    // Reserves room so the title/description never run under Callout.Action.
                    paddingRight: vars.space[48],
                },
                false: {},
            },
            variant: CALLOUT_VARIANT_STYLES,
        },
        defaultVariants: {
            variant: 'info',
        },
    }),
}

export type CalloutRecipeVariants = NonNullable<
  RecipeVariants<typeof CALLOUT_STYLES.recipe>
>;
