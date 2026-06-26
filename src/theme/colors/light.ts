import { palette } from '@theme/tokens/palette.ts'

/*
 * Light theme — semantic color tokens.
 * Docs => docs/docs/theme/tokens.md · docs/docs/theme/overview.md
 *
  *  Naming convention — every *interactive intent* (primary, secondary,
 *  success, warning, info, destructive) ships the SAME, fully-symmetric set
 *  so the API is predictable for both design and dev:
 *
 *    Solid family  (filled buttons, solid badges):
 *      {intent}                 => resting fill
 *      {intent}Hover            => fill on :hover
 *      {intent}Active           => fill on :active / pressed
 *      {intent}Foreground       => text/icon on the solid fill
 *
 *    Subtle family (ghost / outline / soft buttons, alerts, menu items):
 *      {intent}Subtle           => resting tinted surface
 *      {intent}SubtleHover      => tinted surface on :hover
 *      {intent}SubtleActive     => tinted surface on :active / pressed
 *      {intent}SubtleForeground => text/icon on the subtle surface
 *      {intent}SubtleBorder     => border that pairs with the subtle surface
 *
 *  Neutral surfaces, lines and highlight are listed separately.
 */
export const lightColors = {
    /* Base surfaces & text  */
    background: palette.neutral[50],
    foreground: palette.neutral[950],

    /* Elevated surfaces */
    card: palette.neutral[0],
    cardForeground: palette.neutral[950],
    popover: palette.neutral[0],
    popoverForeground: palette.neutral[950],

    /* Muted — quiet backgrounds & secondary text */
    muted: palette.neutral[100],
    mutedForeground: palette.neutral[600],

    /* Scrim behind modals / drawers */
    overlay: 'oklch(0 0 0 / 0.5)',

    /* Primary / brand  */
    primary: palette.brand[600],
    primaryHover: palette.brand[700],
    primaryActive: palette.brand[800],
    primaryForeground: palette.neutral[0],
    primarySubtle: palette.brand[50],
    primarySubtleHover: palette.brand[100],
    primarySubtleActive: palette.brand[200],
    primarySubtleForeground: palette.brand[700],
    primarySubtleBorder: palette.brand[200],

    /* Secondary (low-emphasis neutral intent)  */
    secondary: palette.neutral[200],
    secondaryHover: palette.neutral[300],
    secondaryActive: palette.neutral[400],
    secondaryForeground: palette.neutral[900],
    secondarySubtle: palette.neutral[100],
    secondarySubtleHover: palette.neutral[200],
    secondarySubtleActive: palette.neutral[300],
    secondarySubtleForeground: palette.neutral[900],
    secondarySubtleBorder: palette.neutral[200],

    /* Status: success  */
    success: palette.green[600],
    successHover: palette.green[700],
    successActive: palette.green[800],
    successForeground: palette.neutral[0],
    successSubtle: palette.green[50],
    successSubtleHover: palette.green[100],
    successSubtleActive: palette.green[200],
    successSubtleForeground: palette.green[800],
    successSubtleBorder: palette.green[200],

    /* Status: warning (bright amber + dark text for legibility)  */
    warning: palette.amber[500],
    warningHover: palette.amber[600],
    warningActive: palette.amber[700],
    warningForeground: palette.neutral[950],
    warningSubtle: palette.amber[50],
    warningSubtleHover: palette.amber[100],
    warningSubtleActive: palette.amber[200],
    warningSubtleForeground: palette.amber[800],
    warningSubtleBorder: palette.amber[200],

    /* Status: info �� */
    info: palette.blue[600],
    infoHover: palette.blue[700],
    infoActive: palette.blue[800],
    infoForeground: palette.neutral[0],
    infoSubtle: palette.blue[50],
    infoSubtleHover: palette.blue[100],
    infoSubtleActive: palette.blue[200],
    infoSubtleForeground: palette.blue[800],
    infoSubtleBorder: palette.blue[200],

    /* Status: destructive / danger  */
    destructive: palette.red[600],
    destructiveHover: palette.red[700],
    destructiveActive: palette.red[800],
    destructiveForeground: palette.neutral[0],
    destructiveSubtle: palette.red[50],
    destructiveSubtleHover: palette.red[100],
    destructiveSubtleActive: palette.red[200],
    destructiveSubtleForeground: palette.red[700],
    destructiveSubtleBorder: palette.red[200],

    /* Lines, fields & focus  */
    border: palette.neutral[200],
    borderStrong: palette.neutral[300],
    input: palette.neutral[300],
    ring: palette.brand[600],

    /* Highlight (Typography <mark>)  */
    highlight: palette.amber[200],
    highlightForeground: palette.amber[900],
} as const

export type LightColors = typeof lightColors
