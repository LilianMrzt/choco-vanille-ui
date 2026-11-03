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
        gap: vars.space[12],
        width: '100%',
        minHeight: '3rem',
        margin: 0,
        paddingBlock: vars.space[8],
        paddingInline: vars.space[12],
        border: 'none',
        borderRadius: vars.radius[10],
        backgroundColor: 'transparent',
        color: vars.color.surface.elevatedForeground,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize[16],
        lineHeight: '1.5',
        textAlign: 'start',
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        transition: `background-color ${vars.duration.fast} ${vars.easing.standard}`,
        selectors: {
            '&:not(:disabled):not([data-disabled]):hover': {
                backgroundColor: vars.color.surface.muted,
            },
            '&:not(:disabled):not([data-disabled]):active': {
                backgroundColor: vars.color.primary.subtle,
                color: vars.color.primary.subtleForeground,
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
        color: vars.color.danger.main,
        selectors: {
            '&:not(:disabled):not([data-disabled]):active': {
                backgroundColor: vars.color.danger.subtle,
                color: vars.color.danger.subtleForeground,
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
