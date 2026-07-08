import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import {
    ToggleIconButton,
    type ToggleIconButtonColor,
    type ToggleIconButtonRadius,
    type ToggleIconButtonSize,
    type ToggleIconButtonVariant,
} from '@components/actions/toggle-icon-button'
import { md } from '@stories/utils/markdown.ts'

const COLORS: ToggleIconButtonColor[] = [
    'primary',
    'secondary',
    'destructive',
    'success',
    'warning',
    'info',
]
const SIZES: ToggleIconButtonSize[] = ['xs', 'sm', 'md', 'lg']
const RADII: ToggleIconButtonRadius[] = [
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'full',
]
const VARIANTS: ToggleIconButtonVariant[] = ['outlined', 'ghost']

const meta = {
    title: 'Actions/Toggle/ToggleIconButton',
    component: ToggleIconButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
A two-state button that displays a single icon and can be either pressed or not pressed.
Use it for compact toolbars or actions where a text label would take up too much space.
It shares the same variant, color, size, and radius options as \`ToggleButton\`.

**Usage**

~~~tsx
<ToggleIconButton icon="lucide:bold" aria-label="Bold" />
<ToggleIconButton icon="lucide:italic" color="secondary" variant="ghost" />
<ToggleIconButton icon="lucide:underline" aria-label="Underline" radius="full" />
~~~

**Accessibility**

| Prop / Attribute | Required | Type                  | Notes                                                                          |
| ---------------- | -------- | --------------------- | ------------------------------------------------------------------------------ |
| \`icon\`           | ✅ Yes   | \`string\`              | Iconify icon name rendered inside the button.                                  |
| \`aria-label\`     | ✅ Yes   | \`string\`              | Required — describes the action, not the icon name.                            |
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
        icon: { control: 'text' },
        'aria-label': { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        radius: { control: 'select', options: RADII },
        pressed: { control: 'boolean' },
        defaultPressed: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    args: {
        icon: 'lucide:bold',
        'aria-label': 'Bold',
        variant: 'outlined',
        radius: 'sm',
    },
} satisfies Meta<typeof ToggleIconButton>

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
            canvas.getByRole('button', { name: args['aria-label'] as string }),
        ).toBeInTheDocument()
    },
}
