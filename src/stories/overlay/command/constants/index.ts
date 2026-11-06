import type { Meta } from '@storybook/react-vite'
import type { CommandPlaygroundArgs } from '@stories/overlay/command/types'

import type { CommandSize } from '@components/overlay/command'

export const SIZES: CommandSize[] = ['sm', 'md', 'lg']

export const ARG_TYPES = {
    open: {
        control: 'boolean',
        table: { category: 'Command' },
    },
    defaultOpen: {
        control: false,
        description: 'Initial uncontrolled state; the Playground uses controlled open.',
        table: { category: 'Command' },
    },
    onOpenChange: { control: false, action: 'open changed' },
    modal: {
        control: 'boolean',
        table: { category: 'Command' },
    },
    size: {
        control: 'select',
        options: SIZES,
        table: { category: 'Compound: Content' },
    },
    inputPlaceholder: {
        control: 'text',
        table: { category: 'Compound: Input' },
    },
    inputClearAriaLabel: {
        control: 'text',
        table: { category: 'Compound: Input' },
    },
    showGroup1: {
        control: 'boolean',
        table: { category: 'Compound: List' },
    },
    showGroup2: {
        control: 'boolean',
        table: { category: 'Compound: List' },
    },
    showIcons: {
        control: 'boolean',
        table: { category: 'Compound: Item' },
    },
    showShortcuts: {
        control: 'boolean',
        table: { category: 'Compound: Item' },
    },
} satisfies NonNullable<Meta<CommandPlaygroundArgs>['argTypes']>

export const DEFAULT_ARGS = {
    open: false,
    modal: true,
    size: 'md',
    inputPlaceholder: 'Search actions…',
    inputClearAriaLabel: 'Clear search',
    showGroup1: true,
    showGroup2: true,
    showIcons: true,
    showShortcuts: true,
} satisfies NonNullable<Meta<CommandPlaygroundArgs>['args']>
