import type { PROGRESS_COLORS } from '@components/feedback/progress/constants'

/** Semantic color intents for Progress, matching Badge. */
export type ProgressColor =
  (typeof PROGRESS_COLORS)[keyof typeof PROGRESS_COLORS];

/** Size variants for Progress. */
export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Border radius variants for the linear Progress track. */
export type ProgressBorderRadius =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'full';
