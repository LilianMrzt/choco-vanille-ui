import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Stepper } from '@components/navigation/stepper'
import StepperDocsPage from '@stories/navigation/stepper/components/stepper-docs-page/StepperDocsPage'
import StepperExamples from '@stories/navigation/stepper/components/stepper-examples/StepperExamples'
import { ARG_TYPES, DEFAULT_ARGS, type StepperStoryArgs } from '@stories/navigation/stepper/constants'
import examplesSource from '@stories/navigation/stepper/sources/StepperExamples.source.tsx.txt?raw'
import { createStepperSource } from '@stories/navigation/stepper/utils/create-stepper-source/createStepperSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/Stepper',
    component: Stepper,
    tags: ['autodocs'],
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
    const { children: _children, accountLabel, preferencesLabel, reviewLabel, onStepChange, ...rootProps } = args

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
        <Stepper
            {...rootProps}
            onStepChange={handleStepChange}
        >
            <Stepper.Item
                label={accountLabel}
                description={'Your details'}
            />
            <Stepper.Item
                label={preferencesLabel}
                description={'Choose your options'}
            />
            <Stepper.Item
                label={reviewLabel}
                description={'Confirm your choices'}
            />
        </Stepper>
    )
}

export const Playground: Story = { render: ControlledStepper }
export const Orientations: Story = { parameters: { docs: { ...storySource(examplesSource) } }, render: StepperExamples }
