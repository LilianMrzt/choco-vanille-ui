import type { ReactElement } from 'react'
import { Stepper } from '@components/navigation/stepper'
import type { StepperStoryArgs } from '../../types'

/**
 * Renders the root with independently named step slots.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root and slot demonstration props.
 * @returns The complete stepper.
 * @example <StepperPlayground {...args} />
 */
const StepperPlayground = (props: StepperStoryArgs): ReactElement => {
    const { children: _children, accountLabel, preferencesLabel, reviewLabel, firstDescription, firstDisabled, firstSize, ...rootProps } = props

    return (
        <Stepper {...rootProps}>
            <Stepper.Item
                description={firstDescription}
                disabled={firstDisabled}
                label={accountLabel}
                size={firstSize}
            />
            <Stepper.Item
                description={'Choose your options'}
                label={preferencesLabel}
            />
            <Stepper.Item
                description={'Confirm your choices'}
                label={reviewLabel}
            />
        </Stepper>
    )
}

export default StepperPlayground
