import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { DialogSize } from '@components/overlay/dialog'
import type { DialogStoryArgs } from '@stories/overlay/dialog/types'

export const SIZES: DialogSize[] = ['sm', 'md', 'lg', 'xl', '2xl', 'full']

export const DEFAULT_ARGS = {
    open: false,
    modal: true,
    size: 'md',
    title: 'Account settings',
    description: 'Manage your profile and preferences.',
    showDescription: true,
    showFooter: true,
    confirmLabel: 'Save changes',
    cancelLabel: 'Cancel',
    onOpenChange: fn(),
} satisfies NonNullable<Meta<DialogStoryArgs>['args']>

export const ARG_TYPES = {
    open: { control: 'boolean', description: 'Controlled open state.' },
    defaultOpen: { control: 'boolean', description: 'Initial uncontrolled state; remount to apply changes.', table: { defaultValue: { summary: 'false' } } },
    modal: { control: 'select', options: [true, false, 'trap-focus'], description: 'Modal interaction mode.', table: { defaultValue: { summary: 'true' } } },
    onOpenChange: { control: false, description: 'Called with the requested state and change details.' },
    onOpenChangeComplete: { control: false, description: 'Called after the open or close animation.' },
    disablePointerDismissal: { control: 'boolean', description: 'Prevents dismissal by outside interaction.' },
    actionsRef: { control: false, description: 'Ref to imperative dialog actions.' },
    handle: { control: false, description: 'Associates the dialog with external triggers.' },
    triggerId: { control: 'text', description: 'Associated trigger ID in controlled mode.' },
    defaultTriggerId: { control: 'text', description: 'Initial associated trigger ID in uncontrolled mode.' },
    size: { control: 'select', options: SIZES, description: 'Demonstration control for content size.', table: { category: 'Compound: Content' } },
    title: { control: 'text', description: 'Demonstration control for the header title.', table: { category: 'Compound: Header' } },
    description: { control: 'text', description: 'Demonstration control for the header description.', table: { category: 'Compound: Header' } },
    showDescription: { control: 'boolean', description: 'Demonstration control for showing the description.', table: { category: 'Compound: Header' } },
    showFooter: { control: 'boolean', description: 'Demonstration control for showing the footer.', table: { category: 'Compound: Footer' } },
    confirmLabel: { control: 'text', description: 'Demonstration control for the confirm button.', table: { category: 'Compound: Footer' } },
    cancelLabel: { control: 'text', description: 'Demonstration control for the cancel button.', table: { category: 'Compound: Footer' } },
} satisfies NonNullable<Meta<DialogStoryArgs>['argTypes']>
