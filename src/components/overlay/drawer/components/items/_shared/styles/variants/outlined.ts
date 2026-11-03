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
                    backgroundColor: vars.color.primary.subtle,
                },
                '&:active': {
                    backgroundColor: vars.color.primary.subtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface.main,
                    color: vars.color.text.primary,
                    borderColor: vars.color.border.main,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.primary.subtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.primary.subtleHover,
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
                    backgroundColor: vars.color.secondary.subtle,
                },
                '&:active': {
                    backgroundColor: vars.color.secondary.subtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface.main,
                    color: vars.color.text.primary,
                    borderColor: vars.color.border.main,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.secondary.subtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.secondary.subtleHover,
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
                    backgroundColor: vars.color.neutral.subtle,
                },
                '&:active': {
                    backgroundColor: vars.color.neutral.subtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface.main,
                    color: vars.color.text.primary,
                    borderColor: vars.color.border.main,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.neutral.subtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.neutral.subtleHover,
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
                    backgroundColor: vars.color.danger.subtle,
                },
                '&:active': {
                    backgroundColor: vars.color.danger.subtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface.main,
                    color: vars.color.text.primary,
                    borderColor: vars.color.border.main,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.danger.subtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.danger.subtleHover,
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
                    backgroundColor: vars.color.success.subtle,
                },
                '&:active': {
                    backgroundColor: vars.color.success.subtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface.main,
                    color: vars.color.text.primary,
                    borderColor: vars.color.border.main,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.success.subtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.success.subtleHover,
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
                    backgroundColor: vars.color.warning.subtle,
                },
                '&:active': {
                    backgroundColor: vars.color.warning.subtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface.main,
                    color: vars.color.text.primary,
                    borderColor: vars.color.border.main,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.warning.subtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.warning.subtleHover,
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
                    backgroundColor: vars.color.info.subtle,
                },
                '&:active': {
                    backgroundColor: vars.color.info.subtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.surface.main,
                    color: vars.color.text.primary,
                    borderColor: vars.color.border.main,
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.info.subtle,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.info.subtleHover,
                },
            },
        },
    },
] as const
