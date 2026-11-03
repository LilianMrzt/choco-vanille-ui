import type { lightColors, lightEditorColors } from '@theme/tokens/colors/lightColors.const.ts'

/** Built-in light semantic color values. */
export type LightColors = typeof lightColors

/** Built-in light editor color values. */
export type EditorColors = typeof lightEditorColors

/** Semantic color values for built-in or consumer-defined themes. */
export type ThemeColors = {
    readonly [Token in keyof LightColors]: LightColors[Token] extends string
        ? string
        : { readonly [Leaf in keyof LightColors[Token]]: string }
}

/** Editor palettes with stable names and tones, and customizable values. */
export type ThemeEditorColors = {
    readonly [Color in keyof EditorColors]: {
        readonly [Tone in keyof EditorColors[Color]]: string
    }
}

/** Runtime semantic color overrides accepted by ThemeProvider. */
export type ThemeColorOverrides = {
    readonly [Token in keyof ThemeColors]?: ThemeColors[Token] extends string
        ? string
        : Readonly<Partial<ThemeColors[Token]>>
}

/** Isolated token or direct group leaf, mapped to a CSS variable reference. */
export type ThemeColor = {
    [Token in keyof LightColors]: LightColors[Token] extends string
        ? Token
        : `${Token}.${Extract<keyof LightColors[Token], string>}`
}[keyof LightColors]

/** Theme color keys supported by visual props, including CSS keyword tokens. */
export type ThemeColorValue = ThemeColor

/** Shared direct-leaf contract for every interactive color family. */
export type ThemeColorAccent = Readonly<{
    main: string
    hover: string
    pressed: string
    foreground: string
    subtle: string
    subtleHover: string
    subtlePressed: string
    subtleForeground: string
    border: string
    subtleBorder: string
}>

/** Theme families with matching solid and subtle interaction states. */
export type ThemeColorIntent =
    | 'primary'
    | 'secondary'
    | 'neutral'
    | 'success'
    | 'warning'
    | 'info'
    | 'danger'
    | 'accentPurple'
    | 'accentPink'
    | 'accentOrange'
    | 'accentTeal'
    | 'accentCyan'
    | 'accentIndigo'
