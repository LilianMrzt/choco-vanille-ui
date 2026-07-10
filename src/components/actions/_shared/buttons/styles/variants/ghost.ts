import { vars } from '@theme/contract.css.ts'
import { BUTTON_COLORS, BUTTON_VARIANTS } from '@components/actions/_shared/buttons/constants'

/**
 * Compound variants for the "ghost" visual variant.
 */
export const ghostCompoundVariants = [
    {
        variants: { variant: BUTTON_VARIANTS.ghost, color: BUTTON_COLORS.primary },
        style: {
            color: vars.color.primarySubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.primarySubtle },
                '&:active': { backgroundColor: vars.color.primarySubtleActive },
            },
        },
    },
    {
        variants: { variant: BUTTON_VARIANTS.ghost, color: BUTTON_COLORS.secondary },
        style: {
            color: vars.color.secondarySubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.secondarySubtle },
                '&:active': { backgroundColor: vars.color.secondarySubtleActive },
            },
        },
    },
    {
        variants: { variant: BUTTON_VARIANTS.ghost, color: BUTTON_COLORS.tertiary },
        style: {
            color: vars.color.tertiaryForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.tertiarySubtle },
                '&:active': { backgroundColor: vars.color.tertiarySubtleActive },
            },
        },
    },
    {
        variants: { variant: BUTTON_VARIANTS.ghost, color: BUTTON_COLORS.destructive },
        style: {
            color: vars.color.destructiveSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.destructiveSubtle },
                '&:active': { backgroundColor: vars.color.destructiveSubtleActive },
            },
        },
    },
    {
        variants: { variant: BUTTON_VARIANTS.ghost, color: BUTTON_COLORS.success },
        style: {
            color: vars.color.successSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.successSubtle },
                '&:active': { backgroundColor: vars.color.successSubtleActive },
            },
        },
    },
    {
        variants: { variant: BUTTON_VARIANTS.ghost, color: BUTTON_COLORS.warning },
        style: {
            color: vars.color.warningSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.warningSubtle },
                '&:active': { backgroundColor: vars.color.warningSubtleActive },
            },
        },
    },
    {
        variants: { variant: BUTTON_VARIANTS.ghost, color: BUTTON_COLORS.info },
        style: {
            color: vars.color.infoSubtleForeground,
            selectors: {
                '&:hover': { backgroundColor: vars.color.infoSubtle },
                '&:active': { backgroundColor: vars.color.infoSubtleActive },
            },
        },
    },
] as const
