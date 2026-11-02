import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Starts a bounded transition window only when the resolved theme changes.
 *
 * @param resolvedTheme - Current resolved theme.
 * @param duration - Transition duration in milliseconds; zero disables transitions.
 * @returns Whether the transition window is active.
 * @example
 * const transitioning = useThemeTransition('dark', 150)
 */
export const useThemeTransition = (
    resolvedTheme: string,
    duration: number,
): boolean => {
    const previousTheme = useRef(resolvedTheme)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useIsomorphicLayoutEffect(() => {
        const transitionDuration = Math.max(0, duration)

        if (transitionDuration === 0) {
            previousTheme.current = resolvedTheme
            setIsTransitioning(false)
            return
        }

        if (previousTheme.current === resolvedTheme) {
            return
        }

        previousTheme.current = resolvedTheme

        setIsTransitioning(true)
        const timeout = window.setTimeout(
            () => setIsTransitioning(false),
            transitionDuration,
        )
        return () => window.clearTimeout(timeout)
    }, [duration, resolvedTheme])

    return isTransitioning
}
