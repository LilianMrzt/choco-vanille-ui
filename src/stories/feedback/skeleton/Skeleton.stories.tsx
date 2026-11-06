import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { Skeleton } from '@/components/feedback/skeleton'
import type { SkeletonVariant } from '@components/feedback/skeleton'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const VARIANTS: SkeletonVariant[] = ['circular', 'rectangular', 'rounded']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`aria-hidden\` | — | — | Always set to \`true\`; screen readers ignore placeholders. |
`

const SkeletonDocsPage = () => (
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
    title: 'Feedback/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A placeholder component used to indicate that content is loading.
It renders a pulsing block built on top of the Box primitive, so width, height, and other layout props remain customizable.
The placeholder is hidden from assistive technologies via \`aria-hidden="true"\`.

**Usage**

\`\`\`tsx
<Skeleton variant="rounded" width="12rem" height="2.5rem" />
<Skeleton variant="circular" width="2.5rem" height="2.5rem" />
<Skeleton variant="rectangular" width="16rem" height="8rem" />
\`\`\`

                `,
            },
            page: SkeletonDocsPage,
        },
    },
    argTypes: {
        variant: { control: 'select', options: VARIANTS },
        width: { control: 'text' },
        height: { control: 'text' },
        className: { control: 'text' },
    },
    args: {
        variant: 'rounded',
        width: '12rem',
        height: '2.5rem',
    },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(`<Skeleton variant="rounded" width="12rem" height="2.5rem" />`),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('generic', { hidden: true })).toBeInTheDocument()
    },
}

export const Variants: Story = {
    parameters: {
        docs: {
            description: { story: 'All available skeleton shapes.' },
            ...storySource(`<Skeleton variant="circular" width="2.5rem" height="2.5rem" /><Skeleton variant="rectangular" width="16rem" height="8rem" /><Skeleton variant="rounded" width="12rem" height="2.5rem" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton
                variant={'circular'}
                width={'2.5rem'}
                height={'2.5rem'}
            />
            <Skeleton
                variant={'rectangular'}
                width={'16rem'}
                height={'8rem'}
            />
            <Skeleton
                variant={'rounded'}
                width={'12rem'}
                height={'2.5rem'}
            />
        </div>
    ),
}
