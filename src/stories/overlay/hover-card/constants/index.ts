import type { Meta } from '@storybook/react-vite'

import { fn } from 'storybook/test'
import type { HoverCardStoryArgs } from '@stories/overlay/hover-card/types'

export const DEFAULT_ARGS = {
    open: false,
    triggerLabel: 'Hover me',
    triggerDelay: 0,
    closeDelay: 300,
    contentWidth: 'min(20rem, calc(100vw - 2rem))',
    contentText: 'This preview stays open while the pointer is over it.',
    onOpenChange: fn(),
} satisfies NonNullable<Meta<HoverCardStoryArgs>['args']>

export const ARG_TYPES = {
    open: { control: 'boolean', description: 'Controlled open state.' },
    defaultOpen: { control: false, description: 'Initial uncontrolled state; the primary example is controlled. Edit in Uncontrolled, which remounts to apply changes.' },
    onOpenChange: { control: false, description: 'Requested state and cancellable details; requires consumer code.' },
    onOpenChangeComplete: { control: false, description: 'Animation-completion callback; requires consumer code.' },
    actionsRef: { control: false, description: 'Imperative action ref; requires a React ref object.' },
    handle: { control: false, description: 'External trigger handle; requires a handle created in consumer code.' },
    triggerId: { control: false, description: 'Associated controlled trigger ID; external triggers are not composed in this example.' },
    defaultTriggerId: { control: false, description: 'Initial associated trigger ID; requires external trigger composition and remounting.' },
    triggerLabel: { control: 'text', table: { category: 'Compound: Trigger' } },
    triggerDelay: { control: { type: 'number', min: 0 }, table: { category: 'Compound: Trigger' } },
    closeDelay: { control: { type: 'number', min: 0 }, table: { category: 'Compound: Trigger' } },
    contentWidth: { control: 'text', table: { category: 'Compound: Content' } },
    contentText: { control: 'text', table: { category: 'Compound: Content' } },
} satisfies NonNullable<Meta<HoverCardStoryArgs>['argTypes']>
