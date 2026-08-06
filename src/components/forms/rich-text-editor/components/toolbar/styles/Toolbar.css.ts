import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const TOOLBAR_STYLES = {
    root: style({
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0',
        padding: vars.space.xs,
        marginBottom: `calc(-1 * ${vars.space.xs})`,
        border: `1px solid ${vars.color.input}`,
        borderBottom: 'none',
        borderTopLeftRadius: vars.radius.sm,
        borderTopRightRadius: vars.radius.sm,
        backgroundColor: vars.color.card,
    }),
}
