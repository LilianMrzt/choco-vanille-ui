import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

import { Spinner } from '@/components/feedback/spinner'
import type { SpinnerColor, SpinnerSize } from '@components/feedback/spinner'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const COLORS: SpinnerColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
]
const SIZES: SpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`role\` | No | \`string\` | Defaults to \`status\`, and can be overridden for a different feedback context. |
| \`aria-label\` | No | \`string\` | Recommended when the loading state needs a specific accessible name. |
`

const SpinnerDocsPage = () => (
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
    title: 'Feedback/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
A compact loading indicator for short-lived actions. Use Spinner when the interface is waiting for an action, and Skeleton when the structure of upcoming content is loading.

**Usage**

\`\`\`tsx
<Spinner aria-label="Loading" />
<Spinner size="lg" color="secondary" aria-label="Saving" />
\`\`\`
                `,
            },
            page: SpinnerDocsPage,
        },
    },
    argTypes: {
        size: { control: 'select', options: SIZES },
        color: { control: 'select', options: COLORS },
        role: { control: 'text' },
        'aria-label': { control: 'text' },
        className: { control: 'text' },
    },
    args: {
        size: 'md',
        color: 'primary',
        'aria-label': 'Loading',
    },
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(`<Spinner size="md" color="primary" aria-label="Loading" />`),
        },
    },
}

export const Colors: Story = {
    parameters: {
        docs: {
            description: { story: 'All available semantic color intents.' },
            ...storySource(`<Spinner color="primary" aria-label="Loading" /><Spinner color="secondary" aria-label="Loading" /><Spinner color="tertiary" aria-label="Loading" /><Spinner color="destructive" aria-label="Loading" /><Spinner color="success" aria-label="Loading" /><Spinner color="warning" aria-label="Loading" /><Spinner color="info" aria-label="Loading" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Spinner
                color={'primary'}
                aria-label={'Loading'}
            />
            <Spinner
                color={'secondary'}
                aria-label={'Loading'}
            />
            <Spinner
                color={'tertiary'}
                aria-label={'Loading'}
            />
            <Spinner
                color={'destructive'}
                aria-label={'Loading'}
            />
            <Spinner
                color={'success'}
                aria-label={'Loading'}
            />
            <Spinner
                color={'warning'}
                aria-label={'Loading'}
            />
            <Spinner
                color={'info'}
                aria-label={'Loading'}
            />
        </div>
    ),
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: { story: 'All available Spinner sizes.' },
            ...storySource(`<Spinner size="xs" aria-label="Loading" /><Spinner size="sm" aria-label="Loading" /><Spinner size="md" aria-label="Loading" /><Spinner size="lg" aria-label="Loading" /><Spinner size="xl" aria-label="Loading" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Spinner
                size={'xs'}
                aria-label={'Loading'}
            />
            <Spinner
                size={'sm'}
                aria-label={'Loading'}
            />
            <Spinner
                size={'md'}
                aria-label={'Loading'}
            />
            <Spinner
                size={'lg'}
                aria-label={'Loading'}
            />
            <Spinner
                size={'xl'}
                aria-label={'Loading'}
            />
        </div>
    ),
}
