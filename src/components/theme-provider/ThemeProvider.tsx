import { type FC, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@components/theme-provider/ThemeProvider.context.ts'
import type { ThemeMode, ThemeProviderProps } from '@components/theme-provider/types/ThemeProvider.props.ts'
import { getSystemTheme } from '@components/theme-provider/utils/getSystemTheme.utils.ts'
import { resolveTheme } from '@components/theme-provider/utils/resolveTheme.utils.ts'

/**
 * `ThemeProvider` wraps a subtree and manages the active color-scheme.
 *
 * ### What it does
 * - Sets `data-theme="light"` or `data-theme="dark"` on its wrapper `<div>` so
 *   the kit's CSS-variable scoping works out of the box.
 * - In `'system'` mode it follows `prefers-color-scheme` and reactively updates
 *   when the OS preference changes.
 * - Accepts a `tokens` map to inject runtime CSS-variable overrides directly
 *   on the wrapper element — no `.css.ts` file required.
 * - Exposes `{ theme, resolvedTheme, setTheme }` via React context so any child
 *   can read or change the active mode with the `useTheme` hook.
 *
 * ### Controlled vs uncontrolled
 * - **Uncontrolled** (default): omit the `theme` prop.  The component manages
 *   its own state; use `defaultTheme` to set the initial value.
 * - **Controlled**: pass `theme` and handle `onThemeChange` in the parent.
 *
 * ### Placing in your app
 * Wrap your whole application to enable global theming:
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 * Or scope it to a single subtree:
 * ```tsx
 * <ThemeProvider theme="dark" tokens={{ primary: 'oklch(0.70 0.16 185)' }}>
 *   <DarkWidget />
 * </ThemeProvider>
 * ```
 */
const ThemeProvider: FC<ThemeProviderProps> = ({
    theme: controlledTheme,
    defaultTheme = 'system',
    onThemeChange,
    tokens,
    style,
    children,
    ...divProps
}) => {

    // 1. Internal state (uncontrolled mode)

    const [internalTheme, setInternalTheme] = useState<ThemeMode>(defaultTheme)
    const activeTheme = controlledTheme ?? internalTheme

    // 2. Resolve OS preference and subscribe to changes

    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

    useEffect(() => {
        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light')
        mql.addEventListener('change', handler)
        return () => mql.removeEventListener('change', handler)
    }, [])

    const resolvedTheme = resolveTheme(activeTheme, systemTheme)

    // 3. setTheme — works in both controlled and uncontrolled modes

    const setTheme = (next: ThemeMode) => {
        if (controlledTheme === undefined) {
            setInternalTheme(next)
        }
        onThemeChange?.(next)
    }

    // 4. Convert `tokens` → inline CSS custom properties

    const tokenStyles = useMemo<React.CSSProperties>(() => {
        if (!tokens) { return {} }
        return Object.fromEntries(
            Object.entries(tokens).map(([key, value]) => [`--color-${key}`, value]),
        ) as React.CSSProperties
    }, [tokens])

    // 5. Render

    return (
        <ThemeContext.Provider value={{ theme: activeTheme, resolvedTheme, setTheme }}>
            <div
                data-theme={resolvedTheme}
                style={{ ...tokenStyles, ...style }}
                {...divProps}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
