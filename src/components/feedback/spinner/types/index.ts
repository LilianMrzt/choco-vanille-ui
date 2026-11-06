import type * as React from 'react'

import type { SPINNER_COLORS } from '@components/feedback/spinner/constants'

/** Semantic color intents for Spinner. */
export type SpinnerColor = (typeof SPINNER_COLORS)[keyof typeof SPINNER_COLORS]

/** Size variants for Spinner. */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type SpinnerProps = Readonly<
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> &
    React.RefAttributes<HTMLSpanElement> & {
        /** Size variant. Defaults to `md`. */
        size?: SpinnerSize
        /** Semantic color intent. Defaults to `primary`. */
        color?: SpinnerColor
    }
>
