import type * as React from 'react'

import type { SkeletonRecipeVariants } from '@components/feedback/skeleton/styles/Skeleton.css.ts'
import type { RefAttributes } from 'react'

export type SkeletonProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> &
  RefAttributes<HTMLDivElement> &
  SkeletonRecipeVariants & {
    /** Explicit width for the placeholder. */
    width?: React.CSSProperties['width']
    /** Explicit height for the placeholder. */
    height?: React.CSSProperties['height']
  }
