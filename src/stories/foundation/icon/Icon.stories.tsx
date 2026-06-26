import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

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
                    <span style={{ fontSize: '0.75rem', color: 'black' }}>{size}</span>
                </div>
            ))}
        </div>
    ),
}
