import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { BOTTOM_SHEET_ITEM_SHARED_STYLES } from '@components/overlay/bottom-sheet/components/_shared/BottomSheetItemSharedStyles.css.ts'

export const BOTTOM_SHEET_RADIO_ITEM_STYLES = {
    item: BOTTOM_SHEET_ITEM_SHARED_STYLES,
    root: style({
        selectors: {
            '&[data-checked]': {
                fontWeight: vars.fontWeight.medium,
            },
        },
    }),
    indicator: style({
        color: vars.color.primary.main,
    }),
}
