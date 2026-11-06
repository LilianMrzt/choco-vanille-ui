import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TOOLBAR_STYLES = {
    root: style({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
        padding: vars.space[4],
        marginBottom: `calc(-1 * ${vars.space[4]})`,
        border: `1px solid ${vars.color.border.main}`,
        borderBottom: 'none',
        borderTopLeftRadius: vars.radius[4],
        borderTopRightRadius: vars.radius[4],
        backgroundColor: vars.color.surface.main,
    }),
}
