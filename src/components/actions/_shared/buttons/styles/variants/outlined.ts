import { vars } from '@theme/contract.css.ts'

/**
 * Compound variants for the "outlined" visual variant.
 */
export const outlinedCompoundVariants = [
    {
        variants: { variant: 'outlined', color: 'primary' },
        style: {
            borderColor: vars.color.primary,
            color: vars.color.primarySubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.primarySubtle },
                '&:active': { backgroundColor: vars.color.primarySubtleHover },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'secondary' },
        style: {
            borderColor: vars.color.input,
            color: vars.color.secondaryForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.secondarySubtle },
                '&:active': { backgroundColor: vars.color.secondarySubtleHover },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'destructive' },
        style: {
            borderColor: vars.color.destructive,
            color: vars.color.destructiveSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.destructiveSubtle },
                '&:active': { backgroundColor: vars.color.destructiveSubtleHover },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'success' },
        style: {
            borderColor: vars.color.success,
            color: vars.color.successSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.successSubtle },
                '&:active': { backgroundColor: vars.color.successSubtleHover },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'warning' },
        style: {
            borderColor: vars.color.warning,
            color: vars.color.warningSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.warningSubtle },
                '&:active': { backgroundColor: vars.color.warningSubtleHover },
            },
        },
    },
    {
        variants: { variant: 'outlined', color: 'info' },
        style: {
            borderColor: vars.color.info,
            color: vars.color.infoSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.infoSubtle },
                '&:active': { backgroundColor: vars.color.infoSubtleHover },
            },
        },
    },
] as const
