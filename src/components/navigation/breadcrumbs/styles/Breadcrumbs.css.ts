import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const BREADCRUMBS_STYLES = {
    list: style({
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: vars.space.xs,
        padding: 0,
        margin: 0,
        listStyle: 'none',
    }),
    item: style({
        display: 'inline-flex',
        alignItems: 'center',
        gap: vars.space.xs,
    }),
    current: style({
        color: vars.color.text,
    }),
    separator: style({
        color: vars.color.textSecondary,
        flexShrink: 0,
    }),
    separatorText: style({
        color: vars.color.textSecondary,
        flexShrink: 0,
    }),
}
