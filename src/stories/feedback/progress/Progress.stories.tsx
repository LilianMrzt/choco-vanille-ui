import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import {
    CircularProgress,
    Progress,
    type ProgressBorderRadius,
    type ProgressColor,
    type ProgressSize,
} from '@components/feedback/progress'
import { md } from '@stories/utils/markdown'

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

**Accessibility**

| Prop / Attribute | Required | Type             | Notes                                                   |
| ---------------- | -------- | ---------------- | ------------------------------------------------------- |
| \`value\`          | ✅ Yes   | \`number\`         | Current progress between 0 and 100.                     |
| \`label\`, \`aria-label\`, \`aria-labelledby\` | One required | \`string\` | Names the progressbar. |
| \`quantityLabel\`  | No       | \`string \| true\` | Pass \`true\` to show the percentage, or a custom string. |

- Both variants render with \`role="progressbar"\` and forward \`aria-valuenow\`, \`aria-valuemin\`, and \`aria-valuemax\`.
        `,
            },
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
