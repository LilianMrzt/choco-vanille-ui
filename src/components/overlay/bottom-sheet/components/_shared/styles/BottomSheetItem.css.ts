import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Base style shared by the touch-friendly rows of a bottom sheet:
 * `BottomSheet.Item` and `BottomSheet.RadioItem`.
 */
export const BOTTOM_SHEET_ITEM_STYLES = {
    root: style({
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.md,
        width: '100%',
        minHeight: '3rem',
        margin: 0,
        paddingBlock: vars.space.sm,
        paddingInline: vars.space.md,
        border: 'none',
        borderRadius: vars.radius.lg,
        backgroundColor: 'transparent',
        color: vars.color.surfaceElevatedForeground,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.md,
        lineHeight: vars.lineHeight.normal,
        textAlign: 'start',
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        transition: `background-color ${vars.duration.fast} ${vars.easing.standard}`,
        selectors: {
            '&:not(:disabled):not([data-disabled]):hover': {
                backgroundColor: vars.color.surfaceMuted,
            },
            '&:not(:disabled):not([data-disabled]):active': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
            '&:focus-visible': {
                boxShadow: `inset 0 0 0 2px ${vars.color.focusRing}`,
            },
            '&:disabled, &[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),

    /** Modifier applied to destructive actions (e.g. "Log out", "Delete"). */
    destructive: style({
        color: vars.color.danger,
        selectors: {
            '&:not(:disabled):not([data-disabled]):active': {
                backgroundColor: vars.color.dangerSubtle,
                color: vars.color.dangerSubtleForeground,
            },
        },
    }),

    label: style({
        flex: '1 1 0%',
        minWidth: 0,
    }),

    /** Wrapper for leading / trailing icons; inherits the row color. */
    icon: style({
        display: 'inline-flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.25rem',
        height: '1.25rem',
        color: 'inherit',
    }),
}

globalStyle(`${BOTTOM_SHEET_ITEM_STYLES.icon} svg`, {
    width: '1.25rem',
    height: '1.25rem',
    pointerEvents: 'none',
})
