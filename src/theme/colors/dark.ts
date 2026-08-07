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
    primary: palette.brand[500],
    primaryHover: palette.brand[400],
    primaryActive: palette.brand[300],
    primaryForeground: palette.neutral[950],
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
    secondary: palette.secondary[500],
    secondaryHover: palette.secondary[400],
    secondaryActive: palette.secondary[300],
    secondaryForeground: palette.neutral[950],
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
    tertiarySubtle: palette.neutral[600],
    tertiarySubtleHover: palette.neutral[500],
    tertiarySubtleActive: palette.neutral[400],
    tertiarySubtleForeground: palette.neutral[100],
    tertiarySubtleBorder: palette.neutral[500],

    /* Status: success  */
    success: palette.green[500],
    successHover: palette.green[400],
    successActive: palette.green[300],
    successForeground: palette.neutral[950],
    successSubtle: palette.green[900],
    successSubtleHover: palette.green[800],
    successSubtleActive: palette.green[700],
    successSubtleForeground: palette.green[200],
    successSubtleBorder: palette.green[700],

    /* Status: warning  */
    warning: palette.amber[400],
    warningHover: palette.amber[300],
    warningActive: palette.amber[200],
    warningForeground: palette.neutral[950],
    warningSubtle: palette.amber[900],
    warningSubtleHover: palette.amber[800],
    warningSubtleActive: palette.amber[700],
    warningSubtleForeground: palette.amber[200],
    warningSubtleBorder: palette.amber[700],

    /* Status: info  */
    info: palette.blue[500],
    infoHover: palette.blue[400],
    infoActive: palette.blue[300],
    infoForeground: palette.neutral[950],
    infoSubtle: palette.blue[900],
    infoSubtleHover: palette.blue[800],
    infoSubtleActive: palette.blue[700],
    infoSubtleForeground: palette.blue[200],
    infoSubtleBorder: palette.blue[700],

    /* Status: destructive / danger  */
    destructive: palette.red[500],
    destructiveHover: palette.red[400],
    destructiveActive: palette.red[300],
    destructiveForeground: palette.neutral[950],
    destructiveSubtle: palette.red[900],
    destructiveSubtleHover: palette.red[800],
    destructiveSubtleActive: palette.red[700],
    destructiveSubtleForeground: palette.red[200],
    destructiveSubtleBorder: palette.red[700],

    /* Accent: purple  */
    purple: palette.purple[500],
    purpleHover: palette.purple[400],
    purpleActive: palette.purple[300],
    purpleForeground: palette.neutral[950],
    purpleSubtle: palette.purple[900],
    purpleSubtleHover: palette.purple[800],
    purpleSubtleActive: palette.purple[700],
    purpleSubtleForeground: palette.purple[200],
    purpleSubtleBorder: palette.purple[700],

    /* Accent: pink  */
    pink: palette.pink[500],
    pinkHover: palette.pink[400],
    pinkActive: palette.pink[300],
    pinkForeground: palette.neutral[950],
    pinkSubtle: palette.pink[900],
    pinkSubtleHover: palette.pink[800],
    pinkSubtleActive: palette.pink[700],
    pinkSubtleForeground: palette.pink[200],
    pinkSubtleBorder: palette.pink[700],

    /* Accent: orange  */
    orange: palette.orange[500],
    orangeHover: palette.orange[400],
    orangeActive: palette.orange[300],
    orangeForeground: palette.neutral[950],
    orangeSubtle: palette.orange[900],
    orangeSubtleHover: palette.orange[800],
    orangeSubtleActive: palette.orange[700],
    orangeSubtleForeground: palette.orange[200],
    orangeSubtleBorder: palette.orange[700],

    /* Accent: teal  */
    teal: palette.teal[500],
    tealHover: palette.teal[400],
    tealActive: palette.teal[300],
    tealForeground: palette.neutral[950],
    tealSubtle: palette.teal[900],
    tealSubtleHover: palette.teal[800],
    tealSubtleActive: palette.teal[700],
    tealSubtleForeground: palette.teal[200],
    tealSubtleBorder: palette.teal[700],

    /* Accent: cyan  */
    cyan: palette.cyan[500],
    cyanHover: palette.cyan[400],
    cyanActive: palette.cyan[300],
    cyanForeground: palette.neutral[950],
    cyanSubtle: palette.cyan[900],
    cyanSubtleHover: palette.cyan[800],
    cyanSubtleActive: palette.cyan[700],
    cyanSubtleForeground: palette.cyan[200],
    cyanSubtleBorder: palette.cyan[700],

    /* Accent: indigo  */
    indigo: palette.indigo[500],
    indigoHover: palette.indigo[400],
    indigoActive: palette.indigo[300],
    indigoForeground: palette.neutral[950],
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
