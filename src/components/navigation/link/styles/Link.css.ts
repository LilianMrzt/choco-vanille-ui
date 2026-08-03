import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

export const LINK_STYLES = {
    base: style({
        display: 'inline-flex',
        alignItems: 'center',
        gap: vars.space.xs,
        color: vars.color.link,
        textDecoration: 'none',
        textUnderlineOffset: '0.15em',
        cursor: 'pointer',
        transition: `color ${vars.duration.normal} ${vars.easing.standard}`,
        selectors: {
            '&:hover': {
                color: vars.color.linkHover,
                textDecoration: 'underline',
            },
            '&:active': {
                color: vars.color.linkActive,
                textDecoration: 'underline',
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
                borderRadius: vars.radius.xs,
            },
            '&[aria-disabled="true"]': {
                pointerEvents: 'none',
                opacity: 0.5,
            },
        },
    }),
    color: recipe({
        variants: {
            color: createColorVariants('color', {
                tertiary: vars.color.tertiaryForeground,
            }),
        },
    }),
}
