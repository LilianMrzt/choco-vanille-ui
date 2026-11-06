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

import {
    StepIndicator,
    type StepIndicatorProps,
} from '@components/navigation/step-indicator'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

type StepIndicatorStoryArgs = Omit<StepIndicatorProps, 'children'> & {
    accountLabel: string
    preferencesLabel: string
    reviewLabel: string
    confirmationLabel: string
}

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| ---------------- | -------- | ---- | ----- |
| \`aria-label\` | Yes | \`string\` | Names the StepIndicator navigation landmark. |
| \`StepIndicator.Item label\` | Yes | \`string\` | Provides the accessible name for each dot. |
| \`currentStep\` | Yes | \`number\` | One-based current step. |
| \`aria-current\` | Automatic | \`"step"\` | Applied to the current step. |

Dots are native buttons when \`onStepChange\` is provided.
`

const StepIndicatorDocsPage = () => (
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
    title: 'Navigation/StepIndicator',
    parameters: {
        layout: 'centered',
        docs: {
            page: StepIndicatorDocsPage,
            description: {
                component: md /* language=markdown */ `
A compact dot-only progress indicator for onboarding, carousels and multi-step
flows where full step labels are not needed visually.
                `,
            },
        },
    },
    argTypes: {
        'aria-label': { control: 'text' },
        currentStep: { control: { type: 'number', min: 1, step: 1 } },
        onStepChange: { action: 'step changed' },
        accountLabel: { control: 'text', table: { category: 'Compound: Item' } },
        preferencesLabel: { control: 'text', table: { category: 'Compound: Item' } },
        reviewLabel: { control: 'text', table: { category: 'Compound: Item' } },
        confirmationLabel: { control: 'text', table: { category: 'Compound: Item' } },
    },
    args: {
        'aria-label': 'Signup progress',
        currentStep: 2,
        accountLabel: 'Account',
        preferencesLabel: 'Preferences',
        reviewLabel: 'Review',
        confirmationLabel: 'Confirmation',
    },
} satisfies Meta<StepIndicatorStoryArgs>

export default meta

type Story = StoryObj<StepIndicatorStoryArgs>

export const Playground: Story = {
    args: meta.args,
    render: (args: StepIndicatorStoryArgs) => {
        const [currentStep, setCurrentStep] = useState(args.currentStep)

        return (
            <StepIndicator
                aria-label={args['aria-label']}
                currentStep={currentStep}
                onStepChange={(step) => {
                    setCurrentStep(step)
                    args.onStepChange?.(step)
                }}
            >
                <StepIndicator.Item label={args.accountLabel} />
                <StepIndicator.Item label={args.preferencesLabel} />
                <StepIndicator.Item label={args.reviewLabel} />
                <StepIndicator.Item label={args.confirmationLabel} />
            </StepIndicator>
        )
    },
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<StepIndicator aria-label={'Signup progress'} currentStep={2} onStepChange={setCurrentStep}>
  <StepIndicator.Item label={'Account'} />
  <StepIndicator.Item label={'Preferences'} />
  <StepIndicator.Item label={'Review'} />
  <StepIndicator.Item label={'Confirmation'} />
</StepIndicator>`),
        },
    },
}

export const States: Story = {
    args: meta.args,
    render: () => (
        <StepIndicator
            aria-label={'Checkout progress'}
            currentStep={3}
        >
            <StepIndicator.Item label={'Account'} />
            <StepIndicator.Item label={'Preferences'} />
            <StepIndicator.Item label={'Review'} />
            <StepIndicator.Item label={'Confirmation'} />
        </StepIndicator>
    ),
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<StepIndicator aria-label={'Checkout progress'} currentStep={3}>
  <StepIndicator.Item label={'Account'} />
  <StepIndicator.Item label={'Preferences'} />
  <StepIndicator.Item label={'Review'} />
  <StepIndicator.Item label={'Confirmation'} />
</StepIndicator>`),
        },
    },
}
