import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const root = style({
    gridTemplateColumns: 'minmax(0, 1fr) 2rem',
    gridTemplateAreas: '"reference copy" "preview preview" "value value"',
    padding: vars.space[16],
    selectors: {
        '&:not(:last-child)': {
            borderBottom: `1px solid ${vars.color.border.subtle}`,
        },
    },
    '@media': {
        '(min-width: 48rem)': {
            gridTemplateColumns: 'minmax(9.5rem, 1fr) minmax(0, 1.5fr) minmax(9rem, 1.5fr) 2rem',
            gridTemplateAreas: '"reference preview value copy"',
            columnGap: vars.space[20],
            minHeight: '3.5rem',
            padding: `${vars.space[8]} ${vars.space[20]}`,
        },
    },
})

const reference = style({
    gridArea: 'reference',
    minWidth: 0,
    fontFamily: vars.fontFamily.mono,
    overflowWrap: 'anywhere',
})

const preview = style({
    gridArea: 'preview',
    minWidth: 0,
    paddingBlock: vars.space[4],
})

const value = style({
    gridArea: 'value',
    minWidth: 0,
    fontFamily: vars.fontFamily.mono,
    lineHeight: '1.6',
    overflowWrap: 'anywhere',
})

const copy = style({
    gridArea: 'copy',
    justifySelf: 'end',
})

const error = style({
    gridColumn: '1 / -1',
})

const status = style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
})

export const TOKEN_ITEM_STYLES = {
    root,
    reference,
    preview,
    value,
    copy,
    error,
    status,
}
