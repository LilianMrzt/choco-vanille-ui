import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const list = style({
    padding: 0,
    margin: 0,
    listStyle: 'none',
})

const ellipsis = style({
    minWidth: '2.25rem',
    height: '2.25rem',
    color: vars.color.text.secondary,
})

export const PAGINATION_STYLES = {
    list,
    ellipsis,
}
