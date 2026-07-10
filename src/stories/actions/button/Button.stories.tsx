import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import {
    Button,
    type ButtonColor,
    type ButtonSize,
    type ButtonVariant,
} from '@components/actions/button'
import { md } from '@stories/utils/markdown'

const VARIANTS: ButtonVariant[] = ['contained', 'outlined', 'ghost']
const COLORS: ButtonColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
]
const SIZES: ButtonSize[] = ['sm', 'md', 'lg']

const meta = {
    title: 'Actions/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A versatile button component that triggers an action when clicked or activated with the keyboard.
It supports three visual variants, six semantic color intents, and three sizes, and can display an optional start or end icon.

**Usage**

~~~tsx
<Button label="Save" variant="contained" color="primary" />
<Button label="Delete" variant="outlined" color="destructive" startIcon="lucide:trash-2" />
~~~

**Accessibility**

| Prop / Attribute | Required | Type      | Notes                                                                          |
| ---------------- | -------- | --------- | ------------------------------------------------------------------------------ |
| \`label\`          | ✅ Yes   | \`string\`  | Becomes the button's accessible name — always provide a meaningful value.      |
| \`disabled\`       | No       | \`boolean\` | Keeps the button visible and announced by screen readers.                      |
| \`aria-*\`         | No       | —         | All native \`<button>\` ARIA attributes are forwarded to the underlying element. |

- The underlying element is a native \`<button>\`, ensuring keyboard operability (Space / Enter) and correct ARIA role out of the box.
- Avoid using only an icon without a label; use \`IconButton\` with a mandatory \`aria-label\` instead.
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        startIcon: { control: 'text' },
        endIcon: { control: 'text' },
        disabled: { control: 'boolean' },
        active: { control: 'boolean' },
    },
    args: {
        label: 'Button',
    },
} satisfies Meta<typeof Button>

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
            canvas.getByRole('button', { name: args.label as string }),
        ).toBeInTheDocument()
    },
}