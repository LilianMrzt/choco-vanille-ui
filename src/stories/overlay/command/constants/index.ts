import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
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
    onOpenChange: { control: false, description: 'Requested state and cancellable details; a callback requires consumer code.' },
    modal: {
        control: 'select',
        options: [true, false, 'trap-focus'],
        table: { category: 'Command' },
    },
    contentLabel: { control: 'text', description: 'Dialog accessible name.', table: { category: 'Compound: Content' } },
    inputLabel: { control: 'text', description: 'Search input accessible name.', table: { category: 'Compound: Input' } },
    firstItemDisabled: { control: 'boolean', description: 'Disable Edit profile.', table: { category: 'Compound: Item' } },
    firstItemKeywords: { control: 'object', description: 'Additional search terms for Edit profile.', table: { category: 'Compound: Item' } },
    actionsLabel: { control: 'text', description: 'Actions group name.', table: { category: 'Compound: Group' } },
    navigationLabel: { control: 'text', description: 'Navigation group name.', table: { category: 'Compound: Group' } },
    emptyLabel: { control: 'text', description: 'Empty search-results text.', table: { category: 'Compound: Empty' } },
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
    onOpenChange: fn(),
    modal: true,
    size: 'md',
    inputPlaceholder: 'Search actions…',
    inputClearAriaLabel: 'Clear search',
    showGroup1: true,
    showGroup2: true,
    showIcons: true,
    showShortcuts: true,
    contentLabel: 'Command palette',
    inputLabel: 'Search',
    firstItemDisabled: false,
    firstItemKeywords: ['account'],
    actionsLabel: 'Actions',
    navigationLabel: 'Navigation',
    emptyLabel: 'No results found.',
} satisfies NonNullable<Meta<CommandPlaygroundArgs>['args']>
