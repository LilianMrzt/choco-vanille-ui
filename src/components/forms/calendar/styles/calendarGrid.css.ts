import { style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

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
        fontSize: vars.fontSize[12],
        fontWeight: vars.fontWeight.medium,
        color: vars.color.surface.mutedForeground,
        paddingBottom: vars.space[4],
    }),

    week: style({
        display: 'table-row',
    }),

    day: style({
        width: '2.25rem',
        height: '2.25rem',
        padding: '1px',
        textAlign: 'center',
    }),
}
