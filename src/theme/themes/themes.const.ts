import { darkColors, darkEditorColors } from '@theme/tokens/colors/darkColors.const.ts'
import { lightColors, lightEditorColors } from '@theme/tokens/colors/lightColors.const.ts'
import { DURATION, EASING } from '@theme/tokens/motion/motion.const.ts'
import { RADIUS } from '@theme/tokens/radius/radius.const.ts'
import { DARK_DROP_SHADOWS, DARK_SHADOWS, LIGHT_DROP_SHADOWS, LIGHT_SHADOWS } from '@theme/tokens/elevation/elevation.const.ts'
import { SPACE } from '@theme/tokens/spacing/spacing.const.ts'
import { FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, LETTER_SPACING, LINE_HEIGHT } from '@theme/tokens/typography/typography.const.ts'
import { Z_INDEX } from '@theme/tokens/layering/zIndex.const.ts'
import type { Theme } from '@theme/themes/types/index.ts'

const sharedTokens = {
    space: SPACE,
    radius: RADIUS,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    fontWeight: FONT_WEIGHT,
    lineHeight: LINE_HEIGHT,
    letterSpacing: LETTER_SPACING,
    zIndex: Z_INDEX,
    duration: DURATION,
    easing: EASING,
}

/**
 * Complete built-in light theme, combining semantic UI colors, rich-text
 * palettes, shadows, and shared spacing, typography, radius, layering, and
 * motion tokens.
 *
 * Provides the initial `:root` values and the token structure used to generate
 * `vars`. This object contains raw values; use `vars` for theme-aware styles
 * and ThemeProvider to select the active theme and its scope.
 */
export const lightTheme = {
    color: lightColors,
    editorColors: lightEditorColors,
    shadow: LIGHT_SHADOWS,
    dropShadow: LIGHT_DROP_SHADOWS,
    ...sharedTokens,
}

/**
 * Complete built-in dark theme with the same token structure as `lightTheme`.
 * Colors, rich-text palettes, and shadows differ by mode; spacing, typography,
 * radius, layering, and motion tokens are shared.
 *
 * Supplies values for explicit dark scopes and automatic system dark mode.
 * Use ThemeProvider to select a scope's theme and `vars` for component styles;
 * reading this object alone does not switch the active theme.
 */
export const darkTheme = {
    color: darkColors,
    editorColors: darkEditorColors,
    shadow: DARK_SHADOWS,
    dropShadow: DARK_DROP_SHADOWS,
    ...sharedTokens,
} satisfies Theme
