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

import { IconButton } from '@/components/actions/icon-button'
import type {
    IconButtonColor,
    IconButtonSize,
    IconButtonVariant,
} from '@components/actions/icon-button'
import { IconRegistry } from '@constants/icons'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const VARIANTS: IconButtonVariant[] = ['contained', 'outlined', 'ghost']
const COLORS: IconButtonColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
]
const SIZES: IconButtonSize[] = ['xs', 'sm', 'md', 'lg']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type      | Notes                                                                                      |
| ---------------- | -------- | --------- | ------------------------------------------------------------------------------------------ |
| \`aria-label\`     | ✅ Yes   | \`string\`  | Sole accessible name — must describe the action (e.g. \`"Delete item"\`), not the icon name. |
| \`disabled\`       | No       | \`boolean\` | Keeps the button visible and announced by screen readers.                                  |
| \`aria-*\`         | No       | —         | All native \`<button>\` ARIA attributes are forwarded to the underlying element.             |

- The component renders a native \`<button>\`, so it is keyboard-operable (Space / Enter) and has the correct ARIA role by default.
- When combining an \`IconButton\` with a \`Tooltip\`, the tooltip content should match the \`aria-label\` so sighted and non-sighted users receive the same information.
`

const IconButtonDocsPage = () => (
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
    title: 'Actions/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

An icon-only button built for compact UIs such as toolbars, table actions, and floating action buttons.
It shares the same variant, color, and size system as \`Button\` but renders a single Iconify icon instead of a text label.

**Usage**

~~~tsx
<IconButton icon="lucide:pencil" aria-label="Edit item" />
<IconButton icon="lucide:trash-2" aria-label="Delete item" color="destructive" variant="ghost" />
~~~
        `,
            },
        },
    },
    argTypes: {
        icon: { control: 'text' },
        'aria-label': { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        disabled: { control: 'boolean' },
        active: { control: 'boolean' },
    },
    args: {
        icon: IconRegistry.pencil,
        'aria-label': 'Edit item',
    },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            page: IconButtonDocsPage,
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(/* language=tsx */ `
<IconButton icon="lucide:pencil" aria-label="Edit item" />`),
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('button', { name: args['aria-label'] as string }),
        ).toBeInTheDocument()
    },
}

export const Variants: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<IconButton icon="lucide:pencil" aria-label="contained" variant="contained" />
<IconButton icon="lucide:pencil" aria-label="outlined" variant="outlined" />
<IconButton icon="lucide:pencil" aria-label="ghost" variant="ghost" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
            {VARIANTS.map((variant) => (
                <IconButton
                    key={variant}
                    icon={IconRegistry.pencil}
                    aria-label={variant}
                    variant={variant}
                />
            ))}
        </div>
    ),
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<IconButton icon="lucide:pencil" aria-label="primary" color="primary" />
<IconButton icon="lucide:pencil" aria-label="secondary" color="secondary" />
<IconButton icon="lucide:pencil" aria-label="tertiary" color="tertiary" />
<IconButton icon="lucide:pencil" aria-label="destructive" color="destructive" />
<IconButton icon="lucide:pencil" aria-label="success" color="success" />
<IconButton icon="lucide:pencil" aria-label="warning" color="warning" />
<IconButton icon="lucide:pencil" aria-label="info" color="info" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {COLORS.map((color) => (
                <IconButton
                    key={color}
                    icon={IconRegistry.pencil}
                    aria-label={color}
                    color={color}
                />
            ))}
        </div>
    ),
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<IconButton icon="lucide:pencil" aria-label="xs" size="xs" />
<IconButton icon="lucide:pencil" aria-label="sm" size="sm" />
<IconButton icon="lucide:pencil" aria-label="md" size="md" />
<IconButton icon="lucide:pencil" aria-label="lg" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {SIZES.map((size) => (
                <IconButton
                    key={size}
                    icon={IconRegistry.pencil}
                    aria-label={size}
                    size={size}
                />
            ))}
        </div>
    ),
}

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<IconButton icon="lucide:pencil" aria-label="Disabled" disabled />
<IconButton icon="lucide:pencil" aria-label="Active" active />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
            <IconButton
                icon={IconRegistry.pencil}
                aria-label={'Disabled'}
                disabled
            />
            <IconButton
                icon={IconRegistry.pencil}
                aria-label={'Active'}
                active
            />
        </div>
    ),
}
