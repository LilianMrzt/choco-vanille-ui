import type * as React from 'react'

import type { BoxProps } from '@components/layout/box'

import type {
    ProgressBorderRadius,
    ProgressColor,
    ProgressSize,
} from '@components/feedback/progress/types/Progress.types.ts'

type ProgressAccessibleName =
  | { label: string }
  | { 'aria-label': string }
  | { 'aria-labelledby': string }

export type ProgressBaseProps = Omit<
  BoxProps,
  'as' | 'children' | 'ref' | 'aria-label' | 'aria-labelledby'
> & {
  /** Ref forwarded to the outermost element. */
  ref?: React.Ref<HTMLDivElement>;
  /** Current progress value between 0 and 100. */
  value: number;
  /** Semantic color intent. Defaults to `primary`. */
  color?: ProgressColor;
  /** Size variant. Defaults to `sm`. */
  size?: ProgressSize;
  /** Border radius of the linear track. Defaults to `sm`. */
  borderRadius?: ProgressBorderRadius;
  /**
   * Text displayed alongside (linear) or inside (circular) the progress.
   * Pass `true` to render the value as a percentage, or a custom string.
   */
  quantityLabel?: string | true;
} & ProgressAccessibleName
