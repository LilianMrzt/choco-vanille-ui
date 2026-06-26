import { style } from '@vanilla-extract/css'
import { vars } from '@theme/contract.css.ts'

/**
 * RadioGroup.Root — vertical stack of radio items by default.
 * Use `orientation="horizontal"` for a row layout.
 */
export const radioGroupRootClass = style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space.sm,
})
