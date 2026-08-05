import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const EDITOR_TOOLBAR_STYLES = {
    root: style({
        display: 'flex',
        flexWrap: 'wrap',
        gap: vars.space.xs,
        padding: vars.space.xs,
        border: `1px solid ${vars.color.input}`,
        borderBottom: 'none',
        borderTopLeftRadius: vars.radius.sm,
        borderTopRightRadius: vars.radius.sm,
        backgroundColor: vars.color.muted,
    }),
}
