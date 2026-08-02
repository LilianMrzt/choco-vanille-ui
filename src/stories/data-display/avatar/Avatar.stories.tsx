import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import {
    Avatar,
    type AvatarColor,
    type AvatarShape,
    type AvatarSize,
    type AvatarStatus,
} from '@components/data-display/avatar'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const SIZES: AvatarSize[] = ['sm', 'md', 'lg', 'xl']
const SHAPES: AvatarShape[] = ['circle', 'square']
const COLORS: AvatarColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
    'purple',
    'pink',
    'orange',
    'teal',
    'cyan',
    'indigo',
]
const STATUS: AvatarStatus[] = ['online', 'offline', 'busy', 'away']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`alt\` | For images | \`string\` | Describes the image for screen readers. |
| \`initials\` | For text fallback | \`string\` | Rendered when no image is provided or it fails to load. |
| \`aria-*\` | No | — | Native attributes are forwarded to the root element. |
`

const AvatarDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

type AvatarStoryArgs = ComponentProps<typeof Avatar> & {
    compoundFallback?: string
    compoundImage?: string
    compoundRoot?: string
    compoundStatus?: AvatarStatus
}

const meta = {
    title: 'Data Display/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
        docs: {
            page: AvatarDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A profile picture component built on top of \`@base-ui/react/avatar\`.
It displays an image when available and falls back to initials or an icon.

**Usage**

~~~tsx
<Avatar src="https://github.com/shadcn.png" alt="shadcn" />
<Avatar initials="JD" />
<Avatar icon="lucide:user" color="secondary" />
<Avatar status="online" statusSize="lg" />
~~~

        `,
            },
        },
    },
    argTypes: {
        src: { control: 'text' },
        alt: { control: 'text' },
        initials: { control: 'text' },
        icon: { control: 'text' },
        size: { control: 'select', options: SIZES },
        shape: { control: 'select', options: SHAPES },
        color: { control: 'select', options: COLORS },
        status: { control: 'select', options: STATUS },
        statusSize: { control: 'select', options: SIZES },
        fallbackDelay: { control: 'number' },
        compoundFallback: { control: 'text', table: { category: 'Compound: Fallback' } },
        compoundImage: { control: 'text', table: { category: 'Compound: Image' } },
        compoundRoot: { control: 'text', table: { category: 'Compound: Root' } },
        compoundStatus: { control: 'text', table: { category: 'Compound: Status' } },
    },
    args: {
        size: 'md',
        shape: 'circle',
        color: 'primary',
        compoundFallback: 'JD',
        compoundImage: 'https://github.com/shadcn.png',
        compoundRoot: 'Avatar',
        compoundStatus: 'online',
    },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    args: {
        initials: 'JD',
    },
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(`<Avatar initials="JD" color="primary" />`),
        },
    },
    render: (args: AvatarStoryArgs) => {
        const {
            compoundFallback,
            compoundImage,
            compoundRoot,
            compoundStatus,
            ...avatarArgs
        } = args

        return (
            <Avatar
                {...avatarArgs}
                aria-label={compoundRoot}
                initials={compoundFallback}
                src={compoundImage}
                status={compoundStatus}
                statusLabel={compoundStatus}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('JD')).toBeInTheDocument()
    },
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: { story: 'The four avatar sizes.' },
            ...storySource(`<Avatar initials="SM" size="sm" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {SIZES.map((size) => (
                <Avatar
                    key={size}
                    initials={size.toUpperCase()}
                    size={size}
                />
            ))}
        </div>
    ),
}

export const Shapes: Story = {
    parameters: {
        docs: {
            description: { story: 'Circle and square shapes, with initials and image fallbacks.' },
            ...storySource(`<Avatar initials="C" shape="circle" /><Avatar initials="S" shape="square" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SHAPES.map((shape) => (
                <div
                    key={shape}
                    style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}
                >
                    <Avatar
                        initials={shape[0].toUpperCase()}
                        shape={shape}
                    />
                    <Avatar
                        src={'https://github.com/shadcn.png'}
                        alt={'shadcn'}
                        initials={'CN'}
                        shape={shape}
                    />
                </div>
            ))}
        </div>
    ),
}

export const Colors: Story = {
    parameters: {
        docs: {
            description: { story: 'All available fallback color intents.' },
            ...storySource(`<Avatar initials="PR" color="primary" /><Avatar initials="SU" color="success" />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                maxWidth: '40rem',
            }}
        >
            {COLORS.map((color) => (
                <Avatar
                    key={color}
                    initials={color.slice(0, 2).toUpperCase()}
                    color={color}
                />
            ))}
        </div>
    ),
}

export const WithImage: Story = {
    parameters: {
        docs: {
            description: { story: 'Avatar displaying a remote image.' },
            ...storySource(`<Avatar src="https://github.com/shadcn.png" alt="shadcn" initials="CN" />`),
        },
    },
    args: {
        src: 'https://github.com/shadcn.png',
        alt: 'shadcn',
        initials: 'CN',
    },
}

export const WithIconFallback: Story = {
    parameters: {
        docs: {
            description: { story: 'Avatar with an icon fallback.' },
            ...storySource(`<Avatar icon="lucide:user" color="secondary" />`),
        },
    },
    args: {
        icon: 'lucide:user',
        color: 'secondary',
    },
}

export const Statuses: Story = {
    parameters: {
        docs: {
            description: { story: 'Status indicators for each state.' },
            ...storySource(`<Avatar initials="O" status="online" /><Avatar initials="B" status="busy" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {STATUS.map((status) => (
                <Avatar
                    key={status}
                    initials={status[0].toUpperCase()}
                    status={status}
                />
            ))}
        </div>
    ),
}

export const WithStatusSizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Status indicators can be sized independently of the avatar.',
            },
            ...storySource(`<Avatar initials="A" status="online" statusSize="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {SIZES.map((statusSize) => (
                <Avatar
                    key={statusSize}
                    initials={'A'}
                    status={'online'}
                    statusSize={statusSize}
                />
            ))}
        </div>
    ),
}

export const OnColoredBackground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Avatars on a colored background, showing the default ring.',
            },
            ...storySource(`<Avatar initials="JD" /><Avatar src="https://github.com/shadcn.png" alt="shadcn" />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                padding: '1rem',
                background: '#f3f4f6',
            }}
        >
            <Avatar initials={'JD'} />
            <Avatar
                src={'https://github.com/shadcn.png'}
                alt={'shadcn'}
                initials={'CN'}
            />
        </div>
    ),
}
