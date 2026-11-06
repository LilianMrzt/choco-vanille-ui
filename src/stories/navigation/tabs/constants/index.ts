import type { ComponentProps } from 'react'
import type { Meta } from '@storybook/react-vite'

import type { Tabs, TabsListProps } from '@components/navigation/tabs'

export type TabsStoryArgs = Omit<ComponentProps<typeof Tabs>, 'children'> & {
    listVariant: NonNullable<TabsListProps['variant']>
    listBordered: boolean
    activationMode: NonNullable<TabsListProps['activationMode']>
    billingDisabled: boolean
    billingWidth: string
}

export const DEFAULT_ARGS = {
    value: 'account',
    orientation: 'horizontal',
    listVariant: 'default',
    listBordered: false,
    activationMode: 'manual',
    billingDisabled: false,
    billingWidth: '',
} satisfies NonNullable<Meta<TabsStoryArgs>['args']>

export const ARG_TYPES = {
    value: { control: 'select', options: ['account', 'password', 'billing', null] },
    defaultValue: { control: 'select', options: ['account', 'password', 'billing', null], description: 'Initial uncontrolled tab; remount to apply changes.' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    onValueChange: { control: false, action: 'value changed' },
    listVariant: { control: 'select', options: ['default', 'pills'], table: { category: 'Compound: List' } },
    listBordered: { control: 'boolean', table: { category: 'Compound: List' } },
    activationMode: { control: 'select', options: ['manual', 'automatic'], table: { category: 'Compound: List' } },
    billingDisabled: { control: 'boolean', table: { category: 'Compound: Trigger' } },
    billingWidth: { control: 'text', table: { category: 'Compound: Trigger' } },
    className: { control: false },
    style: { control: false },
    ref: { control: false },
    render: { control: false },
} satisfies NonNullable<Meta<TabsStoryArgs>['argTypes']>
