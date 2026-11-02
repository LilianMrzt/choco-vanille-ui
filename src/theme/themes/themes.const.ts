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

/** Complete light theme and source of token names for the theme contract. */
export const lightTheme = {
    color: lightColors,
    editorColors: lightEditorColors,
    shadow: LIGHT_SHADOWS,
    dropShadow: LIGHT_DROP_SHADOWS,
    ...sharedTokens,
}

/** Complete dark theme, with the same token structure as the light theme. */
export const darkTheme = {
    color: darkColors,
    editorColors: darkEditorColors,
    shadow: DARK_SHADOWS,
    dropShadow: DARK_DROP_SHADOWS,
    ...sharedTokens,
} satisfies Theme
