import { style } from '@vanilla-extract/css'

import { HELPER_TEXT_STYLES } from '@components/forms/primitives/helper-text/HelperText.css.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const SLIDER_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space[4],
        color: vars.color.text.primary,
        selectors: {
            '&[data-disabled]': {
                opacity: 0.45,
            },
        },
    }),
    helper: HELPER_TEXT_STYLES.root,
    error: HELPER_TEXT_STYLES.error,
}
