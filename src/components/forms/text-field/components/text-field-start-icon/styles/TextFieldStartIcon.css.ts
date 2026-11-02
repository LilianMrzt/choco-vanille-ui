import { vars } from '@theme'
import { style } from '@vanilla-extract/css'

export const TEXT_FIELD_START_ICON_STYLES = {
    root: style({
        position: 'absolute',
        left: vars.space.sm,
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: vars.color.surfaceMutedForeground,
    }),
}
