import type * as React from 'react'

import type StepIndicator from '@components/navigation/step-indicator/StepIndicator.tsx'
import type { StepIndicatorItemProps } from '@components/navigation/step-indicator/components/step-indicator-item/types'

/** Props for the controlled step indicator. */
export type StepIndicatorProps = Readonly<
    Omit<React.HTMLAttributes<HTMLElement>, 'aria-label' | 'children'> & {
        /** Accessible navigation landmark name. */
        'aria-label': string
        /** Ordered step indicator items. */
        children: React.ReactElement<StepIndicatorItemProps> | React.ReactElement<StepIndicatorItemProps>[]
        /** Current step, starting at 1. */
        currentStep: number
        /** Called with the selected step number. */
        onStepChange?: (step: number) => void
        /** Ref to the navigation landmark. */
        ref?: React.Ref<HTMLElement>
    }
>

/** Step indicator root and its item slot. */
export type StepIndicatorCompound = typeof StepIndicator
