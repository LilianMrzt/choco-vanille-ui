import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/** Styles for `Command.Group` sections. */
export const COMMAND_GROUP_STYLES = {
    root: style({
        paddingBottom: vars.space.xs,
    }),

    label: style({
        paddingInline: vars.space.sm,
        paddingBlock: vars.space.xs2,
        fontSize: vars.fontSize.xs,
        fontFamily: vars.fontFamily.sans,
        fontWeight: vars.fontWeight.medium,
        lineHeight: vars.lineHeight.normal,
        color: vars.color.surfaceMutedForeground,
        userSelect: 'none',
    }),
}
