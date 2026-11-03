import { vars } from '@theme'
import { style } from '@vanilla-extract/css'

export const TEXT_AREA_START_ICON_STYLES = {
    root: style({
        position: 'absolute',
        left: vars.space.sm,
        top: vars.space.md,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: vars.color.surface.mutedForeground,
    }),
}
