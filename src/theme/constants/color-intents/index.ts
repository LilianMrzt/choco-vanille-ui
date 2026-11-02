import type { ThemeColorIntent } from '@theme/tokens/colors/types/index.ts'

/** Maps independent component intent props to the semantic theme vocabulary. */
export const COLOR_INTENT_TOKENS = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'neutral',
    destructive: 'danger',
    success: 'success',
    warning: 'warning',
    info: 'info',
    purple: 'accentPurple',
    pink: 'accentPink',
    orange: 'accentOrange',
    teal: 'accentTeal',
    cyan: 'accentCyan',
    indigo: 'accentIndigo',
} as const satisfies Record<string, ThemeColorIntent>
