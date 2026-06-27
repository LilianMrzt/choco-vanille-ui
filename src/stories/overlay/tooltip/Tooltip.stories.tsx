import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, waitFor } from 'storybook/test'

import { Tooltip } from '@/components/overlay/tooltip'
import { Button } from '@/components/actions/button'
import type { TooltipSide, TooltipAlign, TooltipPosition } from '@components/overlay/tooltip'
import { Flex } from '@/components/layout/flex'

const SIDES: TooltipSide[] = ['top', 'right', 'bottom', 'left']
const ALIGNS: TooltipAlign[] = ['start', 'center', 'end']
const POSITIONS: TooltipPosition[] = [
    'top-start',    'top',    'top-end',
    'right-start',  'right',  'right-end',
    'bottom-start', 'bottom', 'bottom-end',
    'left-start',   'left',   'left-end',
]

const meta = {
    title: 'Overlay/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A contextual tooltip that appears on hover or keyboard focus, built on top of [\`@radix-ui/react-tooltip\`](https://www.radix-ui.com/docs/primitives/components/tooltip).
Wrap any focusable element with \`Tooltip\` and provide a \`content\` prop.

**Usage**
\`\`\`tsx
<Tooltip content="Edit this item">
  <IconButton icon="mdi:pencil" aria-label="Edit" />
</Tooltip>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`content\` | ✅ Yes | \`ReactNode\` | Must be supplementary — never put task-critical information exclusively in a tooltip. |
| \`children\` | ✅ Yes | Focusable element | Must be a single focusable element; add \`tabIndex={0}\` when wrapping a non-focusable node. |
| \`delayDuration\` | No | \`number\` (ms) | Set to \`0\` in tests or for persistent labels (e.g. alongside an \`IconButton\`). |
| \`disabled\` | No | \`boolean\` | Suppresses the tooltip entirely when \`true\`. |
| \`open\` | No | \`boolean\` | Controlled open state; pair with \`onOpenChange\` for custom show/hide logic. |

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
            options: POSITIONS,
            description: 'Shorthand combining `side` + `align` in one prop. Takes precedence over `side` and `align` when set.',
        },
        side: { control: 'select', options: SIDES },
        align: { control: 'select', options: ALIGNS },
        delayDuration: { control: 'number' },
        disabled: { control: 'boolean' },
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

type Story = StoryObj<typeof meta>;

// Default

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default tooltip appearing above its trigger. Hover the button — or focus it with Tab and observe it with a screen reader — to see the tooltip. Use the Controls panel to adjust position, side, alignment, and delay.',
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

// All positions

export const AllPositions: Story = {
    parameters: {
        controls: { disable: true },
        layout: 'padded',
        docs: {
            description: {
                story: 'All 12 available positions (`top-start`, `top`, `top-end`, `right-start`, `right`, `right-end`, `bottom-start`, `bottom`, `bottom-end`, `left-start`, `left`, `left-end`). Use the `position` prop as a shorthand for combining `side` and `align`.',
            },
        },
    },
    render: () => (
        <Flex
            wrap={'wrap'}
            align={'center'}
            justify={'center'}
            gap={'xl'}
            p={'4xl'}
        >
            {POSITIONS.map((position) => (
                <Tooltip
                    key={position}
                    content={`position: ${position}`}
                    position={position}
                    delayDuration={0}
                >
                    <Button
                        variant={'outlined'}
                        label={position}
                    />
                </Tooltip>
            ))}
        </Flex>
    ),
}

// Controlled open

export const AlwaysOpen: Story = {
    args: { open: true },
    parameters: {
        docs: {
            description: {
                story: 'Controlled open state via the `open` prop. Pass `onOpenChange` alongside `open` to implement custom show/hide logic, such as keeping the tooltip visible while the user is filling in a nearby field.',
            },
        },
    },
}
