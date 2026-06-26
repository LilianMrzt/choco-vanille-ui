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
    parameters: { controls: { disable: true } },
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
    parameters: { controls: { disable: true } },
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
