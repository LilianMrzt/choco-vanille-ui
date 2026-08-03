import { useEffect, useLayoutEffect, useState } from 'react'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Starts a bounded transition window only when the resolved theme changes.
 */
export const useThemeTransition = (
    resolvedTheme: string,
    duration: number,
) => {
    const [settledTheme, setSettledTheme] = useState(resolvedTheme)
    const isTransitioning = settledTheme !== resolvedTheme

    useIsomorphicLayoutEffect(() => {
        if (!isTransitioning) {
            return
        }

        const transitionDuration = Math.max(0, duration)

        if (transitionDuration === 0) {
            setSettledTheme(resolvedTheme)
            return
        }

        const timeout = window.setTimeout(
            () => setSettledTheme(resolvedTheme),
            transitionDuration,
        )

        return () => window.clearTimeout(timeout)
    }, [duration, isTransitioning, resolvedTheme])

    return isTransitioning
}
