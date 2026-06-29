import { vars } from '@theme'
import { style } from '@vanilla-extract/css'

export const textFieldStartIconClass = style({
    position: 'absolute',
    left: vars.space.sm,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.mutedForeground,
})
