import type { FC } from 'react'

import type StepIndicatorItem from '@components/navigation/step-indicator/components/step-indicator-item/StepIndicatorItem.tsx'
import type { StepIndicatorProps } from '@components/navigation/step-indicator/types/StepIndicator.props.ts'

export type StepIndicatorCompound = FC<StepIndicatorProps> & {
    Item: typeof StepIndicatorItem
}
