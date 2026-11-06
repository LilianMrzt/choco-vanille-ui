import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { COMMAND_LIST_STYLES } from '@components/overlay/command/components/command-list/CommandList.css.ts'

/**
 * Styles for `Command.Empty`.
 *
 * The empty state is hidden by default and revealed via CSS `:has()` when the
 * list contains no visible options, eliminating the need for JavaScript-managed
 * visible-count state.
 */
export const COMMAND_EMPTY_STYLES = {
    root: style({
        display: 'none',
        padding: vars.space[16],
        textAlign: 'center',
        fontSize: vars.fontSize[14],
        fontFamily: vars.fontFamily.sans,
        color: vars.color.surface.mutedForeground,

        selectors: {
            // Show when the list has no visible (non-hidden, non-disabled) options.
            [`${COMMAND_LIST_STYLES.root}:not(:has([role="option"]:not([hidden]))) &`]: {
                display: 'block',
            },
        },
    }),
}
