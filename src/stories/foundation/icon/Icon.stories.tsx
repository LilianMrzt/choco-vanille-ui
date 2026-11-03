import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, waitFor } from 'storybook/test'
import type { CSSProperties } from 'react'

import { Icon } from '@/components/foundation/icon'
import type { IconSize } from '@components/foundation/icon'
import type { BoxBorderRadius, BoxSpace } from '@components/layout/box'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const PADDINGS: (BoxSpace | undefined)[] = [
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
const BORDER_RADIUSES: (BoxBorderRadius | undefined)[] = [
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

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required    | Type     | Notes                                                                                                                      |
| ---------------- | ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| \`aria-label\`     | Conditional | \`string\` | Required when the icon conveys meaning without a visible label. Automatically sets \`role="img"\` and removes \`aria-hidden\`. |
| \`aria-hidden\`    | Auto        | \`true\`   | Applied by default when no \`aria-label\` is provided (decorative icon).                                                     |

- When the icon accompanies visible text, the default decorative treatment is correct — do not add \`aria-label\`.
- Avoid using \`Icon\` as the sole means of conveying state — pair it with a visible text label or a \`Tooltip\`.
`

const IconDocsPage = () => (
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
    title: 'Foundation/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A thin wrapper around locally bundled SVG components with token sizes and free CSS colors.

Colors accept theme variables and external custom properties, not token names. SVG \`style.color\` wins over \`color\`; omit \`color\` to preserve inheritance and stylesheet interaction colors. Background and border colors apply to the wrapper.

Pass a locally bundled SVG component as the \`icon\` prop.

**Usage**

~~~tsx
// Decorative icon (hidden from assistive technology)
<Icon icon={SearchIcon} size="md" />

// Meaningful icon (announced by screen readers)
<Icon icon={TriangleAlertIcon} size="md" aria-label="Warning" />
~~~

**Performance**

\`Icon\` is wrapped in \`React.memo\` and avoids unnecessary hook overhead, so it is safe to render hundreds of instances in lists, menus, and toolbars.
        `,
            },
        },
    },
    argTypes: {
        icon: { control: false, description: 'Locally bundled SVG component; not editable as text.' },
        size: { control: 'select', options: SIZES },
        color: { control: 'text', description: 'CSS color or custom property reference. Inherits when omitted; SVG style.color wins.' },
        padding: { control: 'select', options: PADDINGS },
        borderColor: { control: 'text', description: 'CSS border color applied to the wrapper. No default.' },
        backgroundColor: { control: 'text', description: 'CSS background color applied to the wrapper. No default.' },
        borderWidth: { control: 'text' },
        borderStyle: { control: 'select', options: BORDER_STYLES },
        borderRadius: { control: 'select', options: BORDER_RADIUSES },
        spin: { control: 'boolean' },
        'aria-label': { control: 'text' },
    },
    args: {
        icon: SearchIcon,
        size: 'md',
    },
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            page: IconDocsPage,
            description: {
                story:
          'Interactive playground — use the Controls panel to change the icon name, size, color, padding, border, background, and spin animation.',
            },
            ...storySource(/* language=tsx */ `
<Icon icon={SearchIcon} size="md" />`),
        },
    },
    play: async ({ canvasElement }) => {
        await waitFor(() => {
            const svg = canvasElement.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    },
}

export const Colors: Story = {
    args: {
        color: 'var(--custom-color, rebeccapurple)',
        backgroundColor: vars.color.surface.muted,
        borderColor: vars.color.border.strong,
        borderWidth: '1px',
        borderStyle: 'solid',
        padding: 'sm',
    },
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
import { Icon, vars } from '@choco-vanille/ui'

<Icon
  icon={SearchIcon}
  size="md"
  padding="sm"
  color="var(--custom-color, rebeccapurple)"
  backgroundColor={vars.color.surface.muted}
  borderColor={vars.color.border.strong}
  borderWidth="1px"
  borderStyle="solid"
/>`),
        },
    },
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Icon icon={SearchIcon} size="xs" aria-label="xs" />
<Icon icon={SearchIcon} size="sm" aria-label="sm" />
<Icon icon={SearchIcon} size="md" aria-label="md" />
<Icon icon={SearchIcon} size="lg" aria-label="lg" />
<Icon icon={SearchIcon} size="xl" aria-label="xl" />
<Icon icon={SearchIcon} size="2xl" aria-label="2xl" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {SIZES.map((size) => (
                <Icon
                    key={size}
                    icon={SearchIcon}
                    size={size}
                    aria-label={size}
                />
            ))}
        </div>
    ),
}
