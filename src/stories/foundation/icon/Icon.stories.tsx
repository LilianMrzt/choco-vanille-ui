import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Icon } from '@/components/foundation/icon'
import type { IconSize } from '@components/foundation/icon'
import { Flex } from '@/components/layout/flex'
import { lightColors } from '@theme/colors/light.ts'
import type { ThemeColor } from '@theme'

const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const THEME_COLORS: ThemeColor[] = Object.keys(lightColors) as ThemeColor[]

const meta = {
    title: 'Foundation/Icon',
    component: Icon,
    parameters: { layout: 'centered' },
    argTypes: {
        size: { control: 'select', options: SIZES },
        color: { control: 'select', options: [undefined, ...THEME_COLORS] },
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
        <Flex
            align={'center'}
            gap={'xl'}
            p={'lg'}
        >
            {SIZES.map((size) => (
                <Flex
                    key={size}
                    direction={'column'}
                    align={'center'}
                    gap={'sm'}
                >
                    <Icon
                        icon={'mdi:home'}
                        size={size}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'black' }}>{size}</span>
                </Flex>
            ))}
        </Flex>
    ),
}
