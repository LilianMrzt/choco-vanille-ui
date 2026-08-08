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

    /* Text hierarchy */
    text: palette.neutral[950],
    textSecondary: palette.neutral[600],
    textTertiary: palette.neutral[400],

    /* Elevated surfaces */
    card: palette.neutral[0],
    cardForeground: palette.neutral[950],
    popover: palette.neutral[0],
    popoverForeground: palette.neutral[950],

    /* Muted — quiet backgrounds & secondary text */
    muted: palette.neutral[100],
    mutedForeground: palette.neutral[500],

    /* Scrim behind modals / drawers */
    overlay: 'oklch(0 0 0 / 0.5)',

    /* Primary / brand  */
    primary: palette.brand[600],
    primaryHover: palette.brand[700],
    primaryActive: palette.brand[800],
    primaryForeground: palette.neutral[0],
    primarySubtle: palette.brand[100],
    primarySubtleHover: palette.brand[200],
    primarySubtleActive: palette.brand[300],
    primarySubtleForeground: palette.brand[800],
    primarySubtleBorder: palette.brand[200],

    /* Links — higher contrast hover/active for clear affordance */
    link: palette.brand[600],
    linkHover: palette.brand[800],
    linkActive: palette.brand[900],

    /* Secondary (complementary to primary)  */
    secondary: palette.secondary[600],
    secondaryHover: palette.secondary[700],
    secondaryActive: palette.secondary[800],
    secondaryForeground: palette.neutral[0],
    secondarySubtle: palette.secondary[100],
    secondarySubtleHover: palette.secondary[200],
    secondarySubtleActive: palette.secondary[300],
    secondarySubtleForeground: palette.secondary[900],
    secondarySubtleBorder: palette.secondary[200],

    /* Tertiary (low-emphasis neutral intent)  */
    tertiary: palette.neutral[200],
    tertiaryHover: palette.neutral[300],
    tertiaryActive: palette.neutral[400],
    tertiaryForeground: palette.neutral[900],
    tertiarySubtle: palette.neutral[200],
    tertiarySubtleHover: palette.neutral[300],
    tertiarySubtleActive: palette.neutral[400],
    tertiarySubtleForeground: palette.neutral[900],
    tertiarySubtleBorder: palette.neutral[300],

    /* Status: success  */
    success: palette.green[600],
    successHover: palette.green[700],
    successActive: palette.green[800],
    successForeground: palette.neutral[0],
    successSubtle: palette.green[100],
    successSubtleHover: palette.green[200],
    successSubtleActive: palette.green[300],
    successSubtleForeground: palette.green[900],
    successSubtleBorder: palette.green[200],

    /* Status: warning (bright amber + dark text for legibility)  */
    warning: palette.amber[500],
    warningHover: palette.amber[600],
    warningActive: palette.amber[700],
    warningForeground: palette.neutral[950],
    warningSubtle: palette.amber[100],
    warningSubtleHover: palette.amber[200],
    warningSubtleActive: palette.amber[300],
    warningSubtleForeground: palette.amber[900],
    warningSubtleBorder: palette.amber[200],

    /* Status: info �� */
    info: palette.blue[600],
    infoHover: palette.blue[700],
    infoActive: palette.blue[800],
    infoForeground: palette.neutral[0],
    infoSubtle: palette.blue[100],
    infoSubtleHover: palette.blue[200],
    infoSubtleActive: palette.blue[300],
    infoSubtleForeground: palette.blue[900],
    infoSubtleBorder: palette.blue[200],

    /* Status: destructive / danger  */
    destructive: palette.red[600],
    destructiveHover: palette.red[700],
    destructiveActive: palette.red[800],
    destructiveForeground: palette.neutral[0],
    destructiveSubtle: palette.red[100],
    destructiveSubtleHover: palette.red[200],
    destructiveSubtleActive: palette.red[300],
    destructiveSubtleForeground: palette.red[900],
    destructiveSubtleBorder: palette.red[200],

    /* Accent: purple  */
    purple: palette.purple[600],
    purpleHover: palette.purple[700],
    purpleActive: palette.purple[800],
    purpleForeground: palette.neutral[0],
    purpleSubtle: palette.purple[100],
    purpleSubtleHover: palette.purple[200],
    purpleSubtleActive: palette.purple[300],
    purpleSubtleForeground: palette.purple[900],
    purpleSubtleBorder: palette.purple[200],

    /* Accent: pink  */
    pink: palette.pink[600],
    pinkHover: palette.pink[700],
    pinkActive: palette.pink[800],
    pinkForeground: palette.neutral[0],
    pinkSubtle: palette.pink[100],
    pinkSubtleHover: palette.pink[200],
    pinkSubtleActive: palette.pink[300],
    pinkSubtleForeground: palette.pink[900],
    pinkSubtleBorder: palette.pink[200],

    /* Accent: orange  */
    orange: palette.orange[600],
    orangeHover: palette.orange[700],
    orangeActive: palette.orange[800],
    orangeForeground: palette.neutral[0],
    orangeSubtle: palette.orange[100],
    orangeSubtleHover: palette.orange[200],
    orangeSubtleActive: palette.orange[300],
    orangeSubtleForeground: palette.orange[900],
    orangeSubtleBorder: palette.orange[200],

    /* Accent: teal  */
    teal: palette.teal[600],
    tealHover: palette.teal[700],
    tealActive: palette.teal[800],
    tealForeground: palette.neutral[0],
    tealSubtle: palette.teal[100],
    tealSubtleHover: palette.teal[200],
    tealSubtleActive: palette.teal[300],
    tealSubtleForeground: palette.teal[900],
    tealSubtleBorder: palette.teal[200],

    /* Accent: cyan  */
    cyan: palette.cyan[600],
    cyanHover: palette.cyan[700],
    cyanActive: palette.cyan[800],
    cyanForeground: palette.neutral[0],
    cyanSubtle: palette.cyan[100],
    cyanSubtleHover: palette.cyan[200],
    cyanSubtleActive: palette.cyan[300],
    cyanSubtleForeground: palette.cyan[900],
    cyanSubtleBorder: palette.cyan[200],

    /* Accent: indigo  */
    indigo: palette.indigo[600],
    indigoHover: palette.indigo[700],
    indigoActive: palette.indigo[800],
    indigoForeground: palette.neutral[0],
    indigoSubtle: palette.indigo[100],
    indigoSubtleHover: palette.indigo[200],
    indigoSubtleActive: palette.indigo[300],
    indigoSubtleForeground: palette.indigo[900],
    indigoSubtleBorder: palette.indigo[200],

    /* Lines, fields & focus  */
    border: palette.neutral[200],
    borderStrong: palette.neutral[300],
    input: palette.neutral[300],
    ring: palette.brand[600],

    /* Highlight (Typography <mark>)  */
    highlight: palette.amber[200],
    highlightForeground: palette.amber[900],

    /* Skeleton loading placeholders  */
    skeleton: palette.neutral[200],
    skeletonForeground: palette.neutral[300],
} as const

export type LightColors = typeof lightColors

export const lightEditorColors = {
    ocean: {
        dark: palette.blue[700],
        base: palette.blue[500],
        light: palette.blue[300],
    },
    forest: {
        dark: palette.green[700],
        base: palette.green[500],
        light: palette.green[300],
    },
    sunset: {
        dark: palette.orange[700],
        base: palette.orange[500],
        light: palette.orange[300],
    },
    berry: {
        dark: palette.pink[700],
        base: palette.pink[500],
        light: palette.pink[300],
    },
    grape: {
        dark: palette.purple[700],
        base: palette.purple[500],
        light: palette.purple[300],
    },
    aqua: {
        dark: palette.teal[700],
        base: palette.teal[500],
        light: palette.teal[300],
    },
    neutral: {
        dark: palette.neutral[900],
        base: palette.neutral[700],
        light: palette.neutral[400],
    },
} as const

export type EditorColors = typeof lightEditorColors
