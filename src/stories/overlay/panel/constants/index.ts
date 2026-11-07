import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { PanelPosition } from '@components/overlay/panel'
import type { PanelStoryArgs } from '@stories/overlay/panel/types'

export const POSITIONS: PanelPosition[] = ['left', 'right']

export const DEFAULT_ARGS = {
    open: false,
    modal: true,
    withBackdrop: true,
    position: 'right',
    width: 'min(26rem, 100vw)',
    title: 'Panel settings',
    description: 'Manage your profile and preferences.',
    showDescription: true,
    onOpenChange: fn(),
} satisfies NonNullable<Meta<PanelStoryArgs>['args']>

export const ARG_TYPES = {
    titleAs: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], description: 'Header heading level.', table: { category: 'Compound: Header' } },
    showCloseButton: { control: 'boolean', description: 'Header close control; defaults to true.', table: { category: 'Compound: Header' } },
    closeLabel: { control: 'text', description: 'Accessible label of the header close control.', table: { category: 'Compound: Header' } },
    contentLabel: { control: 'text', description: 'Fallback accessible name when no title labels the panel.', table: { category: 'Compound: Content' } },
    open: { control: 'boolean', description: 'Controlled open state.' },
    defaultOpen: { control: false, description: 'Initial uncontrolled state; the primary example is controlled. Edit in Uncontrolled, which remounts to apply changes.' },
    modal: { control: 'select', options: [true, false, 'trap-focus'], description: 'Modal interaction mode.', table: { defaultValue: { summary: 'true' } } },
    withBackdrop: { control: 'boolean', description: 'Render the backdrop.', table: { defaultValue: { summary: 'true' } } },
    onOpenChange: { control: false, description: 'Called with the requested state and change details.' },
    onOpenChangeComplete: { control: false, description: 'Called after the open or close animation.' },
    disablePointerDismissal: { control: 'boolean', description: 'Prevents dismissal by outside interaction.' },
    actionsRef: { control: false, description: 'Ref to imperative panel actions.' },
    handle: { control: false, description: 'Associates the panel with external triggers.' },
    triggerId: { control: false, description: 'Associated controlled trigger ID; requires external trigger composition.' },
    defaultTriggerId: { control: false, description: 'Initial associated trigger ID; requires external trigger composition and remounting.' },
    position: { control: 'select', options: POSITIONS, description: 'Demonstration control for panel side.', table: { category: 'Compound: Content' } },
    width: { control: 'text', description: 'Demonstration control for CSS width.', table: { category: 'Compound: Content' } },
    title: { control: 'text', description: 'Demonstration control for the header title.', table: { category: 'Compound: Header' } },
    description: { control: 'text', description: 'Demonstration control for the header description.', table: { category: 'Compound: Header' } },
    showDescription: { control: 'boolean', description: 'Demonstration control for showing the description.', table: { category: 'Compound: Header' } },
} satisfies NonNullable<Meta<PanelStoryArgs>['argTypes']>
