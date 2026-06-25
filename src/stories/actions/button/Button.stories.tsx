import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/actions/button'
import type { ButtonColor, ButtonSize, ButtonVariant } from '@components/actions/button'

const VARIANTS: ButtonVariant[] = ['contained', 'outlined', 'ghost']
const COLORS: ButtonColor[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info']
const SIZES: ButtonSize[] = ['default', 'sm', 'lg']

const meta = {
    title: 'Actions/Button',
    component: Button,
    parameters: { layout: 'centered' },
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        color: { control: 'select', options: COLORS },
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
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', padding: '1rem' }}>
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
                        <Button
                            key={color}
                            variant={variant}
                            color={color}
                            label={color}
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
