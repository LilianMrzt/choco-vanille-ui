import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { slideUpIn } from '@constants/animations'
import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'
import { FAB_POSITIONS } from '@components/actions/fab/constants'

const EDGE_OFFSET = vars.space.lg

// `&&` doubles the class specificity so the Fab wins over the composed
// Button / IconButton recipes regardless of stylesheet order.
export const FAB_STYLES = {
    recipe: recipe({
        base: {
            position: 'fixed',
            zIndex: vars.zIndex.sticky,
            bottom: `calc(${EDGE_OFFSET} + env(safe-area-inset-bottom, 0px))`,
            selectors: {
                '&&': {
                    borderRadius: vars.radius.lg,
                    boxShadow: vars.shadow.md,
                },
                '&&:focus-visible': {
                    boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}, ${vars.shadow.md}`,
                },
                '&&:active': {
                    boxShadow: vars.shadow.sm,
                },
            },
            '@media': {
                '(prefers-reduced-motion: no-preference)': {
                    animation: `${slideUpIn} ${vars.duration.slow} ${vars.easing.out} both`,
                },
            },
        },
        variants: {
            position: {
                [FAB_POSITIONS.bottomEnd]: {
                    insetInlineEnd: `calc(${EDGE_OFFSET} + env(safe-area-inset-right, 0px))`,
                },
                [FAB_POSITIONS.bottomStart]: {
                    insetInlineStart: `calc(${EDGE_OFFSET} + env(safe-area-inset-left, 0px))`,
                },
                // Centered without `transform` so the entrance animation stays intact.
                [FAB_POSITIONS.bottomCenter]: {
                    insetInline: 0,
                    marginInline: 'auto',
                    width: 'fit-content',
                },
            },
            size: {
                [BUTTON_SIZES.sm]: { selectors: { '&&': { height: '2.5rem', minWidth: '2.5rem' } } },
                [BUTTON_SIZES.md]: { selectors: { '&&': { height: '3rem', minWidth: '3rem' } } },
                [BUTTON_SIZES.lg]: { selectors: { '&&': { height: '3.5rem', minWidth: '3.5rem' } } },
            },
            extended: {
                true: {},
                false: { selectors: { '&&': { paddingInline: 0 } } },
            },
        },
        compoundVariants: [
            { variants: { extended: true, size: BUTTON_SIZES.sm }, style: { selectors: { '&&': { paddingInline: vars.space.md } } } },
            { variants: { extended: true, size: BUTTON_SIZES.md }, style: { selectors: { '&&': { paddingInline: vars.space.lg } } } },
            { variants: { extended: true, size: BUTTON_SIZES.lg }, style: { selectors: { '&&': { paddingInline: vars.space.xl } } } },
            { variants: { extended: false, size: BUTTON_SIZES.sm }, style: { selectors: { '&&': { width: '2.5rem' } } } },
            { variants: { extended: false, size: BUTTON_SIZES.md }, style: { selectors: { '&&': { width: '3rem' } } } },
            { variants: { extended: false, size: BUTTON_SIZES.lg }, style: { selectors: { '&&': { width: '3.5rem' } } } },
        ],
        defaultVariants: {
            position: FAB_POSITIONS.bottomEnd,
            size: BUTTON_SIZES.md,
            extended: false,
        },
    }),
}
