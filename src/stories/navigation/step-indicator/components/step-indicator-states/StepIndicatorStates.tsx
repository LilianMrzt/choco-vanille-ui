import type { ReactElement } from 'react'

import { StepIndicator } from '@components/navigation/step-indicator'

/**
 * Demonstrates a non-interactive indicator.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The indicator.
 * @example
 * <StepIndicatorStates />
 */
const StepIndicatorStates = (): ReactElement => (
    <StepIndicator
        aria-label={'Checkout progress'}
        currentStep={3}
    >
        <StepIndicator.Item label={'Account'} />
        <StepIndicator.Item label={'Preferences'} />
        <StepIndicator.Item label={'Review'} />
        <StepIndicator.Item label={'Confirmation'} />
    </StepIndicator>
)

export default StepIndicatorStates
