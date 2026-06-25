import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { iconReset, buttonBaseStyles } from '@components/actions/_shared/buttonShared.css.ts'

export const iconButtonRecipe = recipe({
    base: [
        iconReset,
        {
            ...buttonBaseStyles,
            flexShrink: 0,
        },
    ],

    variants: {
        variant: {
            contained: {},
            outlined: {
                backgroundColor: 'transparent',
            },
            ghost: {
                backgroundColor: 'transparent',
            },
        },
        color: {
            primary: {},
            secondary: {},
            destructive: {},
            success: {},
            warning: {},
            info: {},
        },
        size: {
            sm: {
                height: '2.25rem',
                width: '2.25rem',
            },
            default: {
                height: '2.5rem',
                width: '2.5rem',
            },
            lg: {
                height: '2.75rem',
                width: '2.75rem',
            },
        },
    },

    compoundVariants: [
        // ── contained ───────────────────────────────────────────────────────
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
        // ── outlined ────────────────────────────────────────────────────────
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
        // ── ghost ────────────────────────────────────────────────────────────
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
    ],
    defaultVariants: {
        variant: 'contained',
        color: 'primary',
        size: 'default',
    },
})

export type IconButtonRecipeVariants = NonNullable<RecipeVariants<typeof iconButtonRecipe>>
