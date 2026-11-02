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
                    backgroundColor: vars.color.primarySubtle,
                    color: vars.color.foreground,
                },
                '&:active': {
                    backgroundColor: vars.color.primarySubtleHover,
                    color: vars.color.foreground,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.primary,
                    color: vars.color.primaryForeground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.primaryHover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.primaryActive,
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
                    backgroundColor: vars.color.secondarySubtle,
                    color: vars.color.foreground,
                },
                '&:active': {
                    backgroundColor: vars.color.secondarySubtleHover,
                    color: vars.color.foreground,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.secondary,
                    color: vars.color.secondaryForeground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.secondaryHover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.secondaryActive,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color: DRAWER_ITEM_COLORS.tertiary,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.neutralSubtle,
                    color: vars.color.foreground,
                },
                '&:active': {
                    backgroundColor: vars.color.neutralSubtleHover,
                    color: vars.color.foreground,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.neutral,
                    color: vars.color.neutralForeground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.neutralHover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.neutralActive,
                },
            },
        },
    },
    {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color: DRAWER_ITEM_COLORS.destructive,
        },
        style: {
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color.dangerSubtle,
                    color: vars.color.foreground,
                },
                '&:active': {
                    backgroundColor: vars.color.dangerSubtleHover,
                    color: vars.color.foreground,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.danger,
                    color: vars.color.dangerForeground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.dangerHover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.dangerActive,
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
                    backgroundColor: vars.color.successSubtle,
                    color: vars.color.foreground,
                },
                '&:active': {
                    backgroundColor: vars.color.successSubtleHover,
                    color: vars.color.foreground,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.success,
                    color: vars.color.successForeground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.successHover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.successActive,
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
                    backgroundColor: vars.color.warningSubtle,
                    color: vars.color.foreground,
                },
                '&:active': {
                    backgroundColor: vars.color.warningSubtleHover,
                    color: vars.color.foreground,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.warning,
                    color: vars.color.warningForeground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.warningHover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.warningActive,
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
                    backgroundColor: vars.color.infoSubtle,
                    color: vars.color.foreground,
                },
                '&:active': {
                    backgroundColor: vars.color.infoSubtleHover,
                    color: vars.color.foreground,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.info,
                    color: vars.color.infoForeground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.infoHover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.infoActive,
                },
            },
        },
    },
] as const
