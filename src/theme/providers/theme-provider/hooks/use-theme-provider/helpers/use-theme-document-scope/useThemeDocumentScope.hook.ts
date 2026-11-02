import { useEffect, useLayoutEffect } from 'react'

import type { ThemeProviderScope } from '@theme/providers/theme-provider/types/index.ts'
import type { ThemeTokens } from '@theme/providers/theme-provider/hooks/use-theme-provider/types'
import {
    THEME_TRANSITION_ATTRIBUTE,
    THEME_TRANSITION_DURATION_VAR,
} from '@theme/constants/index.ts'

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Synchronizes document-scoped theme values with `<html>` for body-mounted portals.
 *
 * @param scope - Target scope of the theme.
 * @param resolvedTheme - Theme name to apply.
 * @param tokens - Optional semantic color overrides.
 * @param isTransitioning - Whether a theme transition is active.
 * @param transitionDuration - Transition duration in milliseconds.
 * @returns Nothing; document changes are restored on cleanup.
 * @example
 * useThemeDocumentScope('document', 'dark')
 */
export const useThemeDocumentScope = (
    scope: ThemeProviderScope,
    resolvedTheme: string,
    tokens?: ThemeTokens,
    isTransitioning = false,
    transitionDuration = 0,
): void => {
    useIsomorphicLayoutEffect(() => {
        if (scope !== 'document' || typeof document === 'undefined') {
            return
        }

        const root = document.documentElement
        const previousTheme = root.getAttribute('data-theme')
        root.setAttribute('data-theme', resolvedTheme)

        return () => {
            if (previousTheme === null) {
                root.removeAttribute('data-theme')
            } else {
                root.setAttribute('data-theme', previousTheme)
            }
        }
    }, [resolvedTheme, scope])

    useIsomorphicLayoutEffect(() => {
        if (scope !== 'document' || typeof document === 'undefined') {
            return
        }

        const root = document.documentElement
        const previousTokens = new Map<string, string>()

        for (const [key, value] of Object.entries(tokens ?? {})) {
            if (value === undefined) {
                continue
            }
            const property = `--color-${key}`
            previousTokens.set(property, root.style.getPropertyValue(property))
            root.style.setProperty(property, value)
        }

        return () => {
            for (const [property, value] of previousTokens) {
                if (value) {
                    root.style.setProperty(property, value)
                } else {
                    root.style.removeProperty(property)
                }
            }
        }
    }, [scope, tokens])

    useIsomorphicLayoutEffect(() => {
        if (scope !== 'document' || typeof document === 'undefined') {
            return
        }

        const root = document.documentElement
        const previousAttribute = root.getAttribute(THEME_TRANSITION_ATTRIBUTE)
        const previousDuration = root.style.getPropertyValue(
            THEME_TRANSITION_DURATION_VAR,
        )

        if (isTransitioning) {
            root.setAttribute(THEME_TRANSITION_ATTRIBUTE, '')
            root.style.setProperty(
                THEME_TRANSITION_DURATION_VAR,
                `${Math.max(0, transitionDuration)}ms`,
            )
        }

        return () => {
            if (previousAttribute === null) {
                root.removeAttribute(THEME_TRANSITION_ATTRIBUTE)
            } else {
                root.setAttribute(THEME_TRANSITION_ATTRIBUTE, previousAttribute)
            }

            if (previousDuration) {
                root.style.setProperty(THEME_TRANSITION_DURATION_VAR, previousDuration)
            } else {
                root.style.removeProperty(THEME_TRANSITION_DURATION_VAR)
            }
        }
    }, [isTransitioning, scope, transitionDuration])
}
