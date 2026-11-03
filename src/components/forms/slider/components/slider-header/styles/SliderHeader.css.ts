import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const SLIDER_HEADER_STYLES = {
    root: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: vars.space[8],
    }),
    label: style({
        color: vars.color.text.primary,
        fontSize: vars.fontSize[14],
        fontWeight: vars.fontWeight.medium,
    }),
    value: style({
        color: vars.color.surface.mutedForeground,
        fontSize: vars.fontSize[14],
        fontVariantNumeric: 'tabular-nums',
    }),
}
