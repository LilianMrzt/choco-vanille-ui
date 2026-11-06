import { style } from '@vanilla-extract/css'

import { BOTTOM_SHEET_STYLES } from '@components/overlay/bottom-sheet/BottomSheet.css.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const BOTTOM_SHEET_CLOSE_STYLES = {
    root: style({
        flexShrink: 0,
        selectors: {
            // Separates a footer close action from the rows above it, without
            // affecting a close button placed elsewhere (e.g. in the header).
            [`${BOTTOM_SHEET_STYLES.content} > &:not(:first-child)`]: {
                marginTop: vars.space[12],
            },
        },
    }),
}
