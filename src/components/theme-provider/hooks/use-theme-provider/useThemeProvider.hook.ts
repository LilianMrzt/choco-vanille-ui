import { useThemeDocumentScope } from '@components/theme-provider/hooks/use-theme-provider/helpers/use-theme-document-scope/useThemeDocumentScope.hook.ts'
import { useThemeState } from '@components/theme-provider/hooks/use-theme-provider/helpers/use-theme-state/useThemeState.hook.ts'
import { useThemeTokenStyles } from '@components/theme-provider/hooks/use-theme-provider/helpers/use-theme-token-styles/useThemeTokenStyles.hook.ts'
import { useThemeTransition } from '@components/theme-provider/hooks/use-theme-provider/helpers/use-theme-transition/useThemeTransition.hook.ts'
import type { UseThemeProviderOptions } from '@components/theme-provider/hooks/use-theme-provider/types'

/**
 * Composes the provider hooks used by the public ThemeProvider component.
 */
export const useThemeProvider = ({
    controlledTheme,
    defaultTheme,
    onThemeChange,
    scope,
    tokens,
    themeTransitionDuration,
}: UseThemeProviderOptions) => {
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
