import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const list = style({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: vars.space[4],
    padding: 0,
    margin: 0,
    listStyle: 'none',
})

const item = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space[4],
})

const current = style({
    color: vars.color.text.primary,
})

const separator = style({
    color: vars.color.text.secondary,
    flexShrink: 0,
})

const separatorText = style({
    color: vars.color.text.secondary,
    flexShrink: 0,
})

export const BREADCRUMBS_STYLES = {
    list,
    item,
    current,
    separator,
    separatorText,
}
