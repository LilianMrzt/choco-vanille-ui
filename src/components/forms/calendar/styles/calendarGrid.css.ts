import { style } from '@vanilla-extract/css'
import { vars } from '@theme/contract.css.ts'

export const CALENDAR_GRID_STYLES = {
    month_grid: style({
        width: '100%',
        borderCollapse: 'collapse',
    }),

    weekdays: style({
        display: 'table-row',
    }),

    weekday: style({
        width: '2.25rem',
        height: '2rem',
        textAlign: 'center',
        fontSize: vars.fontSize.xs,
        fontWeight: vars.fontWeight.medium,
        color: vars.color.mutedForeground,
        paddingBottom: vars.space.xs,
    }),

    week: style({
        display: 'table-row',
    }),

    day: style({
        padding: '1px',
        textAlign: 'center',
    }),
}
