import type { ThemeValue } from '@theme/providers/theme-provider/types/index.ts'

export type UseThemeStateOptions = Readonly<{
    controlledTheme?: ThemeValue
    defaultTheme: ThemeValue
    onThemeChange?: (theme: ThemeValue) => void
}>

export type UseThemeStateResult = Readonly<{
    activeTheme: ThemeValue
    resolvedTheme: string
    setTheme: (theme: ThemeValue) => void
}>
