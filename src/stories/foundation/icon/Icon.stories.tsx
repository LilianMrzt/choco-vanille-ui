import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Icon } from '@/components/foundation/icon'
import type { IconSize } from '@components/foundation/icon'
import { Flex } from '@/components/layout/flex'
import { lightColors } from '@theme/colors/light.ts'
import type { ThemeColor } from '@theme'

const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const THEME_COLORS: ThemeColor[] = Object.keys(lightColors) as ThemeColor[]

const meta = {
    title: 'Foundation/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A thin wrapper around [\`@iconify/react\`](https://iconify.design/) that maps design-token sizes and theme colors onto any Iconify icon.

Pass any valid Iconify icon name as the \`icon\` prop (e.g. \`"mdi:home"\`, \`"lucide:check"\`, \`"ph:warning"\`).
Browse all available icons at [icones.js.org](https://icones.js.org).

**Usage**
\`\`\`tsx
// Decorative icon (hidden from assistive technology)
<Icon icon="mdi:home" size="md" />

// Meaningful icon (announced by screen readers)
<Icon icon="mdi:warning" size="md" aria-label="Warning" />
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`aria-label\` | Conditional | \`string\` | Required when the icon conveys meaning without a visible label. Automatically sets \`role="img"\` and removes \`aria-hidden\`. |
| \`aria-hidden\` | Auto | \`true\` | Applied by default when no \`aria-label\` is provided (decorative icon). |

- When the icon accompanies visible text, the default decorative treatment is correct — do not add \`aria-label\`.
- Avoid using \`Icon\` as the sole means of conveying state — pair it with a visible text label or a \`Tooltip\`.
                `,
            },
        },
    },
    argTypes: {
        size: { control: 'select', options: SIZES },
        color: { control: 'select', options: [undefined, ...THEME_COLORS] },
        spin: { control: 'boolean' },
        'aria-label': { control: 'text' },
    },
    args: {
        icon: 'mdi:home',
    },
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

// Default

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default icon at the `md` size, treated as decorative (`aria-hidden`). Use the Controls panel to change the icon name, size, color, and spin animation.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const svg = canvasElement.querySelector('svg')
        await expect(svg).toBeInTheDocument()
    },
}

// All sizes

export const AllSizes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'The six available size tokens from `xs` (12 px) to `2xl` (40 px). Match the icon size to the surrounding text size or the component it appears in.',
            },
        },
    },
    render: () => (
        <Flex
            align={'center'}
            gap={'xl'}
            p={'lg'}
        >
            {SIZES.map((size) => (
                <Flex
                    key={size}
                    direction={'column'}
                    align={'center'}
                    gap={'sm'}
                >
                    <Icon
                        icon={'mdi:home'}
                        size={size}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'black' }}>{size}</span>
                </Flex>
            ))}
        </Flex>
    ),
}
