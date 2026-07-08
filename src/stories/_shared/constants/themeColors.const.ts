import { lightColors } from '@theme/colors/index.ts'
import type { ThemeColor } from '@theme/types'

/**
 * Every semantic color token in the theme, suitable for Storybook `select`
 * controls. Derived from the theme's color tokens so it stays in sync
 * automatically. Includes `undefined` so the default/unspecified state is
 * selectable.
 */
export const THEME_COLORS: (ThemeColor | undefined)[] = [
    undefined,
    ...(Object.keys(lightColors) as ThemeColor[]),
]
