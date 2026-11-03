import { lightColors } from '@theme/tokens/colors/lightColors.const.ts'
import type { ThemeColor } from '@theme/tokens/colors/types/index.ts'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'

/**
 * Every semantic color token in the theme, suitable for Storybook `select`
 * controls. Derived from the theme's color tokens so it stays in sync
 * automatically. Includes `undefined` so the default/unspecified state is
 * selectable.
 */
export const THEME_COLORS: (ThemeColor | undefined)[] = [
    undefined,
    ...getColorEntries(lightColors).map(([path]) => path),
]
