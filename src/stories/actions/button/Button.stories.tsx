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
    parameters: { layout: 'centered' },
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
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button', { name: args.label as string })).toBeInTheDocument()
    },
}

// All variants

export const AllVariants: Story = {
    parameters: { controls: { disable: true } },
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
    parameters: { controls: { disable: true } },
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
