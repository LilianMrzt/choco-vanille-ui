import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { recipe } from '@vanilla-extract/recipes'

import {
    AVATAR_COLORS,
    AVATAR_COLORS_ARRAY,
    AVATAR_SHAPES,
    AVATAR_SIZES,
    AVATAR_VARIANTS,
} from '@components/data-display/avatar/constants'
import { vars } from '@theme/styles/contract/contract.css.ts'

const sizeDimensions = {
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem',
} as const

const fallbackFontSizes = {
    sm: vars.fontSize[12],
    md: vars.fontSize[14],
    lg: vars.fontSize[16],
    xl: vars.fontSize[18],
} as const

const shapeRadiusMap = {
    [AVATAR_SHAPES.circle]: vars.radius.full,
    [AVATAR_SHAPES.square]: vars.radius[4],
} as const

const avatarRecipe = recipe({
    base: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'visible',
        backgroundColor: vars.color.primary.subtle,
        color: vars.color.primary.subtleForeground,
        border: `2px solid ${vars.color.background}`,
        fontFamily: vars.fontFamily.sans,
        fontWeight: vars.fontWeight.medium,
        lineHeight: '1',
        userSelect: 'none',
        boxSizing: 'border-box',
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
            circle: {
                borderRadius: shapeRadiusMap.circle,
            },
            square: {
                borderRadius: shapeRadiusMap.square,
            },
        },

        color: Object.fromEntries(
            AVATAR_COLORS_ARRAY.map((color) => [
                color,
                {
                    backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
                    color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
                },
            ]),
        ),

        variant: {
            [AVATAR_VARIANTS.contained]: {},
            [AVATAR_VARIANTS.outlined]: {},
        },

    },

    compoundVariants: AVATAR_COLORS_ARRAY.map((color) => ({
        variants: {
            variant: AVATAR_VARIANTS.outlined,
            color,
        },
        style: {
            borderWidth: '1px',
            borderColor: vars.color[COLOR_INTENT_TOKENS[color]].subtleBorder,
        },
    })),

    defaultVariants: {
        size: AVATAR_SIZES.md,
        shape: AVATAR_SHAPES.circle,
        color: AVATAR_COLORS.primary,
        variant: AVATAR_VARIANTS.contained,
    },
})

/** Avatar root size, shape, intent and treatment classes for customization. */
export const AVATAR_STYLES = {
    recipe: avatarRecipe,
}
