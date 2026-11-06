import type { Meta } from '@storybook/react-vite'

import type { StepIndicatorProps } from '@components/navigation/step-indicator'

export type StepIndicatorStoryArgs = Omit<StepIndicatorProps, 'children'> & {
    accountLabel: string
    preferencesLabel: string
    reviewLabel: string
    confirmationLabel: string
}

export const DEFAULT_ARGS = {
    'aria-label': 'Signup progress',
    currentStep: 2,
    accountLabel: 'Account',
    preferencesLabel: 'Preferences',
    reviewLabel: 'Review',
    confirmationLabel: 'Confirmation',
} satisfies NonNullable<Meta<StepIndicatorStoryArgs>['args']>

export const ARG_TYPES = {
    'aria-label': { control: 'text', description: 'Accessible navigation landmark name.' },
    currentStep: { control: { type: 'number', min: 1, step: 1 }, description: 'One-based current step.' },
    onStepChange: { control: false, action: 'step changed', description: 'Called with the selected step.' },
    accountLabel: { control: 'text', table: { category: 'Compound: Item' } },
    preferencesLabel: { control: 'text', table: { category: 'Compound: Item' } },
    reviewLabel: { control: 'text', table: { category: 'Compound: Item' } },
    confirmationLabel: { control: 'text', table: { category: 'Compound: Item' } },
    className: { control: false },
    style: { control: false },
    ref: { control: false },
} satisfies NonNullable<Meta<StepIndicatorStoryArgs>['argTypes']>
