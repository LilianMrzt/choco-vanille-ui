import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const BREADCRUMBS_STYLES = {
    list: style({
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: vars.space[4],
        padding: 0,
        margin: 0,
        listStyle: 'none',
    }),
    item: style({
        display: 'inline-flex',
        alignItems: 'center',
        gap: vars.space[4],
    }),
    current: style({
        color: vars.color.text.primary,
    }),
    separator: style({
        color: vars.color.text.secondary,
        flexShrink: 0,
    }),
    separatorText: style({
        color: vars.color.text.secondary,
        flexShrink: 0,
    }),
}
