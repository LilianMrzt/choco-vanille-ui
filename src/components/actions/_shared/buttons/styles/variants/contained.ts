import { vars } from '@theme/contract.css.ts'

/**
 * Compound variants for the "contained" (solid) visual variant.
 * Every intent follows the same pattern: solid fill + Hover/Active states.
 */
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
                '&:hover': { backgroundColor: vars.color.successHover },
                '&:active': { backgroundColor: vars.color.successActive },
            },
        },
    },
    {
        variants: { variant: 'contained', color: 'warning' },
        style: {
            backgroundColor: vars.color.warning,
            color: vars.color.warningForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.warningHover },
                '&:active': { backgroundColor: vars.color.warningActive },
            },
        },
    },
    {
        variants: { variant: 'contained', color: 'info' },
        style: {
            backgroundColor: vars.color.info,
            color: vars.color.infoForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.infoHover },
                '&:active': { backgroundColor: vars.color.infoActive },
            },
        },
    },
] as const
