import { recipe } from '@vanilla-extract/recipes'

import { getColorTreatmentStyles } from '@components/data-display/_shared/color-treatments/getColorTreatmentStyles.utils.ts'
import {
    AVATAR_COLORS,
    AVATAR_COLORS_ARRAY,
    AVATAR_SHAPES,
    AVATAR_SIZES,
    AVATAR_VARIANTS,
    AVATAR_VARIANTS_ARRAY,
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
        border: '1px solid transparent',
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

        color: Object.fromEntries(AVATAR_COLORS_ARRAY.map((color) => [color, {}])),

        variant: {
            [AVATAR_VARIANTS.contained]: {},
            [AVATAR_VARIANTS.subtle]: {},
            [AVATAR_VARIANTS.outlined]: {
                backgroundColor: 'transparent',
            },
            [AVATAR_VARIANTS.outlinedSubtle]: {},
        },

    },

    compoundVariants: AVATAR_COLORS_ARRAY.flatMap((color) => {
        const styles = getColorTreatmentStyles(color)

        return AVATAR_VARIANTS_ARRAY.map((variant) => ({
            variants: { variant, color },
            style: styles[variant],
        }))
    }),

    defaultVariants: {
        size: AVATAR_SIZES.md,
        shape: AVATAR_SHAPES.circle,
        color: AVATAR_COLORS.primary,
        variant: AVATAR_VARIANTS.outlinedSubtle,
    },
})

/** Avatar root size, shape, intent and treatment classes for customization. */
export const AVATAR_STYLES = {
    recipe: avatarRecipe,
}
