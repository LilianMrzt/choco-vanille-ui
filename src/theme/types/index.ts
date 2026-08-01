import type { LightColors } from '@theme/colors/index.ts'

/**
 * Any semantic color token key from the design-system theme.
 * Maps to `vars.color.<key>` at runtime.
 */
export type ThemeColor = keyof LightColors

/** Theme color tokens plus CSS color keywords supported by visual props. */
export type ThemeColorValue = ThemeColor | 'transparent'
