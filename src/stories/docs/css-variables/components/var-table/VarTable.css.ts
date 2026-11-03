import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const table = style({
    width: '100%',
    borderCollapse: 'collapse',
    fontVariantNumeric: 'tabular-nums',
})

const caption = style({
    paddingBlock: vars.space[8],
    textAlign: 'left',
    color: vars.color.text.secondary,
    fontSize: vars.fontSize[14],
})

const th = style({
    textAlign: 'left',
    padding: `${vars.space[8]} ${vars.space[12]}`,
    borderBottom: `2px solid ${vars.color.border.strong}`,
    whiteSpace: 'nowrap',
})

const td = style({
    padding: `${vars.space[4]} ${vars.space[12]}`,
    borderBottom: `1px solid ${vars.color.border.main}`,
    verticalAlign: 'middle',
})

const swatch = style({
    width: 16,
    height: 16,
    borderRadius: vars.radius[4],
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
