import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/** Styles for the `Command.List` results container. */
export const COMMAND_LIST_STYLES = {
    root: style({
        overflowY: 'auto',
        padding: vars.space.xs,
        flex: '1 1 0%',
        minHeight: 0,
    }),
}
