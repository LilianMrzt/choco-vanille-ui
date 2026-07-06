import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

export const CALLOUT_STYLES = {
    recipe: recipe({
        base: {
            padding: vars.space.md,
            borderRadius: vars.radius.md,
            borderWidth: '1px',
            borderStyle: 'solid',
        },
        variants: {
            variant: {
                info: {
                    backgroundColor: vars.color.infoSubtle,
                    borderColor: vars.color.infoSubtleBorder,
                    color: vars.color.infoSubtleForeground,
                },
                success: {
                    backgroundColor: vars.color.successSubtle,
                    borderColor: vars.color.successSubtleBorder,
                    color: vars.color.successSubtleForeground,
                },
                warning: {
                    backgroundColor: vars.color.warningSubtle,
                    borderColor: vars.color.warningSubtleBorder,
                    color: vars.color.warningSubtleForeground,
                },
                error: {
                    backgroundColor: vars.color.destructiveSubtle,
                    borderColor: vars.color.destructiveSubtleBorder,
                    color: vars.color.destructiveSubtleForeground,
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
