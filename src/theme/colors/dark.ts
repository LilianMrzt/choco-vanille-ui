import { palette } from '@theme/tokens/palette.ts'

import { type LightColors } from '@theme/colors/light.ts'

export const darkColors: Record<keyof LightColors, string> = {
    /* Base surfaces & text  */
    background: palette.neutral[950],
    foreground: palette.neutral[100],

    /* Text hierarchy */
    text: palette.neutral[100],
    textSecondary: palette.neutral[300],
    textTertiary: palette.neutral[500],

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

    /* Links — higher contrast hover/active for clear affordance */
    link: palette.brand[500],
    linkHover: palette.brand[300],
    linkActive: palette.brand[200],

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

    /* Accent: purple  */
    purple: palette.purple[500],
    purpleHover: palette.purple[400],
    purpleActive: palette.purple[300],
    purpleForeground: palette.neutral[950],
    purpleSubtle: palette.purple[950],
    purpleSubtleHover: palette.purple[900],
    purpleSubtleActive: palette.purple[800],
    purpleSubtleForeground: palette.purple[200],
    purpleSubtleBorder: palette.purple[800],

    /* Accent: pink  */
    pink: palette.pink[500],
    pinkHover: palette.pink[400],
    pinkActive: palette.pink[300],
    pinkForeground: palette.neutral[950],
    pinkSubtle: palette.pink[950],
    pinkSubtleHover: palette.pink[900],
    pinkSubtleActive: palette.pink[800],
    pinkSubtleForeground: palette.pink[200],
    pinkSubtleBorder: palette.pink[800],

    /* Accent: orange  */
    orange: palette.orange[500],
    orangeHover: palette.orange[400],
    orangeActive: palette.orange[300],
    orangeForeground: palette.neutral[950],
    orangeSubtle: palette.orange[950],
    orangeSubtleHover: palette.orange[900],
    orangeSubtleActive: palette.orange[800],
    orangeSubtleForeground: palette.orange[200],
    orangeSubtleBorder: palette.orange[800],

    /* Accent: teal  */
    teal: palette.teal[500],
    tealHover: palette.teal[400],
    tealActive: palette.teal[300],
    tealForeground: palette.neutral[950],
    tealSubtle: palette.teal[950],
    tealSubtleHover: palette.teal[900],
    tealSubtleActive: palette.teal[800],
    tealSubtleForeground: palette.teal[200],
    tealSubtleBorder: palette.teal[800],

    /* Accent: cyan  */
    cyan: palette.cyan[500],
    cyanHover: palette.cyan[400],
    cyanActive: palette.cyan[300],
    cyanForeground: palette.neutral[950],
    cyanSubtle: palette.cyan[950],
    cyanSubtleHover: palette.cyan[900],
    cyanSubtleActive: palette.cyan[800],
    cyanSubtleForeground: palette.cyan[200],
    cyanSubtleBorder: palette.cyan[800],

    /* Accent: indigo  */
    indigo: palette.indigo[500],
    indigoHover: palette.indigo[400],
    indigoActive: palette.indigo[300],
    indigoForeground: palette.neutral[950],
    indigoSubtle: palette.indigo[950],
    indigoSubtleHover: palette.indigo[900],
    indigoSubtleActive: palette.indigo[800],
    indigoSubtleForeground: palette.indigo[200],
    indigoSubtleBorder: palette.indigo[800],

    /* Lines, fields & focus  */
    border: palette.neutral[800],
    borderStrong: palette.neutral[700],
    input: palette.neutral[700],
    ring: palette.brand[500],

    /* Highlight  */
    highlight: palette.amber[400],
    highlightForeground: palette.neutral[950],

    /* Skeleton loading placeholders  */
    skeleton: palette.neutral[800],
    skeletonForeground: palette.neutral[700],
}
