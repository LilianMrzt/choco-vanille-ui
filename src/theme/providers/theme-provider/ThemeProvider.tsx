import { type FC, useMemo } from 'react'
import { TooltipProvider } from '@components/overlay/tooltip'
import { ThemeContext } from '@theme/providers/theme-provider/ThemeProvider.context.ts'
import type { ThemeProviderProps } from '@theme/providers/theme-provider/types/index.ts'
import { useThemeProvider } from '@theme/providers/theme-provider/hooks/use-theme-provider/useThemeProvider.hook.ts'
import {
    THEME_TRANSITION_ATTRIBUTE,
    THEME_TRANSITION_DURATION_VAR,
} from '@theme/constants/index.ts'

/**
 * `ThemeProvider` wraps a subtree and manages the active color-scheme.
 *
 * ### What it does
 * - Manages the active color scheme and runtime token overrides.
 * - Applies the theme to `<html>` by default so body-mounted portals inherit it.
 * - Applies the theme to its wrapper when `scope="subtree"`.
 * - Temporarily forces all transitions to the configured theme duration.
 *
 * ### Controlled vs uncontrolled
 * - **Uncontrolled** (default): omit the `theme` prop.  The component manages
 *   its own state; use `defaultTheme` to set the initial value.
 * - **Controlled**: pass `theme` and handle `onThemeChange` in the parent.
 * - During server rendering and hydration, `system` resolves to light before
 *   synchronizing with the browser preference.
 *
 * @param props - Theme preference, scope, overrides and wrapper attributes.
 * @returns A themed provider and wrapper around the children.
 * @example
 * Wrap your whole application to enable global theming:
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 * Or scope it to a single subtree:
 * ```tsx
 * <ThemeProvider scope="subtree" theme="dark" tokens={{ primary: 'oklch(0.70 0.16 185)' }}>
 *   <DarkWidget />
 * </ThemeProvider>
 * ```
 */
const ThemeProvider: FC<ThemeProviderProps> = ({
    theme: controlledTheme,
    defaultTheme = 'system',
    scope = 'document',
    themeTransitionDuration = 0,
    onThemeChange,
    tokens,
    style,
    children,
    ...divProps
}) => {
    const { activeTheme, resolvedTheme, setTheme, tokenStyles, isTransitioning } =
    useThemeProvider({
        controlledTheme,
        defaultTheme,
        onThemeChange,
        scope,
        tokens,
        themeTransitionDuration,
    })
    const transitionStyle = useMemo<Record<string, string | undefined>>(
        () =>
            isTransitioning
                ? {
                    [THEME_TRANSITION_DURATION_VAR]: `${Math.max(0, themeTransitionDuration)}ms`,
                }
                : {},
        [isTransitioning, themeTransitionDuration],
    )
    const containerStyle = useMemo(
        () => ({
            ...(scope === 'subtree' ? tokenStyles : {}),
            ...style,
            ...(scope === 'subtree' ? transitionStyle : {}),
        }),
        [scope, style, tokenStyles, transitionStyle],
    )
    const contextValue = useMemo(
        () => ({ theme: activeTheme, resolvedTheme, setTheme }),
        [activeTheme, resolvedTheme, setTheme],
    )
    const content = useMemo(
        () => <TooltipProvider>{children}</TooltipProvider>,
        [children],
    )

    return (
        <ThemeContext.Provider value={contextValue}>
            <div
                {...(scope === 'subtree' ? { 'data-theme': resolvedTheme } : {})}
                {...(
                    scope === 'subtree' && isTransitioning
                        ? { [THEME_TRANSITION_ATTRIBUTE]: '' }
                        : {}
                )}
                style={containerStyle}
                {...divProps}
            >
                {content}
            </div>
        </ThemeContext.Provider>
    )
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
