import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor } from 'storybook/test'
import { useState, type ComponentProps } from 'react'

import { Button } from '@components/actions/button'
import { Typography } from '@components/foundation/typography'
import { Drawer, type DrawerMode, type DrawerPosition, type DrawerSize } from '@components/overlay/drawer'
import { DRAWER_MODES_ARRAY, DRAWER_POSITIONS_ARRAY, DRAWER_SIZES_ARRAY } from '@components/overlay/drawer/constants'
import { md } from '@stories/utils/markdown'

type DrawerPlaygroundArgs = ComponentProps<typeof Drawer> & {
    title?: string
    description?: string
    showDescription?: boolean
    showFooter?: boolean
    confirmLabel?: string
    cancelLabel?: string
}

const renderDrawer = ({
    defaultOpen,
    mode,
    position,
    size,
    collapsedSize,
    withBackdrop,
    modal,
    title,
    description,
    showDescription,
    showFooter,
    confirmLabel,
    cancelLabel,
}: DrawerPlaygroundArgs) => {
    const [open, setOpen] = useState(defaultOpen ?? false)
    const isPortal = mode === 'portal'

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Drawer
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                position={position}
                size={size}
                collapsedSize={collapsedSize}
                withBackdrop={withBackdrop}
                modal={modal}
            >
                <Drawer.Header
                    title={title}
                    description={showDescription ? description : undefined}
                />
                <Drawer.Body>
                    <Typography
                        variant={'p'}
                        fontSize={'sm'}
                        color={'foreground'}
                    >
                        Your content goes here. This drawer demonstrates the
                        compound component layout with Header, Body and Footer.
                    </Typography>
                </Drawer.Body>
                {showFooter && (
                    <Drawer.Footer>
                        <Button
                            label={cancelLabel ?? 'Cancel'}
                            variant={'outlined'}
                            color={'primary'}
                            size={'sm'}
                            onClick={() => setOpen(false)}
                        />
                        <Button
                            label={confirmLabel ?? 'Save changes'}
                            variant={'contained'}
                            color={'primary'}
                            size={'sm'}
                        />
                    </Drawer.Footer>
                )}
            </Drawer>

            <div style={{ padding: '1rem' }}>
                <Button
                    label={isPortal ? (open ? 'Close drawer' : 'Open drawer') : open ? 'Collapse drawer' : 'Expand drawer'}
                    variant={'contained'}
                    color={'primary'}
                    onClick={() => setOpen(!open)}
                />
            </div>
        </div>
    )
}

const meta: Meta<DrawerPlaygroundArgs> = {
    title: 'Overlay/Drawer',
    component: Drawer,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: md /* language=markdown */ `
A flexible drawer component with three render modes.

Compose with \`Drawer.Header\`, \`Drawer.Body\` and \`Drawer.Footer\`.

**Usage**

~~~tsx
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen} mode="portal">
  <Drawer.Header title="Settings" />
  <Drawer.Body>
    <Typography>Your content goes here.</Typography>
  </Drawer.Body>
  <Drawer.Footer>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </Drawer.Footer>
</Drawer>
~~~

**Modes**

| Mode       | Behavior                                                            |
| ---------- | ------------------------------------------------------------------- |
| \`portal\` | Rendered in a portal over the page with an optional backdrop.       |
| \`inline\` | Takes space in the layout when open, collapses to width \`0\` when closed. |
| \`mini\`   | Like inline, but stays visible in a slim state when closed.         |

**Accessibility**

- Portal drawers are modal by default and trap focus while open.
- Pressing \`Escape\` or clicking the backdrop closes a portal drawer.
- Provide a visible title via \`Drawer.Header\` or an \`aria-label\`.
        `,
            },
        },
    },
    argTypes: {
        open: {
            control: 'boolean',
            table: { category: 'Drawer' },
        },
        defaultOpen: {
            control: 'boolean',
            table: { category: 'Drawer' },
        },
        mode: {
            control: 'select',
            options: DRAWER_MODES_ARRAY,
            table: { category: 'Drawer' },
        },
        position: {
            control: 'select',
            options: DRAWER_POSITIONS_ARRAY,
            table: { category: 'Drawer' },
        },
        size: {
            control: 'select',
            options: DRAWER_SIZES_ARRAY,
            table: { category: 'Drawer' },
        },
        collapsedSize: {
            control: 'text',
            table: { category: 'Drawer' },
        },
        withBackdrop: {
            control: 'boolean',
            table: { category: 'Drawer' },
        },
        modal: {
            control: 'boolean',
            table: { category: 'Drawer' },
        },
        title: {
            control: 'text',
            table: { category: 'Drawer.Header' },
        },
        description: {
            control: 'text',
            table: { category: 'Drawer.Header' },
        },
        showDescription: {
            control: 'boolean',
            table: { category: 'Drawer.Header' },
        },
        showFooter: {
            control: 'boolean',
            table: { category: 'Drawer.Footer' },
        },
        confirmLabel: {
            control: 'text',
            table: { category: 'Drawer.Footer' },
        },
        cancelLabel: {
            control: 'text',
            table: { category: 'Drawer.Footer' },
        },
    },
    args: {
        defaultOpen: false,
        mode: 'portal' as DrawerMode,
        position: 'left' as DrawerPosition,
        size: 'md' as DrawerSize,
        collapsedSize: '4rem',
        withBackdrop: true,
        modal: true,
        title: 'Account settings',
        description: 'Manage your profile and preferences.',
        showDescription: true,
        showFooter: true,
        confirmLabel: 'Save changes',
        cancelLabel: 'Cancel',
    },
} satisfies Meta<DrawerPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — switch modes, positions and sizes from the Controls panel.',
            },
        },
    },
    render: renderDrawer,
    play: async ({ canvasElement }) => {
        await userEvent.click(canvasElement.querySelector('button')!)

        await waitFor(() =>
            expect(document.querySelector('[role="dialog"]')).toBeInTheDocument(),
        )
        await expect(document.querySelector('[role="dialog"]')).toHaveTextContent(
            'Account settings',
        )

        await userEvent.click(document.querySelector('[aria-label="Close drawer"]')!)

        await waitFor(() =>
            expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument(),
        )
    },
    decorators: [
        (Story) => (
            <div style={{ height: '100vh' }}>
                <Story />
            </div>
        ),
    ],
}

export const Inline: Story = {
    args: {
        defaultOpen: false,
        mode: 'inline',
    },
    parameters: {
        docs: {
            description: {
                story: 'Inline drawer that takes layout space when open.',
            },
        },
    },
    render: renderDrawer,
}

export const Mini: Story = {
    args: {
        defaultOpen: true,
        mode: 'mini',
    },
    parameters: {
        docs: {
            description: {
                story: 'Mini drawer that stays visible in a slim state when closed.',
            },
        },
    },
    render: renderDrawer,
}
