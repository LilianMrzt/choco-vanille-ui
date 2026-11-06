/** Logical axes and sides supported by Inset. */
export const INSET_SIDES = {
    all: 'all',
    block: 'block',
    inline: 'inline',
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
} as const

/** Background clipping modes supported by Inset. */
export const INSET_CLIPS = {
    borderBox: 'border-box',
    paddingBox: 'padding-box',
} as const
