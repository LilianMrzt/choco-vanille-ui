import { useCallback, useState, useSyncExternalStore } from 'react'

import type { ThemeValue } from '@theme/providers/theme-provider/types/index.ts'
import { getSystemTheme, SYSTEM_THEME_QUERY } from '@theme/utils/preferences/getSystemTheme.utils.ts'
import { resolveTheme } from '@theme/utils/preferences/resolveTheme.utils.ts'
import type {
    UseThemeStateOptions,
    UseThemeStateResult,
} from '@theme/providers/theme-provider/hooks/use-theme-provider/helpers/use-theme-state/types'

const getServerSystemTheme = (): 'light' => 'light'

const subscribeToSystemTheme = (onChange: () => void): (() => void) => {
    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY)

    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
}

const subscribeToNothing = (): (() => void) => () => undefined

/**
 * Resolves the controlled or uncontrolled theme and tracks the system preference.
 * The server and initial hydration use light for a system preference.
 *
 * @param options - Controlled value, initial value and change callback.
 * @returns The active preference, resolved theme and change function.
 * @example
 * const state = useThemeState({ defaultTheme: 'system' })
 */
export const useThemeState = ({
    controlledTheme,
    defaultTheme,
    onThemeChange,
}: UseThemeStateOptions): UseThemeStateResult => {
    const [internalTheme, setInternalTheme] = useState<ThemeValue>(defaultTheme)
    const activeTheme = controlledTheme ?? internalTheme
    const isSystemTheme = activeTheme === 'system'
    const systemTheme = useSyncExternalStore(
        isSystemTheme ? subscribeToSystemTheme : subscribeToNothing,
        isSystemTheme ? getSystemTheme : getServerSystemTheme,
        getServerSystemTheme,
    )

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
