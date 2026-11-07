import type { ProgressSize } from '@components/feedback/progress/types'

export const PROGRESS_COLORS = {
    primary: 'primary',
    secondary: 'secondary',
    neutral: 'neutral',
    danger: 'danger',
    success: 'success',
    warning: 'warning',
    info: 'info',
    purple: 'purple',
    pink: 'pink',
    orange: 'orange',
    teal: 'teal',
    cyan: 'cyan',
    indigo: 'indigo',
} as const

export const PROGRESS_COLORS_ARRAY = Object.values(PROGRESS_COLORS)

export const PROGRESS_SIZE_TO_HEIGHT: Record<ProgressSize, string> = {
    xs: '0.25rem', sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.25rem',
}

export const PROGRESS_SIZE_TO_CIRCULAR_SIZE: Record<ProgressSize, number> = {
    xs: 32, sm: 48, md: 64, lg: 80, xl: 96,
}

export const PROGRESS_SIZE_TO_STROKE_WIDTH: Record<ProgressSize, number> = {
    xs: 3, sm: 4, md: 6, lg: 8, xl: 10,
}
