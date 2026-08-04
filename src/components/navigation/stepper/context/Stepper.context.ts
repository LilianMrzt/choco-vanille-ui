import { createContext } from 'react'

export type StepperItemContextValue = {
  stepNumber: number;
  isCurrent: boolean;
  isCompleted: boolean;
  onStepChange?: (step: number) => void;
};

export const StepperItemContext = createContext<StepperItemContextValue | null>(
    null,
)
