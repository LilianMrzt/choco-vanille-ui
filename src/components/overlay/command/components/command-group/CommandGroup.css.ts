import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/** Styles for `Command.Group` sections. */
export const COMMAND_GROUP_STYLES = {
    root: style({
        paddingBottom: vars.space[4],
    }),

    label: style({
        paddingInline: vars.space[8],
        paddingBlock: vars.space[6],
        fontSize: vars.fontSize[12],
        fontFamily: vars.fontFamily.sans,
        fontWeight: vars.fontWeight.medium,
        lineHeight: '1.5',
        color: vars.color.surface.mutedForeground,
        userSelect: 'none',
    }),
}
