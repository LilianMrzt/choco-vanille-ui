import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import {
    Avatar,
    type AvatarColor,
    type AvatarShape,
    type AvatarSize,
    type AvatarStatus,
} from '@components/data-display/avatar'
import { md } from '@stories/utils/markdown'

const SIZES: AvatarSize[] = ['sm', 'md', 'lg', 'xl']
const SHAPES: AvatarShape[] = ['circle', 'square']
const COLORS: AvatarColor[] = [
    'primary',
    'secondary',
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

const meta = {
    title: 'Data Display/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
        docs: {
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

**Accessibility**

| Prop / Attribute | Required          | Type     | Notes                                                   |
| ---------------- | ----------------- | -------- | ------------------------------------------------------- |
| \`alt\`            | For images        | \`string\` | Describes the image for screen readers.                 |
| \`initials\`       | For text fallback | \`string\` | Rendered when no image is provided or it fails to load. |
| \`aria-*\`         | No                | —        | Native attributes are forwarded to the root element.    |

- The root renders as a native \`<span>\`.
- Status indicators are decorative and hidden from assistive technology.
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
    },
    args: {
        size: 'md',
        shape: 'circle',
        color: 'primary',
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('JD')).toBeInTheDocument()
    },
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: { story: 'The four avatar sizes.' },
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

export const FallbackColors: Story = {
    parameters: {
        docs: {
            description: { story: 'All available fallback color intents.' },
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
        },
    },
    args: {
        icon: 'lucide:user',
        color: 'secondary',
    },
}

export const WithStatus: Story = {
    parameters: {
        docs: {
            description: { story: 'Status indicators for each state.' },
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
