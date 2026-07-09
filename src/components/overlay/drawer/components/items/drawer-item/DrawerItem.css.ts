import { style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

const drawerItemRecipe = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.md,
        width: '100%',
        minWidth: 0,
        paddingInline: vars.space.md,
        paddingBlock: vars.space.sm,
        border: '1px solid transparent',
        borderRadius: vars.radius.md,
        backgroundColor: 'transparent',
        color: vars.color.text,
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
            '&:hover': {
                backgroundColor: vars.color.muted,
                color: vars.color.text,
            },
            '&:active': {
                backgroundColor: vars.color.secondarySubtleActive,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&[data-active="true"]': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
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
            '&[data-mode="mini"][data-state="closed"]': {
                opacity: 1,
                transform: 'translateX(0)',
                justifyContent: 'center',
                gap: 0,
                paddingInline: vars.space.sm,
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
    },
    defaultVariants: {
        size: 'md',
    },
})

const icon = style({
    flexShrink: 0,
    width: vars.fontSize.base,
    height: vars.fontSize.base,
    color: 'currentcolor',
})

const label = style({
    display: 'block',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    opacity: 1,
    transition: [
        `opacity ${vars.duration.normal} ${vars.easing.standard}`,
        `max-width ${vars.duration.normal} ${vars.easing.standard}`,
    ].join(', '),
    selectors: {
        '&[data-state="closed"]': {
            opacity: 0,
            maxWidth: 0,
        },
        '&[data-mode="mini"][data-state="closed"]': {
            opacity: 0,
            maxWidth: 0,
        },
    },
})

const endIcon = style({
    flexShrink: 0,
    width: vars.fontSize.base,
    height: vars.fontSize.base,
    color: 'currentcolor',
    transition: [
        `opacity ${vars.duration.normal} ${vars.easing.standard}`,
        `max-width ${vars.duration.normal} ${vars.easing.standard}`,
    ].join(', '),
    selectors: {
        '&[data-state="closed"]': {
            opacity: 0,
            maxWidth: 0,
        },
        '&[data-mode="mini"][data-state="closed"]': {
            opacity: 0,
            maxWidth: 0,
        },
    },
})

const sectionContent = style({
    display: 'grid',
    gridTemplateRows: '0fr',
    transition: `grid-template-rows ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&[data-state="open"]': {
            gridTemplateRows: '1fr',
        },
        '&[data-drawer-state="closed"]:not([data-mode="mini"])': {
            gridTemplateRows: '0fr',
        },
    },
})

const sectionChildren = style({
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space.xs,
    paddingLeft: vars.space.lg,
    paddingBlock: vars.space.xs,
})

const chevron = style({
    flexShrink: 0,
    width: vars.fontSize.base,
    height: vars.fontSize.base,
    color: 'currentcolor',
    transition: [
        `transform ${vars.duration.normal} ${vars.easing.standard}`,
        `opacity ${vars.duration.normal} ${vars.easing.standard}`,
        `max-width ${vars.duration.normal} ${vars.easing.standard}`,
    ].join(', '),
    selectors: {
        '&[data-expanded="true"]': {
            transform: 'rotate(180deg)',
        },
        '&[data-state="closed"]': {
            opacity: 0,
            maxWidth: 0,
        },
        '&[data-mode="mini"][data-state="closed"]': {
            opacity: 0,
            maxWidth: 0,
        },
    },
})

export const DRAWER_ITEM_STYLES = {
    recipe: drawerItemRecipe,
    icon,
    label,
    endIcon,
    sectionContent,
    sectionChildren,
    chevron,
}

export type DrawerItemRecipeVariants = NonNullable<
  RecipeVariants<typeof drawerItemRecipe>
>;
