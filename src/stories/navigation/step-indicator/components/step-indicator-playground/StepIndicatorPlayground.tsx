import type { ReactElement } from 'react'
import { StepIndicator } from '@components/navigation/step-indicator'
import type { StepIndicatorStoryArgs } from '../../types'

/**
 * Renders the root and four named step dots.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root and item labels.
 * @returns The complete indicator.
 * @example <StepIndicatorPlayground {...args} />
 */
const StepIndicatorPlayground = (props: StepIndicatorStoryArgs): ReactElement => {
    const { accountLabel, preferencesLabel, reviewLabel, confirmationLabel, firstDisabled, ...rootProps } = props

    return (
        <StepIndicator {...rootProps}>
            <StepIndicator.Item
                disabled={firstDisabled}
                label={accountLabel}
            />
            <StepIndicator.Item label={preferencesLabel} />
            <StepIndicator.Item label={reviewLabel} />
            <StepIndicator.Item label={confirmationLabel} />
        </StepIndicator>
    )
}

export default StepIndicatorPlayground
