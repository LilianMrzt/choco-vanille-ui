import type { ThemeValue } from '@components/theme-provider/types/ThemeProvider.props.ts'

export const resolveTheme = (mode: ThemeValue, systemTheme: 'light' | 'dark'): string =>
    mode === 'system' ? systemTheme : mode
