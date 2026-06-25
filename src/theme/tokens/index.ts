import { lightColors, darkColors } from '@theme/colors/index.ts'
import { duration, easing } from '@theme/tokens/motion.ts'
import { radius } from '@theme/tokens/radii.ts'
import { lightShadows, darkShadows, lightDropShadows, darkDropShadows } from '@theme/tokens/shadows.ts'
import { space } from '@theme/tokens/spacing.ts'
import { fontFamily, fontSize, fontWeight, letterSpacing, lineHeight } from '@theme/tokens/typography.ts'
import { zIndex } from '@theme/tokens/zIndex.ts'

/*
 * Theme assembly — combines every token category into the two complete theme
 * objects consumed by `contract.css.ts`.
 *
 * Theme-dependent categories (color, shadow) provide a light & dark variant;
 * everything else is shared. Both themes MUST be structurally identical: this
 * shape is the single source of truth for the typed CSS-variable contract.
 */

/** Categories whose values are identical across themes. */
const sharedTokens = {
    space,
    radius,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    zIndex,
    duration,
    easing,
}

export const lightTheme = {
    color: lightColors,
    shadow: lightShadows,
    dropShadow: lightDropShadows,
    ...sharedTokens,
}

export const darkTheme = {
    color: darkColors,
    shadow: darkShadows,
    dropShadow: darkDropShadows,
    ...sharedTokens,
}

/** The canonical theme shape (light is the reference). */
export type Theme = typeof lightTheme

export { palette } from '@theme/tokens/palette.ts'
