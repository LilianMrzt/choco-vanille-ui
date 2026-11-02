import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/** Styles for the `Command.Input` search bar area. */
export const COMMAND_INPUT_STYLES = {
    /** Wrapper row containing the search icon and the text input. */
    wrapper: style({
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.sm,
        borderBottom: `1px solid ${vars.color.border}`,
        paddingInline: vars.space.lg,
        paddingBlock: vars.space.sm2,
        flexShrink: 0,
    }),

    /** Search icon slot — muted, non-interactive. */
    icon: style({
        flexShrink: 0,
        color: vars.color.surfaceMutedForeground,
    }),

    /** The `<input>` element itself. */
    input: style({
        flex: '1 1 0%',
        width: '100%',
        fontSize: vars.fontSize.sm,
        fontFamily: vars.fontFamily.sans,
        lineHeight: vars.lineHeight.normal,
        backgroundColor: 'transparent',
        color: vars.color.foreground,
        border: 'none',
        outline: 'none',

        selectors: {
            '&::placeholder': {
                color: vars.color.surfaceMutedForeground,
            },
        },
    }),
}
