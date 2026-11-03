import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Keyboard shortcut badge rendered at the trailing edge of an item.
 * Styled as a subtle <kbd> element — monospace, bordered, muted.
 * Adapts to highlighted and disabled states via ancestor selectors.
 */
export const DROPDOWN_MENU_SHORTCUT_STYLES = {
    root: style({
        marginLeft: 'auto',
        fontSize: vars.fontSize.xs,
        fontFamily: vars.fontFamily.mono,
        letterSpacing: vars.letterSpacing.wide,
        color: vars.color.surface.mutedForeground,
        backgroundColor: vars.color.surface.muted,
        border: `1px solid ${vars.color.border.main}`,
        borderRadius: vars.radius.xs,
        paddingBlock: '0.0625rem',
        paddingInline: vars.space.xs,
        lineHeight: vars.lineHeight.normal,
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `border-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),

        selectors: {
            ':not([data-disabled])[data-highlighted] &': {
                backgroundColor: vars.color.primary.subtleHover,
                borderColor: vars.color.primary.main,
                color: vars.color.primary.subtleForeground,
                opacity: 0.85,
            },
            '[data-disabled] &': {
                opacity: 0.4,
            },
        },
    }),
}
