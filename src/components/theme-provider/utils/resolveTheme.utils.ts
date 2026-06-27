import type { ThemeMode } from '@components'

export const resolveTheme = (mode: ThemeMode, systemTheme: 'light' | 'dark'): 'light' | 'dark' =>
    mode === 'system' ? systemTheme : mode
