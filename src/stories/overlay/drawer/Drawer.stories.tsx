import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
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
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'
import {
    DRAWER_MODES_ARRAY,
    DRAWER_POSITIONS_ARRAY,
    DRAWER_SIZES_ARRAY,
} from '@components/overlay/drawer/constants'
import { DRAWER_ITEM_COLORS_ARRAY } from '@components/overlay/drawer/components/items/_shared/constants'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

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
  navItemHideTooltip?: boolean;
  navItemVariant?: 'default' | 'outlined';
  navItemColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info';
  sectionItemLabel?: string;
  sectionItemDefaultExpanded?: boolean;
  sectionItemDisabled?: boolean;
  sectionItemHideTooltip?: boolean;
  sectionItemColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info';
  actionItemHideTooltip?: boolean;
};

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                              | Required    | Type      | Notes                                                                                                                    |
| --------------------------------------------- | ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| \`aria-label\` or \`aria-labelledby\` on \`Drawer\` | No          | \`string\`  | Name the drawer for screen readers. Add a visible title in \`Drawer.Header\` and reference its \`id\` via \`aria-labelledby\`. |
| \`aria-label\` on \`Drawer.Body as="nav"\`        | Recommended | \`string\`  | Provide an accessible name for the navigation region.                                                                    |
| \`aria-expanded\` / \`aria-controls\`             | Auto        | \`boolean\` | Set automatically by \`Drawer.SectionItem\`.                                                                               |
| \`aria-disabled\` on \`Drawer.NavItem\`           | Auto        | \`boolean\` | Set when \`disabled\` is true; keeps the item discoverable.                                                                |

- Portal drawers are always modal and trap focus while open.
- Pressing \`Escape\` or clicking the backdrop closes a portal drawer.
- In \`inline\` mode the collapsed panel is hidden with \`aria-hidden\` and \`inert\`.
- In \`mini\` mode the panel stays visible and accessible when collapsed.
`

const DrawerDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

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
    navItemHideTooltip,
    navItemVariant,
    navItemColor,
    sectionItemLabel,
    sectionItemDefaultExpanded,
    sectionItemDisabled,
    sectionItemHideTooltip,
    sectionItemColor,
    actionItemHideTooltip,
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
                            icon={open ? CloseIcon : ChevronRightIcon}
                            aria-label={open ? 'Collapse mini' : 'Expand mini'}
                            size={'sm'}
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
                                    startIcon={UserIcon}
                                    active={navItemActive}
                                    disabled={navItemDisabled}
                                    hideTooltip={navItemHideTooltip}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                                <Drawer.NavItem
                                    label={secondNavItemLabel ?? 'Team'}
                                    href={'/team'}
                                    startIcon={UserIcon}
                                    endIcon={ChevronRightIcon}
                                    disabled={navItemDisabled}
                                    hideTooltip={navItemHideTooltip}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                                <Drawer.NavItem
                                    label={'Messages'}
                                    href={'/messages'}
                                    startIcon={SearchIcon}
                                    trailing={
                                        <Badge
                                            label={'3'}
                                            size={'sm'}
                                            color={'orange'}
                                            borderRadius={'sm'}
                                        />
                                    }
                                    disabled={navItemDisabled}
                                    hideTooltip={navItemHideTooltip}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                            </Drawer.Section>
                        )}
                        {showSettings && (
                            <Drawer.Section title={settingsTitle}>
                                <Drawer.SectionItem
                                    label={sectionItemLabel ?? 'Section item'}
                                    startIcon={SearchIcon}
                                    endIcon={InfoIcon}
                                    trailing={
                                        <Badge
                                            label={'Pro'}
                                            size={'sm'}
                                            color={'secondary'}
                                        />
                                    }
                                    defaultExpanded={sectionItemDefaultExpanded}
                                    disabled={sectionItemDisabled}
                                    hideTooltip={sectionItemHideTooltip}
                                    color={sectionItemColor}
                                >
                                    <Drawer.NavItem
                                        label={'Notifications'}
                                        href={'/notifications'}
                                        startIcon={InfoIcon}
                                        trailing={
                                            <Badge
                                                label={'New'}
                                                size={'sm'}
                                                borderRadius={'sm'}
                                                color={'destructive'}
                                            />
                                        }
                                        disabled={navItemDisabled}
                                        hideTooltip={navItemHideTooltip}
                                        variant={navItemVariant}
                                        color={navItemColor}
                                    />
                                    <Drawer.NavItem
                                        label={thirdNavItemLabel ?? 'Profile'}
                                        href={'/profile'}
                                        startIcon={UserIcon}
                                        disabled={navItemDisabled}
                                        hideTooltip={navItemHideTooltip}
                                        variant={navItemVariant}
                                        color={navItemColor}
                                    />
                                    <Drawer.NavItem
                                        label={fourthNavItemLabel ?? 'Billing'}
                                        href={'/billing'}
                                        startIcon={UserIcon}
                                        disabled={navItemDisabled}
                                        hideTooltip={navItemHideTooltip}
                                        variant={navItemVariant}
                                        color={navItemColor}
                                    />
                                </Drawer.SectionItem>
                                <Drawer.NavItem
                                    label={thirdNavItemLabel ?? 'Profile'}
                                    href={'/profile'}
                                    startIcon={UserIcon}
                                    disabled={navItemDisabled}
                                    hideTooltip={navItemHideTooltip}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                            </Drawer.Section>
                        )}
                    </Flex>
                </Drawer.Body>
                {showFooter && (
                    <Drawer.Footer justifyContent={'start'}>
                        <Drawer.Section title={'Actions'}>
                            <Drawer.ActionItem
                                label={'Sign out'}
                                startIcon={CloseIcon}
                                color={'destructive'}
                                hideTooltip={actionItemHideTooltip}
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

const DrawerSizeSample = ({ size }: { size: DrawerSize }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Drawer
                open={open}
                onOpenChange={setOpen}
                mode={'portal'}
                size={size}
            >
                <Drawer.Body>
                    <div style={{ padding: '1rem' }}>
                        <strong>size: {size}</strong>
                    </div>
                </Drawer.Body>
            </Drawer>
            <Button
                label={size}
                variant={'outlined'}
                onClick={() => setOpen(true)}
            />
        </>
    )
}

const meta: Meta<DrawerPlaygroundArgs> = {
    title: 'Overlay/Drawer',
    component: Drawer,
    parameters: {
        layout: 'fullscreen',
        docs: {
            page: DrawerDocsPage,
            description: {
                component: md /* language=markdown */ `
A flexible drawer component with three render modes.

Compose with \`Drawer.Header\`, \`Drawer.Body\` and \`Drawer.Footer\`.
Use \`Drawer.Section\` to group \`Drawer.NavItem\`, \`Drawer.ActionItem\`
and \`Drawer.SectionItem\` elements inside the body.

For client-side routing, provide both \`href\` and \`onClick\`. When
\`onClick\` is provided, \`Drawer.NavItem\` prevents native anchor navigation
automatically, so the callback only needs to call the router:

~~~tsx
const navigate = useNavigate()

<Drawer.NavItem
  label="Dashboard"
  href="/dashboard"
  startIcon={UserIcon}
  onClick={() => navigate("/dashboard")}
/>
~~~

**Usage**

~~~tsx
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen} mode="portal">
  <Drawer.Header>
    <Typography as="h2" fontSize="lg" fontWeight="semibold" color={vars.color.text.primary} ellipsis style={{ flex: '1 1 0%' }}>
      Settings
    </Typography>
    <IconButton icon={CloseIcon} aria-label="Close drawer" variant="ghost" size="sm" onClick={() => setOpen(false)} />
  </Drawer.Header>
  <Drawer.Body as="nav" aria-label="Main navigation">
    <Drawer.Section title="Navigation">
      <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon={UserIcon} endIcon={ChevronRightIcon} />
    </Drawer.Section>
    <Drawer.Section title="Account">
      <Drawer.SectionItem label="Account" startIcon={UserIcon} endIcon={InfoIcon}>
        <Drawer.NavItem label="Profile" href="/profile" />
        <Drawer.ActionItem label="Sign out" startIcon={CloseIcon} />
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
        navItemHideTooltip: {
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
        sectionItemHideTooltip: {
            control: 'boolean',
            table: { category: 'Drawer.SectionItem' },
        },
        sectionItemColor: {
            control: 'select',
            options: DRAWER_ITEM_COLORS_ARRAY,
            table: { category: 'Drawer.SectionItem' },
        },
        actionItemHideTooltip: {
            control: 'boolean',
            table: { category: 'Drawer.ActionItem' },
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
        navItemHideTooltip: false,
        navItemVariant: 'default',
        navItemColor: 'primary',
        sectionItemLabel: 'Section item ',
        sectionItemDefaultExpanded: true,
        sectionItemDisabled: false,
        sectionItemHideTooltip: false,
        sectionItemColor: 'primary',
        actionItemHideTooltip: false,
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
            ...storySource(/* language=tsx */ `
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen} mode="portal" size="md">
  <Drawer.Header>
    <IconButton icon={CloseIcon} aria-label="Close drawer" size="sm" onClick={() => setOpen(false)} />
  </Drawer.Header>
  <Drawer.Body as="nav" aria-label="Main navigation">
    <Drawer.Section title="Navigation">
      <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon={UserIcon} active />
      <Drawer.NavItem label="Team" href="/team" startIcon={UserIcon} />
    </Drawer.Section>
  </Drawer.Body>
  <Drawer.Footer justifyContent="start">
    <Drawer.Section title="Actions">
      <Drawer.ActionItem label="Sign out" startIcon={CloseIcon} color="destructive" />
    </Drawer.Section>
  </Drawer.Footer>
</Drawer>

<Button label="Open drawer" variant="contained" color="primary" onClick={() => setOpen(true)} />`),
        },
    },
    render: renderDrawer,
    play: async ({ canvasElement }) => {
        await userEvent.click(canvasElement.querySelector('button')!)

        await waitFor(() =>
            expect(document.querySelector('[role="dialog"]')).toBeInTheDocument(),
        )
        await expect(document.querySelector('[role="dialog"]')).toHaveTextContent(
            'Settings',
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
            ...storySource(/* language=tsx */ `
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen} mode="inline" size="sm">
  <Drawer.Body as="nav" aria-label="Main navigation">
    <Drawer.Section title="Navigation">
      <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon={UserIcon} />
    </Drawer.Section>
  </Drawer.Body>
</Drawer>`),
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
                story:
          'Mini drawer that stays visible when closed, collapsing to a narrow width.',
            },
            ...storySource(/* language=tsx */ `
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen} mode="mini" size="sm">
  <Drawer.Body as="nav" aria-label="Main navigation">
    <Drawer.Section title="Navigation">
      <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon={UserIcon} />
    </Drawer.Section>
  </Drawer.Body>
</Drawer>`),
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

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Portal drawer sizes rendered as explicit samples for every supported width.',
            },
            ...storySource(/* language=tsx */ `
<div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
  <Drawer open={false} onOpenChange={() => {}} mode="portal" size="sm">
    <Drawer.Body>
      <div style={{ padding: '1rem' }}>
        <strong>size: sm</strong>
      </div>
    </Drawer.Body>
  </Drawer>
  <Button label="sm" variant="outlined" />

  <Drawer open={false} onOpenChange={() => {}} mode="portal" size="md">
    <Drawer.Body>
      <div style={{ padding: '1rem' }}>
        <strong>size: md</strong>
      </div>
    </Drawer.Body>
  </Drawer>
  <Button label="md" variant="outlined" />

  <Drawer open={false} onOpenChange={() => {}} mode="portal" size="lg">
    <Drawer.Body>
      <div style={{ padding: '1rem' }}>
        <strong>size: lg</strong>
      </div>
    </Drawer.Body>
  </Drawer>
  <Button label="lg" variant="outlined" />

  <Drawer open={false} onOpenChange={() => {}} mode="portal" size="xl">
    <Drawer.Body>
      <div style={{ padding: '1rem' }}>
        <strong>size: xl</strong>
      </div>
    </Drawer.Body>
  </Drawer>
  <Button label="xl" variant="outlined" />

  <Drawer open={false} onOpenChange={() => {}} mode="portal" size="2xl">
    <Drawer.Body>
      <div style={{ padding: '1rem' }}>
        <strong>size: 2xl</strong>
      </div>
    </Drawer.Body>
  </Drawer>
  <Button label="2xl" variant="outlined" />

  <Drawer open={false} onOpenChange={() => {}} mode="portal" size="full">
    <Drawer.Body>
      <div style={{ padding: '1rem' }}>
        <strong>size: full</strong>
      </div>
    </Drawer.Body>
  </Drawer>
  <Button label="full" variant="outlined" />
</div>`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {DRAWER_SIZES_ARRAY.map((size) => (
                <DrawerSizeSample
                    key={size}
                    size={size}
                />
            ))}
        </div>
    ),
}
