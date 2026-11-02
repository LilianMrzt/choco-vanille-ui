import type { LIGHT_DROP_SHADOWS, LIGHT_SHADOWS } from '@theme/tokens/elevation/elevation.const.ts'

/** Available box-shadow tokens. */
export type Shadows = typeof LIGHT_SHADOWS

/** Box-shadow values shared by both theme contracts. */
export type ThemeShadows = Readonly<Record<keyof Shadows, string>>

/** Filter values shared by both drop-shadow contracts. */
export type ThemeDropShadows = Readonly<Record<keyof typeof LIGHT_DROP_SHADOWS, string>>
