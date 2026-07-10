import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { IconButton } from '@/components/actions/icon-button'
import type {
    IconButtonColor,
    IconButtonSize,
    IconButtonVariant,
} from '@components/actions/icon-button'
import { IconRegistry } from '@constants/icons'
import { md } from '@stories/utils/markdown'

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

**Accessibility**

| Prop / Attribute | Required | Type      | Notes                                                                                      |
| ---------------- | -------- | --------- | ------------------------------------------------------------------------------------------ |
| \`aria-label\`     | ✅ Yes   | \`string\`  | Sole accessible name — must describe the action (e.g. \`"Delete item"\`), not the icon name. |
| \`disabled\`       | No       | \`boolean\` | Keeps the button visible and announced by screen readers.                                  |
| \`aria-*\`         | No       | —         | All native \`<button>\` ARIA attributes are forwarded to the underlying element.             |

- The component renders a native \`<button>\`, so it is keyboard-operable (Space / Enter) and has the correct ARIA role by default.
- When combining an \`IconButton\` with a \`Tooltip\`, the tooltip content should match the \`aria-label\` so sighted and non-sighted users receive the same information.
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
    },
    args: {
        icon: IconRegistry.pencil,
        'aria-label': 'Edit item',
    },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

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
        await expect(
            canvas.getByRole('button', { name: args['aria-label'] as string }),
        ).toBeInTheDocument()
    },
}