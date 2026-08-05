import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/** Styles for the `Command.Separator` divider. */
export const COMMAND_SEPARATOR_STYLES = {
    root: style({
        marginBlock: vars.space.xs,
        marginInline: `calc(${vars.space.xs} * -1)`,
        height: '1px',
        backgroundColor: vars.color.border,
        opacity: 0.7,
    }),
}
