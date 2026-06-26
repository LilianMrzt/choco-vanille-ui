import { palette } from '@theme/tokens/palette.ts'

import { type LightColors } from '@theme/colors/light.ts'

export const darkColors: Record<keyof LightColors, string> = {
    /* Base surfaces & text  */
    background: palette.neutral[950],
    foreground: palette.neutral[100],

    /* Elevated surfaces — a hair lighter than the page for depth */
    card: palette.neutral[900],
    cardForeground: palette.neutral[100],
    popover: palette.neutral[900],
    popoverForeground: palette.neutral[100],

    /* Muted */
    muted: palette.neutral[800],
    mutedForeground: palette.neutral[400],

    /* Scrim behind modals / drawers */
    overlay: 'oklch(0 0 0 / 0.6)',

    /* Primary / brand  */
    primary: palette.brand[500],
    primaryHover: palette.brand[400],
    primaryActive: palette.brand[300],
    primaryForeground: palette.neutral[950],
    primarySubtle: palette.brand[950],
    primarySubtleHover: palette.brand[900],
    primarySubtleActive: palette.brand[800],
    primarySubtleForeground: palette.brand[200],
    primarySubtleBorder: palette.brand[800],

    /* Secondary (low-emphasis neutral intent)  */
    secondary: palette.neutral[800],
    secondaryHover: palette.neutral[700],
    secondaryActive: palette.neutral[600],
    secondaryForeground: palette.neutral[100],
    secondarySubtle: palette.neutral[800],
    secondarySubtleHover: palette.neutral[700],
    secondarySubtleActive: palette.neutral[600],
    secondarySubtleForeground: palette.neutral[100],
    secondarySubtleBorder: palette.neutral[700],

    /* Status: success  */
    success: palette.green[500],
    successHover: palette.green[400],
    successActive: palette.green[300],
    successForeground: palette.neutral[950],
    successSubtle: palette.green[950],
    successSubtleHover: palette.green[900],
    successSubtleActive: palette.green[800],
    successSubtleForeground: palette.green[200],
    successSubtleBorder: palette.green[800],

    /* Status: warning  */
    warning: palette.amber[400],
    warningHover: palette.amber[300],
    warningActive: palette.amber[200],
    warningForeground: palette.neutral[950],
    warningSubtle: palette.amber[950],
    warningSubtleHover: palette.amber[900],
    warningSubtleActive: palette.amber[800],
    warningSubtleForeground: palette.amber[200],
    warningSubtleBorder: palette.amber[800],

    /* Status: info  */
    info: palette.blue[500],
    infoHover: palette.blue[400],
    infoActive: palette.blue[300],
    infoForeground: palette.neutral[950],
    infoSubtle: palette.blue[950],
    infoSubtleHover: palette.blue[900],
    infoSubtleActive: palette.blue[800],
    infoSubtleForeground: palette.blue[200],
    infoSubtleBorder: palette.blue[800],

    /* Status: destructive / danger  */
    destructive: palette.red[500],
    destructiveHover: palette.red[400],
    destructiveActive: palette.red[300],
    destructiveForeground: palette.neutral[950],
    destructiveSubtle: palette.red[950],
    destructiveSubtleHover: palette.red[900],
    destructiveSubtleActive: palette.red[800],
    destructiveSubtleForeground: palette.red[200],
    destructiveSubtleBorder: palette.red[800],

    /* Lines, fields & focus  */
    border: palette.neutral[800],
    borderStrong: palette.neutral[700],
    input: palette.neutral[700],
    ring: palette.brand[500],

    /* Highlight  */
    highlight: palette.amber[400],
    highlightForeground: palette.neutral[950],
}
