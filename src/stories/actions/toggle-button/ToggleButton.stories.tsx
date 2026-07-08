import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import {
    ToggleButton,
    type ToggleButtonColor,
    type ToggleButtonRadius,
    type ToggleButtonSize,
    type ToggleButtonVariant,
} from '@components/actions/toggle-button'
import { md } from '@stories/utils/markdown'

const COLORS: ToggleButtonColor[] = [
    'primary',
    'secondary',
    'destructive',
    'success',
    'warning',
    'info',
]
const SIZES: ToggleButtonSize[] = ['sm', 'md', 'lg']
const RADII: ToggleButtonRadius[] = [
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'full',
]
const VARIANTS: ToggleButtonVariant[] = ['outlined', 'ghost']

const meta = {
    title: 'Actions/ToggleButton',
    component: ToggleButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
A two-state button that can be either pressed or not pressed.
Use it for actions that toggle a binary state, such as bold/italic formatting or showing/hiding a panel.
It can show a label, an icon, or both, and shares the same size and color options as the standard Button.

For an icon-only toggle, use ToggleIconButton instead.

**Usage**

~~~tsx
<ToggleButton label="Bold" defaultPressed />
<ToggleButton label="Italic" color="secondary" />
<ToggleButton label="Bold" startIcon="lucide:bold" />
<ToggleButton label="Rounded" radius="full" />

<ToggleIconButton icon="lucide:bold" aria-label="Bold" />
~~~

**Accessibility**

| Prop / Attribute | Required | Type                  | Notes                                                                          |
| ---------------- | -------- | --------------------- | ------------------------------------------------------------------------------ |
| \`label\`          | No       | \`string\`              | Becomes the button's accessible name when provided.                            |
| \`aria-label\`     | No       | \`string\`              | Required when the button only displays an icon.                                |
| \`variant\`        | No       | \`outlined\` \| \`ghost\` | Visual style of the untoggled button. @default \`outlined\`.                     |
| \`radius\`         | No       | \`Radius\`              | Border radius of the button. Defaults to the library's \`sm\` radius.            |
| \`pressed\`        | No       | \`boolean\`             | Controlled pressed state.                                                      |
| \`defaultPressed\` | No       | \`boolean\`             | Uncontrolled initial pressed state.                                            |
| \`disabled\`       | No       | \`boolean\`             | Keeps the button visible and announced by screen readers.                      |
| \`aria-*\`         | No       | —                     | All native \`<button>\` ARIA attributes are forwarded to the underlying element. |

- The underlying element is a native \`<button>\` with \`aria-pressed\`, ensuring screen readers announce the pressed state.
- It is keyboard operable with \`Space\` / \`Enter\`.
        `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        radius: { control: 'select', options: RADII },
        startIcon: { control: 'text' },
        endIcon: { control: 'text' },
        pressed: { control: 'boolean' },
        defaultPressed: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    args: {
        label: 'Toggle',
        variant: 'outlined',
        radius: 'sm',
    },
} satisfies Meta<typeof ToggleButton>

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
        await expect(
            canvas.getByRole('button', { name: args.label as string }),
        ).toBeInTheDocument()
    },
}
