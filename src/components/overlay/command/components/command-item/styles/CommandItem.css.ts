import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/** Styles for individual `Command.Item` elements. */
export const COMMAND_ITEM_STYLES = {
    root: style({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.sm,
        borderRadius: vars.radius.xs,
        paddingBlock: vars.space.xs2,
        paddingInline: vars.space.sm,
        fontSize: vars.fontSize.sm,
        lineHeight: vars.lineHeight.normal,
        fontFamily: vars.fontFamily.sans,
        color: vars.color.popoverForeground,
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),

        selectors: {
            // display:flex on the root class would win the CSS cascade over the UA
            // stylesheet's [hidden]{display:none} in browsers that omit !important
            // (e.g. Firefox).  Declare display:none here as an author rule so the
            // higher specificity (class + attribute selector) reliably hides
            // filtered items on every browser.
            '&[hidden]': {
                display: 'none',
            },
            // Guard against disabled items receiving a highlight style in the
            // unlikely case they temporarily carry data-highlighted (consistent
            // with the DropdownMenu shared item convention).
            '&:not([data-disabled])[data-highlighted]': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
            '&:not([data-disabled])[data-highlighted]:active': {
                backgroundColor: vars.color.primarySubtleActive,
            },
            // Focus ring for the fallback case where an item receives direct DOM
            // focus (e.g. programmatic focus or a browser click that skips the
            // combobox). Items carry tabIndex={-1} so this ring is only visible
            // outside the normal keyboard-navigation path.
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),

    /** Leading/trailing icon wrapper — inherits item color automatically. */
    icon: style({
        flexShrink: 0,
        width: '1rem',
        height: '1rem',
        color: 'inherit',
        transition: `color ${vars.duration.fast} ${vars.easing.standard}`,
    }),

    /** Keyboard shortcut badge at the trailing edge. */
    shortcut: style({
        marginLeft: 'auto',
        fontSize: vars.fontSize.xs,
        fontFamily: vars.fontFamily.mono,
        letterSpacing: vars.letterSpacing.wide,
        color: vars.color.mutedForeground,
        backgroundColor: vars.color.muted,
        border: `1px solid ${vars.color.border}`,
        borderRadius: vars.radius.xs,
        paddingBlock: '0.0625rem',
        paddingInline: vars.space.xs,
        lineHeight: vars.lineHeight.normal,
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `border-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),

        selectors: {
            ':not([data-disabled])[data-highlighted] &': {
                backgroundColor: vars.color.primarySubtleHover,
                borderColor: vars.color.primary,
                color: vars.color.primarySubtleForeground,
                opacity: 0.85,
            },
            '[data-disabled] &': {
                opacity: 0.4,
            },
        },
    }),
}

globalStyle(`${COMMAND_ITEM_STYLES.icon} svg`, {
    width: '1rem',
    height: '1rem',
    pointerEvents: 'none',
})
