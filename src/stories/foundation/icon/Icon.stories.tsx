import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { Icon } from '@/components/foundation/icon'
import type { IconSize } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { lightColors } from '@theme/colors/light.ts'
import type { ThemeColor } from '@theme'
import { md } from '@stories/utils/markdown'

const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const THEME_COLORS: ThemeColor[] = Object.keys(lightColors) as ThemeColor[]

const meta = {
    title: 'Foundation/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A thin wrapper around \`@iconify/react\` that maps design-token sizes and theme colors onto any Iconify icon.

Pass any valid Iconify icon name as the \`icon\` prop (e.g. \`"lucide:home"\`, \`"lucide:check"\`).
Browse all available icons at [icones.js.org](https://icones.js.org).

**Usage**

~~~tsx
// Decorative icon (hidden from assistive technology)
<Icon icon="lucide:home" size="md" />

// Meaningful icon (announced by screen readers)
<Icon icon="lucide:triangle-alert" size="md" aria-label="Warning" />
~~~

**Accessibility**

| Prop / Attribute | Required    | Type     | Notes                                                                                                                      |
| ---------------- | ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| \`aria-label\`     | Conditional | \`string\` | Required when the icon conveys meaning without a visible label. Automatically sets \`role="img"\` and removes \`aria-hidden\`. |
| \`aria-hidden\`    | Auto        | \`true\`   | Applied by default when no \`aria-label\` is provided (decorative icon).                                                     |

- When the icon accompanies visible text, the default decorative treatment is correct — do not add \`aria-label\`.
- Avoid using \`Icon\` as the sole means of conveying state — pair it with a visible text label or a \`Tooltip\`.
                `,
            },
        },
    },
    argTypes: {
        icon: { control: 'text' },
        size: { control: 'select', options: SIZES },
        color: { control: 'select', options: [undefined, ...THEME_COLORS] },
        spin: { control: 'boolean' },
        'aria-label': { control: 'text' },
    },
    args: {
        icon: IconRegistry.home,
        size: 'md',
    },
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use the Controls panel to change the icon name, size, color, and spin animation.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        await waitFor(() => {
            const svg = canvasElement.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    },
}