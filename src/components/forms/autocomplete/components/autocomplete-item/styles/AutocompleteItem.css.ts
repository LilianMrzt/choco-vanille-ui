import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Individual selectable option — visually identical to SelectItem.
 */
export const AUTOCOMPLETE_ITEM_STYLES = {
    root: style({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: vars.space[8],
        borderRadius: vars.radius[4],
        paddingBlock: vars.space[6],
        paddingInline: vars.space[8],
        fontSize: vars.fontSize[14],
        lineHeight: '1.5',
        fontFamily: vars.fontFamily.sans,
        color: vars.color.surface.elevatedForeground,
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),

        selectors: {
            '&[data-highlighted]': {
                backgroundColor: vars.color.primary.subtle,
                color: vars.color.primary.subtleForeground,
            },
            // Only show the ring during keyboard navigation.
            '&:focus-visible': {
                outline: `2px solid ${vars.color.focusRing}`,
                outlineOffset: '-2px',
            },
            '&[data-highlighted]:active': {
                backgroundColor: vars.color.primary.subtlePressed,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),
}
