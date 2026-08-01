import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Starts a bounded transition window only when the resolved theme changes.
 */
export const useThemeTransition = (
    resolvedTheme: string,
    duration: number,
) => {
    const previousTheme = useRef(resolvedTheme)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useIsomorphicLayoutEffect(() => {
        if (previousTheme.current === resolvedTheme) {
            return
        }

        previousTheme.current = resolvedTheme
        const transitionDuration = Math.max(0, duration)

        if (transitionDuration === 0) {
            setIsTransitioning(false)
            return
        }

        setIsTransitioning(true)
        const timeout = window.setTimeout(
            () => setIsTransitioning(false),
            transitionDuration,
        )

        return () => window.clearTimeout(timeout)
    }, [duration, resolvedTheme])

    return isTransitioning
}
