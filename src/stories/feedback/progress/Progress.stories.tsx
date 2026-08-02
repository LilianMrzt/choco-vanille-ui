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
    CircularProgress,
    Progress,
    type ProgressBorderRadius,
    type ProgressColor,
    type ProgressSize,
} from '@components/feedback/progress'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const COLORS: ProgressColor[] = [
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
const SIZES: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const BORDER_RADIUS: ProgressBorderRadius[] = [
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'full',
]

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`value\` | Yes | \`number\` | Current progress between 0 and 100. |
| \`label\`, \`aria-label\`, \`aria-labelledby\` | One required | \`string\` | Names the progressbar. |
| \`quantityLabel\` | No | \`string \| true\` | Shows a percentage or custom quantity. |

- Both variants render with \`role="progressbar"\` and expose their value attributes.
`

const ProgressDocsPage = () => (
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
    title: 'Feedback/Progress',
    component: Progress,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A progress indicator with linear and circular variants.

**Usage**

~~~tsx
<Progress value={50} aria-label="Progress" />
<Progress value={75} color="success" size="sm" label="Uploading" quantityLabel />
<CircularProgress value={60} color="primary" quantityLabel aria-label="Progress" />
<CircularProgress value={90} color="warning" size="lg" label="Processing" />
~~~

        `,
            },
            page: ProgressDocsPage,
        },
    },
    argTypes: {
        value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        borderRadius: { control: 'select', options: BORDER_RADIUS },
        width: { control: 'text' },
        label: { control: 'text' },
        quantityLabel: { control: 'boolean' },
    },
    args: {
        value: 50,
        color: 'primary',
        size: 'sm',
        borderRadius: 'sm',
        width: '100%',
        label: 'Loading progress',
    },
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: { 'aria-label': 'Progress' },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground for the linear Progress component.',
            },
            ...storySource(`<Progress value={50} aria-label="Progress" color="primary" size="sm" />`),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('progressbar')).toBeInTheDocument()
    },
}

export const Sizes: Story = {
    args: { 'aria-label': 'Progress' },
    parameters: {
        docs: {
            description: {
                story: 'The five height sizes for the linear progress.',
            },
            ...storySource(`<Progress value={60} size="xs" label="XS" quantityLabel /><Progress value={60} size="sm" label="SM" quantityLabel /><Progress value={60} size="md" label="MD" quantityLabel /><Progress value={60} size="lg" label="LG" quantityLabel /><Progress value={60} size="xl" label="XL" quantityLabel />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '20rem',
            }}
        >
            {SIZES.map((size) => (
                <Progress
                    key={size}
                    value={60}
                    size={size}
                    label={size.toUpperCase()}
                    quantityLabel
                />
            ))}
        </div>
    ),
}

export const Colors: Story = {
    args: { 'aria-label': 'Progress' },
    parameters: {
        docs: {
            description: {
                story: 'All available color intents for the linear progress.',
            },
            ...storySource(`<Progress value={60} color="primary" label="primary" quantityLabel /><Progress value={60} color="success" label="success" quantityLabel /><Progress value={60} color="warning" label="warning" quantityLabel />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '20rem',
            }}
        >
            {COLORS.map((color) => (
                <Progress
                    key={color}
                    value={60}
                    color={color}
                    label={color}
                    quantityLabel
                />
            ))}
        </div>
    ),
}

export const WithLabels: Story = {
    args: { 'aria-label': 'Progress' },
    parameters: {
        docs: {
            description: {
                story:
          'Linear progress with a descriptive label and an automatic percentage.',
            },
            ...storySource(`<Progress value={33} label="Uploading file" quantityLabel /><Progress value={66} label="Custom quantity label" quantityLabel="2/3" />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '20rem',
            }}
        >
            <Progress
                value={33}
                label={'Uploading file'}
                quantityLabel
            />
            <Progress
                value={66}
                label={'Custom quantity label'}
                quantityLabel={'2/3'}
            />
        </div>
    ),
}

export const BorderRadius: Story = {
    args: { 'aria-label': 'Progress' },
    parameters: {
        docs: {
            description: {
                story:
          'The linear progress track can be customized with different border radii.',
            },
            ...storySource(`<Progress value={60} borderRadius="none" label="none" quantityLabel /><Progress value={60} borderRadius="sm" label="sm" quantityLabel /><Progress value={60} borderRadius="full" label="full" quantityLabel />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '20rem',
            }}
        >
            {BORDER_RADIUS.map((borderRadius) => (
                <Progress
                    key={borderRadius}
                    value={60}
                    borderRadius={borderRadius}
                    label={borderRadius}
                    quantityLabel
                />
            ))}
        </div>
    ),
}

export const Width: Story = {
    args: { 'aria-label': 'Progress' },
    parameters: {
        docs: {
            description: {
                story:
          'The linear progress width can be customized via the width prop.',
            },
            ...storySource(`<Progress value={50} width="10rem" label="10rem" quantityLabel /><Progress value={50} width="50%" label="50%" quantityLabel /><Progress value={50} width="100%" label="100%" quantityLabel />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <Progress
                value={50}
                width={'10rem'}
                label={'10rem'}
                quantityLabel
            />
            <Progress
                value={50}
                width={'50%'}
                label={'50%'}
                quantityLabel
            />
            <Progress
                value={50}
                width={'100%'}
                label={'100%'}
                quantityLabel
            />
        </div>
    ),
}

export const Circular: Story = {
    args: { 'aria-label': 'Progress' },
    parameters: {
        docs: {
            description: {
                story: 'Circular progress indicator with centered quantity label.',
            },
            ...storySource(`<CircularProgress value={25} size="sm" quantityLabel aria-label="Progress" /><CircularProgress value={50} size="md" quantityLabel aria-label="Progress" /><CircularProgress value={75} size="lg" quantityLabel aria-label="Progress" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <CircularProgress
                value={25}
                size={'sm'}
                quantityLabel
                aria-label={'Progress'}
            />
            <CircularProgress
                value={50}
                size={'md'}
                quantityLabel
                aria-label={'Progress'}
            />
            <CircularProgress
                value={75}
                size={'lg'}
                quantityLabel
                aria-label={'Progress'}
            />
        </div>
    ),
}

export const CircularColors: Story = {
    args: { 'aria-label': 'Progress' },
    parameters: {
        docs: {
            description: {
                story: 'Circular progress in every available color intent.',
            },
            ...storySource(`<CircularProgress value={60} color="primary" size="sm" quantityLabel aria-label="primary" /><CircularProgress value={60} color="success" size="sm" quantityLabel aria-label="success" /><CircularProgress value={60} color="warning" size="sm" quantityLabel aria-label="warning" />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                maxWidth: '40rem',
                justifyContent: 'center',
            }}
        >
            {COLORS.map((color) => (
                <CircularProgress
                    key={color}
                    value={60}
                    color={color}
                    size={'sm'}
                    quantityLabel
                    aria-label={color}
                />
            ))}
        </div>
    ),
}

export const CircularWithLabel: Story = {
    args: { 'aria-label': 'Progress' },
    parameters: {
        docs: {
            description: {
                story: 'Circular progress with a bottom label.',
            },
            ...storySource(`<CircularProgress value={82} size="lg" label="Processing" quantityLabel />`),
        },
    },
    render: () => (
        <CircularProgress
            value={82}
            size={'lg'}
            label={'Processing'}
            quantityLabel
        />
    ),
}
