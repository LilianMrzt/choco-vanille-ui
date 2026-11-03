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
    Inset,
    type InsetSpace,
} from '@components/layout/inset'
import { Card } from '@components/surfaces/card'
import { Typography } from '@components/foundation/typography'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const SPACES: InsetSpace[] = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128]

const SIDES = [
    'all',
    'block',
    'inline',
    'top',
    'right',
    'bottom',
    'left',
] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| Semantic children | No | React node | Use appropriate semantic elements inside the layout wrapper. |
`

const InsetDocsPage = () => (
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
    title: 'Layout/Inset',
    component: Inset,
    parameters: {
        layout: 'padded',
        docs: {
            page: InsetDocsPage,
            description: {
                component: md /* language=markdown */ `
Applies a negative semantic margin so its content can bleed into the padding of the surrounding container.

**Usage**

\`\`\`tsx
<Card padding={16}>
    <Inset clip="padding-box" side="top" space={16} paddingBottom="current">
      <img
        src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?auto=format&fit=crop&w=600&q=80"
        alt="Bold typography"
        style={{ display: "block", objectFit: "cover", width: "100%", height: "8.75rem", backgroundColor: "var(--color-surface-muted)" }}
      />
    </Inset>
    <Typography variant="p">Supporting text below the bleeding content.</Typography>
</Card>
\`\`\`
`,
            },
        },
    },
    argTypes: {
        space: { control: 'select', options: SPACES },
        side: { control: 'select', options: SIDES },
        clip: { control: 'select', options: ['border-box', 'padding-box'] },
        padding: { control: 'select', options: ['current', ...SPACES] },
        paddingX: { control: 'select', options: ['current', ...SPACES] },
        paddingY: { control: 'select', options: ['current', ...SPACES] },
        paddingTop: { control: 'select', options: ['current', ...SPACES] },
        paddingRight: { control: 'select', options: ['current', ...SPACES] },
        paddingBottom: { control: 'select', options: ['current', ...SPACES] },
        paddingLeft: { control: 'select', options: ['current', ...SPACES] },
    },
    args: {
        space: 16,
        side: 'top',
        clip: 'padding-box',
        paddingBottom: 'current',
    },
} satisfies Meta<typeof Inset>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the Controls panel to change the bleed size and direction.',
            },
            ...storySource(/* language=tsx */ `
<Card padding={16}>
    <Inset clip="padding-box" space={16} side="top" paddingBottom="current">
        <img src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?auto=format&fit=crop&w=600&q=80" alt="Bold typography" />
    </Inset>
    <Typography variant="p">Supporting text below the bleeding content.</Typography>
</Card>`),
        },
    },
    render: (args) => (
        <Card
            padding={16}
        >
            <Inset {...args}>
                <img
                    src={
                        'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?auto=format&fit=crop&w=600&q=80'
                    }
                    alt={'Bold typography'}
                    style={{
                        display: 'block',
                        objectFit: 'cover',
                        width: '100%',
                        height: '8.75rem',
                        backgroundColor: 'var(--color-surface-muted)',
                    }}
                />
            </Inset>
            <Typography variant={'p'}>
                Supporting text below the bleeding content.
            </Typography>
        </Card>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByAltText('Bold typography')).toBeInTheDocument()
    },
}
