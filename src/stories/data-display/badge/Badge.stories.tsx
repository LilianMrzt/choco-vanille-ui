import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Badge } from '@/components/data-display/badge'
import type { BadgeColor, BadgeSize, BadgeVariant } from '@components/data-display/badge'
import { IconRegistry } from '@constants/icons'
import { md } from '@stories/utils/markdown'

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

const meta = {
    title: 'Data Display/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
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
<Badge label="Custom" borderRadius="md" width="fit-content" />
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | ✅ Yes | \`string\` | Becomes the badge's text content. |
| \`aria-*\` | No | — | All native \`<span>\` ARIA attributes are forwarded to the underlying element. |

- The badge renders as a native \`<span>\`, making it safe to embed inside paragraphs, tables, and other flow content.
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        borderRadius: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
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
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Badge
                label={'Start icon'}
                startIcon={IconRegistry.check}
                color={'success'}
            />
            <Badge
                label={'End icon'}
                endIcon={IconRegistry.chevronRight}
                color={'primary'}
                variant={'outlined'}
            />
            <Badge
                label={'Both icons'}
                startIcon={IconRegistry.check}
                endIcon={IconRegistry.chevronRight}
                color={'info'}
                variant={'contained'}
            />
        </div>
    ),
}
