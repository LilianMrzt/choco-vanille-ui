import type * as React from 'react'

import type { StepIndicatorItemProps } from '@components/navigation/step-indicator/components/step-indicator-item/types/StepIndicatorItem.props.ts'

export type StepIndicatorProps = Omit<
    React.HTMLAttributes<HTMLElement>,
    'aria-label' | 'children'
> & {
    /** Accessible name for the step indicator navigation landmark. */
    'aria-label': string
    /** Ordered `StepIndicator.Item` elements displayed by the indicator. */
    children:
        | React.ReactElement<StepIndicatorItemProps>
        | React.ReactElement<StepIndicatorItemProps>[]
    /** The current step, starting at 1. */
    currentStep: number
    /** Called with the selected step number when a dot is activated. */
    onStepChange?: (step: number) => void
    /** Ref forwarded to the navigation landmark. */
    ref?: React.Ref<HTMLElement>
}
