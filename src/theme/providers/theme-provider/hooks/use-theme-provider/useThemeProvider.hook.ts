import { useThemeDocumentScope } from '@theme/providers/theme-provider/hooks/use-theme-provider/helpers/use-theme-document-scope/useThemeDocumentScope.hook.ts'
import { useThemeState } from '@theme/providers/theme-provider/hooks/use-theme-provider/helpers/use-theme-state/useThemeState.hook.ts'
import { useThemeTokenStyles } from '@theme/providers/theme-provider/hooks/use-theme-provider/helpers/use-theme-token-styles/useThemeTokenStyles.hook.ts'
import { useThemeTransition } from '@theme/providers/theme-provider/hooks/use-theme-provider/helpers/use-theme-transition/useThemeTransition.hook.ts'
import type { UseThemeProviderOptions, UseThemeProviderResult } from '@theme/providers/theme-provider/hooks/use-theme-provider/types'

/**
 * Composes the provider hooks used by the public ThemeProvider component.
 *
 * @param options - Theme state, scope, tokens and transition configuration.
 * @returns The theme state and styles used by the provider.
 * @example
 * const state = useThemeProvider({ defaultTheme: 'system', scope: 'document', themeTransitionDuration: 0 })
 */
export const useThemeProvider = ({
    controlledTheme,
    defaultTheme,
    onThemeChange,
    scope,
    tokens,
    themeTransitionDuration,
}: UseThemeProviderOptions): UseThemeProviderResult => {
    const themeState = useThemeState({
        controlledTheme,
        defaultTheme,
        onThemeChange,
    })
    const tokenStyles = useThemeTokenStyles(scope === 'subtree' ? tokens : undefined)
    const isTransitioning = useThemeTransition(
        themeState.resolvedTheme,
        themeTransitionDuration,
    )

    useThemeDocumentScope(
        scope,
        themeState.resolvedTheme,
        tokens,
        isTransitioning,
        themeTransitionDuration,
    )

    return {
        ...themeState,
        isTransitioning,
        tokenStyles,
    }
}
