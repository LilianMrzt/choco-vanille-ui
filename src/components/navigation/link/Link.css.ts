import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

const base = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space[4],
    color: vars.color.link.main,
    textDecoration: 'none',
    textUnderlineOffset: '0.15em',
    cursor: 'pointer',
    transition: `color ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&:hover:not([aria-disabled="true"])': {
            color: vars.color.link.hover,
            textDecoration: 'underline',
        },
        '&:active:not([aria-disabled="true"])': {
            color: vars.color.link.pressed,
            textDecoration: 'underline',
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
            borderRadius: vars.radius[4],
        },
        '&[aria-disabled="true"]': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
    },
})

const color = recipe({
    variants: {
        color: createColorVariants('color', {
            tertiary: vars.color.neutral.foreground,
        }),
    },
})

export const LINK_STYLES = {
    base,
    color,
}
