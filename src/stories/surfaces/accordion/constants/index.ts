import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import type { AccordionStoryArgs } from '@stories/surfaces/accordion/types'

export const DEFAULT_ARGS = {
    value: ['item-1'],
    defaultValue: ['item-1'],
    multiple: false,
    disabled: false,
    firstDisabled: false,
    firstStartIcon: true,
    firstEndIcon: false,
    firstLabel: 'Is it accessible?',
    onValueChange: fn(),
} satisfies NonNullable<Meta<AccordionStoryArgs>['args']>

export const ARG_TYPES = {
    value: { control: 'object', description: 'Controlled expanded item values, synchronized with Controls.' },
    defaultValue: { control: false, description: 'Initial expanded values. The primary example is controlled; edit this in Uncontrolled, which remounts to apply changes.' },
    multiple: { control: 'boolean', description: 'Allow multiple expanded items.', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', description: 'Disable all items.', table: { defaultValue: { summary: 'false' } } },
    width: { control: 'text', description: 'CSS width; defaults to 100%.' },
    orientation: { control: 'select', options: ['vertical', 'horizontal'], description: 'Direction of keyboard navigation.', table: { defaultValue: { summary: 'vertical' } } },
    loopFocus: { control: 'boolean', description: 'Wrap keyboard focus at the ends.', table: { defaultValue: { summary: 'true' } } },
    onValueChange: { control: false, description: 'Receives the next values and cancellable event details. A callback cannot be edited as text.' },
    children: { control: false, description: 'Item composition; edit the slot demonstration controls instead.' },
    render: { control: false, description: 'Root element override; requires a React element or render function.' },
    className: { control: false, description: 'Root class or state callback; not a serializable control.' },
    style: { control: false, description: 'Root style or state callback; requires consumer code.' },
    ref: { control: false, description: 'Root element ref; requires a React ref.' },
    firstDisabled: { control: 'boolean', description: 'Disable the first item.', table: { category: 'Compound: Item' } },
    firstLabel: { control: 'text', description: 'First trigger label.', table: { category: 'Compound: Trigger' } },
    firstStartIcon: { control: 'boolean', description: 'Show a decorative leading icon.', table: { category: 'Compound: Trigger' } },
    firstEndIcon: { control: 'boolean', description: 'Show a decorative trailing icon.', table: { category: 'Compound: Trigger' } },
} satisfies NonNullable<Meta<AccordionStoryArgs>['argTypes']>
