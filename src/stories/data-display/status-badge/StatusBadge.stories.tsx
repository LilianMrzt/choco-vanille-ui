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

import {
    StatusBadge,
    type StatusBadgePosition,
    type StatusBadgeSize,
} from '@components/data-display/status-badge'
import type { BadgeColor } from '@components/data-display/badge'
import { Avatar } from '@components/data-display/avatar'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const COLORS: BadgeColor[] = [
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

const POSITIONS: StatusBadgePosition[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
]

const SIZES: StatusBadgeSize[] = ['sm', 'md', 'lg']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type           | Notes                                                                                       |
| ---------------- | -------- | -------------- | ------------------------------------------------------------------------------------------- |
| \`children\`       | Yes      | \`ReactElement\` | The component displayed beneath the indicator.                                              |
| \`number\`         | No       | \`number\`       | Renders a size-matched number inside the indicator. |
| \`label\`          | No       | \`string\`       | Gives the indicator a custom accessible name. Without it, a numbered indicator uses its number as its name. |
| \`aria-*\`         | No       | —              | Native attributes are forwarded to the wrapper.                                             |
`

const StatusBadgeDocsPage = () => (
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
    title: 'Data Display/StatusBadge',
    component: StatusBadge,
    parameters: {
        layout: 'centered',
        docs: {
            page: StatusBadgeDocsPage,
            description: {
                component: md /* language=markdown */ `
A wrapper that places a small colored circle on one corner of a component.
The indicator uses the same thirteen color intents as \`Badge\`.

**Usage**

~~~tsx
<StatusBadge color="success" position="top-right" number={3} label="Notifications">
  <Avatar initials="JD" />
</StatusBadge>
~~~
        `,
            },
        },
    },
    argTypes: {
        children: { table: { disable: true } },
        color: { control: 'select', options: COLORS },
        position: { control: 'select', options: POSITIONS },
        size: { control: 'select', options: SIZES },
        number: { control: 'number' },
        label: { control: 'text' },
    },
    args: {
        color: 'primary',
        position: 'top-right',
        size: 'md',
        number: 3,
        label: 'Notifications',
        children: <Avatar initials={'JD'} />,
    },
} satisfies Meta<typeof StatusBadge>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to change the indicator color, corner, number, and accessible label.',
            },
            ...storySource(`<StatusBadge color="primary" position="top-right" size="md" number={3} label="Notifications">
  <Avatar initials="JD" />
</StatusBadge>`),
        },
    },
    render: ({ children, ...args }) => (
        <StatusBadge {...args}>{children}</StatusBadge>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('JD')).toBeInTheDocument()
    },
}

export const Colors: Story = {
    parameters: {
        docs: {
            description: {
                story: 'All color intents shared with Badge.',
            },
            ...storySource(`<StatusBadge color="primary"><Avatar initials="PR" /></StatusBadge>
<StatusBadge color="secondary"><Avatar initials="SE" /></StatusBadge>
<StatusBadge color="tertiary"><Avatar initials="TE" /></StatusBadge>
<StatusBadge color="destructive"><Avatar initials="DE" /></StatusBadge>
<StatusBadge color="success"><Avatar initials="SU" /></StatusBadge>
<StatusBadge color="warning"><Avatar initials="WA" /></StatusBadge>
<StatusBadge color="info"><Avatar initials="IN" /></StatusBadge>
<StatusBadge color="purple"><Avatar initials="PU" /></StatusBadge>
<StatusBadge color="pink"><Avatar initials="PI" /></StatusBadge>
<StatusBadge color="orange"><Avatar initials="OR" /></StatusBadge>
<StatusBadge color="teal"><Avatar initials="TL" /></StatusBadge>
<StatusBadge color="cyan"><Avatar initials="CY" /></StatusBadge>
<StatusBadge color="indigo"><Avatar initials="IG" /></StatusBadge>`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <StatusBadge color={'primary'}>
                <Avatar initials={'PR'} />
            </StatusBadge>
            <StatusBadge color={'secondary'}>
                <Avatar initials={'SE'} />
            </StatusBadge>
            <StatusBadge color={'tertiary'}>
                <Avatar initials={'TE'} />
            </StatusBadge>
            <StatusBadge color={'destructive'}>
                <Avatar initials={'DE'} />
            </StatusBadge>
            <StatusBadge color={'success'}>
                <Avatar initials={'SU'} />
            </StatusBadge>
            <StatusBadge color={'warning'}>
                <Avatar initials={'WA'} />
            </StatusBadge>
            <StatusBadge color={'info'}>
                <Avatar initials={'IN'} />
            </StatusBadge>
            <StatusBadge color={'purple'}>
                <Avatar initials={'PU'} />
            </StatusBadge>
            <StatusBadge color={'pink'}>
                <Avatar initials={'PI'} />
            </StatusBadge>
            <StatusBadge color={'orange'}>
                <Avatar initials={'OR'} />
            </StatusBadge>
            <StatusBadge color={'teal'}>
                <Avatar initials={'TL'} />
            </StatusBadge>
            <StatusBadge color={'cyan'}>
                <Avatar initials={'CY'} />
            </StatusBadge>
            <StatusBadge color={'indigo'}>
                <Avatar initials={'IG'} />
            </StatusBadge>
        </div>
    ),
}

export const Positions: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'The indicator can be placed in any corner of the wrapped component.',
            },
            ...storySource(`<StatusBadge position="top-left"><Avatar initials="TL" /></StatusBadge>
<StatusBadge position="top-right"><Avatar initials="TR" /></StatusBadge>
<StatusBadge position="bottom-left"><Avatar initials="BL" /></StatusBadge>
<StatusBadge position="bottom-right"><Avatar initials="BR" /></StatusBadge>`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
            <StatusBadge position={'top-left'}>
                <Avatar initials={'TL'} />
            </StatusBadge>
            <StatusBadge position={'top-right'}>
                <Avatar initials={'TR'} />
            </StatusBadge>
            <StatusBadge position={'bottom-left'}>
                <Avatar initials={'BL'} />
            </StatusBadge>
            <StatusBadge position={'bottom-right'}>
                <Avatar initials={'BR'} />
            </StatusBadge>
        </div>
    ),
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The three indicator sizes.',
            },
            ...storySource(`<StatusBadge size="sm"><Avatar initials="SM" /></StatusBadge>
<StatusBadge size="md"><Avatar initials="MD" /></StatusBadge>
<StatusBadge size="lg"><Avatar initials="LG" /></StatusBadge>`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <StatusBadge size={'sm'}>
                <Avatar initials={'SM'} />
            </StatusBadge>
            <StatusBadge size={'md'}>
                <Avatar initials={'MD'} />
            </StatusBadge>
            <StatusBadge size={'lg'}>
                <Avatar initials={'LG'} />
            </StatusBadge>
        </div>
    ),
}

export const Numbers: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Numbers are rendered inside the indicator with a size-matched text style.',
            },
            ...storySource(`<StatusBadge number={1} size="sm"><Avatar initials="SM" /></StatusBadge>
<StatusBadge number={12} size="md"><Avatar initials="MD" /></StatusBadge>
<StatusBadge number={99} size="lg"><Avatar initials="LG" /></StatusBadge>`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <StatusBadge
                number={1}
                size={'sm'}
            >
                <Avatar initials={'SM'} />
            </StatusBadge>
            <StatusBadge
                number={12}
                size={'md'}
            >
                <Avatar initials={'MD'} />
            </StatusBadge>
            <StatusBadge
                number={99}
                size={'lg'}
            >
                <Avatar initials={'LG'} />
            </StatusBadge>
        </div>
    ),
}
