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

import { Badge } from '@/components/data-display/badge'
import type { BadgeColor, BadgeSize, BadgeVariant } from '@components/data-display/badge'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const VARIANTS: BadgeVariant[] = [
    'contained',
    'subtle',
    'outlined',
    'outlinedSubtle',
]
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
const SIZES: BadgeSize[] = ['sm', 'md', 'lg']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Yes | \`string\` | Becomes the badge's text content. |
| \`aria-*\` | No | — | Native span ARIA attributes are forwarded. |
`

const BadgeDocsPage = () => (
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
    title: 'Data Display/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
            page: BadgeDocsPage,
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A small status indicator built on top of the Box primitive.
It supports four visual variants, twelve semantic color intents, and three sizes,
while inheriting Box layout props so radius, width, padding, and more remain customizable.

**Usage**

\`\`\`tsx
<Badge label="New" />
<Badge label="Verified" variant="contained" color="success" />
<Badge label="Draft" variant="outlined" color="secondary" size="sm" />
<Badge label="Soft" variant="outlinedSubtle" color="secondary" size="sm" />
<Badge label="Custom" borderRadius={8} width="fit-content" />
\`\`\`

                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        borderRadius: { control: 'select', options: [0, 4, 6, 8, 10, 14, 20, 'full'] },
        width: { control: 'text' },
        startIcon: { control: 'text' },
        endIcon: { control: 'text' },
    },
    args: {
        label: 'Badge',
        variant: 'subtle',
        color: 'primary',
        size: 'md',
    },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(`<Badge label="Badge" variant="subtle" color="primary" size="md" />`),
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText(args.label as string)).toBeInTheDocument()
    },
}

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The four visual variants applied to the primary color.',
            },
            ...storySource(`<Badge label="contained" variant="contained" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {VARIANTS.map((variant) => (
                <Badge
                    key={variant}
                    label={variant}
                    variant={variant}
                />
            ))}
        </div>
    ),
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The three size variants.',
            },
            ...storySource(`<Badge label="SM" size="sm" /><Badge label="MD" size="md" /><Badge label="LG" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {SIZES.map((size) => (
                <Badge
                    key={size}
                    label={size.toUpperCase()}
                    size={size}
                />
            ))}
        </div>
    ),
}

export const Colors: Story = {
    parameters: {
        docs: {
            description: {
                story: 'All available color intents in the default outlinedSubtle variant.',
            },
            ...storySource(`<Badge label="primary" color="primary" /><Badge label="success" color="success" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', maxWidth: '40rem' }}>
            {COLORS.map((color) => (
                <Badge
                    key={color}
                    label={color}
                    color={color}
                />
            ))}
        </div>
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Badges can display an optional start or end icon.',
            },
            ...storySource(`<Badge label="Start icon" startIcon={CheckIcon} />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Badge
                label={'Start icon'}
                startIcon={CheckIcon}
                color={'success'}
            />
            <Badge
                label={'End icon'}
                endIcon={ChevronRightIcon}
                color={'primary'}
                variant={'outlined'}
            />
            <Badge
                label={'Both icons'}
                startIcon={CheckIcon}
                endIcon={ChevronRightIcon}
                color={'info'}
                variant={'contained'}
            />
        </div>
    ),
}
