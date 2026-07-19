import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor } from 'storybook/test'
import { useState, type ComponentProps } from 'react'

import { Button } from '@components/actions/button'
import { IconButton } from '@components/actions/icon-button'
import { Badge } from '@components/data-display/badge'
import { Flex } from '@components/layout/flex'
import {
    Drawer,
    type DrawerMode,
    type DrawerPosition,
    type DrawerSize,
} from '@components/overlay/drawer'
import { IconRegistry } from '@constants/icons'
import {
    DRAWER_MODES_ARRAY,
    DRAWER_POSITIONS_ARRAY,
    DRAWER_SIZES_ARRAY,
} from '@components/overlay/drawer/constants'
import { DRAWER_ITEM_COLORS_ARRAY } from '@components/overlay/drawer/components/items/_shared/constants'
import { md } from '@stories/utils/markdown'

type DrawerPlaygroundArgs = ComponentProps<typeof Drawer> & {
  showHeader?: boolean;
  showFooter?: boolean;
  showNavigation?: boolean;
  showSettings?: boolean;
  navigationTitle?: string;
  settingsTitle?: string;
  firstNavItemLabel?: string;
  secondNavItemLabel?: string;
  thirdNavItemLabel?: string;
  fourthNavItemLabel?: string;
  navItemActive?: boolean;
  navItemDisabled?: boolean;
  navItemVariant?: 'default' | 'outlined';
  navItemColor?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'success' | 'warning' | 'info';
  sectionItemLabel?: string;
  sectionItemDefaultExpanded?: boolean;
  sectionItemDisabled?: boolean;
  sectionItemColor?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'success' | 'warning' | 'info';
};

const renderDrawer = ({
    defaultOpen,
    mode,
    position,
    size,
    withBackdrop,
    collapsedWidth,
    backgroundColor,
    showHeader,
    showFooter,
    showNavigation,
    showSettings,
    navigationTitle,
    settingsTitle,
    firstNavItemLabel,
    secondNavItemLabel,
    thirdNavItemLabel,
    fourthNavItemLabel,
    navItemActive,
    navItemDisabled,
    navItemVariant,
    navItemColor,
    sectionItemLabel,
    sectionItemDefaultExpanded,
    sectionItemDisabled,
    sectionItemColor,
}: DrawerPlaygroundArgs) => {
    const [open, setOpen] = useState(defaultOpen ?? false)
    const isPortal = mode === 'portal'
    const isMini = mode === 'mini'

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <Drawer
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                position={position}
                size={size}
                withBackdrop={withBackdrop}
                collapsedWidth={collapsedWidth}
                backgroundColor={backgroundColor}
            >
                {showHeader && (
                    <Drawer.Header>
                        <IconButton
                            icon={open ? 'lucide:panel-left-close' : 'lucide:panel-left-open'}
                            aria-label={open ? 'Collapse mini' : 'Expand mini'}
                            onClick={() => setOpen(!open)}
                        />
                    </Drawer.Header>
                )}
                <Drawer.Body
                    as={'nav'}
                    aria-label={'Main navigation'}
                >
                    <Flex
                        flexDirection={'column'}
                        gap={'lg'}
                    >
                        {showNavigation && (
                            <Drawer.Section title={navigationTitle}>
                                <Drawer.NavItem
                                    label={firstNavItemLabel ?? 'Dashboard'}
                                    href={'/dashboard'}
                                    startIcon={IconRegistry.home}
                                    active={navItemActive}
                                    disabled={navItemDisabled}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                                <Drawer.NavItem
                                    label={secondNavItemLabel ?? 'Team'}
                                    href={'/team'}
                                    startIcon={IconRegistry.user}
                                    disabled={navItemDisabled}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                                <Drawer.NavItem
                                    label={'Messages'}
                                    href={'/messages'}
                                    startIcon={IconRegistry.mail}
                                    trailing={
                                        <Badge
                                            label={'3'}
                                            size={'sm'}
                                            color={'orange'}
                                            borderRadius={'sm'}
                                        />
                                    }
                                    disabled={navItemDisabled}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                            </Drawer.Section>
                        )}
                        {showSettings && (
                            <Drawer.Section title={settingsTitle}>
                                <Drawer.SectionItem
                                    label={sectionItemLabel ?? 'Section item'}
                                    startIcon={IconRegistry.settings}
                                    trailing={
                                        <Badge
                                            label={'Pro'}
                                            size={'sm'}
                                            color={'secondary'}
                                        />
                                    }
                                    defaultExpanded={sectionItemDefaultExpanded}
                                    disabled={sectionItemDisabled}
                                    color={sectionItemColor}
                                >
                                    <Drawer.NavItem
                                        label={'Notifications'}
                                        href={'/notifications'}
                                        startIcon={IconRegistry.bell}
                                        trailing={
                                            <Badge
                                                label={'New'}
                                                size={'sm'}
                                                borderRadius={'sm'}
                                                color={'destructive'}
                                            />
                                        }
                                        disabled={navItemDisabled}
                                        variant={navItemVariant}
                                        color={navItemColor}
                                    />
                                    <Drawer.NavItem
                                        label={thirdNavItemLabel ?? 'Profile'}
                                        href={'/profile'}
                                        startIcon={IconRegistry.user}
                                        disabled={navItemDisabled}
                                        variant={navItemVariant}
                                        color={navItemColor}
                                    />
                                    <Drawer.NavItem
                                        label={fourthNavItemLabel ?? 'Billing'}
                                        href={'/billing'}
                                        startIcon={IconRegistry.creditCard}
                                        disabled={navItemDisabled}
                                        variant={navItemVariant}
                                        color={navItemColor}
                                    />
                                </Drawer.SectionItem>
                                <Drawer.NavItem
                                    label={thirdNavItemLabel ?? 'Profile'}
                                    href={'/profile'}
                                    startIcon={IconRegistry.user}
                                    disabled={navItemDisabled}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                            </Drawer.Section>
                        )}
                    </Flex>
                </Drawer.Body>
                {showFooter && (
                    <Drawer.Footer
                        justifyContent={'start'}
                    >
                        <Drawer.Section>
                            <Drawer.ActionItem
                                label={'Sign out'}
                                startIcon={IconRegistry.logOut}
                                color={'destructive'}
                            />
                        </Drawer.Section>
                    </Drawer.Footer>
                )}
            </Drawer>

            <div style={{ padding: '1rem' }}>
                <Button
                    label={
                        isPortal
                            ? open
                                ? 'Close drawer'
                                : 'Open drawer'
                            : isMini
                                ? open
                                    ? 'Collapse mini'
                                    : 'Expand mini'
                                : open
                                    ? 'Collapse drawer'
                                    : 'Expand drawer'
                    }
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
Use \`Drawer.Section\` to group \`Drawer.NavItem\`, \`Drawer.ActionItem\`
and \`Drawer.SectionItem\` elements inside the body.

**Usage**

~~~tsx
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen} mode="portal">
  <Drawer.Header>
    <Typography as="h2" fontSize="lg" fontWeight="semibold" color="foreground" ellipsis style={{ flex: '1 1 0%' }}>
      Settings
    </Typography>
    <IconButton icon="lucide:x" aria-label="Close drawer" variant="ghost" size="sm" onClick={() => setOpen(false)} />
  </Drawer.Header>
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

| Mode     | Behavior                                                                 |
| -------- | ------------------------------------------------------------------------ |
| \`portal\` | Rendered in a portal over the page with an optional backdrop.            |
| \`inline\` | Takes space in the layout when open, collapses to width \`0\` when closed. |
| \`mini\`   | Stays visible when closed, collapsing to a narrow width.                 |

**Accessibility**

- Portal drawers are always modal and trap focus while open.
- Pressing \`Escape\` or clicking the backdrop closes a portal drawer.
- Add a visible title inside \`Drawer.Header\` and pass its \`id\` to \`aria-labelledby\` on \`Drawer\` for screen readers.
- Override with \`aria-label\` or \`aria-labelledby\` on \`Drawer\` as needed.
- Wrap navigation items in \`Drawer.Body as="nav"\` with an \`aria-label\`.
- \`Drawer.Section\` automatically associates its title with the section landmark
  via \`aria-labelledby\`.
- \`Drawer.SectionItem\` exposes \`aria-expanded\`, \`aria-controls\` and a labelled region.
- Disabled \`Drawer.NavItem\` elements set \`aria-disabled\` and prevent navigation
  while remaining discoverable in the tab order.
- In \`inline\` mode the collapsed panel is hidden from assistive technologies with
  \`aria-hidden\` and \`inert\`.
- In \`mini\` mode the panel stays visible and accessible when collapsed.
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
        collapsedWidth: {
            control: 'text',
            table: { category: 'Drawer' },
        },
        backgroundColor: {
            control: 'select',
            options: [
                'background',
                'card',
                'popover',
                'muted',
                'primary',
                'secondary',
                'transparent',
            ],
            table: { category: 'Drawer' },
        },
        showHeader: {
            control: 'boolean',
            table: { category: 'Drawer.Header' },
        },
        showFooter: {
            control: 'boolean',
            table: { category: 'Drawer.Footer' },
        },
        showNavigation: {
            control: 'boolean',
            table: { category: 'Drawer.Body' },
        },
        showSettings: {
            control: 'boolean',
            table: { category: 'Drawer.Body' },
        },
        navigationTitle: {
            control: 'text',
            table: { category: 'Drawer.Section' },
        },
        settingsTitle: {
            control: 'text',
            table: { category: 'Drawer.Section' },
        },
        firstNavItemLabel: {
            control: 'text',
            table: { category: 'Drawer.NavItem' },
        },
        secondNavItemLabel: {
            control: 'text',
            table: { category: 'Drawer.NavItem' },
        },
        thirdNavItemLabel: {
            control: 'text',
            table: { category: 'Drawer.NavItem' },
        },
        fourthNavItemLabel: {
            control: 'text',
            table: { category: 'Drawer.NavItem' },
        },
        navItemActive: {
            control: 'boolean',
            table: { category: 'Drawer.NavItem' },
        },
        navItemDisabled: {
            control: 'boolean',
            table: { category: 'Drawer.NavItem' },
        },
        navItemVariant: {
            control: 'select',
            options: ['default', 'outlined'],
            table: { category: 'Drawer.NavItem' },
        },
        navItemColor: {
            control: 'select',
            options: DRAWER_ITEM_COLORS_ARRAY,
            table: { category: 'Drawer.NavItem' },
        },
        sectionItemLabel: {
            control: 'text',
            table: { category: 'Drawer.SectionItem' },
        },
        sectionItemDefaultExpanded: {
            control: 'boolean',
            table: { category: 'Drawer.SectionItem' },
        },
        sectionItemDisabled: {
            control: 'boolean',
            table: { category: 'Drawer.SectionItem' },
        },
        sectionItemColor: {
            control: 'select',
            options: DRAWER_ITEM_COLORS_ARRAY,
            table: { category: 'Drawer.SectionItem' },
        },
    },
    args: {
        defaultOpen: false,
        mode: 'portal' as DrawerMode,
        position: 'left' as DrawerPosition,
        size: 'md' as DrawerSize,
        withBackdrop: true,
        collapsedWidth: '3.875rem',
        showHeader: true,
        showFooter: true,
        showNavigation: true,
        showSettings: true,
        navigationTitle: 'Navigation',
        settingsTitle: 'Settings',
        firstNavItemLabel: 'Dashboard',
        secondNavItemLabel: 'Team',
        thirdNavItemLabel: 'Profile',
        fourthNavItemLabel: 'Billing',
        navItemActive: true,
        navItemDisabled: false,
        navItemVariant: 'default',
        navItemColor: 'primary',
        sectionItemLabel: 'Section item ',
        sectionItemDefaultExpanded: true,
        sectionItemDisabled: false,
        sectionItemColor: 'primary',
    },
} satisfies Meta<DrawerPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;

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

        await userEvent.click(
      document.querySelector('[aria-label="Close drawer"]')!,
        )

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
        size: 'sm',
    },
    parameters: {
        docs: {
            description: {
                story: 'Inline drawer that takes layout space when open.',
            },
        },
    },
    render: renderDrawer,
    decorators: [
        (Story) => (
            <div style={{ height: '100vh' }}>
                <Story />
            </div>
        ),
    ],
}

export const Mini: Story = {
    args: {
        defaultOpen: false,
        mode: 'mini',
        size: 'sm',
    },
    parameters: {
        docs: {
            description: {
                story: 'Mini drawer that stays visible when closed, collapsing to a narrow width.',
            },
        },
    },
    render: renderDrawer,
    decorators: [
        (Story) => (
            <div style={{ height: '100vh' }}>
                <Story />
            </div>
        ),
    ],
}
