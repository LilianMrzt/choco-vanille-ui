import type { lightTheme } from '@theme/themes/themes.const.ts'

type ThemeTokenValues<T> = T extends string
    ? string
    : { readonly [Key in keyof T]: ThemeTokenValues<T[Key]> }

/** Complete theme token structure with customizable string values. */
export type Theme = ThemeTokenValues<typeof lightTheme>
