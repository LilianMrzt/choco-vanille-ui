import { style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const CALENDAR_ROOT_STYLES = {
    root: style({
        display: 'inline-block',
        padding: vars.space.lg,
        backgroundColor: vars.color.surface,
        borderRadius: vars.radius.lg,
        border: `1px solid ${vars.color.border}`,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.sm,
        color: vars.color.foreground,
    }),

    months: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space.lg,
    }),

    month: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space.md,
    }),

    calendarContent: style({
        width: '15.75rem',
        minHeight: '15.5rem',
    }),

    /** Hides the DayPicker-internal caption row since we render our own above. */
    hiddenCaption: style({
        display: 'none',
    }),
}
