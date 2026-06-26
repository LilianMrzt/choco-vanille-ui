import { vars } from '@theme/contract.css.ts'

/**
 * Compound variants for the "ghost" visual variant.
 */
export const ghostCompoundVariants = [
    {
        variants: { variant: 'ghost', color: 'primary' },
        style: {
            color: vars.color.primarySubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.primarySubtle },
                '&:active': { backgroundColor: vars.color.primarySubtleActive },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'secondary' },
        style: {
            color: vars.color.secondaryForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.secondarySubtle },
                '&:active': { backgroundColor: vars.color.secondarySubtleActive },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'destructive' },
        style: {
            color: vars.color.destructiveSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.destructiveSubtle },
                '&:active': { backgroundColor: vars.color.destructiveSubtleActive },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'success' },
        style: {
            color: vars.color.successSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.successSubtle },
                '&:active': { backgroundColor: vars.color.successSubtleActive },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'warning' },
        style: {
            color: vars.color.warningSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.warningSubtle },
                '&:active': { backgroundColor: vars.color.warningSubtleActive },
            },
        },
    },
    {
        variants: { variant: 'ghost', color: 'info' },
        style: {
            color: vars.color.infoSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.infoSubtle },
                '&:active': { backgroundColor: vars.color.infoSubtleActive },
            },
        },
    },
] as const
