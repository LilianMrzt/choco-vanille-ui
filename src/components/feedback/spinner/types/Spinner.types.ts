import type { SPINNER_COLORS } from '@components/feedback/spinner/constants'

/** Semantic color intents for Spinner. */
export type SpinnerColor =
  (typeof SPINNER_COLORS)[keyof typeof SPINNER_COLORS]

/** Size variants for Spinner. Defaults to `md`. */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
