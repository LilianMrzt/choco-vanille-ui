import { style } from '@vanilla-extract/css'
import { vars } from '@theme/contract.css.ts'

export const TABS_LIST_STYLES = {
    root: style({
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.xs,
        borderBottom: `1px solid ${vars.color.border}`,
        width: '100%',
    }),
}
