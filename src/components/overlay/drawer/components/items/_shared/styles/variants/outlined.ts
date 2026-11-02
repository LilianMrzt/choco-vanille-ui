import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    DRAWER_ITEM_COLORS,
    DRAWER_ITEM_VARIANTS,
} from '@components/overlay/drawer/components/items/_shared/constants'

/**
 * Compound variants for the "outlined" visual variant.
 * Neutral active state with a color-tinted hover/active state.
 */
export const outlinedCompoundVariants = [
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.outlined,
            color: DRAWER_ITEM_COLORS.primary,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.primarySubtle,
                },
                '&:active': {
                    backgroundColor: vars.color.primarySubtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface,
                    color: vars.color.foreground,
                    borderColor: vars.color.border,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.primarySubtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.primarySubtleHover,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.outlined,
            color: DRAWER_ITEM_COLORS.secondary,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.secondarySubtle,
                },
                '&:active': {
                    backgroundColor: vars.color.secondarySubtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface,
                    color: vars.color.foreground,
                    borderColor: vars.color.border,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.secondarySubtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.secondarySubtleHover,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.outlined,
            color: DRAWER_ITEM_COLORS.tertiary,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.neutralSubtle,
                },
                '&:active': {
                    backgroundColor: vars.color.neutralSubtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface,
                    color: vars.color.foreground,
                    borderColor: vars.color.border,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.neutralSubtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.neutralSubtleHover,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.outlined,
            color: DRAWER_ITEM_COLORS.destructive,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.dangerSubtle,
                },
                '&:active': {
                    backgroundColor: vars.color.dangerSubtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface,
                    color: vars.color.foreground,
                    borderColor: vars.color.border,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.dangerSubtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.dangerSubtleHover,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.outlined,
            color: DRAWER_ITEM_COLORS.success,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.successSubtle,
                },
                '&:active': {
                    backgroundColor: vars.color.successSubtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface,
                    color: vars.color.foreground,
                    borderColor: vars.color.border,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.successSubtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.successSubtleHover,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.outlined,
            color: DRAWER_ITEM_COLORS.warning,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.warningSubtle,
                },
                '&:active': {
                    backgroundColor: vars.color.warningSubtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface,
                    color: vars.color.foreground,
                    borderColor: vars.color.border,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.warningSubtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.warningSubtleHover,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.outlined,
            color: DRAWER_ITEM_COLORS.info,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.infoSubtle,
                },
                '&:active': {
                    backgroundColor: vars.color.infoSubtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface,
                    color: vars.color.foreground,
                    borderColor: vars.color.border,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.infoSubtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.infoSubtleHover,
                },
            },
        },
    },
] as const
