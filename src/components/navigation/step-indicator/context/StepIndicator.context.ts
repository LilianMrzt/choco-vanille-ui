import { createContext } from 'react'

export type StepIndicatorContextValue = {
    stepNumber: number
    isCurrent: boolean
    isCompleted: boolean
    onStepChange?: (step: number) => void
}

export const StepIndicatorContext =
    createContext<StepIndicatorContextValue | null>(null)
