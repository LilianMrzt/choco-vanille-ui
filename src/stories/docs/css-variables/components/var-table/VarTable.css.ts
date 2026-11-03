import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const table = style({
    width: '100%',
    borderCollapse: 'collapse',
    fontVariantNumeric: 'tabular-nums',
})

const caption = style({
    paddingBlock: vars.space.sm,
    textAlign: 'left',
    color: vars.color.text.secondary,
    fontSize: vars.fontSize.sm,
})

const th = style({
    textAlign: 'left',
    padding: `${vars.space.sm} ${vars.space.md}`,
    borderBottom: `2px solid ${vars.color.border.strong}`,
    whiteSpace: 'nowrap',
})

const td = style({
    padding: `${vars.space.xs} ${vars.space.md}`,
    borderBottom: `1px solid ${vars.color.border.main}`,
    verticalAlign: 'middle',
})

const swatch = style({
    width: 16,
    height: 16,
    borderRadius: vars.radius.xs,
    border: `1px solid ${vars.color.border.main}`,
    flexShrink: 0,
})

const valueText = style({
    overflowWrap: 'anywhere',
})

export const VAR_TABLE_STYLES = {
    table,
    caption,
    th,
    td,
    swatch,
    valueText,
}
