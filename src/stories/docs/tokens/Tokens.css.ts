import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const navigation = style({
    position: 'sticky',
    top: 0,
    zIndex: 1,
    marginBlock: `calc(${vars.space[8]} * -1)`,
    paddingBlock: vars.space[12],
    backgroundColor: vars.color.background,
    overflowX: 'auto',
    scrollbarWidth: 'thin',
})

const navigationLink = style({
    flexShrink: 0,
    padding: `${vars.space[8]} ${vars.space[12]}`,
    border: `1px solid ${vars.color.border.subtle}`,
    borderRadius: vars.radius.full,
    backgroundColor: vars.color.surface.main,
    color: vars.color.text.secondary,
    fontSize: vars.fontSize[12],
    fontWeight: vars.fontWeight.medium,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.primary.subtle,
            color: vars.color.primary.subtleForeground,
            borderColor: vars.color.primary.subtleBorder,
        },
        '&:focus-visible': {
            outline: `2px solid ${vars.color.focusRing}`,
            outlineOffset: '-2px',
        },
    },
})

const heading = style({
    scrollMarginTop: '5rem',
})

const count = style({
    flexShrink: 0,
    paddingTop: vars.space[4],
    whiteSpace: 'nowrap',
    fontVariantNumeric: 'tabular-nums',
})

const columns = style({
    display: 'none',
    '@media': {
        '(min-width: 48rem)': {
            display: 'grid',
            gridTemplateColumns: 'minmax(9.5rem, 1fr) minmax(0, 1.5fr) minmax(9rem, 1.5fr) 2rem',
            gap: vars.space[20],
            padding: `${vars.space[12]} ${vars.space[20]}`,
            borderBottom: `1px solid ${vars.color.border.subtle}`,
            borderRadius: `${vars.radius[14]} ${vars.radius[14]} 0 0`,
            backgroundColor: vars.color.surface.muted,
            color: vars.color.text.secondary,
            fontSize: vars.fontSize[12],
            fontWeight: vars.fontWeight.medium,
        },
    },
})

const list = style({
    listStyle: 'none',
})

export const TOKEN_REFERENCE_STYLES = {
    navigation,
    navigationLink,
    heading,
    count,
    columns,
    list,
}
