import type { LightColors } from '@theme/colors/index.ts'

/**
 * Any semantic color token key from the design-system theme.
 * Maps to `vars.color.<key>` at runtime.
 */
export type ThemeColor = keyof LightColors
