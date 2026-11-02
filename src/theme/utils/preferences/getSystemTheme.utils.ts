export const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)'

/**
 * Reads the current system color scheme, or returns light outside a browser.
 *
 * @returns The system scheme, or light when `window` is unavailable.
 * @example
 * const scheme = getSystemTheme()
 */
export const getSystemTheme = (): 'light' | 'dark' =>
    typeof window !== 'undefined' && window.matchMedia(SYSTEM_THEME_QUERY).matches
        ? 'dark'
        : 'light'
