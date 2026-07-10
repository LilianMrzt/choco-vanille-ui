import { vars } from '@theme/contract.css.ts'
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
                    color: vars.color.text,
                },
                '&:active': {
                    backgroundColor: vars.color.primarySubtleHover,
                    color: vars.color.text,
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
                    color: vars.color.text,
                },
                '&:active': {
                    backgroundColor: vars.color.secondarySubtleHover,
                    color: vars.color.text,
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
                    backgroundColor: vars.color.tertiarySubtle,
                    color: vars.color.text,
                },
                '&:active': {
                    backgroundColor: vars.color.tertiarySubtleHover,
                    color: vars.color.text,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.tertiary,
                    color: vars.color.tertiaryForeground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.tertiaryHover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.tertiaryActive,
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
                    backgroundColor: vars.color.destructiveSubtle,
                    color: vars.color.text,
                },
                '&:active': {
                    backgroundColor: vars.color.destructiveSubtleHover,
                    color: vars.color.text,
                },
                '&[data-active="true"]': {
                    backgroundColor: vars.color.destructive,
                    color: vars.color.destructiveForeground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover': {
                    backgroundColor: vars.color.destructiveHover,
                },
                '&[data-active="true"]:active': {
                    backgroundColor: vars.color.destructiveActive,
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
                    color: vars.color.text,
                },
                '&:active': {
                    backgroundColor: vars.color.successSubtleHover,
                    color: vars.color.text,
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
                    color: vars.color.text,
                },
                '&:active': {
                    backgroundColor: vars.color.warningSubtleHover,
                    color: vars.color.text,
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
                    color: vars.color.text,
                },
                '&:active': {
                    backgroundColor: vars.color.infoSubtleHover,
                    color: vars.color.text,
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
