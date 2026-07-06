import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import type { ComponentProps } from 'react'

import { Button, Dialog, Typography } from '@components'
import type { DialogSize } from '@components/overlay/dialog'
import { md } from '@stories/utils/markdown'

type DialogPlaygroundArgs = ComponentProps<typeof Dialog> & {
    size?: DialogSize
    title?: string
    description?: string
    showDescription?: boolean
    showFooter?: boolean
    confirmLabel?: string
    cancelLabel?: string
}

const SIZES: DialogSize[] = ['sm', 'md', 'lg', 'xl', '2xl', 'full']

const meta: Meta<DialogPlaygroundArgs> = {
    title: 'Overlay/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A modal dialog built on Base UI Dialog.

Compose with \`Dialog.Trigger\`, \`Dialog.Content\`, \`Dialog.Header\`, \`Dialog.Body\`, \`Dialog.Footer\`, \`Dialog.Title\`, \`Dialog.Description\` and \`Dialog.Close\`.

**Usage**

\`\`\`tsx
<Dialog>
  <Dialog.Trigger>
    <Button label="Open dialog" variant="contained" color="primary" />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header
      title="Account settings"
      description="Manage your profile and preferences."
    />
    <Dialog.Body>
      <Typography>Your content goes here.</Typography>
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close>
        <Button label="Cancel" variant="outlined" color="primary" />
      </Dialog.Close>
      <Button label="Save" variant="contained" color="primary" />
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`title\` on \`Dialog.Header\` | Recommended | \`string\` | Provides an accessible title for the dialog. |
| \`titleAs\` on \`Dialog.Header\` | No | \`h1\` – \`h6\` | Choose the heading level that fits the page outline. |
| \`aria-label\` on \`Dialog.Content\` | No | \`string\` | Use when no visible title is present. |

- Focus is trapped inside the dialog while it is open.
- Pressing \`Escape\` or clicking the overlay closes the dialog.
- The close button in \`Dialog.Header\` can be hidden with \`showCloseButton={false}\`.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Dialog\` | Root wrapper that manages open/close state. |
| \`Dialog.Trigger\` | Element that opens the dialog. |
| \`Dialog.Content\` | Modal panel rendered inside a portal. |
| \`Dialog.Header\` | Title, description, and optional close button. |
| \`Dialog.Body\` | Main content area. |
| \`Dialog.Footer\` | Bottom area for action buttons. |
| \`Dialog.Title\` | Accessible dialog title. |
| \`Dialog.Description\` | Accessible dialog description. |
| \`Dialog.Close\` | Closes the dialog when activated. |
                `,
            },
        },
    },
    argTypes: {
        open: {
            control: 'boolean',
            table: { category: 'Dialog' },
        },
        defaultOpen: {
            control: 'boolean',
            table: { category: 'Dialog' },
        },
        modal: {
            control: 'boolean',
            table: { category: 'Dialog' },
        },
        size: {
            control: 'select',
            options: SIZES,
            table: { category: 'Dialog.Content' },
        },
        title: {
            control: 'text',
            table: { category: 'Dialog.Header' },
        },
        description: {
            control: 'text',
            table: { category: 'Dialog.Header' },
        },
        showDescription: {
            control: 'boolean',
            table: { category: 'Dialog.Header' },
        },
        showFooter: {
            control: 'boolean',
            table: { category: 'Dialog.Footer' },
        },
        confirmLabel: {
            control: 'text',
            table: { category: 'Dialog.Footer' },
        },
        cancelLabel: {
            control: 'text',
            table: { category: 'Dialog.Footer' },
        },
    },
    args: {
        defaultOpen: false,
        modal: true,
        size: 'md',
        title: 'Account settings',
        description: 'Manage your profile and preferences.',
        showDescription: true,
        showFooter: true,
        confirmLabel: 'Save changes',
        cancelLabel: 'Cancel',
    },
} satisfies Meta<DialogPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — every prop for all sub-components is exposed in the Controls panel, grouped by component.',
            },
        },
    },
    render: ({
        defaultOpen,
        modal,
        size,
        title,
        description,
        showDescription,
        showFooter,
        confirmLabel,
        cancelLabel,
    }) => (
        <Dialog
            defaultOpen={defaultOpen}
            modal={modal}
        >
            <Dialog.Trigger>
                <Button
                    label={'Open dialog'}
                    variant={'contained'}
                    color={'primary'}
                />
            </Dialog.Trigger>
            <Dialog.Content size={size}>
                <Dialog.Header
                    title={title}
                    description={showDescription ? description : undefined}
                />
                <Dialog.Body>
                    <Typography
                        variant={'p'}
                        fontSize={'sm'}
                        color={'foreground'}
                    >
                        Your content goes here. This dialog demonstrates the
                        compound component layout with Header, Body and Footer.
                    </Typography>
                </Dialog.Body>
                {showFooter && (
                    <Dialog.Footer>
                        <Dialog.Close>
                            <Button
                                label={cancelLabel ?? 'Cancel'}
                                variant={'outlined'}
                                color={'primary'}
                                size={'sm'}
                            />
                        </Dialog.Close>
                        <Button
                            label={confirmLabel ?? 'Save changes'}
                            variant={'contained'}
                            color={'primary'}
                            size={'sm'}
                        />
                    </Dialog.Footer>
                )}
            </Dialog.Content>
        </Dialog>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByText('Open dialog'))
        await waitFor(() =>
            expect(document.querySelector('[role="dialog"]')).toBeInTheDocument(),
        )
        await expect(document.querySelector('[role="dialog"]')).toHaveTextContent('Account settings')
        await userEvent.click(document.querySelector('[aria-label="Close dialog"]')!)
    },
}
