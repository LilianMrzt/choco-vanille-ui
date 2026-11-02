import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'

export const BUTTON_STYLES = {
    recipe: recipe({
        base: {
            ...BUTTON_SHARED_STYLES.base,
            gap: vars.space.sm,
            whiteSpace: 'nowrap',
        },
        variants: {
            variant: BUTTON_SHARED_STYLES.variantVariants,
            color: BUTTON_SHARED_STYLES.colorVariants,
            size: {
                [BUTTON_SIZES.sm]: {
                    height: '2.25rem',
                    paddingInline: vars.space.md,
                },
                [BUTTON_SIZES.md]: {
                    height: '2.5rem',
                    paddingInline: vars.space.lg,
                },
                [BUTTON_SIZES.lg]: {
                    height: '2.75rem',
                    paddingInline: vars.space['2xl'],
                },
            },
        },
        compoundVariants: BUTTON_SHARED_STYLES.compoundVariants,
        defaultVariants: BUTTON_SHARED_STYLES.defaultVariants,
    }),
}
