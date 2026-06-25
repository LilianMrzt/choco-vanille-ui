import { style, globalStyle, type StyleRule } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

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
    borderRadius: vars.radius.sm,
    border: '1px solid transparent',
    cursor: 'pointer',
    fontFamily: vars.fontFamily.sans,
    transition: [
        `background-color ${vars.duration.normal} ${vars.easing.standard}`,
        `color ${vars.duration.normal} ${vars.easing.standard}`,
        `border-color ${vars.duration.normal} ${vars.easing.standard}`,
        `filter ${vars.duration.normal} ${vars.easing.standard}`,
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

export const buttonVariantStyles = {
    default: {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryForeground,
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.primaryHover,
            },
            '&:active': {
                backgroundColor: vars.color.primaryActive,
            },
        },
    },
    destructive: {
        backgroundColor: vars.color.destructive,
        color: vars.color.destructiveForeground,
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.destructiveHover,
            },
            '&:active': {
                backgroundColor: vars.color.destructiveActive,
            },
        },
    },
    outline: {
        backgroundColor: vars.color.background,
        color: vars.color.foreground,
        borderColor: vars.color.input,
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.accent,
                color: vars.color.accentForeground,
            },
            '&:active': {
                backgroundColor: vars.color.accent,
                color: vars.color.accentForeground,
                filter: 'brightness(0.75)',
            },
        },
    },
    secondary: {
        backgroundColor: vars.color.secondary,
        color: vars.color.secondaryForeground,
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.secondaryHover,
            },
            '&:active': {
                backgroundColor: vars.color.secondaryActive,
            },
        },
    },
    ghost: {
        backgroundColor: 'transparent',
        color: vars.color.foreground,
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.accent,
                color: vars.color.accentForeground,
            },
            '&:active': {
                backgroundColor: vars.color.accent,
                color: vars.color.accentForeground,
                filter: 'brightness(0.75)',
            },
        },
    },
} satisfies Record<string, StyleRule>

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
    // contained
    {
        variants: { variant: 'contained', color: 'primary' },
        style: {
            backgroundColor: vars.color.primary,
            color: vars.color.primaryForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.primaryHover },
                '&:active': { backgroundColor: vars.color.primaryActive },
            },
        },
    },
    {
        variants: { variant: 'contained', color: 'secondary' },
        style: {
            backgroundColor: vars.color.secondary,
            color: vars.color.secondaryForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.secondaryHover },
                '&:active': { backgroundColor: vars.color.secondaryActive },
            },
        },
    },
    {
        variants: { variant: 'contained', color: 'destructive' },
        style: {
            backgroundColor: vars.color.destructive,
            color: vars.color.destructiveForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.destructiveHover },
                '&:active': { backgroundColor: vars.color.destructiveActive },
            },
        },
    },
    {
        variants: { variant: 'contained', color: 'success' },
        style: {
            backgroundColor: vars.color.success,
            color: vars.color.successForeground,
            selectors: {
                '&:hover': { filter: 'brightness(0.9)' },
                '&:active': { filter: 'brightness(0.8)' },
            },
        },
    },
    {
        variants: { variant: 'contained', color: 'warning' },
        style: {
            backgroundColor: vars.color.warning,
            color: vars.color.warningForeground,
            selectors: {
                '&:hover': { filter: 'brightness(0.9)' },
                '&:active': { filter: 'brightness(0.8)' },
            },
        },
    },
    {
        variants: { variant: 'contained', color: 'info' },
        style: {
            backgroundColor: vars.color.info,
            color: vars.color.infoForeground,
            selectors: {
                '&:hover': { filter: 'brightness(0.9)' },
                '&:active': { filter: 'brightness(0.8)' },
            },
        },
    },
    // outlined
    {
        variants: { variant: 'outlined', color: 'primary' },
        style: {
            borderColor: vars.color.primary,
            color: vars.color.primary,
            selectors: {
                '&:hover': { backgroundColor: vars.color.primarySubtle, color: vars.color.primarySubtleForeground },
                '&:active': { backgroundColor: vars.color.primarySubtle, filter: 'brightness(0.9)' },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'secondary' },
        style: {
            borderColor: vars.color.input,
            color: vars.color.secondaryForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.secondary },
                '&:active': { backgroundColor: vars.color.secondaryHover },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'destructive' },
        style: {
            borderColor: vars.color.destructive,
            color: vars.color.destructive,
            selectors: {
                '&:hover': { backgroundColor: vars.color.destructiveSubtle, color: vars.color.destructiveSubtleForeground },
                '&:active': { backgroundColor: vars.color.destructiveSubtle, filter: 'brightness(0.9)' },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'success' },
        style: {
            borderColor: vars.color.success,
            color: vars.color.success,
            selectors: {
                '&:hover': { backgroundColor: vars.color.successSubtle, color: vars.color.successSubtleForeground },
                '&:active': { backgroundColor: vars.color.successSubtle, filter: 'brightness(0.9)' },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'warning' },
        style: {
            borderColor: vars.color.warning,
            color: vars.color.warning,
            selectors: {
                '&:hover': { backgroundColor: vars.color.warningSubtle, color: vars.color.warningSubtleForeground },
                '&:active': { backgroundColor: vars.color.warningSubtle, filter: 'brightness(0.9)' },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'info' },
        style: {
            borderColor: vars.color.info,
            color: vars.color.info,
            selectors: {
                '&:hover': { backgroundColor: vars.color.infoSubtle, color: vars.color.infoSubtleForeground },
                '&:active': { backgroundColor: vars.color.infoSubtle, filter: 'brightness(0.9)' },
            },
        },
    },
    // ghost
    {
        variants: { variant: 'ghost', color: 'primary' },
        style: {
            color: vars.color.primary,
            selectors: {
                '&:hover': { backgroundColor: vars.color.primarySubtle, color: vars.color.primarySubtleForeground },
                '&:active': { backgroundColor: vars.color.primarySubtle, filter: 'brightness(0.9)' },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'secondary' },
        style: {
            color: vars.color.secondaryForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.secondary },
                '&:active': { backgroundColor: vars.color.secondaryHover },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'destructive' },
        style: {
            color: vars.color.destructive,
            selectors: {
                '&:hover': { backgroundColor: vars.color.destructiveSubtle, color: vars.color.destructiveSubtleForeground },
                '&:active': { backgroundColor: vars.color.destructiveSubtle, filter: 'brightness(0.9)' },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'success' },
        style: {
            color: vars.color.success,
            selectors: {
                '&:hover': { backgroundColor: vars.color.successSubtle, color: vars.color.successSubtleForeground },
                '&:active': { backgroundColor: vars.color.successSubtle, filter: 'brightness(0.9)' },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'warning' },
        style: {
            color: vars.color.warning,
            selectors: {
                '&:hover': { backgroundColor: vars.color.warningSubtle, color: vars.color.warningSubtleForeground },
                '&:active': { backgroundColor: vars.color.warningSubtle, filter: 'brightness(0.9)' },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'info' },
        style: {
            color: vars.color.info,
            selectors: {
                '&:hover': { backgroundColor: vars.color.infoSubtle, color: vars.color.infoSubtleForeground },
                '&:active': { backgroundColor: vars.color.infoSubtle, filter: 'brightness(0.9)' },
            },
        },
    },
]

/** Default variants shared by Button and IconButton. */
export const sharedButtonDefaultVariants = {
    variant: 'contained' as const,
    color: 'primary' as const,
    size: 'md' as const,
}
