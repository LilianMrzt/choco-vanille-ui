import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { IconButton } from '@/components/actions/icon-button'
import type { IconButtonColor, IconButtonSize, IconButtonVariant } from '@components/actions/icon-button'
import { Flex } from '@/components/layout/flex'

const VARIANTS: IconButtonVariant[] = ['contained', 'outlined', 'ghost']
const COLORS: IconButtonColor[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info']
const SIZES: IconButtonSize[] = ['sm', 'md', 'lg']

const meta = {
    title: 'Actions/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
An icon-only button built for compact UIs such as toolbars, table actions, and floating action buttons.
It shares the same variant, color, and size system as \`Button\` but renders a single Iconify icon instead of a text label.

**Usage**
\`\`\`tsx
<IconButton icon="mdi:pencil" aria-label="Edit item" />
<IconButton icon="mdi:trash-can-outline" aria-label="Delete item" color="destructive" variant="ghost" />
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`aria-label\` | ✅ Yes | \`string\` | Sole accessible name — must describe the action (e.g. \`"Delete item"\`), not the icon name. |
| \`disabled\` | No | \`boolean\` | Keeps the button visible and announced by screen readers. |
| \`aria-*\` | No | — | All native \`<button>\` ARIA attributes are forwarded to the underlying element. |

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
        icon: 'mdi:pencil',
        'aria-label': 'Edit',
    },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

// Default

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default `contained` / `primary` icon button. Use the Controls panel to customise the icon, variant, color, size and disabled state.',
            },
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button', { name: args['aria-label'] })).toBeInTheDocument()
    },
}

// All variants

export const AllVariants: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'The three visual variants — `contained`, `outlined`, and `ghost` — at a glance. Choose based on the visual hierarchy of the surrounding UI.',
            },
        },
    },
    render: () => (
        <Flex wrap={'wrap'} align={'center'} gap={'md'} p={'lg'}>
            {VARIANTS.map((variant) => (
                <IconButton
                    key={variant}
                    variant={variant}
                    icon={'mdi:pencil'}
                    aria-label={variant}
                />
            ))}
        </Flex>
    ),
}

// All colors

export const AllColors: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'All six semantic color intents across every variant. Use `destructive` for delete / logout actions, `success` / `warning` / `info` for status-driven contexts.',
            },
        },
    },
    render: () => (
        <Flex direction={'column'} align={'stretch'} gap={'lg'} p={'lg'}>
            {VARIANTS.map((variant) => (
                <Flex
                    key={variant}
                    wrap={'wrap'}
                    align={'center'}
                    gap={'md'}
                >
                    {COLORS.map((color) => (
                        <IconButton
                            key={color}
                            variant={variant}
                            color={color}
                            icon={'mdi:pencil'}
                            aria-label={color}
                        />
                    ))}
                </Flex>
            ))}
        </Flex>
    ),
}

// All sizes

export const AllSizes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Three sizes for different layout densities. `sm` fits inside table rows and dense toolbars; `md` is the default; `lg` works for standalone or prominent actions.',
            },
        },
    },
    render: () => (
        <Flex wrap={'wrap'} align={'end'} gap={'md'} p={'lg'}>
            {SIZES.map((size) => (
                <Flex
                    key={size}
                    direction={'column'}
                    align={'center'}
                    gap={'sm'}
                >
                    <IconButton
                        size={size}
                        icon={'mdi:pencil'}
                        aria-label={size}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'gray' }}>{size}</span>
                </Flex>
            ))}
        </Flex>
    ),
}

// Disabled state

export const Disabled: Story = {
    args: { disabled: true },
    parameters: {
        docs: {
            description: {
                story: 'Disabled state: the button is non-interactive but still perceivable. Consider pairing with a `Tooltip` to explain why the action is unavailable.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button')).toBeDisabled()
    },
}

// Click interaction

export const ClickInteraction: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Interaction test confirming the button responds to clicks. Because the underlying element is a native `<button>`, keyboard activation (Space / Enter) works without any additional setup.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole('button')
        await userEvent.click(button)
        await expect(button).toBeInTheDocument()
    },
}
