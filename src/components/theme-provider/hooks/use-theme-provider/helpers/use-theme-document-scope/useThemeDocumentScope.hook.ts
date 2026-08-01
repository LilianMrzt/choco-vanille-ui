import { useEffect, useLayoutEffect } from 'react'

import type { ThemeProviderScope } from '@components/theme-provider/types/ThemeProvider.props.ts'
import type { ThemeTokens } from '@components/theme-provider/hooks/use-theme-provider/types'
import {
    THEME_TRANSITION_ATTRIBUTE,
    THEME_TRANSITION_DURATION_VAR,
} from '@constants/theme'

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Synchronizes document-scoped theme values with `<html>` for body-mounted portals.
 */
export const useThemeDocumentScope = (
    scope: ThemeProviderScope,
    resolvedTheme: string,
    tokens?: ThemeTokens,
    isTransitioning = false,
    transitionDuration = 0,
) => {
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
