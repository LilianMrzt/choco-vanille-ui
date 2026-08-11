import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/styles/Typography.css.ts'
import { style } from '@vanilla-extract/css'
import { vars } from '@theme/contract.css.ts'

export const FORM_LABEL_STYLES = {
    root: TYPOGRAPHY_STYLES.recipe({ variant: 'label' }),
    requiredIndicator: style({
        color: vars.color.destructive,
    }),
}
