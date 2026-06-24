import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/actions/button'
import type { ButtonSize, ButtonVariant } from '@components/actions/button'

const VARIANTS: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost']
const SIZES: ButtonSize[] = ['default', 'sm', 'lg', 'icon']

const meta = {
    title: 'Actions/Button',
    component: Button,
    parameters: { layout: 'centered' },
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        size: { control: 'select', options: SIZES },
        disabled: { control: 'boolean' },
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
        <div className={'flex flex-wrap items-center gap-3 p-4'}>
            <Button
                variant={'default'}
                label={'Default'}
            />
            <Button
                variant={'destructive'}
                label={'Destructive'}
            />
            <Button
                variant={'outline'}
                label={'Outline'}
            />
            <Button
                variant={'secondary'}
                label={'Secondary'}
            />
            <Button
                variant={'ghost'}
                label={'Ghost'}
            />
        </div>
    ),
}

// All sizes

export const AllSizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div className={'flex flex-wrap items-end gap-3 p-4'}>
            <Button
                size={'sm'}
                label={'Small'}
            />
            <Button
                size={'default'}
                label={'Default'}
            />
            <Button
                size={'lg'}
                label={'Large'}
            />
            <Button
                size={'icon'}
                aria-label={'Icon button'}
                label={'⚙'}
            />
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
