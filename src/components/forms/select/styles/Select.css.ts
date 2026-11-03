import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Shared visual slots for the Select compound component.
 *
 * Per-subcomponent styles (trigger, content, item, label, separator) live in
 * their own folders to match the library's organization. This file only keeps
 * the placeholder color utility.
 */
export const SELECT_STYLES = {
    /** Placeholder text — muted like an input placeholder. */
    placeholder: style({
        color: vars.color.surface.mutedForeground,
    }),
}
