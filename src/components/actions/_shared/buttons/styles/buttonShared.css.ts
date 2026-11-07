import { style, type StyleRule } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '@components/actions/_shared/buttons/constants'
import { containedCompoundVariants } from '@components/actions/_shared/buttons/styles/variants/contained.ts'
import { outlinedCompoundVariants } from '@components/actions/_shared/buttons/styles/variants/outlined.ts'
import { ghostCompoundVariants } from '@components/actions/_shared/buttons/styles/variants/ghost.ts'

//  Shared recipe building blocks

export const BUTTON_SHARED_STYLES = {
    /** Reset for icons rendered inside buttons. */
    icon: style({
        pointerEvents: 'none',
        flexShrink: 0,
    }),

    /** Base styles shared by Button and IconButton. */
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '1',
        borderRadius: vars.radius[4],
        border: '1px solid transparent',
        textDecoration: 'none',
        cursor: 'pointer',
        fontFamily: vars.fontFamily.sans,
        transition: [
            `background-color ${vars.duration.normal} ${vars.easing.standard}`,
            `color ${vars.duration.normal} ${vars.easing.standard}`,
            `border-color ${vars.duration.normal} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
            },
            '&:disabled, &[aria-disabled="true"]': {
                cursor: 'not-allowed',
                opacity: 0.5,
            },
        },
    } satisfies StyleRule,

    /** Variant dimension shared by Button and IconButton. */
    variantVariants: {
        [BUTTON_VARIANTS.contained]: {},
        [BUTTON_VARIANTS.outlined]: {
            backgroundColor: 'transparent',
        },
        [BUTTON_VARIANTS.ghost]: {
            backgroundColor: 'transparent',
        },
    } satisfies Record<string, StyleRule>,

    /** Color dimension shared by Button and IconButton. */
    colorVariants: {
        [BUTTON_COLORS.primary]: {},
        [BUTTON_COLORS.secondary]: {},
        [BUTTON_COLORS.tertiary]: {},
        [BUTTON_COLORS.destructive]: {},
        [BUTTON_COLORS.success]: {},
        [BUTTON_COLORS.warning]: {},
        [BUTTON_COLORS.info]: {},
    } satisfies Record<string, StyleRule>,

    /** Compound variants shared by Button and IconButton (variant × color). */
    compoundVariants: [
        ...containedCompoundVariants,
        ...outlinedCompoundVariants,
        ...ghostCompoundVariants,
    ],

    /** Default variants shared by Button and IconButton. */
    defaultVariants: {
        variant: BUTTON_VARIANTS.contained,
        color: BUTTON_COLORS.primary,
        size: BUTTON_SIZES.md,
    },
}
