import { recipe } from '@vanilla-extract/recipes'

import {
    AVATAR_SIZES,
    AVATAR_STATUS,
    AVATAR_STATUS_ARRAY,
} from '@components/data-display/avatar/constants'
import { vars } from '@theme/styles/contract/contract.css.ts'

const statusSizes = {
    sm: '0.5rem',
    md: '0.625rem',
    lg: '0.75rem',
    xl: '0.875rem',
} as const

const statusInset = {
    sm: '-0.125rem',
    md: '-0.125rem',
    lg: '-0.1875rem',
    xl: '-0.1875rem',
} as const

const statusColorMap = {
    [AVATAR_STATUS.online]: vars.color.success,
    [AVATAR_STATUS.offline]: vars.color.foregroundSubtle,
    [AVATAR_STATUS.busy]: vars.color.danger,
    [AVATAR_STATUS.away]: vars.color.warning,
} as const

export const AVATAR_STATUS_STYLES = {
    recipe: recipe({
        base: {
            position: 'absolute',
            borderRadius: vars.radius.full,
            border: `2px solid ${vars.color.background}`,
            pointerEvents: 'none',
        },

        variants: {
            size: {
                sm: {
                    width: statusSizes.sm,
                    height: statusSizes.sm,
                    right: statusInset.sm,
                    bottom: statusInset.sm,
                },
                md: {
                    width: statusSizes.md,
                    height: statusSizes.md,
                    right: statusInset.md,
                    bottom: statusInset.md,
                },
                lg: {
                    width: statusSizes.lg,
                    height: statusSizes.lg,
                    right: statusInset.lg,
                    bottom: statusInset.lg,
                },
                xl: {
                    width: statusSizes.xl,
                    height: statusSizes.xl,
                    right: statusInset.xl,
                    bottom: statusInset.xl,
                },
            },

            status: Object.fromEntries(
                AVATAR_STATUS_ARRAY.map((status) => [
                    status,
                    {
                        backgroundColor: statusColorMap[status],
                    },
                ]),
            ),
        },

        defaultVariants: {
            size: AVATAR_SIZES.md,
            status: AVATAR_STATUS.online,
        },
    }),
}
