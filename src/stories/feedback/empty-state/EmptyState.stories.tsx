import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'

import { Button } from '@components/actions/button'
import { EmptyState } from '@components/feedback/empty-state'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`title\` | Yes | \`ReactNode\` | Rendered as the semantic \`h2\` heading. |
| \`description\` | Yes | \`ReactNode\` | Rendered as supporting paragraph content. |
| \`action\` | No | \`ReactNode\` | Provide a named Button, Link, or another accessible action. |
`

const EmptyStateDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

type EmptyStatePlaygroundArgs = {
    title: string
    description: string
    showAction: boolean
    className?: string
}

const meta: Meta<EmptyStatePlaygroundArgs> = {
    title: 'Feedback/EmptyState',
    component: EmptyState,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: md /* language=markdown */ `
An empty result state for lists and tables. It presents a title, supporting description, and an optional action.

**Usage**

\`\`\`tsx
<EmptyState
    title="No results found"
    description="Try adjusting your filters."
    action={<Button label="Clear filters" variant="outlined" color="primary" />}
/>
\`\`\`
                `,
            },
            page: EmptyStateDocsPage,
        },
    },
    argTypes: {
        title: { control: 'text', table: { category: 'EmptyState' } },
        description: { control: 'text', table: { category: 'EmptyState' } },
        showAction: { control: 'boolean', table: { category: 'EmptyState' } },
        className: { control: 'text', table: { category: 'EmptyState' } },
    },
    args: {
        title: 'No results found',
        description: 'Try adjusting your filters or search terms.',
        showAction: true,
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use the Controls panel to experiment with the title, description, optional action, and className.',
            },
            ...storySource(`<EmptyState title="No results found" description="Try adjusting your filters or search terms." action={<Button label="Clear filters" variant="outlined" color="primary" />} />`),
        },
    },
    render: ({ title, description, showAction, className }) => (
        <EmptyState
            title={title}
            description={description}
            action={
                showAction && (
                    <Button
                        label={'Clear filters'}
                        variant={'outlined'}
                        color={'primary'}
                    />
                )
            }
            className={className}
        />
    ),
}

export const WithoutAction: Story = {
    parameters: {
        docs: {
            description: { story: 'An empty state without a recovery action.' },
            ...storySource(`<EmptyState title="No results found" description="Try adjusting your filters or search terms." />`),
        },
    },
    args: {
        showAction: false,
    },
    render: ({ title, description, className }) => (
        <EmptyState
            title={title}
            description={description}
            className={className}
        />
    ),
}
