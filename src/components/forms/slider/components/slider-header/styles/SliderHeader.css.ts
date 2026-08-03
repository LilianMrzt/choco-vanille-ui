import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const SLIDER_HEADER_STYLES = {
    root: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: vars.space.sm,
    }),
    label: style({
        color: vars.color.foreground,
        fontSize: vars.fontSize.sm,
        fontWeight: vars.fontWeight.medium,
        userSelect: 'none',
    }),
    value: style({
        color: vars.color.mutedForeground,
        fontSize: vars.fontSize.sm,
        fontVariantNumeric: 'tabular-nums',
    }),
}
