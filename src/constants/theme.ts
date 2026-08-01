/**
 * Namespace prefix used for all kit-global CSS classes, layers and data attributes.
 * Matches the design-system name (`@aurora-ds`) so every global selector is
 * self-describing and easy to grep/replace.
 */
export const PREFIX = 'aurora'

/** Class applied to an ancestor to opt a subtree into the light theme. */
export const THEME_LIGHT_CLASS = `${PREFIX}-theme-light`

/** Class applied to an ancestor to opt a subtree into the dark theme. */
export const THEME_DARK_CLASS = `${PREFIX}-theme-dark`

/** Attribute used while the provider is transitioning between color schemes. */
export const THEME_TRANSITION_ATTRIBUTE = 'data-theme-transition'

/** CSS variable carrying the active theme transition duration. */
export const THEME_TRANSITION_DURATION_VAR = `--${PREFIX}-theme-transition-duration`

/** CSS cascade layer that carries the design-token variables. */
export const THEME_LAYER = `${PREFIX}.theme`

/** CSS cascade layer that carries the kit's global reset / base styles. */
export const RESET_LAYER = `${PREFIX}.reset`
