import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import type { CSSProperties } from 'react'

import { Icon } from '@/components/foundation/icon'
import type { IconSize } from '@components/foundation/icon'
import type { BoxRecipeVariants } from '@components/layout/box'
import { IconRegistry } from '@constants/icons'
import { THEME_COLORS } from '@stories/_shared/constants/themeColors.const.ts'
import { md } from '@stories/utils/markdown'

const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const PADDINGS: (NonNullable<BoxRecipeVariants['padding']> | undefined)[] = [
    undefined,
    'none',
    'px',
    'xxs',
    'xs',
    'xs2',
    'sm',
    'sm2',
    'md',
    'md2',
    'lg',
    'lg2',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
]
const BORDER_RADIUSES: (NonNullable<BoxRecipeVariants['borderRadius']> | undefined)[] = [
    undefined,
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'full',
]
const BORDER_STYLES: (CSSProperties['borderStyle'] | undefined)[] = [
    undefined,
    'none',
    'solid',
    'dashed',
    'dotted',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
]

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

**Performance**

\`Icon\` is wrapped in \`React.memo\` and avoids unnecessary hook overhead, so it is safe to render hundreds of instances in lists, menus, and toolbars.

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
        color: { control: 'select', options: THEME_COLORS },
        padding: { control: 'select', options: PADDINGS },
        borderColor: { control: 'select', options: THEME_COLORS },
        backgroundColor: { control: 'select', options: THEME_COLORS },
        borderWidth: { control: 'text' },
        borderStyle: { control: 'select', options: BORDER_STYLES },
        borderRadius: { control: 'select', options: BORDER_RADIUSES },
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
          'Interactive playground — use the Controls panel to change the icon name, size, color, padding, border, background, and spin animation.',
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
