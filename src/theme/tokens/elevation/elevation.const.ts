/*
 * Elevation / shadow tokens.
 *
 * Shadows are theme-dependent: on dark surfaces a soft translucent black reads
 * as muddy, so the dark ramp uses deeper, higher-opacity shadows to keep the
 * sense of elevation. Both ramps share the same keys.
 */

export const LIGHT_SHADOWS = {
    none: 'none',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const

export const DARK_SHADOWS: Record<keyof typeof LIGHT_SHADOWS, string> = {
    none: 'none',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.55), 0 4px 6px -4px rgb(0 0 0 / 0.55)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.6), 0 8px 10px -6px rgb(0 0 0 / 0.6)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.75)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)',
}

/*
 * Drop-shadow tokens — used with `filter: drop-shadow(…)`.
 *
 * Unlike `box-shadow`, `filter: drop-shadow` follows the painted shape of an
 * element and its children (e.g. a tooltip arrow SVG), so these tokens exist
 * specifically for components that render non-rectangular shapes. Each value is
 * a space-separated list of `drop-shadow()` functions usable directly as a CSS
 * `filter` property value. Two layers mimic the same depth feel as the
 * equivalent `box-shadow` ramp above.
 */

export const LIGHT_DROP_SHADOWS = {
    none: 'none',
    sm: 'drop-shadow(0 1px 3px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))',
    md: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.1)) drop-shadow(0 2px 4px rgb(0 0 0 / 0.1))',
    lg: 'drop-shadow(0 10px 15px rgb(0 0 0 / 0.1)) drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))',
    xl: 'drop-shadow(0 20px 25px rgb(0 0 0 / 0.1)) drop-shadow(0 8px 10px rgb(0 0 0 / 0.1))',
} as const

export const DARK_DROP_SHADOWS: Record<keyof typeof LIGHT_DROP_SHADOWS, string> = {
    none: 'none',
    sm: 'drop-shadow(0 1px 3px rgb(0 0 0 / 0.4)) drop-shadow(0 1px 2px rgb(0 0 0 / 0.4))',
    md: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.5)) drop-shadow(0 2px 4px rgb(0 0 0 / 0.5))',
    lg: 'drop-shadow(0 10px 15px rgb(0 0 0 / 0.55)) drop-shadow(0 4px 6px rgb(0 0 0 / 0.55))',
    xl: 'drop-shadow(0 20px 25px rgb(0 0 0 / 0.6)) drop-shadow(0 8px 10px rgb(0 0 0 / 0.6))',
}
