import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Keyboard shortcut badge rendered at the trailing edge of an item.
 * Styled as a subtle <kbd> element — monospace, bordered, muted.
 * Adapts to highlighted and disabled states via ancestor selectors.
 */
export const dropdownMenuShortcutClass = style({
    marginLeft: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: vars.fontSize.xs,
    fontFamily: vars.fontFamily.mono,
    letterSpacing: vars.letterSpacing.wide,
    color: vars.color.mutedForeground,
    backgroundColor: vars.color.muted,
    border: `1px solid ${vars.color.border}`,
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
        '[data-highlighted] &': {
            backgroundColor: vars.color.primarySubtleHover,
            borderColor: vars.color.primary,
            color: vars.color.primarySubtleForeground,
            opacity: 0.85,
        },
        '[data-disabled] &': {
            opacity: 0.4,
        },
    },
})
