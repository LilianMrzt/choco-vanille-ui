import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Badge } from '@/components/data-display/badge'
import type { BadgeColor, BadgeSize, BadgeVariant } from '@components/data-display/badge'
import { md } from '@stories/utils/markdown'

const VARIANTS: BadgeVariant[] = ['solid', 'subtle', 'outline']
const COLORS: BadgeColor[] = [
    'primary',
    'secondary',
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
It supports three visual variants, six semantic color intents, and three sizes,
while inheriting Box layout props so radius, width, padding, and more remain customizable.

**Usage**

\`\`\`tsx
<Badge label="New" />
<Badge label="Verified" variant="solid" color="success" />
<Badge label="Draft" variant="outline" color="secondary" size="sm" />
<Badge label="Custom" radius="md" w="fit" />
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
        radius: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
        w: { control: 'select', options: ['full', 'screen', 'fit', 'min', 'max', 'auto'] },
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
