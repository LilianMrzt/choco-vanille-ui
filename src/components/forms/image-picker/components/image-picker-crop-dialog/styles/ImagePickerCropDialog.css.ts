import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const IMAGE_PICKER_CROP_DIALOG_STYLES = {
    viewport: style({
        position: 'relative',
        width: '100%',
        height: 'min(60vh, 28rem)',
        minHeight: '16rem',
        backgroundColor: vars.color.surface.muted,
    }),
    roundedCropArea: style({
        borderRadius: vars.radius.lg,
    }),
}
