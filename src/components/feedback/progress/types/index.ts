import type * as React from 'react'

import type { BoxProps } from '@components/layout/box'
import type { PROGRESS_COLORS } from '@components/feedback/progress/constants'
import type { Radius } from '@theme/tokens/radius/types/index.ts'

/** Semantic color intents for progress indicators. */
export type ProgressColor = (typeof PROGRESS_COLORS)[keyof typeof PROGRESS_COLORS]
/** Size variants for progress indicators. */
export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
/** Border radius variants for the linear track. */
export type ProgressBorderRadius = keyof Radius

type ProgressAccessibleName =
    | { label: string }
    | { 'aria-label': string }
    | { 'aria-labelledby': string }

/** Shared props for linear and circular progress. */
export type ProgressBaseProps = Readonly<Omit<
    BoxProps,
    'as' | 'children' | 'ref' | 'aria-label' | 'aria-labelledby'
> & {
    /** Ref forwarded to the outermost element. */
    ref?: React.Ref<HTMLDivElement>
    /** Current progress value, clamped to 0–100. */
    value: number
    /** Semantic color intent. Defaults to `primary`. */
    color?: ProgressColor
    /** Size variant. Defaults to `sm`. */
    size?: ProgressSize
    /** Border radius of the linear track. Defaults to `6`. */
    borderRadius?: ProgressBorderRadius
    /** Pass `true` for a percentage or provide a custom quantity. */
    quantityLabel?: string | true
} & ProgressAccessibleName>

export type ProgressRenderProps = ProgressBaseProps & {
    label?: string
    'aria-label'?: string
    'aria-labelledby'?: string
}
