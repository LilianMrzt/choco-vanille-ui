import { createElement, type ComponentProps } from 'react'
import type { Meta } from '@storybook/react-vite'

import { Stepper, STEPPER_ORIENTATIONS } from '@components/navigation/stepper'

export type StepperStoryArgs = ComponentProps<typeof Stepper> & {
    accountLabel: string
    preferencesLabel: string
    reviewLabel: string
}

export const DEFAULT_ARGS = {
    'aria-label': 'Signup progress',
    currentStep: 2,
    orientation: 'horizontal',
    children: createElement(Stepper.Item, { label: 'Account' }),
    accountLabel: 'Account',
    preferencesLabel: 'Preferences',
    reviewLabel: 'Review',
} satisfies NonNullable<Meta<StepperStoryArgs>['args']>

export const ARG_TYPES = {
    'aria-label': { control: 'text', description: 'Accessible navigation landmark name.' },
    currentStep: { control: { type: 'number', min: 1, step: 1 }, description: 'One-based current step.' },
    orientation: { control: 'select', options: Object.values(STEPPER_ORIENTATIONS) },
    onStepChange: { control: false, action: 'step changed' },
    children: { control: false, table: { category: 'Compound: Item' } },
    accountLabel: { control: 'text', table: { category: 'Compound: Item' } },
    preferencesLabel: { control: 'text', table: { category: 'Compound: Item' } },
    reviewLabel: { control: 'text', table: { category: 'Compound: Item' } },
    className: { control: false },
    style: { control: false },
    ref: { control: false },
} satisfies NonNullable<Meta<StepperStoryArgs>['argTypes']>
