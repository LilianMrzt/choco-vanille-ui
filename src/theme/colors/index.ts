/*
 * Semantic color tokens — barrel export.
 *
 * Two files, one theme each:
 *   • light.ts — the default (light) theme values
 *   • dark.ts  — the dark theme values
 *
 * Both export an object whose *keys are identical* (the contract that
 * `createGlobalThemeContract` enforces at build time). Only the values differ.
 */
export { lightColors } from '@theme/colors/light.ts'
export { lightEditorColors } from '@theme/colors/light.ts'
export { darkColors, darkEditorColors } from '@theme/colors/dark.ts'
export type { LightColors } from '@theme/colors/light.ts'
export type { EditorColors } from '@theme/colors/light.ts'
