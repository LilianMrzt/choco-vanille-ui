import { style, keyframes, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

//  Animations

const fadeIn = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
})

const fadeOut = keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
})

const slideDownIn = keyframes({
    from: { opacity: 0, transform: 'translateY(-6px) scale(0.97)' },
    to: { opacity: 1, transform: 'translateY(0) scale(1)' },
})

const slideDownOut = keyframes({
    from: { opacity: 1, transform: 'translateY(0) scale(1)' },
    to: { opacity: 0, transform: 'translateY(-6px) scale(0.97)' },
})

const slideUpIn = keyframes({
    from: { opacity: 0, transform: 'translateY(6px) scale(0.97)' },
    to: { opacity: 1, transform: 'translateY(0) scale(1)' },
})

const slideUpOut = keyframes({
    from: { opacity: 1, transform: 'translateY(0) scale(1)' },
    to: { opacity: 0, transform: 'translateY(6px) scale(0.97)' },
})

const slideRightIn = keyframes({
    from: { opacity: 0, transform: 'translateX(-6px) scale(0.97)' },
    to: { opacity: 1, transform: 'translateX(0) scale(1)' },
})

const slideRightOut = keyframes({
    from: { opacity: 1, transform: 'translateX(0) scale(1)' },
    to: { opacity: 0, transform: 'translateX(-6px) scale(0.97)' },
})

const slideLeftIn = keyframes({
    from: { opacity: 0, transform: 'translateX(6px) scale(0.97)' },
    to: { opacity: 1, transform: 'translateX(0) scale(1)' },
})

const slideLeftOut = keyframes({
    from: { opacity: 1, transform: 'translateX(0) scale(1)' },
    to: { opacity: 0, transform: 'translateX(6px) scale(0.97)' },
})

//  Content

export const dropdownMenuContentClass = style({
    zIndex: vars.zIndex.dropdown,
    minWidth: '10rem',
    overflow: 'hidden',
    borderRadius: vars.radius.lg,
    border: `1px solid ${vars.color.border}`,
    backgroundColor: vars.color.popover,
    color: vars.color.popoverForeground,
    padding: vars.space.xs,
    transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
    filter: vars.dropShadow.sm,

    selectors: {
        // bottom → slides down from above
        '&[data-state="open"][data-side="bottom"]': {
            animation: `${slideDownIn} 0.18s ${vars.easing.standard}`,
        },
        '&[data-state="closed"][data-side="bottom"]': {
            animation: `${slideDownOut} 0.14s ${vars.easing.standard}`,
        },
        // top → slides up from below
        '&[data-state="open"][data-side="top"]': {
            animation: `${slideUpIn} 0.18s ${vars.easing.standard}`,
        },
        '&[data-state="closed"][data-side="top"]': {
            animation: `${slideUpOut} 0.14s ${vars.easing.standard}`,
        },
        // right → slides from left
        '&[data-state="open"][data-side="right"]': {
            animation: `${slideRightIn} 0.18s ${vars.easing.standard}`,
        },
        '&[data-state="closed"][data-side="right"]': {
            animation: `${slideRightOut} 0.14s ${vars.easing.standard}`,
        },
        // left → slides from right
        '&[data-state="open"][data-side="left"]': {
            animation: `${slideLeftIn} 0.18s ${vars.easing.standard}`,
        },
        '&[data-state="closed"][data-side="left"]': {
            animation: `${slideLeftOut} 0.14s ${vars.easing.standard}`,
        },
    },
})

//  Sub Content

export const dropdownMenuSubContentClass = style([
    dropdownMenuContentClass,
    {
        transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
        selectors: {
            '&[data-state="open"]': {
                animation: `${fadeIn} 0.15s ${vars.easing.standard}`,
            },
            '&[data-state="closed"]': {
                animation: `${fadeOut} 0.12s ${vars.easing.standard}`,
            },
        },
    },
])

//  Item (shared base)

export const dropdownMenuItemClass = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: vars.space.sm,
    borderRadius: vars.radius.sm,
    paddingBlock: vars.space.xs2,
    paddingInline: vars.space.sm,
    fontSize: vars.fontSize.sm,
    lineHeight: vars.lineHeight.normal,
    fontFamily: vars.fontFamily.sans,
    color: vars.color.popoverForeground,
    cursor: 'default',
    userSelect: 'none',
    outline: 'none',
    transition: `background-color ${vars.duration.fast} ${vars.easing.standard}`,

    selectors: {
        '&[data-highlighted]': {
            backgroundColor: vars.color.accent,
            color: vars.color.accentForeground,
        },
        '&[data-disabled]': {
            pointerEvents: 'none',
            opacity: 0.45,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
        },
    },
})

//  Destructive item

export const dropdownMenuItemDestructiveClass = style({
    color: vars.color.destructive,
    selectors: {
        '&[data-highlighted]': {
            backgroundColor: vars.color.destructiveSubtle,
            color: vars.color.destructive,
        },
    },
})

//  Item icon wrapper

export const dropdownMenuItemIconClass = style({
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

globalStyle(`${dropdownMenuItemIconClass} svg`, {
    width: '1rem',
    height: '1rem',
    pointerEvents: 'none',
})

//  Indicator slot (checkbox / radio left padding)

export const dropdownMenuIndicatorItemClass = style({
    paddingLeft: vars.space.xl,
})

export const dropdownMenuItemIndicatorClass = style({
    position: 'absolute',
    left: vars.space.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '0.875rem',
    height: '0.875rem',
})

globalStyle(`${dropdownMenuItemIndicatorClass} svg`, {
    width: '0.875rem',
    height: '0.875rem',
})

//  Sub Trigger

export const dropdownMenuSubTriggerClass = style([
    dropdownMenuItemClass,
    {
        selectors: {
            '&[data-state="open"]': {
                backgroundColor: vars.color.accent,
            },
        },
    },
])

export const dropdownMenuSubTriggerChevronClass = style({
    marginLeft: 'auto',
    width: '1rem',
    height: '1rem',
    flexShrink: 0,
    opacity: 0.6,
})

globalStyle(`${dropdownMenuSubTriggerChevronClass} svg`, {
    width: '1rem',
    height: '1rem',
    pointerEvents: 'none',
})

//  Label

export const dropdownMenuLabelClass = style({
    paddingBlock: vars.space.xs2,
    paddingInline: vars.space.sm,
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.semibold,
    fontFamily: vars.fontFamily.sans,
    color: vars.color.mutedForeground,
    letterSpacing: vars.letterSpacing.wide,
    textTransform: 'uppercase',
})

//  Separator

export const dropdownMenuSeparatorClass = style({
    marginBlock: vars.space.xs,
    marginInline: `calc(${vars.space.sm} * -1)`,
    height: '1px',
    backgroundColor: vars.color.border,
})

//  Shortcut

export const dropdownMenuShortcutClass = style({
    marginLeft: 'auto',
    fontSize: vars.fontSize.xs,
    fontFamily: vars.fontFamily.sans,
    letterSpacing: vars.letterSpacing.wide,
    color: vars.color.mutedForeground,
    opacity: 0.75,
})
