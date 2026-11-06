import type * as React from 'react'

import type Stepper from '@components/navigation/stepper/Stepper.tsx'
import type { StepperItemProps } from '@components/navigation/stepper/components/stepper-item/types'
import type { STEPPER_ORIENTATIONS } from '@components/navigation/stepper/constants'

/** Stepper layout direction. */
export type StepperOrientation = (typeof STEPPER_ORIENTATIONS)[keyof typeof STEPPER_ORIENTATIONS]

/** Props for the controlled step navigation landmark. */
export type StepperProps = Readonly<Omit<React.HTMLAttributes<HTMLElement>, 'aria-label' | 'children'> &
    React.RefAttributes<HTMLElement> & {
        /** Accessible landmark name. */
        'aria-label': string
        /** Ordered Stepper.Item elements. */
        children: React.ReactElement<StepperItemProps> | React.ReactElement<StepperItemProps>[]
        /** Current one-based step. */
        currentStep: number
        /** Called when a step is activated. */
        onStepChange?: (step: number) => void
        /** Layout direction; defaults to `horizontal`. */
        orientation?: StepperOrientation
    }>

/** Stepper root and its item slot. */
export type StepperCompound = typeof Stepper
