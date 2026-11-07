import type { Meta } from '@storybook/react-vite'

import { fn } from 'storybook/test'
import type { StepIndicatorStoryArgs } from '@stories/navigation/step-indicator/types'

export const DEFAULT_ARGS = {
    'aria-label': 'Signup progress',
    currentStep: 2,
    accountLabel: 'Account',
    preferencesLabel: 'Preferences',
    reviewLabel: 'Review',
    confirmationLabel: 'Confirmation',
    firstDisabled: false,
    onStepChange: fn(),
} satisfies NonNullable<Meta<StepIndicatorStoryArgs>['args']>

export const ARG_TYPES = {
    'aria-label': { control: 'text', description: 'Accessible navigation landmark name.' },
    currentStep: { control: { type: 'number', min: 1, step: 1 }, description: 'One-based current step.' },
    onStepChange: { control: false, action: 'step changed', description: 'Called with the selected step.' },
    accountLabel: { control: 'text', table: { category: 'Compound: Item' } },
    firstDisabled: { control: 'boolean', description: 'Disable the first interactive dot.', table: { category: 'Compound: Item' } },
    preferencesLabel: { control: 'text', table: { category: 'Compound: Item' } },
    reviewLabel: { control: 'text', table: { category: 'Compound: Item' } },
    confirmationLabel: { control: 'text', table: { category: 'Compound: Item' } },
    className: { control: false, description: 'Additional classes; use consumer code to supply a stylesheet.' },
    style: { control: false, description: 'Inline style override; use consumer code.' },
    ref: { control: false, description: 'Navigation DOM ref; requires a React ref object.' },
} satisfies NonNullable<Meta<StepIndicatorStoryArgs>['argTypes']>
