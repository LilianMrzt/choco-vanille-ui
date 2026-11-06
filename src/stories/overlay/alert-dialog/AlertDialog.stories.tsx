import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ComponentProps } from 'react'
import { Button } from '@components/actions/button'
import { AlertDialog, type AlertDialogSize } from '@components/overlay/alert-dialog'
import { Typography } from '@components/foundation/typography'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

type AlertDialogPlaygroundArgs = ComponentProps<typeof AlertDialog> & {
    size?: AlertDialogSize
    title?: string
    description?: string
    triggerLabel?: string
    actionLabel?: string
    cancelLabel?: string
    showBody?: boolean
}

const SIZES: AlertDialogSize[] = ['sm', 'md', 'lg', 'xl', '2xl', 'full']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`AlertDialog.Header\` title | Recommended | \`string\` | Names the dialog when rendered visibly. |
| \`AlertDialog.Content\` \`aria-label\` | When no title is visible | \`string\` | Provides the accessible dialog name. |
| \`AlertDialog.Action\` | Recommended | \`ButtonProps\` | Confirms the destructive operation. |
| \`AlertDialog.Cancel\` | Recommended | \`ButtonProps\` | Gives the user an explicit safe exit. |

- Focus is trapped while the alert dialog is open.
- Escape and the overlay close the dialog through Base UI.
- The action defaults to \`contained\` / \`destructive\`; cancel defaults to \`outlined\` / \`primary\`.
`

const AlertDialogDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<AlertDialogPlaygroundArgs> = {
    title: 'Overlay/AlertDialog',
    component: AlertDialog,
    parameters: {
        layout: 'centered',
        docs: {
            page: AlertDialogDocsPage,
            description: {
                component: md /* language=markdown */ `
A confirmation dialog for destructive actions, built by composing the accessible Dialog slots.

~~~tsx
<AlertDialog>
    <AlertDialog.Trigger>
        <Button label="Delete account" variant="contained" color="destructive" />
    </AlertDialog.Trigger>
    <AlertDialog.Content>
        <AlertDialog.Header title="Delete account" description="This action cannot be undone." />
        <AlertDialog.Body>
            <Typography>Your account and its data will be permanently deleted.</Typography>
        </AlertDialog.Body>
        <AlertDialog.Footer>
            <AlertDialog.Cancel />
            <AlertDialog.Action label="Delete account" />
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog>
~~~
`,
            },
        },
    },
    argTypes: {
        defaultOpen: { control: 'boolean', table: { category: 'AlertDialog' } },
        modal: { control: 'boolean', table: { category: 'AlertDialog' } },
        triggerLabel: { control: 'text', table: { category: 'Compound: Trigger' } },
        size: { control: 'select', options: SIZES, table: { category: 'Compound: Content' } },
        title: { control: 'text', table: { category: 'Compound: Header' } },
        description: { control: 'text', table: { category: 'Compound: Header' } },
        showBody: { control: 'boolean', table: { category: 'Compound: Body' } },
        actionLabel: { control: 'text', table: { category: 'Compound: Action' } },
        cancelLabel: { control: 'text', table: { category: 'Compound: Cancel' } },
    },
    args: {
        defaultOpen: false,
        modal: true,
        size: 'md',
        triggerLabel: 'Delete account',
        title: 'Delete account',
        description: 'This action cannot be undone.',
        showBody: true,
        actionLabel: 'Delete account',
        cancelLabel: 'Cancel',
    },
} satisfies Meta<AlertDialogPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<AlertDialog>
    <AlertDialog.Trigger>
        <Button label="Delete account" variant="contained" color="destructive" />
    </AlertDialog.Trigger>
    <AlertDialog.Content size="md">
        <AlertDialog.Header title="Delete account" description="This action cannot be undone." />
        <AlertDialog.Body>
            <Typography>Your account and its data will be permanently deleted.</Typography>
        </AlertDialog.Body>
        <AlertDialog.Footer>
            <AlertDialog.Cancel />
            <AlertDialog.Action label="Delete account" />
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog>`),
        },
    },
    render: ({ defaultOpen, modal, triggerLabel, size, title, description, showBody, actionLabel, cancelLabel }) => (
        <AlertDialog
            defaultOpen={defaultOpen}
            modal={modal}
        >
            <AlertDialog.Trigger>
                <Button
                    label={triggerLabel ?? 'Delete account'}
                    variant={'contained'}
                    color={'destructive'}
                />
            </AlertDialog.Trigger>
            <AlertDialog.Content size={size}>
                <AlertDialog.Header
                    title={title}
                    description={description}
                />
                {showBody && (
                    <AlertDialog.Body>
                        <Typography>Your account and its data will be permanently deleted.</Typography>
                    </AlertDialog.Body>
                )}
                <AlertDialog.Footer>
                    <AlertDialog.Cancel label={cancelLabel} />
                    <AlertDialog.Action label={actionLabel ?? 'Delete account'} />
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    ),
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
    <AlertDialog><AlertDialog.Trigger><Button label="sm" variant="outlined" color="primary" /></AlertDialog.Trigger><AlertDialog.Content size="sm"><AlertDialog.Header title="Small alert" /><AlertDialog.Body>Size: sm</AlertDialog.Body></AlertDialog.Content></AlertDialog>
    <AlertDialog><AlertDialog.Trigger><Button label="md" variant="outlined" color="primary" /></AlertDialog.Trigger><AlertDialog.Content size="md"><AlertDialog.Header title="Medium alert" /><AlertDialog.Body>Size: md</AlertDialog.Body></AlertDialog.Content></AlertDialog>
    <AlertDialog><AlertDialog.Trigger><Button label="lg" variant="outlined" color="primary" /></AlertDialog.Trigger><AlertDialog.Content size="lg"><AlertDialog.Header title="Large alert" /><AlertDialog.Body>Size: lg</AlertDialog.Body></AlertDialog.Content></AlertDialog>
    <AlertDialog><AlertDialog.Trigger><Button label="xl" variant="outlined" color="primary" /></AlertDialog.Trigger><AlertDialog.Content size="xl"><AlertDialog.Header title="Extra large alert" /><AlertDialog.Body>Size: xl</AlertDialog.Body></AlertDialog.Content></AlertDialog>
    <AlertDialog><AlertDialog.Trigger><Button label="2xl" variant="outlined" color="primary" /></AlertDialog.Trigger><AlertDialog.Content size="2xl"><AlertDialog.Header title="2XL alert" /><AlertDialog.Body>Size: 2xl</AlertDialog.Body></AlertDialog.Content></AlertDialog>
    <AlertDialog><AlertDialog.Trigger><Button label="full" variant="outlined" color="primary" /></AlertDialog.Trigger><AlertDialog.Content size="full"><AlertDialog.Header title="Full alert" /><AlertDialog.Body>Size: full</AlertDialog.Body></AlertDialog.Content></AlertDialog>
</div>`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {SIZES.map((size) => (
                <AlertDialog key={size}>
                    <AlertDialog.Trigger>
                        <Button
                            label={size}
                            variant={'outlined'}
                            color={'primary'}
                        />
                    </AlertDialog.Trigger>
                    <AlertDialog.Content size={size}>
                        <AlertDialog.Header title={`${size.toUpperCase()} alert`} />
                        <AlertDialog.Body>Size: {size}</AlertDialog.Body>
                    </AlertDialog.Content>
                </AlertDialog>
            ))}
        </div>
    ),
}
