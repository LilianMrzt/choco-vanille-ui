import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    DRAWER_ITEM_COLORS,
    DRAWER_ITEM_VARIANTS,
} from '@components/overlay/drawer/components/items/_shared/constants'

/**
 * Compound variants for the "default" visual variant.
 * Subtle hover/active states and a solid active state per color intent.
 */
export const defaultCompoundVariants = [
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color: DRAWER_ITEM_COLORS.primary,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.primary.subtle,
                    color: vars.color.text.primary,
                },
                '&:active': {
                    backgroundColor: vars.color.primary.subtleHover,
                    color: vars.color.text.primary,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.primary.main,
                    color: vars.color.primary.foreground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.primary.hover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.primary.pressed,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color: DRAWER_ITEM_COLORS.secondary,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.secondary.subtle,
                    color: vars.color.text.primary,
                },
                '&:active': {
                    backgroundColor: vars.color.secondary.subtleHover,
                    color: vars.color.text.primary,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.secondary.main,
                    color: vars.color.secondary.foreground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.secondary.hover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.secondary.pressed,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color: DRAWER_ITEM_COLORS.neutral,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.neutral.subtle,
                    color: vars.color.text.primary,
                },
                '&:active': {
                    backgroundColor: vars.color.neutral.subtleHover,
                    color: vars.color.text.primary,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.neutral.main,
                    color: vars.color.neutral.foreground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.neutral.hover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.neutral.pressed,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color: DRAWER_ITEM_COLORS.danger,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.danger.subtle,
                    color: vars.color.text.primary,
                },
                '&:active': {
                    backgroundColor: vars.color.danger.subtleHover,
                    color: vars.color.text.primary,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.danger.main,
                    color: vars.color.danger.foreground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.danger.hover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.danger.pressed,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color: DRAWER_ITEM_COLORS.success,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.success.subtle,
                    color: vars.color.text.primary,
                },
                '&:active': {
                    backgroundColor: vars.color.success.subtleHover,
                    color: vars.color.text.primary,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.success.main,
                    color: vars.color.success.foreground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.success.hover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.success.pressed,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color: DRAWER_ITEM_COLORS.warning,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.warning.subtle,
                    color: vars.color.text.primary,
                },
                '&:active': {
                    backgroundColor: vars.color.warning.subtleHover,
                    color: vars.color.text.primary,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.warning.main,
                    color: vars.color.warning.foreground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.warning.hover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.warning.pressed,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color: DRAWER_ITEM_COLORS.info,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.info.subtle,
                    color: vars.color.text.primary,
                },
                '&:active': {
                    backgroundColor: vars.color.info.subtleHover,
                    color: vars.color.text.primary,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.info.main,
                    color: vars.color.info.foreground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.info.hover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.info.pressed,
                },
            },
        },
    },
] as const
