import type {
    ThemeProviderScope,
    ThemeValue,
} from '@components/theme-provider/types/ThemeProvider.props.ts'
import type { ThemeColor } from '@theme'

export type UseThemeProviderOptions = {
    controlledTheme?: ThemeValue
    defaultTheme: ThemeValue
    onThemeChange?: (theme: ThemeValue) => void
    scope: ThemeProviderScope
    themeTransitionDuration: number
    tokens?: Partial<Record<ThemeColor, string>>
}

export type ThemeTokens = Partial<Record<string, string>>
