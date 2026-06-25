import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Icon } from '@/components/foundation/icon'
import type { IconSize } from '@components/foundation/icon'

const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

const meta = {
    title: 'Foundation/Icon',
    component: Icon,
    parameters: { layout: 'centered' },
    argTypes: {
        size: { control: 'select', options: SIZES },
        spin: { control: 'boolean' },
        'aria-label': { control: 'text' },
    },
    args: {
        icon: 'mdi:home',
    },
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

// Default

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const svg = canvasElement.querySelector('svg')
        await expect(svg).toBeInTheDocument()
    },
}

// All sizes

export const AllSizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem' }}>
            {SIZES.map((size) => (
                <div
                    key={size}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Icon
                        icon={'mdi:home'}
                        size={size}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'gray' }}>{size}</span>
                </div>
            ))}
        </div>
    ),
}

// Decorative (aria-hidden)

export const Decorative: Story = {
    name: 'Decorative (aria-hidden)',
    args: { icon: 'mdi:information' },
    play: async ({ canvasElement }) => {
        const svg = canvasElement.querySelector('svg')
        await expect(svg).toHaveAttribute('aria-hidden', 'true')
    },
}

// With accessible label

export const WithLabel: Story = {
    name: 'With accessible label',
    args: { icon: 'mdi:information', 'aria-label': 'Information' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('img', { name: 'Information' })).toBeInTheDocument()
    },
}

// Spin animation

export const Spin: Story = {
    args: { icon: 'mdi:loading', spin: true },
}
