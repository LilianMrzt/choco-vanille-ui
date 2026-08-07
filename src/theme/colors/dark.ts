import { palette } from '@theme/tokens/palette.ts'

import { type EditorColors, type LightColors } from '@theme/colors/light.ts'

type DarkColors = {
    [Key in keyof LightColors]: string
}

type DarkEditorColors = {
    [Color in keyof EditorColors]: {
        [Tone in keyof EditorColors[Color]]: string
    }
}

export const darkColors: DarkColors = {
    /* Base surfaces & text  */
    background: palette.neutral[800],
    foreground: palette.neutral[100],

    /* Text hierarchy */
    text: palette.neutral[100],
    textSecondary: palette.neutral[300],
    textTertiary: palette.neutral[500],

    /* Elevated surfaces — a hair lighter than the page for depth */
    card: palette.neutral[700],
    cardForeground: palette.neutral[100],
    popover: palette.neutral[700],
    popoverForeground: palette.neutral[100],

    /* Muted */
    muted: palette.neutral[600],
    mutedForeground: palette.neutral[400],

    /* Scrim behind modals / drawers */
    overlay: 'oklch(0 0 0 / 0.6)',

    /* Primary / brand  */
    primary: palette.brand[600],
    primaryHover: palette.brand[500],
    primaryActive: palette.brand[400],
    primaryForeground: palette.neutral[0],
    primarySubtle: palette.brand[900],
    primarySubtleHover: palette.brand[800],
    primarySubtleActive: palette.brand[700],
    primarySubtleForeground: palette.brand[200],
    primarySubtleBorder: palette.brand[700],

    /* Links — higher contrast hover/active for clear affordance */
    link: palette.brand[500],
    linkHover: palette.brand[300],
    linkActive: palette.brand[200],

    /* Secondary (complementary to primary)  */
    secondary: palette.secondary[700],
    secondaryHover: palette.secondary[600],
    secondaryActive: palette.secondary[500],
    secondaryForeground: palette.neutral[100],
    secondarySubtle: palette.secondary[900],
    secondarySubtleHover: palette.secondary[800],
    secondarySubtleActive: palette.secondary[700],
    secondarySubtleForeground: palette.secondary[200],
    secondarySubtleBorder: palette.secondary[700],

    /* Tertiary (low-emphasis neutral intent)  */
    tertiary: palette.neutral[600],
    tertiaryHover: palette.neutral[500],
    tertiaryActive: palette.neutral[400],
    tertiaryForeground: palette.neutral[100],
    tertiarySubtle: palette.neutral[700],
    tertiarySubtleHover: palette.neutral[600],
    tertiarySubtleActive: palette.neutral[500],
    tertiarySubtleForeground: palette.neutral[100],
    tertiarySubtleBorder: palette.neutral[600],

    /* Status: success  */
    success: palette.green[700],
    successHover: palette.green[600],
    successActive: palette.green[500],
    successForeground: palette.neutral[100],
    successSubtle: palette.green[900],
    successSubtleHover: palette.green[800],
    successSubtleActive: palette.green[700],
    successSubtleForeground: palette.green[200],
    successSubtleBorder: palette.green[700],

    /* Status: warning  */
    warning: palette.amber[700],
    warningHover: palette.amber[600],
    warningActive: palette.amber[500],
    warningForeground: palette.neutral[950],
    warningSubtle: palette.amber[900],
    warningSubtleHover: palette.amber[800],
    warningSubtleActive: palette.amber[700],
    warningSubtleForeground: palette.amber[200],
    warningSubtleBorder: palette.amber[700],

    /* Status: info  */
    info: palette.blue[700],
    infoHover: palette.blue[600],
    infoActive: palette.blue[500],
    infoForeground: palette.neutral[100],
    infoSubtle: palette.blue[900],
    infoSubtleHover: palette.blue[800],
    infoSubtleActive: palette.blue[700],
    infoSubtleForeground: palette.blue[200],
    infoSubtleBorder: palette.blue[700],

    /* Status: destructive / danger  */
    destructive: palette.red[700],
    destructiveHover: palette.red[600],
    destructiveActive: palette.red[500],
    destructiveForeground: palette.neutral[100],
    destructiveSubtle: palette.red[900],
    destructiveSubtleHover: palette.red[800],
    destructiveSubtleActive: palette.red[700],
    destructiveSubtleForeground: palette.red[200],
    destructiveSubtleBorder: palette.red[700],

    /* Accent: purple  */
    purple: palette.purple[700],
    purpleHover: palette.purple[600],
    purpleActive: palette.purple[500],
    purpleForeground: palette.neutral[100],
    purpleSubtle: palette.purple[900],
    purpleSubtleHover: palette.purple[800],
    purpleSubtleActive: palette.purple[700],
    purpleSubtleForeground: palette.purple[200],
    purpleSubtleBorder: palette.purple[700],

    /* Accent: pink  */
    pink: palette.pink[700],
    pinkHover: palette.pink[600],
    pinkActive: palette.pink[500],
    pinkForeground: palette.neutral[100],
    pinkSubtle: palette.pink[900],
    pinkSubtleHover: palette.pink[800],
    pinkSubtleActive: palette.pink[700],
    pinkSubtleForeground: palette.pink[200],
    pinkSubtleBorder: palette.pink[700],

    /* Accent: orange  */
    orange: palette.orange[700],
    orangeHover: palette.orange[600],
    orangeActive: palette.orange[500],
    orangeForeground: palette.neutral[100],
    orangeSubtle: palette.orange[900],
    orangeSubtleHover: palette.orange[800],
    orangeSubtleActive: palette.orange[700],
    orangeSubtleForeground: palette.orange[200],
    orangeSubtleBorder: palette.orange[700],

    /* Accent: teal  */
    teal: palette.teal[700],
    tealHover: palette.teal[600],
    tealActive: palette.teal[500],
    tealForeground: palette.neutral[100],
    tealSubtle: palette.teal[900],
    tealSubtleHover: palette.teal[800],
    tealSubtleActive: palette.teal[700],
    tealSubtleForeground: palette.teal[200],
    tealSubtleBorder: palette.teal[700],

    /* Accent: cyan  */
    cyan: palette.cyan[700],
    cyanHover: palette.cyan[600],
    cyanActive: palette.cyan[500],
    cyanForeground: palette.neutral[100],
    cyanSubtle: palette.cyan[900],
    cyanSubtleHover: palette.cyan[800],
    cyanSubtleActive: palette.cyan[700],
    cyanSubtleForeground: palette.cyan[200],
    cyanSubtleBorder: palette.cyan[700],

    /* Accent: indigo  */
    indigo: palette.indigo[700],
    indigoHover: palette.indigo[600],
    indigoActive: palette.indigo[500],
    indigoForeground: palette.neutral[100],
    indigoSubtle: palette.indigo[900],
    indigoSubtleHover: palette.indigo[800],
    indigoSubtleActive: palette.indigo[700],
    indigoSubtleForeground: palette.indigo[200],
    indigoSubtleBorder: palette.indigo[700],

    /* Lines, fields & focus  */
    border: palette.neutral[600],
    borderStrong: palette.neutral[500],
    input: palette.neutral[500],
    ring: palette.brand[500],

    /* Highlight  */
    highlight: palette.amber[400],
    highlightForeground: palette.neutral[950],

    /* Skeleton loading placeholders  */
    skeleton: palette.neutral[600],
    skeletonForeground: palette.neutral[500],
}

export const darkEditorColors: DarkEditorColors = {
    ocean: {
        dark: palette.blue[300],
        base: palette.blue[500],
        light: palette.blue[700],
    },
    forest: {
        dark: palette.green[300],
        base: palette.green[500],
        light: palette.green[700],
    },
    sunset: {
        dark: palette.orange[300],
        base: palette.orange[500],
        light: palette.orange[700],
    },
    berry: {
        dark: palette.pink[300],
        base: palette.pink[500],
        light: palette.pink[700],
    },
    grape: {
        dark: palette.purple[300],
        base: palette.purple[500],
        light: palette.purple[700],
    },
    aqua: {
        dark: palette.teal[300],
        base: palette.teal[500],
        light: palette.teal[700],
    },
    neutral: {
        dark: palette.neutral[100],
        base: palette.neutral[300],
        light: palette.neutral[500],
    },
}
