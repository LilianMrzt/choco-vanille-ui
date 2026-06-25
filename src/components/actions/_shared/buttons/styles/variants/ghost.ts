import { vars } from '@theme/contract.css.ts'

/** Compound variants for the "ghost" visual variant. */
export const ghostCompoundVariants = [
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
] as const
