/*
 * @deprecated — color definitions have moved to `src/theme/colors/`.
 *
 * This file is kept as a thin re-export barrel so that existing imports of the
 * form `@theme/tokens/colors.ts` continue to work without changes.
 */
export { lightColors, darkColors } from '@theme/colors/index.ts'
export type { LightColors as SemanticColors } from '@theme/colors/index.ts'
