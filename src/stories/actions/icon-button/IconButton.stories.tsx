import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { IconButton } from '@/components/actions/icon-button'
import type { IconButtonColor, IconButtonSize, IconButtonVariant } from '@components/actions/icon-button'

const VARIANTS: IconButtonVariant[] = ['contained', 'outlined', 'ghost']
const COLORS: IconButtonColor[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info']
const SIZES: IconButtonSize[] = ['sm', 'md', 'lg']

const meta = {
    title: 'Actions/IconButton',
    component: IconButton,
    parameters: { layout: 'centered' },
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
        'aria-label': 'Éditer',
    },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

// Default

export const Default: Story = {
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button', { name: args['aria-label'] })).toBeInTheDocument()
    },
}

// All variants

export const AllVariants: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', padding: '1rem' }}>
            {VARIANTS.map((variant) => (
                <IconButton
                    key={variant}
                    variant={variant}
                    icon={'mdi:pencil'}
                    aria-label={variant}
                />
            ))}
        </div>
    ),
}

// All colors

export const AllColors: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
            {VARIANTS.map((variant) => (
                <div
                    key={variant}
                    style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}
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
                </div>
            ))}
        </div>
    ),
}

// All sizes

export const AllSizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '0.75rem', padding: '1rem' }}>
            {SIZES.map((size) => (
                <div
                    key={size}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                >
                    <IconButton
                        size={size}
                        icon={'mdi:pencil'}
                        aria-label={size}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'gray' }}>{size}</span>
                </div>
            ))}
        </div>
    ),
}

// Disabled state

export const Disabled: Story = {
    args: { disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button')).toBeDisabled()
    },
}

// Click interaction

export const ClickInteraction: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole('button')
        await userEvent.click(button)
        await expect(button).toBeInTheDocument()
    },
}
