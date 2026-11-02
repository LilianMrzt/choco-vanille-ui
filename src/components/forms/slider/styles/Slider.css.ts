import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const SLIDER_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space.xs,
        color: vars.color.foreground,
        selectors: {
            '&[data-disabled]': {
                opacity: 0.45,
            },
        },
    }),
    helper: style({
        color: vars.color.mutedForeground,
        fontSize: vars.fontSize.xs,
    }),
    error: style({
        color: vars.color.destructive,
        fontSize: vars.fontSize.xs,
    }),
}
