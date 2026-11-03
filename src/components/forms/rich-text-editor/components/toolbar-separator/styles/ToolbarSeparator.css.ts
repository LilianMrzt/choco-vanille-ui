import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TOOLBAR_SEPARATOR_STYLES = {
    root: style({
        width: '1px',
        alignSelf: 'stretch',
        marginBlock: vars.space.xs,
        backgroundColor: vars.color.border.main,
    }),
}
