import { vars } from '@theme/contract.css.ts'

/** Compound variants for the "outlined" visual variant. */
export const outlinedCompoundVariants = [
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
] as const
