import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { DRAWER_ITEM_COLORS } from '@components/overlay/drawer/components/items/_shared/constants/DrawerItem.constants.ts'

const drawerItemRecipe = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.md,
        width: '100%',
        minWidth: 0,
        paddingInline: vars.space.md,
        paddingBlock: vars.space.sm,
        height: 40,
        border: '1px solid transparent',
        borderRadius: vars.radius.md,
        backgroundColor: 'transparent',
        color: vars.color.textSecondary,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.sm,
        fontWeight: vars.fontWeight.medium,
        lineHeight: vars.lineHeight.tight,
        textAlign: 'left',
        textDecoration: 'none',
        cursor: 'pointer',
        transform: 'translateX(0)',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
            `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
            `opacity ${vars.duration.normal} ${vars.easing.standard}`,
            `transform ${vars.duration.normal} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&[aria-disabled="true"], &:disabled': {
                pointerEvents: 'none',
                opacity: 0.5,
            },
            '&[data-state="closed"]': {
                opacity: 0,
                transform: 'translateX(-0.5rem)',
            },
            '&[data-state="closed"][data-position="right"]': {
                transform: 'translateX(0.5rem)',
            },
        },
    },
    variants: {
        size: {
            sm: {
                paddingInline: vars.space.sm,
                paddingBlock: vars.space.xs,
                gap: vars.space.sm,
                fontSize: vars.fontSize.xs,
            },
            md: {},
            lg: {
                paddingInline: vars.space.lg,
                paddingBlock: vars.space.md,
                gap: vars.space.lg,
                fontSize: vars.fontSize.base,
            },
        },
        variant: {
            default: {},
            outlined: {},
        },
        color: {
            [DRAWER_ITEM_COLORS.primary]: {},
            [DRAWER_ITEM_COLORS.secondary]: {},
            [DRAWER_ITEM_COLORS.tertiary]: {},
            [DRAWER_ITEM_COLORS.destructive]: {},
            [DRAWER_ITEM_COLORS.success]: {},
            [DRAWER_ITEM_COLORS.warning]: {},
            [DRAWER_ITEM_COLORS.info]: {},
        },
    },
    compoundVariants: [
        // Default variant — subtle hover/active and solid active state per color
        {
            variants: { variant: 'default', color: DRAWER_ITEM_COLORS.primary },
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
            variants: { variant: 'default', color: DRAWER_ITEM_COLORS.secondary },
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
            variants: { variant: 'default', color: DRAWER_ITEM_COLORS.tertiary },
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
            variants: { variant: 'default', color: DRAWER_ITEM_COLORS.destructive },
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
            variants: { variant: 'default', color: DRAWER_ITEM_COLORS.success },
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
            variants: { variant: 'default', color: DRAWER_ITEM_COLORS.warning },
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
            variants: { variant: 'default', color: DRAWER_ITEM_COLORS.info },
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
        // Outlined variant — neutral active state, color-tinted hover/active
        {
            variants: { variant: 'outlined', color: DRAWER_ITEM_COLORS.primary },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.primarySubtle,
                    },
                    '&:active': {
                        backgroundColor: vars.color.primarySubtleHover,
                    },
                    '&[data-active="true"]': {
                        backgroundColor: vars.color.card,
                        color: vars.color.text,
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
            variants: { variant: 'outlined', color: DRAWER_ITEM_COLORS.secondary },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.secondarySubtle,
                    },
                    '&:active': {
                        backgroundColor: vars.color.secondarySubtleHover,
                    },
                    '&[data-active="true"]': {
                        backgroundColor: vars.color.card,
                        color: vars.color.text,
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
            variants: { variant: 'outlined', color: DRAWER_ITEM_COLORS.tertiary },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.tertiarySubtle,
                    },
                    '&:active': {
                        backgroundColor: vars.color.tertiarySubtleHover,
                    },
                    '&[data-active="true"]': {
                        backgroundColor: vars.color.card,
                        color: vars.color.text,
                        borderColor: vars.color.border,
                    },
                    '&[data-active="true"]:hover': {
                        backgroundColor: vars.color.tertiarySubtle,
                    },
                    '&[data-active="true"]:active': {
                        backgroundColor: vars.color.tertiarySubtleHover,
                    },
                },
            },
        },
        {
            variants: { variant: 'outlined', color: DRAWER_ITEM_COLORS.destructive },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.destructiveSubtle,
                    },
                    '&:active': {
                        backgroundColor: vars.color.destructiveSubtleHover,
                    },
                    '&[data-active="true"]': {
                        backgroundColor: vars.color.card,
                        color: vars.color.text,
                        borderColor: vars.color.border,
                    },
                    '&[data-active="true"]:hover': {
                        backgroundColor: vars.color.destructiveSubtle,
                    },
                    '&[data-active="true"]:active': {
                        backgroundColor: vars.color.destructiveSubtleHover,
                    },
                },
            },
        },
        {
            variants: { variant: 'outlined', color: DRAWER_ITEM_COLORS.success },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.successSubtle,
                    },
                    '&:active': {
                        backgroundColor: vars.color.successSubtleHover,
                    },
                    '&[data-active="true"]': {
                        backgroundColor: vars.color.card,
                        color: vars.color.text,
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
            variants: { variant: 'outlined', color: DRAWER_ITEM_COLORS.warning },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.warningSubtle,
                    },
                    '&:active': {
                        backgroundColor: vars.color.warningSubtleHover,
                    },
                    '&[data-active="true"]': {
                        backgroundColor: vars.color.card,
                        color: vars.color.text,
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
            variants: { variant: 'outlined', color: DRAWER_ITEM_COLORS.info },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.infoSubtle,
                    },
                    '&:active': {
                        backgroundColor: vars.color.infoSubtleHover,
                    },
                    '&[data-active="true"]': {
                        backgroundColor: vars.color.card,
                        color: vars.color.text,
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
    ],
    defaultVariants: {
        size: 'md',
        variant: 'default',
        color: DRAWER_ITEM_COLORS.primary,
    },
})

export const DRAWER_ITEM_STYLES = {
    recipe: drawerItemRecipe,
}

export type DrawerItemRecipeVariants = NonNullable<
  RecipeVariants<typeof drawerItemRecipe>
>;
