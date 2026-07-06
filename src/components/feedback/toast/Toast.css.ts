import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

export const TOAST_STYLES = {
    recipe: recipe({
        base: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: vars.space.md,
            width: '100%',
            maxWidth: '24rem',
            padding: vars.space.md,
            borderRadius: vars.radius.lg,
            backgroundColor: vars.color.card,
            color: vars.color.cardForeground,
            boxShadow: vars.shadow.md,
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
    }),
}

export type ToastRecipeVariants = NonNullable<
  RecipeVariants<typeof TOAST_STYLES.recipe>
>;
