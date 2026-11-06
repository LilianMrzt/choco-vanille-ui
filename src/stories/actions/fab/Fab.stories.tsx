import type { CSSProperties, ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { Fab } from '@/components/actions/fab'
import type { FabColor, FabPosition, FabSize } from '@components/actions/fab'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const COLORS: FabColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
]
const SIZES: FabSize[] = ['sm', 'md', 'lg']
const POSITIONS: FabPosition[] = ['bottom-end', 'bottom-start', 'bottom-center']

// A transformed ancestor becomes the containing block of `position: fixed`,
// so each Fab stays pinned inside its own preview frame.
const FRAME_STYLE: CSSProperties = {
    position: 'relative',
    transform: 'translateZ(0)',
    height: '8rem',
    minWidth: '10rem',
    flex: '1 1 10rem',
    border: '1px dashed currentColor',
    borderRadius: '0.5rem',
    opacity: 0.95,
}

const Frame = ({ children }: { children: ReactNode }) => (
    <div style={FRAME_STYLE}>{children}</div>
)

const Row = ({ children }: { children: ReactNode }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', padding: '1rem' }}>
        {children}
    </div>
)

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required               | Type      | Notes                                                                                   |
| ---------------- | ---------------------- | --------- | --------------------------------------------------------------------------------------- |
| \`aria-label\`     | ✅ When no \`label\`      | \`string\`  | Sole accessible name of the round Fab — describe the action (e.g. \`"New trip"\`).        |
| \`label\`          | No                     | \`string\`  | Visible text of the extended Fab, also used as its accessible name.                     |
| \`disabled\`       | No                     | \`boolean\` | Keeps the Fab visible and announced by screen readers.                                  |
| \`aria-*\`         | No                     | —         | All native \`<button>\` ARIA attributes are forwarded to the underlying element.          |

- The Fab renders a native \`<button>\`, so it is keyboard-operable (Space / Enter) with the correct role.
- Keep a single Fab per screen for its primary action, and make sure it never hides focusable content.
- The entrance animation only runs when \`prefers-reduced-motion\` is not set to \`reduce\`.
`

const FabDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Actions/Fab',
    component: Fab,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: md /* language=markdown */ `
A floating action button pinned to the viewport for the screen's primary action.
It composes \`IconButton\` (round, requires \`aria-label\`) or \`Button\` (extended, when a \`label\` is provided),
with a softer radius, a subtle elevation and a reduced-motion-safe entrance.

The position is fixed and respects the device safe areas. Offset it with a \`className\`
when a bottom navigation must stay visible.

**Usage**

~~~tsx
<Fab icon={PlusIcon} aria-label="New trip" onClick={openCreate} />
<Fab icon={PlusIcon} label="New trip" position="bottom-center" />
~~~
        `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        'aria-label': { control: 'text' },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        position: { control: 'select', options: POSITIONS },
        disabled: { control: 'boolean' },
    },
    args: {
        icon: SearchIcon,
        'aria-label': 'Search',
    },
} satisfies Meta<typeof Fab>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    decorators: [
        (Story) => (
            <div style={{ ...FRAME_STYLE, height: '14rem', border: 'none' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            page: FabDocsPage,
            description: {
                story:
          'Interactive playground — set a `label` to switch to the extended Fab.',
            },
            ...storySource(/* language=tsx */ `
<Fab icon={SearchIcon} aria-label="Search" />`),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('button', { name: 'Search' }),
        ).toBeInTheDocument()
    },
}

export const Extended: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Fab icon={SearchIcon} label="Search" position="bottom-end" />
<Fab icon={SearchIcon} label="Search" position="bottom-center" />
<Fab icon={SearchIcon} label="Search" position="bottom-start" />`),
        },
    },
    render: () => (
        <Row>
            {POSITIONS.map((position) => (
                <Frame key={position}>
                    <Fab
                        icon={SearchIcon}
                        label={'Search'}
                        position={position}
                    />
                </Frame>
            ))}
        </Row>
    ),
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Fab icon={SearchIcon} aria-label="primary" color="primary" />
<Fab icon={SearchIcon} aria-label="secondary" color="secondary" />
<Fab icon={SearchIcon} aria-label="tertiary" color="tertiary" />
<Fab icon={SearchIcon} aria-label="destructive" color="destructive" />
<Fab icon={SearchIcon} aria-label="success" color="success" />
<Fab icon={SearchIcon} aria-label="warning" color="warning" />
<Fab icon={SearchIcon} aria-label="info" color="info" />`),
        },
    },
    render: () => (
        <Row>
            {COLORS.map((color) => (
                <Frame key={color}>
                    <Fab
                        icon={SearchIcon}
                        aria-label={color}
                        color={color}
                    />
                </Frame>
            ))}
        </Row>
    ),
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Fab icon={SearchIcon} aria-label="sm" size="sm" />
<Fab icon={SearchIcon} aria-label="md" size="md" />
<Fab icon={SearchIcon} aria-label="lg" size="lg" />`),
        },
    },
    render: () => (
        <Row>
            {SIZES.map((size) => (
                <Frame key={size}>
                    <Fab
                        icon={SearchIcon}
                        aria-label={size}
                        size={size}
                    />
                </Frame>
            ))}
        </Row>
    ),
}

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Fab icon={SearchIcon} aria-label="Disabled" disabled />`),
        },
    },
    render: () => (
        <Row>
            <Frame>
                <Fab
                    icon={SearchIcon}
                    aria-label={'Disabled'}
                    disabled
                />
            </Frame>
        </Row>
    ),
}
