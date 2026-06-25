import { vars } from '@theme/contract.css.ts'

/** Compound variants for the "contained" visual variant. */
export const containedCompoundVariants = [
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
] as const
