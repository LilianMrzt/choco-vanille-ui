import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const table = style({
    width: '100%',
    borderCollapse: 'collapse',
})

export const th = style({
    textAlign: 'left',
    padding: `${vars.space.sm} ${vars.space.md}`,
    borderBottom: `2px solid ${vars.color.borderStrong}`,
    whiteSpace: 'nowrap',
})

export const td = style({
    padding: `${vars.space.xs} ${vars.space.md}`,
    borderBottom: `1px solid ${vars.color.border}`,
    verticalAlign: 'middle',
})

export const swatch = style({
    width: 16,
    height: 16,
    borderRadius: vars.radius.xs,
    border: '1px solid rgb(0 0 0 / 0.08)',
    flexShrink: 0,
})

export const valueText = style({
    maxWidth: 340,
})
