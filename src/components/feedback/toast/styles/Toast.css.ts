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
            columnGap: vars.space[12],
            rowGap: 0,
            gap: vars.space[8],
            width: '100%',
            maxWidth: TOAST_WIDTH,
            padding: vars.space[12],
            borderRadius: vars.radius[6],
            border: `1px solid ${vars.color.border.main}`,
            backgroundColor: vars.color.surface.main,
            color: vars.color.surface.foreground,
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
