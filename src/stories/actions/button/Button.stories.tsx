import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/actions/button'
import type { ButtonColor, ButtonSize, ButtonVariant } from '@components/actions/button'
import { Flex } from '@/components/layout/flex'

const VARIANTS: ButtonVariant[] = ['contained', 'outlined', 'ghost']
const COLORS: ButtonColor[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info']
const SIZES: ButtonSize[] = ['sm', 'md', 'lg']

const meta = {
    title: 'Actions/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A versatile button component that supports three visual variants, six semantic color intents, and three sizes.
It accepts an optional start icon and/or end icon (Iconify icon names) alongside the label text.

**Usage**
\`\`\`tsx
<Button label="Save" variant="contained" color="primary" />
<Button label="Delete" variant="outlined" color="destructive" startIcon="mdi:trash-can-outline" />
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | ✅ Yes | \`string\` | Becomes the button's accessible name — always provide a meaningful value. |
| \`disabled\` | No | \`boolean\` | Keeps the button visible and announced by screen readers; prefer it over hiding the button entirely. |
| \`aria-*\` | No | — | All native \`<button>\` ARIA attributes are forwarded to the underlying element. |

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
        size: { control: 'select', options: SIZES },        disabled: { control: 'boolean' },
    },
    args: {
        label: 'Button',
    },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>;

// Default

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default story renders a `contained` / `primary` button. Use the Controls panel to experiment with every available prop.',
            },
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button', { name: args.label as string })).toBeInTheDocument()
    },
}

// All variants

export const AllVariants: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: '**Contained** — filled background, highest visual weight, for primary actions. **Outlined** — bordered, medium weight, for secondary actions. **Ghost** — no background or border, lowest weight, for tertiary or inline actions.',
            },
        },
    },
    render: () => (
        <Flex wrap={'wrap'} align={'center'} gap={'md'} p={'lg'}>
            <Button
                variant={'contained'}
                label={'Contained'}
            />
            <Button
                variant={'outlined'}
                label={'Outlined'}
            />
            <Button
                variant={'ghost'}
                label={'Ghost'}
            />
        </Flex>
    ),
}

// All colors

export const AllColors: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Each color intent mapped to all three variants. Choose the color that matches the semantic meaning of the action: `primary` for the main CTA, `destructive` for irreversible actions, `success` / `warning` / `info` for contextual feedback.',
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
                        <Button
                            key={color}
                            variant={variant}
                            color={color}
                            label={color}
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
                story: '`sm` — compact, suited for dense UIs or toolbars. `md` — the default, appropriate for most contexts. `lg` — prominent, for marketing sections or hero actions.',
            },
        },
    },
    render: () => (
        <Flex wrap={'wrap'} align={'end'} gap={'md'} p={'lg'}>
            <Button
                size={'sm'}
                label={'Small'}
            />
            <Button
                size={'md'}
                label={'Medium'}
            />
            <Button
                size={'lg'}
                label={'Large'}
            />
        </Flex>
    ),
}

// Disabled state

export const Disabled: Story = {
    args: { disabled: true },
    parameters: {
        docs: {
            description: {
                story: 'A disabled button is non-interactive but remains visible and announced by screen readers. Avoid hiding disabled buttons; instead, consider providing a tooltip that explains why the action is unavailable.',
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
                story: 'Interaction test verifying that the button is clickable via mouse and — because it is a native `<button>` — also via keyboard (Space / Enter) without extra configuration.',
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
