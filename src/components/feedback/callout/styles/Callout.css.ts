import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const CALLOUT_STYLES = {
    recipe: recipe({
        base: {
            position: 'relative',
            padding: vars.space.md,
            borderRadius: vars.radius.sm,
            borderWidth: '1px',
            borderStyle: 'solid',
        },
        variants: {
            hasAction: {
                true: {
                    // Reserves room so the title/description never run under Callout.Action.
                    paddingRight: vars.space['3xl'],
                },
                false: {},
            },
            variant: {
                info: {
                    backgroundColor: vars.color.info.subtle,
                    borderColor: vars.color.info.subtleBorder,
                    color: vars.color.info.subtleForeground,
                },
                success: {
                    backgroundColor: vars.color.success.subtle,
                    borderColor: vars.color.success.subtleBorder,
                    color: vars.color.success.subtleForeground,
                },
                warning: {
                    backgroundColor: vars.color.warning.subtle,
                    borderColor: vars.color.warning.subtleBorder,
                    color: vars.color.warning.subtleForeground,
                },
                error: {
                    backgroundColor: vars.color.danger.subtle,
                    borderColor: vars.color.danger.subtleBorder,
                    color: vars.color.danger.subtleForeground,
                },
            },
        },
        defaultVariants: {
            variant: 'info',
        },
    }),
}

export type CalloutRecipeVariants = NonNullable<
  RecipeVariants<typeof CALLOUT_STYLES.recipe>
>;
