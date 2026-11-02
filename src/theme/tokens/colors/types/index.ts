import type { lightColors, lightEditorColors } from '@theme/tokens/colors/lightColors.const.ts'

/** Built-in light semantic color values. */
export type LightColors = typeof lightColors

/** Built-in light editor color values. */
export type EditorColors = typeof lightEditorColors

/** Semantic color token key mapped to `vars.color.<key>`. */
export type ThemeColor = keyof LightColors

/** Theme color tokens plus CSS color keywords supported by visual props. */
export type ThemeColorValue = ThemeColor | 'transparent'
