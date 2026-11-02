import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { TOAST_WIDTH } from '@components/feedback/toast/constants'

export const TOAST_STYLES = {
    recipe: recipe({
        base: {
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gridTemplateAreas: '"icon title close" "description description description"',
            alignItems: 'center',
            columnGap: vars.space.md,
            rowGap: 0,
            gap: vars.space.sm,
            width: '100%',
            maxWidth: TOAST_WIDTH,
            padding: vars.space.md,
            borderRadius: vars.radius.sm,
            border: `1px solid ${vars.color.border}`,
            backgroundColor: vars.color.card,
            color: vars.color.cardForeground,
        },
        variants: {
            variant: {
                info: {},
                success: {},
                warning: {},
                error: {},
            },
            actions: {
                true: {
                    gridTemplateAreas: '"icon title close" "description description description" "actions actions actions"',
                },
            },
        },
        defaultVariants: {
            variant: 'info',
        },
    }),
}
