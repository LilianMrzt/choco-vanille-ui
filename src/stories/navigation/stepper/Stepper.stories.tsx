import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { useState } from 'react'

import { Stepper } from '@components/navigation/stepper'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const defaultItems = (
    <>
        <Stepper.Item label={'Account'} />
        <Stepper.Item label={'Preferences'} />
        <Stepper.Item label={'Review'} />
    </>
)

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required  | Type     | Notes                                  |
| ---------------- | --------- | -------- | -------------------------------------- |
| \`aria-label\`     | Yes       | \`string\` | Names the Stepper navigation landmark. |
| \`currentStep\`    | Yes       | \`number\` | One-based current step.                |
| \`aria-current\`   | Automatic | \`"step"\` | Applied to the current step.           |
`

const StepperDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Navigation/Stepper',
    component: Stepper,
    parameters: {
        layout: 'centered',
        docs: {
            page: StepperDocsPage,
            description: {
                component: md /* language=markdown */ `
A progress indicator for multi-step journeys, onboarding and complex forms.
Use \`onStepChange\` to make completed or upcoming steps selectable.
        `,
            },
        },
    },
    argTypes: {
        'aria-label': { control: 'text' },
        currentStep: { control: { type: 'number', min: 1, step: 1 } },
        orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
        onStepChange: { action: 'step changed' },
        children: {
            control: false,
            table: { category: 'Compound: Item' },
        },
    },
    args: {
        'aria-label': 'Signup progress',
        currentStep: 2,
        children: defaultItems,
    },
} satisfies Meta<typeof Stepper>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: meta.args,
    render: (args) => {
        const [currentStep, setCurrentStep] = useState(args.currentStep)

        return (
            <div style={{ minWidth: '32rem' }}>
                <Stepper
                    {...args}
                    currentStep={currentStep}
                    onStepChange={(step) => {
                        setCurrentStep(step)
                        args.onStepChange?.(step)
                    }}
                >
                    <Stepper.Item
                        label={'Account'}
                        description={'Your details'}
                    />
                    <Stepper.Item
                        label={'Preferences'}
                        description={'Choose your options'}
                    />
                    <Stepper.Item
                        label={'Review'}
                        description={'Confirm your choices'}
                    />
                </Stepper>
            </div>
        )
    },
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Stepper aria-label={'Signup progress'} currentStep={2} onStepChange={setCurrentStep}>
  <Stepper.Item label={'Account'} description={'Your details'} />
  <Stepper.Item label={'Preferences'} description={'Choose your options'} />
  <Stepper.Item label={'Review'} description={'Confirm your choices'} />
</Stepper>`),
        },
    },
}

export const Orientations: Story = {
    args: meta.args,
    render: () => (
        <div style={{ display: 'grid', gap: '2rem', minWidth: '32rem' }}>
            <Stepper
                aria-label={'Horizontal progress'}
                currentStep={2}
            >
                <Stepper.Item label={'Account'} />
                <Stepper.Item label={'Preferences'} />
                <Stepper.Item label={'Review'} />
            </Stepper>
            <Stepper
                aria-label={'Vertical progress'}
                currentStep={2}
                orientation={'vertical'}
            >
                <Stepper.Item label={'Account'} />
                <Stepper.Item label={'Preferences'} />
                <Stepper.Item label={'Review'} />
            </Stepper>
        </div>
    ),
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Stepper aria-label={'Horizontal progress'} currentStep={2}>
  <Stepper.Item label={'Account'} />
  <Stepper.Item label={'Preferences'} />
  <Stepper.Item label={'Review'} />
</Stepper>
<Stepper aria-label={'Vertical progress'} currentStep={2} orientation={'vertical'}>
  <Stepper.Item label={'Account'} />
  <Stepper.Item label={'Preferences'} />
  <Stepper.Item label={'Review'} />
</Stepper>`),
        },
    },
}

export const States: Story = {
    args: meta.args,
    render: () => (
        <div style={{ minWidth: '32rem' }}>
            <Stepper
                aria-label={'Checkout progress'}
                currentStep={2}
                onStepChange={() => {}}
            >
                <Stepper.Item label={'Account'} />
                <Stepper.Item label={'Preferences'} />
                <Stepper.Item
                    label={'Payment'}
                    disabled
                />
            </Stepper>
        </div>
    ),
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<div style={{ minWidth: '32rem' }}>
  <Stepper aria-label={'Checkout progress'} currentStep={2} onStepChange={() => {}}>
    <Stepper.Item label={'Account'} />
    <Stepper.Item label={'Preferences'} />
    <Stepper.Item label={'Payment'} disabled />
  </Stepper>
</div>`),
        },
    },
}

export const CustomContent: Story = {
    args: meta.args,
    render: () => (
        <Stepper
            aria-label={'Custom progress'}
            currentStep={3}
        >
            <Stepper.Item label={'Account'} />
            <Stepper.Item>
                <strong>Custom active content</strong>
            </Stepper.Item>
            <Stepper.Item label={'Review'} />
        </Stepper>
    ),
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Stepper aria-label={'Custom progress'} currentStep={3}>
  <Stepper.Item label={'Account'} />
  <Stepper.Item><strong>Custom active content</strong></Stepper.Item>
  <Stepper.Item label={'Review'} />
</Stepper>`),
        },
    },
}
