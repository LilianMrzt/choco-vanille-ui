import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, waitFor } from 'storybook/test'

import { Tooltip } from '@/components/overlay/tooltip'
import { Button } from '@/components/actions/button'
import type {
    TooltipSide,
    TooltipAlign,
    TooltipPosition,
} from '@components/overlay/tooltip'
import { md } from '@stories/utils/markdown'

const SIDES: TooltipSide[] = ['top', 'right', 'bottom', 'left']
const ALIGNS: TooltipAlign[] = ['start', 'center', 'end']
const POSITIONS: TooltipPosition[] = [
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'left-start',
    'left',
    'left-end',
]

const meta = {
    title: 'Overlay/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A contextual tooltip that appears on hover or keyboard focus, built on top of \`@radix-ui/react-tooltip\`.
Wrap any focusable element with \`Tooltip\` and provide a \`content\` prop.

**Usage**

~~~tsx
<Tooltip content="Edit this item">
    <IconButton icon="lucide:pencil" aria-label="Edit" />
</Tooltip>
~~~

**Accessibility**

| Prop / Attribute | Required | Type              | Notes                                                                                      |
| ---------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------ |
| \`content\`        | ✅ Yes   | \`ReactNode\`       | Must be supplementary — never put task-critical information exclusively in a tooltip.      |
| \`children\`       | ✅ Yes   | Focusable element | Must be a single focusable element; add \`tabIndex={0}\` when wrapping a non-focusable node. |
| \`delayDuration\`  | No       | \`number\` (ms)     | Set to \`0\` in tests or for persistent labels (e.g. alongside an \`IconButton\`).             |
| \`disabled\`       | No       | \`boolean\`         | Suppresses the tooltip entirely when \`true\`.                                               |
| \`open\`           | No       | \`boolean\`         | Controlled open state; pair with \`onOpenChange\` for custom show/hide logic.                |

- The tooltip is shown on both **hover** and **keyboard focus**, ensuring keyboard-only users are not excluded.
- Avoid interactive content (buttons, links) inside \`content\` — tooltips are not keyboard-reachable once open.
                `,
            },
        },
    },
    argTypes: {
        content: { control: 'text' },
        position: {
            control: 'select',
            options: [undefined, ...POSITIONS],
            description:
                'Shorthand combining `side` + `align` in one prop. Takes precedence over `side` and `align` when set.',
        },
        side: { control: 'select', options: SIDES },
        align: { control: 'select', options: ALIGNS },
        delayDuration: { control: 'number' },
        disabled: { control: 'boolean' },
        open: { control: 'boolean' },
    },
    args: {
        content: 'Tooltip content',
        side: 'top',
        align: 'center',
        delayDuration: 0,
        children: <Button label={'Hover me'} />,
    },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use the Controls panel to adjust content, position, side, alignment, delay, and disabled state.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: 'Hover me' })
        await expect(trigger).toBeInTheDocument()
        await userEvent.hover(trigger)
        await waitFor(() =>
            expect(document.querySelector('[role="tooltip"]')).toBeTruthy(),
        )
    },
}