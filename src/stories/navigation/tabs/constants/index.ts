import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import type { TabsStoryArgs } from '@stories/navigation/tabs/types'

export const DEFAULT_ARGS = {
    value: 'account',
    orientation: 'horizontal',
    listVariant: 'default',
    listBordered: false,
    activationMode: 'manual',
    billingDisabled: false,
    billingWidth: '',
    onValueChange: fn(),
} satisfies NonNullable<Meta<TabsStoryArgs>['args']>

export const ARG_TYPES = {
    value: { control: 'select', options: ['account', 'password', 'billing', null] },
    defaultValue: { control: false, options: ['account', 'password', 'billing', null], description: 'Initial uncontrolled tab; the primary example is controlled. Edit in Uncontrolled, which remounts to apply changes.' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    onValueChange: { control: false, description: 'Receives the selected value and cancellable details; requires a callback in consumer code.' },
    listVariant: { control: 'select', options: ['default', 'pills'], table: { category: 'Compound: List' } },
    listBordered: { control: 'boolean', table: { category: 'Compound: List' } },
    activationMode: { control: 'select', options: ['manual', 'automatic'], table: { category: 'Compound: List' } },
    billingDisabled: { control: 'boolean', table: { category: 'Compound: Trigger' } },
    billingWidth: { control: 'text', table: { category: 'Compound: Trigger' } },
    className: { control: false, description: 'Class or state callback; requires consumer code.' },
    style: { control: false, description: 'Style or state callback; requires consumer code.' },
    ref: { control: false, description: 'Root DOM ref; requires a React ref object.' },
    render: { control: false, description: 'Element or render callback override; requires consumer code.' },
} satisfies NonNullable<Meta<TabsStoryArgs>['argTypes']>
