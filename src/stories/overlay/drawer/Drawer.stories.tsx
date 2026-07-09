import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor } from 'storybook/test'
import { useState, type ComponentProps } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'
import { Drawer, type DrawerMode, type DrawerPosition, type DrawerSize } from '@components/overlay/drawer'
import { IconRegistry } from '@constants/icons'
import { DRAWER_MODES_ARRAY, DRAWER_POSITIONS_ARRAY, DRAWER_SIZES_ARRAY } from '@components/overlay/drawer/constants'
import { md } from '@stories/utils/markdown'

type DrawerPlaygroundArgs = ComponentProps<typeof Drawer> & {
    title?: string
    description?: string
    showDescription?: boolean
    showHeader?: boolean
    showFooter?: boolean
    confirmLabel?: string
    cancelLabel?: string
}

const renderDrawer = ({
    defaultOpen,
    mode,
    position,
    size,
    withBackdrop,
    backgroundColor,
    title,
    description,
    showDescription,
    showHeader,
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
                withBackdrop={withBackdrop}
                backgroundColor={backgroundColor}
            >
                {showHeader && (
                    <Drawer.Header
                        title={title}
                        description={showDescription ? description : undefined}
                    />
                )}
                <Drawer.Body
                    as={'nav'}
                    aria-label={'Main navigation'}
                >
                    <Flex
                        flexDirection={'column'}
                        gap={'lg'}
                    >
                        <Drawer.Section title={'Navigation'}>
                            <Drawer.NavItem
                                label={'Dashboard'}
                                href={'/dashboard'}
                                startIcon={IconRegistry.home}
                                active
                            />
                            <Drawer.NavItem
                                label={'Team'}
                                href={'/team'}
                                startIcon={IconRegistry.user}
                            />
                        </Drawer.Section>
                        <Drawer.Section title={'Settings'}>
                            <Drawer.SectionItem
                                label={'Account'}
                                startIcon={IconRegistry.settings}
                                defaultExpanded
                            >
                                <Drawer.NavItem
                                    label={'Profile'}
                                    href={'/profile'}
                                    startIcon={IconRegistry.user}
                                />
                                <Drawer.NavItem
                                    label={'Billing'}
                                    href={'/billing'}
                                    startIcon={IconRegistry.creditCard}
                                />
                            </Drawer.SectionItem>
                        </Drawer.Section>
                        <Drawer.Section title={'Actions'}>
                            <Drawer.ActionItem
                                label={'Sign out'}
                                startIcon={IconRegistry.logOut}
                                onClick={() => setOpen(false)}
                            />
                        </Drawer.Section>
                    </Flex>
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
A flexible drawer component with two render modes.

Compose with \`Drawer.Header\`, \`Drawer.Body\` and \`Drawer.Footer\`.
Use \`Drawer.Section\` to group \`Drawer.NavItem\`, \`Drawer.ActionItem\`
and \`Drawer.SectionItem\` elements inside the body.

**Usage**

~~~tsx
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen} mode="portal">
  <Drawer.Header title="Settings" />
  <Drawer.Body as="nav" aria-label="Main navigation">
    <Drawer.Section title="Navigation">
      <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon="lucide:home" />
    </Drawer.Section>
    <Drawer.Section title="Account">
      <Drawer.SectionItem label="Account" startIcon="lucide:user">
        <Drawer.NavItem label="Profile" href="/profile" />
        <Drawer.ActionItem label="Sign out" startIcon="lucide:log-out" />
      </Drawer.SectionItem>
    </Drawer.Section>
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

**Accessibility**

- Portal drawers are always modal and trap focus while open.
- Pressing \`Escape\` or clicking the backdrop closes a portal drawer.
- Provide a visible title via \`Drawer.Header\` or an \`aria-label\`.
- Wrap navigation items in \`Drawer.Body as="nav"\` with an \`aria-label\`.
- \`Drawer.SectionItem\` exposes \`aria-expanded\`, \`aria-controls\` and a labelled region.
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
        withBackdrop: {
            control: 'boolean',
            table: { category: 'Drawer' },
        },
        backgroundColor: {
            control: 'select',
            options: ['background', 'card', 'popover', 'muted', 'primary', 'secondary', 'transparent'],
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
        showHeader: {
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
        withBackdrop: true,
        title: 'Account settings',
        description: 'Manage your profile and preferences.',
        showDescription: true,
        showHeader: true,
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

        const navigation = document.querySelector('[role="navigation"]')
        await expect(navigation).toBeInTheDocument()
        await expect(navigation).toHaveTextContent('Dashboard')

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
