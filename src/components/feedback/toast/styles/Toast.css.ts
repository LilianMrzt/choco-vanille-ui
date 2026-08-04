import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { TOAST_WIDTH } from '@components/feedback/toast/constants'

export const TOAST_STYLES = {
    recipe: recipe({
        base: {
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gridTemplateAreas: '"icon title close" "description description description" "actions actions actions"',
            alignItems: 'center',
            columnGap: vars.space.md,
            rowGap: 0,
            width: '100%',
            maxWidth: TOAST_WIDTH,
            padding: vars.space.md,
            borderRadius: vars.radius.sm,
            backgroundColor: vars.color.card,
            color: vars.color.cardForeground,
            boxShadow: vars.shadow.sm,
        },
        variants: {
            variant: {
                info: {},
                success: {},
                warning: {},
                error: {},
            },
        },
        defaultVariants: {
            variant: 'info',
        },
    }),
}
