import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/drawer/constants'
import sourceSizes from '@stories/overlay/drawer/sources/Sizes.source.tsx.txt?raw'
import DrawerDocsPage from '@stories/overlay/drawer/components/drawer-docs-page/DrawerDocsPage'
import DrawerUncontrolled from '@stories/overlay/drawer/components/drawer-uncontrolled/DrawerUncontrolled'
import uncontrolledSource from '@stories/overlay/drawer/sources/Uncontrolled.source.tsx.txt?raw'
import DrawerExample from '@stories/overlay/drawer/components/drawer-example/DrawerExample'
import DrawerSizeSample from '@stories/overlay/drawer/components/drawer-size-sample/DrawerSizeSample'
import type { DrawerPlaygroundArgs } from '@stories/overlay/drawer/types'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { expect, userEvent, waitFor } from 'storybook/test'

import {
    Drawer,
} from '@components/overlay/drawer'
import {
    DRAWER_SIZES_ARRAY,
} from '@components/overlay/drawer/constants'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createDrawerSource } from '@stories/overlay/drawer/utils/create-drawer-source/createDrawerSource.utils'

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
    <Typography as="h2" fontSize={18} fontWeight="semibold" color={vars.color.text.primary} ellipsis style={{ flex: '1 1 0%' }}>
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
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
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
            source: { type: 'dynamic', transform: createDrawerSource },
        },
    },
    render: DrawerExample,
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

export const Uncontrolled: Story = {
    render: DrawerUncontrolled,
    parameters: { docs: { ...storySource(uncontrolledSource), description: { story: 'The drawer owns its open state and is remounted to apply its initial state.' } } },
}

export const Inline: Story = {
    args: {
        open: false,
        mode: 'inline',
        size: 'sm',
    },
    parameters: {
        docs: {
            description: {
                story: 'Inline drawer that takes layout space when open.',
            },
            source: { type: 'dynamic', transform: createDrawerSource },
        },
    },
    render: DrawerExample,
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
        open: false,
        mode: 'mini',
        size: 'sm',
    },
    parameters: {
        docs: {
            description: {
                story:
          'Mini drawer that stays visible when closed, collapsing to a narrow width.',
            },
            source: { type: 'dynamic', transform: createDrawerSource },
        },
    },
    render: DrawerExample,
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
            ...storySource(/* language=tsx */ sourceSizes),
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
