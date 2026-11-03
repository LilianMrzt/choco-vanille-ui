import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Message shown when the autocomplete has no matching items.
 */
export const AUTOCOMPLETE_EMPTY_STYLES = {
    root: style({
        paddingBlock: vars.space[8],
        paddingInline: vars.space[12],
        fontSize: vars.fontSize[14],
        lineHeight: '1.5',
        fontFamily: vars.fontFamily.sans,
        color: vars.color.text.secondary,
    }),
}
