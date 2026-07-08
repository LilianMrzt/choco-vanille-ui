import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import {
    AVATAR_COLORS,
    AVATAR_COLORS_ARRAY,
    AVATAR_SHAPES,
    AVATAR_SIZES,
} from '@components/data-display/avatar/constants'
import { vars } from '@theme/contract.css.ts'

const sizeDimensions = {
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem',
} as const

const fallbackFontSizes = {
    sm: vars.fontSize.xs,
    md: vars.fontSize.sm,
    lg: vars.fontSize.base,
    xl: vars.fontSize.lg,
} as const

const shapeRadiusMap = {
    [AVATAR_SHAPES.circle]: vars.radius.full,
    [AVATAR_SHAPES.square]: vars.radius.md,
} as const

export const AVATAR_STYLES = {
    recipe: recipe({
        base: {
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'visible',
            backgroundColor: vars.color.primarySubtle,
            color: vars.color.primarySubtleForeground,
            border: `2px solid ${vars.color.background}`,
            fontFamily: vars.fontFamily.sans,
            fontWeight: vars.fontWeight.medium,
            lineHeight: vars.lineHeight.none,
            userSelect: 'none',
        },

        variants: {
            size: {
                sm: {
                    width: sizeDimensions.sm,
                    height: sizeDimensions.sm,
                    fontSize: fallbackFontSizes.sm,
                },
                md: {
                    width: sizeDimensions.md,
                    height: sizeDimensions.md,
                    fontSize: fallbackFontSizes.md,
                },
                lg: {
                    width: sizeDimensions.lg,
                    height: sizeDimensions.lg,
                    fontSize: fallbackFontSizes.lg,
                },
                xl: {
                    width: sizeDimensions.xl,
                    height: sizeDimensions.xl,
                    fontSize: fallbackFontSizes.xl,
                },
            },

            shape: {
                circle: { borderRadius: shapeRadiusMap.circle },
                square: { borderRadius: shapeRadiusMap.square },
            },

            color: Object.fromEntries(
                AVATAR_COLORS_ARRAY.map((color) => [
                    color,
                    {
                        backgroundColor:
              vars.color[`${color}Subtle` as keyof typeof vars.color],
                        color:
              vars.color[`${color}SubtleForeground` as keyof typeof vars.color],
                    },
                ]),
            ),

            ring: {
                true: {},
                false: {
                    border: '2px solid transparent',
                },
            },
        },

        compoundVariants: [],

        defaultVariants: {
            size: AVATAR_SIZES.md,
            shape: AVATAR_SHAPES.circle,
            color: AVATAR_COLORS.primary,
            ring: false,
        },
    }),
}

export type AvatarRecipeVariants = NonNullable<
  RecipeVariants<typeof AVATAR_STYLES.recipe>
>;
