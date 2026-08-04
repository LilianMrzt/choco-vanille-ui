import type { FC } from 'react'

import type StepperItem from '@components/navigation/stepper/components/stepper-item/StepperItem.tsx'
import type { StepperProps } from '@components/navigation/stepper/types/Stepper.props.ts'

export type StepperCompound = FC<StepperProps> & {
  Item: typeof StepperItem;
};
