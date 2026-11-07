import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { AlertDialogSize } from '@components/overlay/alert-dialog'
import type { AlertDialogStoryArgs } from '@stories/overlay/alert-dialog/types'
import { BUTTON_COLORS_ARRAY, BUTTON_VARIANTS_ARRAY } from '@components/actions/_shared/buttons/constants'

export const APPEARANCE_VARIANTS = BUTTON_VARIANTS_ARRAY
export const APPEARANCE_COLORS = BUTTON_COLORS_ARRAY

export const SIZES: AlertDialogSize[] = ['sm', 'md', 'lg', 'xl', '2xl', 'full']

export const DEFAULT_ARGS = {
    open: false,
    modal: true,
    size: 'md',
    triggerLabel: 'Delete account',
    title: 'Delete account',
    description: 'This action cannot be undone.',
    showBody: true,
    actionLabel: 'Delete account',
    cancelLabel: 'Cancel',
    onOpenChange: fn(),
} satisfies NonNullable<Meta<AlertDialogStoryArgs>['args']>

export const ARG_TYPES = {
    titleAs: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], description: 'Header heading level.', table: { category: 'Compound: Header' } },
    showCloseButton: { control: 'boolean', description: 'Header close control; defaults to true.', table: { category: 'Compound: Header' } },
    contentLabel: { control: 'text', description: 'Fallback accessible name when no title labels the confirmation.', table: { category: 'Compound: Content' } },
    open: { control: 'boolean', description: 'Controlled open state.' },
    defaultOpen: { control: false, description: 'Initial uncontrolled state; the primary example is controlled. Edit in Uncontrolled, which remounts to apply changes.' },
    modal: { control: 'select', options: [true, false, 'trap-focus'], description: 'Modal interaction mode.', table: { defaultValue: { summary: 'true' } } },
    onOpenChange: { control: false, description: 'Called with the requested state and change details.' },
    onOpenChangeComplete: { control: false, description: 'Called after the open or close animation.' },
    disablePointerDismissal: { control: 'boolean', description: 'Prevents dismissal by outside interaction.' },
    actionsRef: { control: false, description: 'Ref to imperative dialog actions.' },
    handle: { control: false, description: 'Associates the dialog with external triggers.' },
    triggerId: { control: false, description: 'Associated controlled trigger ID; requires external trigger composition.' },
    defaultTriggerId: { control: false, description: 'Initial associated trigger ID; requires external trigger composition and remounting.' },
    triggerLabel: { control: 'text', description: 'Demonstration control for the trigger.', table: { category: 'Compound: Trigger' } },
    size: { control: 'select', options: SIZES, description: 'Demonstration control for content size.', table: { category: 'Compound: Content' } },
    title: { control: 'text', description: 'Demonstration control for the title.', table: { category: 'Compound: Header' } },
    description: { control: 'text', description: 'Demonstration control for the description.', table: { category: 'Compound: Header' } },
    showBody: { control: 'boolean', description: 'Demonstration control for showing the body.', table: { category: 'Compound: Body' } },
    actionLabel: { control: 'text', description: 'Demonstration control for the action label.', table: { category: 'Compound: Action' } },
    cancelLabel: { control: 'text', description: 'Demonstration control for the cancel label.', table: { category: 'Compound: Cancel' } },
} satisfies NonNullable<Meta<AlertDialogStoryArgs>['argTypes']>
