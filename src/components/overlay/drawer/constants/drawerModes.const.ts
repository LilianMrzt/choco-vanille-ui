/**
 * Available render modes for the `Drawer` component.
 */
export const DRAWER_MODES = {
    portal: 'portal',
    inline: 'inline',
    mini: 'mini',
} as const

export const DRAWER_MODES_ARRAY = Object.values(DRAWER_MODES)
