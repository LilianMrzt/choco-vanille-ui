import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/** Styles for the `Command.Input` search bar area. */
export const COMMAND_INPUT_STYLES = {
    /** Wrapper row containing the search icon and the text input. */
    wrapper: style({
        display: 'flex',
        alignItems: 'center',
        gap: vars.space[8],
        borderBottom: `1px solid ${vars.color.border.main}`,
        paddingInline: vars.space[16],
        paddingBlock: vars.space[10],
        flexShrink: 0,
    }),

    /** Search icon slot — muted, non-interactive. */
    icon: style({
        flexShrink: 0,
        color: vars.color.surface.mutedForeground,
    }),

    /** The `<input>` element itself. */
    input: style({
        flex: '1 1 0%',
        width: '100%',
        fontSize: vars.fontSize[14],
        fontFamily: vars.fontFamily.sans,
        lineHeight: '1.5',
        backgroundColor: 'transparent',
        color: vars.color.text.primary,
        border: 'none',
        outline: 'none',

        selectors: {
            '&::placeholder': {
                color: vars.color.surface.mutedForeground,
            },
        },
    }),
}
