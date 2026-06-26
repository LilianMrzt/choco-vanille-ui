import { style, globalStyle, type StyleRule } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'
import { containedCompoundVariants } from '@components/actions/_shared/buttons/styles/variants/contained.ts'
import { outlinedCompoundVariants } from '@components/actions/_shared/buttons/styles/variants/outlined.ts'
import { ghostCompoundVariants } from '@components/actions/_shared/buttons/styles/variants/ghost.ts'

export const iconReset = style({})
globalStyle(`${iconReset} svg`, {
    pointerEvents: 'none',
    width: vars.fontSize.base,
    height: vars.fontSize.base,
    flexShrink: 0,
})

export const buttonBaseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: vars.lineHeight.none,
    borderRadius: vars.radius.sm,
    border: '1px solid transparent',
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
            boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
        },
        '&:disabled': {
            pointerEvents: 'none',
            opacity: 0.5,
        },
    },
} satisfies StyleRule

//  Shared recipe building blocks

/** Variant dimension shared by Button and IconButton. */
export const sharedButtonVariantVariants = {
    contained: {},
    outlined: {
        backgroundColor: 'transparent',
    },
    ghost: {
        backgroundColor: 'transparent',
    },
} satisfies Record<string, StyleRule>

/** Color dimension shared by Button and IconButton. */
export const sharedButtonColorVariants = {
    primary: {},
    secondary: {},
    destructive: {},
    success: {},
    warning: {},
    info: {},
} satisfies Record<string, StyleRule>

/** Compound variants shared by Button and IconButton (variant × color). */
export const sharedButtonCompoundVariants = [
    ...containedCompoundVariants,
    ...outlinedCompoundVariants,
    ...ghostCompoundVariants,
]

/** Default variants shared by Button and IconButton. */
export const sharedButtonDefaultVariants = {
    variant: 'contained' as const,
    color: 'primary' as const,
    size: 'md' as const,
}
