import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const CALENDAR_DAY_BUTTON_STYLES = {
    day_button: style({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: vars.radius[4],
        border: 'none',
        backgroundColor: 'transparent',
        color: vars.color.text.primary,
        fontSize: vars.fontSize[14],
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
            `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&:hover:not(:disabled)': {
                backgroundColor: vars.color.surface.muted,
            },
            '&:active:not(:disabled)': {
                backgroundColor: vars.color.neutral.main,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
            },
            '&:disabled': {
                opacity: 0.4,
                cursor: 'not-allowed',
                pointerEvents: 'none',
            },
        },
    }),

    /** Modifier classes injected by react-day-picker as <td> class names — styled via globalStyle below */
    selected: style({}),
    today: style({}),
    outside: style({}),
    disabled: style({}),
    range_start: style({}),
    range_end: style({}),
    range_middle: style({}),
}

// Selected
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.selected} button`, {
    backgroundColor: vars.color.primary.main,
    color: vars.color.primary.foreground,
    fontWeight: vars.fontWeight.semibold,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.selected} button:hover:not(:disabled)`, {
    backgroundColor: vars.color.primary.hover,
    color: vars.color.primary.foreground,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.selected} button:active:not(:disabled)`, {
    backgroundColor: vars.color.primary.pressed,
    color: vars.color.primary.foreground,
})

// Today (unselected)
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.today}:not(${CALENDAR_DAY_BUTTON_STYLES.selected}) button`, {
    backgroundColor: vars.color.primary.subtle,
    color: vars.color.primary.subtleForeground,
    fontWeight: vars.fontWeight.semibold,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.today}:not(${CALENDAR_DAY_BUTTON_STYLES.selected}) button:hover:not(:disabled)`, {
    backgroundColor: vars.color.primary.subtleHover,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.today}:not(${CALENDAR_DAY_BUTTON_STYLES.selected}) button:active:not(:disabled)`, {
    backgroundColor: vars.color.primary.subtlePressed,
})

// Outside month
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.outside} button`, {
    color: vars.color.surface.mutedForeground,
    opacity: 0.5,
})

// Disabled
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.disabled} button`, {
    color: vars.color.surface.mutedForeground,
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
})

// Range start
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.range_start} button`, {
    backgroundColor: vars.color.primary.main,
    color: vars.color.primary.foreground,
    borderRadius: `${vars.radius[4]} 0 0 ${vars.radius[4]}`,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.range_start} button:hover:not(:disabled)`, {
    backgroundColor: vars.color.primary.hover,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.range_start} button:active:not(:disabled)`, {
    backgroundColor: vars.color.primary.pressed,
})

// Range end
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.range_end} button`, {
    backgroundColor: vars.color.primary.main,
    color: vars.color.primary.foreground,
    borderRadius: `0 ${vars.radius[4]} ${vars.radius[4]} 0`,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.range_end} button:hover:not(:disabled)`, {
    backgroundColor: vars.color.primary.hover,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.range_end} button:active:not(:disabled)`, {
    backgroundColor: vars.color.primary.pressed,
})

// Range middle
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.range_middle} button`, {
    backgroundColor: vars.color.primary.subtle,
    color: vars.color.primary.subtleForeground,
    borderRadius: 0,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.range_middle} button:hover:not(:disabled)`, {
    backgroundColor: vars.color.primary.subtleHover,
})
globalStyle(`${CALENDAR_DAY_BUTTON_STYLES.range_middle} button:active:not(:disabled)`, {
    backgroundColor: vars.color.primary.subtlePressed,
})
