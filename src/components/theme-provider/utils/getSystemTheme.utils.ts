/**
 * Reads the OS color-scheme preference.  Returns `'light'` in SSR / non-browser
 * environments to avoid hydration mismatches.
 */
export const getSystemTheme = (): 'light' | 'dark' =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
