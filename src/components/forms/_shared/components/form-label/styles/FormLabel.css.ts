import { style } from '@vanilla-extract/css'

import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/Typography.css.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const FORM_LABEL_STYLES = {
    root: TYPOGRAPHY_STYLES.recipe({ variant: 'label' }),
    requiredIndicator: style({
        color: vars.color.danger.main,
    }),
}
