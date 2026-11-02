import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Message shown when the autocomplete has no matching items.
 */
export const AUTOCOMPLETE_EMPTY_STYLES = {
    root: style({
        paddingBlock: vars.space.sm,
        paddingInline: vars.space.md,
        fontSize: vars.fontSize.sm,
        lineHeight: vars.lineHeight.normal,
        fontFamily: vars.fontFamily.sans,
        color: vars.color.textSecondary,
    }),
}
