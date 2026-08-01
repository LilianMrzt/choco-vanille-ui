import type { ThemeColorValue } from '@theme/types/index.ts'
import type { SEPARATOR_ORIENTATIONS } from '@components/layout/separator/constants'

/** Orientation values for the Separator component. */
export type SeparatorOrientation =
    (typeof SEPARATOR_ORIENTATIONS)[keyof typeof SEPARATOR_ORIENTATIONS]

/** Theme colors supported by the Separator component. */
export type SeparatorColor = ThemeColorValue
