import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Avatar } from '@components/data-display/avatar'
import {
    AvatarGroup,
    type AvatarGroupSpacing,
} from '@components/data-display/avatar-group'
import { md } from '@stories/utils/markdown'

const SPACINGS: AvatarGroupSpacing[] = ['none', 'sm', 'md', 'lg', 'xl']

const meta = {
    title: 'Data Display/AvatarGroup',
    component: AvatarGroup,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

Stacks multiple \`Avatar\` components with a modern overlapping look.
Useful for showing a team, participants, or collaborators.

**Usage**

~~~tsx
<AvatarGroup max={3} spacing="md">
  <Avatar initials="AB" />
  <Avatar initials="CD" />
  <Avatar initials="EF" />
  <Avatar initials="GH" />
</AvatarGroup>
~~~

**Accessibility**

| Prop / Attribute | Required | Type                           | Notes                                           |
| ---------------- | -------- | ------------------------------ | ----------------------------------------------- |
| \`children\`       | ✅ Yes   | \`ReactNode\`                    | Should be \`Avatar\` elements.                    |
| \`max\`            | No       | \`number\`                       | Truncates the list with a \`+N\` overflow avatar. |
| \`spacing\`        | No       | \`none \| sm \| md \| lg \| xl\` | Controls the negative overlap between avatars.  |

- The group renders as a flex container.
- Overflow count is rendered as text inside an additional avatar.
        `,
            },
        },
    },
    argTypes: {
        max: { control: 'number' },
        spacing: { control: 'select', options: SPACINGS },
    },
    args: {
        spacing: 'md',
    },
} satisfies Meta<typeof AvatarGroup>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        spacing: 'md',
    },
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with spacing and max.',
            },
        },
    },
    render: (args) => (
        <AvatarGroup {...args}>
            <Avatar initials={'AB'} />
            <Avatar initials={'CD'} />
            <Avatar initials={'EF'} />
            <Avatar initials={'GH'} />
            <Avatar initials={'IJ'} />
        </AvatarGroup>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('AB')).toBeInTheDocument()
    },
}

export const Default: Story = {
    args: {
        spacing: 'md',
    },
    parameters: {
        docs: {
            description: { story: 'A group of overlapping avatars.' },
        },
    },
    render: () => (
        <AvatarGroup>
            <Avatar initials={'AB'} />
            <Avatar initials={'CD'} />
            <Avatar initials={'EF'} />
            <Avatar initials={'GH'} />
            <Avatar initials={'IJ'} />
        </AvatarGroup>
    ),
}

export const WithMax: Story = {
    args: {
        spacing: 'md',
    },
    parameters: {
        docs: {
            description: {
                story: 'A group that truncates with a `+N` overflow indicator.',
            },
        },
    },
    render: () => (
        <AvatarGroup max={3}>
            <Avatar initials={'AB'} />
            <Avatar initials={'CD'} />
            <Avatar initials={'EF'} />
            <Avatar initials={'GH'} />
            <Avatar initials={'IJ'} />
        </AvatarGroup>
    ),
}

export const Spacing: Story = {
    args: {
        spacing: 'md',
    },
    parameters: {
        docs: {
            description: {
                story: 'Available overlap gaps between avatars.',
            },
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: 'flex-start',
            }}
        >
            {SPACINGS.map((spacing) => (
                <AvatarGroup
                    key={spacing}
                    spacing={spacing}
                >
                    <Avatar initials={'A'} />
                    <Avatar initials={'B'} />
                    <Avatar initials={'C'} />
                    <Avatar initials={'D'} />
                </AvatarGroup>
            ))}
        </div>
    ),
}

export const WithImages: Story = {
    args: {
        spacing: 'md',
    },
    parameters: {
        docs: {
            description: { story: 'A group mixing images and initials.' },
        },
    },
    render: () => (
        <AvatarGroup>
            <Avatar
                src={'https://github.com/shadcn.png'}
                alt={'shadcn'}
                initials={'CN'}
            />
            <Avatar initials={'JD'} />
            <Avatar
                src={'https://github.com/vercel.png'}
                alt={'vercel'}
                initials={'VC'}
            />
            <Avatar initials={'MK'} />
        </AvatarGroup>
    ),
}
