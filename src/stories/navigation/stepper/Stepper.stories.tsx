import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Stepper } from '@components/navigation/stepper'
import StepperDocsPage from '@stories/navigation/stepper/components/stepper-docs-page/StepperDocsPage'
import StepperExamples from '@stories/navigation/stepper/components/stepper-examples/StepperExamples'
import StepperPlayground from './components/stepper-playground/StepperPlayground'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/navigation/stepper/constants'
import type { StepperStoryArgs } from './types'
import examplesSource from '@stories/navigation/stepper/sources/StepperExamples.source.txt?raw'
import { createStepperSource } from '@stories/navigation/stepper/utils/create-stepper-source/createStepperSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/Stepper',
    component: Stepper,
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
            description: { component: 'A controlled step navigator for multi-step journeys.' },
            page: StepperDocsPage,
            source: { type: 'dynamic', transform: createStepperSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<StepperStoryArgs>

export default meta

type Story = StoryObj<StepperStoryArgs>

/**
 * Synchronizes step selection with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @returns The interactive stepper.
 * @example
 * <ControlledStepper />
 */
const ControlledStepper = () => {
    const [args, updateArgs] = useArgs<StepperStoryArgs>()

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
        <StepperPlayground
            {...args}
            onStepChange={handleStepChange}
        />
    )
}

export const Playground: Story = { render: ControlledStepper }
export const Orientations: Story = { parameters: { layout: 'padded', docs: { ...storySource(examplesSource) } }, render: StepperExamples }
