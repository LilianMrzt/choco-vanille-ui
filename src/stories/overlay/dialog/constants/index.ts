import type { Meta } from '@storybook/react-vite'
import { LAYOUT_ARG_TYPES } from '@stories/_shared/layout-controls/constants'
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
    titleAs: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], description: 'Header heading level.', table: { category: 'Compound: Header' } },
    showCloseButton: { control: 'boolean', description: 'Header close control; defaults to true.', table: { category: 'Compound: Header' } },
    contentLabel: { control: 'text', description: 'Fallback accessible name when no title labels the dialog.', table: { category: 'Compound: Content' } },
    bodyPadding: { ...LAYOUT_ARG_TYPES.padding, description: 'Body padding token.', table: { category: 'Compound: Body' } },
    open: { control: 'boolean', description: 'Controlled open state.' },
    defaultOpen: { control: false, description: 'Initial uncontrolled state; the primary example is controlled. Edit in Uncontrolled, which remounts to apply changes.', table: { defaultValue: { summary: 'false' } } },
    modal: { control: 'select', options: [true, false, 'trap-focus'], description: 'Modal interaction mode.', table: { defaultValue: { summary: 'true' } } },
    onOpenChange: { control: false, description: 'Called with the requested state and change details.' },
    onOpenChangeComplete: { control: false, description: 'Called after the open or close animation.' },
    disablePointerDismissal: { control: 'boolean', description: 'Prevents dismissal by outside interaction.' },
    actionsRef: { control: false, description: 'Ref to imperative dialog actions.' },
    handle: { control: false, description: 'Associates the dialog with external triggers.' },
    triggerId: { control: false, description: 'Associated controlled trigger ID; requires external trigger composition.' },
    defaultTriggerId: { control: false, description: 'Initial associated trigger ID; requires external trigger composition and remounting.' },
    size: { control: 'select', options: SIZES, description: 'Demonstration control for content size.', table: { category: 'Compound: Content' } },
    title: { control: 'text', description: 'Demonstration control for the header title.', table: { category: 'Compound: Header' } },
    description: { control: 'text', description: 'Demonstration control for the header description.', table: { category: 'Compound: Header' } },
    showDescription: { control: 'boolean', description: 'Demonstration control for showing the description.', table: { category: 'Compound: Header' } },
    showFooter: { control: 'boolean', description: 'Demonstration control for showing the footer.', table: { category: 'Compound: Footer' } },
    confirmLabel: { control: 'text', description: 'Demonstration control for the confirm button.', table: { category: 'Compound: Footer' } },
    cancelLabel: { control: 'text', description: 'Demonstration control for the cancel button.', table: { category: 'Compound: Footer' } },
} satisfies NonNullable<Meta<DialogStoryArgs>['argTypes']>
