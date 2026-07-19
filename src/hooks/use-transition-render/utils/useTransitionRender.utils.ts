import { duration } from '@theme/tokens/motion.ts'

/**
 * Parses a duration token value (e.g. `'150ms'`) into milliseconds.
 */
const parseDurationMs = (value: string): number => {
    const ms = parseInt(value, 10)
    return Number.isNaN(ms) ? 0 : ms
}

/**
 * Resolves a duration CSS variable reference (e.g. `var(--duration-normal)`)
 * to milliseconds using the static theme token map.
 */
const resolveDurationMs = (varRef: string): number => {
    const tokenName = varRef.replace(/^var\(--duration-/, '').replace(/\)$/, '')
    const tokenValue = duration[tokenName as keyof typeof duration]

    return tokenValue ? parseDurationMs(tokenValue) : parseDurationMs(duration.normal)
}

/**
 * Returns `true` if the user has requested reduced motion at the OS/browser level.
 * Falls back to `false` in environments where `matchMedia` is unavailable (SSR, tests).
 */
const getPrefersReducedMotion = (): boolean =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { parseDurationMs, resolveDurationMs, getPrefersReducedMotion }
