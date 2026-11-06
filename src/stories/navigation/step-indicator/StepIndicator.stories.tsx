import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { StepIndicator } from '@components/navigation/step-indicator'
import StepIndicatorDocsPage from '@stories/navigation/step-indicator/components/step-indicator-docs-page/StepIndicatorDocsPage'
import StepIndicatorStates from '@stories/navigation/step-indicator/components/step-indicator-states/StepIndicatorStates'
import { ARG_TYPES, DEFAULT_ARGS, type StepIndicatorStoryArgs } from '@stories/navigation/step-indicator/constants'
import statesSource from '@stories/navigation/step-indicator/sources/StepIndicatorStates.source.tsx.txt?raw'
import { createStepIndicatorSource } from '@stories/navigation/step-indicator/utils/create-step-indicator-source/createStepIndicatorSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/StepIndicator',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: { component: 'A controlled dot-based progress indicator for multi-step flows.' },
            page: StepIndicatorDocsPage,
            source: { type: 'dynamic', transform: createStepIndicatorSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<StepIndicatorStoryArgs>

export default meta

type Story = StoryObj<StepIndicatorStoryArgs>

/**
 * Synchronizes step selection with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @returns The interactive indicator.
 * @example
 * <ControlledStepIndicator />
 */
const ControlledStepIndicator = () => {
    const [args, updateArgs] = useArgs<StepIndicatorStoryArgs>()
    const { accountLabel, preferencesLabel, reviewLabel, confirmationLabel, onStepChange, ...rootProps } = args

    /**
     * Forwards selection and updates Storybook Controls.
     * @internal Storybook-only handler; not part of the public package API.
     * @param step - Selected step.
     * @returns Nothing.
     * @example
     * handleStepChange(2)
     */
    const handleStepChange = (step: number): void => {
        onStepChange?.(step)
        updateArgs({ currentStep: step })
    }

    return (
        <StepIndicator
            {...rootProps}
            onStepChange={handleStepChange}
        >
            <StepIndicator.Item label={accountLabel} />
            <StepIndicator.Item label={preferencesLabel} />
            <StepIndicator.Item label={reviewLabel} />
            <StepIndicator.Item label={confirmationLabel} />
        </StepIndicator>
    )
}

export const Playground: Story = { render: ControlledStepIndicator }

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: StepIndicatorStates,
}
