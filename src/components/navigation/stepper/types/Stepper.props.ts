import type * as React from 'react'

import type { StepperItemProps } from '@components/navigation/stepper/components/stepper-item/types/StepperItem.props.ts'
import type { StepperOrientation } from '@components/navigation/stepper/types/Stepper.types.ts'

export type StepperProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'aria-label' | 'children'
> &
  React.RefAttributes<HTMLElement> & {
    /** Accessible name for the Stepper navigation landmark. */
    'aria-label': string;
    /** Ordered `Stepper.Item` elements displayed by the Stepper. */
    children:
      | React.ReactElement<StepperItemProps>
      | React.ReactElement<StepperItemProps>[];
    /** The current step, starting at 1. */
    currentStep: number;
    /** Called with the selected step number when a step is activated. */
    onStepChange?: (step: number) => void;
    /** Layout direction of the Stepper. Defaults to `horizontal`. */
    orientation?: StepperOrientation;
  };
