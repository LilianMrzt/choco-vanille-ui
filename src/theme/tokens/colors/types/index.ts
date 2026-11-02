import type { lightColors, lightEditorColors } from '@theme/tokens/colors/lightColors.const.ts'

/** Built-in light semantic color values. */
export type LightColors = typeof lightColors

/** Built-in light editor color values. */
export type EditorColors = typeof lightEditorColors

/** Semantic color values for built-in or consumer-defined themes. */
export type ThemeColors = {
    readonly [Token in keyof LightColors]: string
}

/** Editor palettes with stable names and tones, and customizable values. */
export type ThemeEditorColors = {
    readonly [Color in keyof EditorColors]: {
        readonly [Tone in keyof EditorColors[Color]]: string
    }
}

/** Runtime semantic color overrides accepted by ThemeProvider. */
export type ThemeColorOverrides = Readonly<Partial<ThemeColors>>

/** Semantic color token key mapped to `vars.color.<key>`. */
export type ThemeColor = keyof LightColors

/** Theme color keys supported by visual props, including CSS keyword tokens. */
export type ThemeColorValue = ThemeColor

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
