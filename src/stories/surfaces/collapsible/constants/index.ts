import { INFO_ICON as InfoIcon } from '@constants/icon-registry'
import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { CollapsibleStoryArgs } from '@stories/surfaces/collapsible/types'

export const DEFAULT_ARGS = {
    open: false,
    disabled: false,
    triggerLabel: 'Toggle content',
    triggerStartIcon: InfoIcon,
    panelPadding: 12,
    onOpenChange: fn(),
} satisfies NonNullable<Meta<CollapsibleStoryArgs>['args']>

export const ARG_TYPES = {
    open: { control: 'boolean', description: 'Controlled open state, synchronized with Controls in the playground.' },
    defaultOpen: { control: false, description: 'Initial uncontrolled state; the primary example is controlled. Edit in Uncontrolled, which remounts to apply changes.' },
    onOpenChange: { control: false, description: 'Receives the requested open state and event details.' },
    disabled: { control: 'boolean', description: 'Disables interaction.' },
    width: { control: 'text', description: 'Outer width.', table: { defaultValue: { summary: '100%' } } },
    className: { control: false, description: 'Wrapper class or state-dependent root class.' },
    style: { control: false, description: 'Root style or state-dependent style function.' },
    ref: { control: false, description: 'Ref to the root element.' },
    render: { control: false, description: 'Root render override; not editable in Controls.' },
    children: { control: false, description: 'Compound slots, demonstrated with the controls below.' },
    triggerLabel: { control: 'text', description: 'Demonstration control for trigger text.', table: { category: 'Compound: Trigger' } },
    triggerWidth: { control: 'text', description: 'Demonstration control for trigger width.', table: { category: 'Compound: Trigger' } },
    triggerStartIcon: { control: 'select', options: ['None', 'Info'], mapping: { None: undefined, Info: InfoIcon }, description: 'Demonstration leading icon.', table: { category: 'Compound: Trigger' } },
    triggerEndIcon: { control: 'select', options: ['None', 'Info'], mapping: { None: undefined, Info: InfoIcon }, description: 'Demonstration trailing icon.', table: { category: 'Compound: Trigger' } },
    panelPadding: { control: 'select', options: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128], description: 'Demonstration bottom padding token.', table: { category: 'Compound: Panel' } },
} satisfies NonNullable<Meta<CollapsibleStoryArgs>['argTypes']>
