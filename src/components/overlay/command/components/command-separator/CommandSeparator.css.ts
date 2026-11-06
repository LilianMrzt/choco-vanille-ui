import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/** Styles for the `Command.Separator` divider. */
export const COMMAND_SEPARATOR_STYLES = {
    root: style({
        marginBlock: vars.space[4],
        marginInline: `calc(${vars.space[4]} * -1)`,
        height: '1px',
        backgroundColor: vars.color.border.muted,
        opacity: 0.7,
    }),
}
