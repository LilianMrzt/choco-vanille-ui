import { type CSSProperties, type FC, useMemo } from 'react'
import { TooltipProvider } from '@components/overlay/tooltip'
import { ThemeContext } from '@components/theme-provider/ThemeProvider.context.ts'
import type { ThemeProviderProps } from '@components/theme-provider/types/ThemeProvider.props.ts'
import { useThemeProvider } from '@components/theme-provider/hooks/use-theme-provider/useThemeProvider.hook.ts'
import {
    THEME_TRANSITION_ATTRIBUTE,
    THEME_TRANSITION_DURATION_VAR,
} from '@constants/theme'

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
 * <ThemeProvider scope="subtree" theme="dark" tokens={{ primary: 'oklch(0.70 0.16 185)' }}>
 *   <DarkWidget />
 * </ThemeProvider>
 * ```
 */
const ThemeProvider: FC<ThemeProviderProps> = ({
    theme: controlledTheme,
    defaultTheme = 'system',
    scope = 'document',
    themeTransitionDuration = 100,
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
    const transitionStyle = useMemo<CSSProperties>(
        () =>
            isTransitioning
                ? ({
                    [THEME_TRANSITION_DURATION_VAR]: `${Math.max(0, themeTransitionDuration)}ms`,
                } as CSSProperties)
                : {},
        [isTransitioning, themeTransitionDuration],
    )
    const containerStyle = useMemo(
        () => ({ ...tokenStyles, ...style, ...transitionStyle }),
        [style, tokenStyles, transitionStyle],
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
                data-theme={resolvedTheme}
                {...(isTransitioning ? { [THEME_TRANSITION_ATTRIBUTE]: '' } : {})}
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
