import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { BADGE_COLORS, BADGE_COLORS_ARRAY, BADGE_VARIANTS } from '@components/data-display/badge/constants'
import { solidCompoundVariants } from '@components/data-display/badge/styles/variants/solid.ts'
import { subtleCompoundVariants } from '@components/data-display/badge/styles/variants/subtle.ts'
import { outlineCompoundVariants } from '@components/data-display/badge/styles/variants/outline.ts'

export const BADGE_STYLES = {
    recipe: recipe({
        base: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            border: `1px solid transparent`,
            fontFamily: vars.fontFamily.sans,
            lineHeight: vars.lineHeight.none,
            flexShrink: 0,
        },

        variants: {
            size: {
                sm: {
                    minWidth: '1.25rem',
                    minHeight: '1.25rem',
                    paddingInline: vars.space.xs,
                    paddingBlock: vars.space.xxs,
                    gap: vars.space.xxs,
                },
                md: {
                    minWidth: '1.5rem',
                    minHeight: '1.5rem',
                    paddingInline: vars.space.sm,
                    paddingBlock: vars.space.xxs,
                    gap: vars.space.xs,
                },
                lg: {
                    minWidth: '1.75rem',
                    minHeight: '1.75rem',
                    paddingInline: vars.space.md,
                    paddingBlock: vars.space.xs,
                    gap: vars.space.xs,
                },
            },

            variant: {
                [BADGE_VARIANTS.solid]: {},
                [BADGE_VARIANTS.subtle]: {},
                [BADGE_VARIANTS.outline]: {
                    backgroundColor: 'transparent',
                },
            },

            color: Object.fromEntries(BADGE_COLORS_ARRAY.map((color) => [color, {}])),
        },

        compoundVariants: [
            ...solidCompoundVariants,
            ...subtleCompoundVariants,
            ...outlineCompoundVariants,
        ],

        defaultVariants: {
            variant: BADGE_VARIANTS.subtle,
            color: BADGE_COLORS.primary,
            size: 'md',
        },
    }),
}

export type BadgeRecipeVariants = NonNullable<RecipeVariants<typeof BADGE_STYLES.recipe>>
