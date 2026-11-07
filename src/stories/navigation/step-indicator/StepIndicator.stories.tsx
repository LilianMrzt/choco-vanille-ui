import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import StepIndicatorDocsPage from '@stories/navigation/step-indicator/components/step-indicator-docs-page/StepIndicatorDocsPage'
import StepIndicatorStates from '@stories/navigation/step-indicator/components/step-indicator-states/StepIndicatorStates'
import StepIndicatorPlayground from './components/step-indicator-playground/StepIndicatorPlayground'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/navigation/step-indicator/constants'
import type { StepIndicatorStoryArgs } from './types'
import statesSource from '@stories/navigation/step-indicator/sources/StepIndicatorStates.source.txt?raw'
import { createStepIndicatorSource } from '@stories/navigation/step-indicator/utils/create-step-indicator-source/createStepIndicatorSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/StepIndicator',
    component: StepIndicatorPlayground,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0, overflowX: 'auto' }}>
                <Story />
            </div>
        ),
    ],
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

    /**
     * Forwards selection and updates Storybook Controls.
     * @internal Storybook-only handler; not part of the public package API.
     * @param step - Selected step.
     * @returns Nothing.
     * @example
     * handleStepChange(2)
     */
    const handleStepChange = (step: number): void => {
        args.onStepChange?.(step)
        updateArgs({ currentStep: step })
    }

    return (
        <StepIndicatorPlayground
            {...args}
            onStepChange={handleStepChange}
        />
    )
}

export const Playground: Story = { render: ControlledStepIndicator }

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: StepIndicatorStates,
}
