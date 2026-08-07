import { useCallback, useEffect, useState } from 'react'

import type { ThemeValue } from '@components/theme-provider/types/ThemeProvider.props.ts'
import { getSystemTheme } from '@components/theme-provider/utils/getSystemTheme.utils.ts'
import { resolveTheme } from '@components/theme-provider/utils/resolveTheme.utils.ts'
import type {
    UseThemeStateOptions
} from '@components/theme-provider/hooks/use-theme-provider/helpers/use-theme-state/types'

/**
 * Resolves the controlled or uncontrolled mode and tracks the system preference.
 */
export const useThemeState = ({
    controlledTheme,
    defaultTheme,
    onThemeChange,
}: UseThemeStateOptions) => {
    const [internalTheme, setInternalTheme] = useState<ThemeValue>(defaultTheme)
    const activeTheme = controlledTheme ?? internalTheme
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

    useEffect(() => {
        if (activeTheme !== 'system') {
            return
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (event: MediaQueryListEvent) => {
            setSystemTheme(event.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [activeTheme])

    const setTheme = useCallback((nextTheme: ThemeValue) => {
        if (controlledTheme === undefined) {
            setInternalTheme(nextTheme)
        }
        onThemeChange?.(nextTheme)
    }, [controlledTheme, onThemeChange])

    return {
        activeTheme,
        resolvedTheme: resolveTheme(activeTheme, systemTheme),
        setTheme,
    }
}
