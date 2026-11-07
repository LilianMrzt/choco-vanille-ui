import { createElement } from 'react'
import type { Meta } from '@storybook/react-vite'

import { Stepper, STEPPER_ORIENTATIONS } from '@components/navigation/stepper'

import { fn } from 'storybook/test'
import type { StepperStoryArgs } from '@stories/navigation/stepper/types'

export const DEFAULT_ARGS = {
    'aria-label': 'Signup progress',
    currentStep: 2,
    orientation: 'horizontal',
    children: createElement(Stepper.Item, { label: 'Account' }),
    accountLabel: 'Account',
    preferencesLabel: 'Preferences',
    reviewLabel: 'Review',
    firstDescription: 'Your details',
    firstDisabled: false,
    firstSize: 'md',
    onStepChange: fn(),
} satisfies NonNullable<Meta<StepperStoryArgs>['args']>

export const ARG_TYPES = {
    'aria-label': { control: 'text', description: 'Accessible navigation landmark name.' },
    currentStep: { control: { type: 'number', min: 1, step: 1 }, description: 'One-based current step.' },
    orientation: { control: 'select', options: Object.values(STEPPER_ORIENTATIONS) },
    onStepChange: { control: false, description: 'Selected step callback; requires consumer code.' },
    children: { control: false, description: 'Composed items; edit their demonstration controls instead.', table: { category: 'Compound: Item' } },
    accountLabel: { control: 'text', table: { category: 'Compound: Item' } },
    firstDescription: { control: 'text', description: 'First item description.', table: { category: 'Compound: Item' } },
    firstDisabled: { control: 'boolean', description: 'Disable the first interactive step.', table: { category: 'Compound: Item' } },
    firstSize: { control: 'select', options: ['sm', 'md'], description: 'First item size.', table: { category: 'Compound: Item' } },
    preferencesLabel: { control: 'text', table: { category: 'Compound: Item' } },
    reviewLabel: { control: 'text', table: { category: 'Compound: Item' } },
    className: { control: false, description: 'Additional classes; use consumer code to supply a stylesheet.' },
    style: { control: false, description: 'Inline style override; use consumer code.' },
    ref: { control: false, description: 'Navigation DOM ref; requires a React ref object.' },
} satisfies NonNullable<Meta<StepperStoryArgs>['argTypes']>
