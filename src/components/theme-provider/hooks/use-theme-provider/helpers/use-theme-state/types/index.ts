import type { ThemeValue } from '@components/theme-provider/types/ThemeProvider.props.ts'

export type UseThemeStateOptions = {
    controlledTheme?: ThemeValue
    defaultTheme: ThemeValue
    onThemeChange?: (theme: ThemeValue) => void
}
