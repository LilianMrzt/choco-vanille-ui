import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/actions/button'
import type { ButtonSize, ButtonVariant } from '@components/actions/button'

const VARIANTS: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
const SIZES: ButtonSize[] = ['default', 'sm', 'lg', 'icon']

const meta = {
    title: 'Actions/Button',
    component: Button,
    parameters: { layout: 'centered' },
    argTypes: {
        variant: { control: 'select', options: VARIANTS },
        size: { control: 'select', options: SIZES },
        asChild: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    args: {
        children: 'Button',
    },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>;

// Default

export const Default: Story = {
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button', { name: args.children as string })).toBeInTheDocument()
    },
}

// All variants

export const AllVariants: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div className={'flex flex-wrap items-center gap-3 p-4'}>
            <Button variant={'default'}>Default</Button>
            <Button variant={'destructive'}>Destructive</Button>
            <Button variant={'outline'}>Outline</Button>
            <Button variant={'secondary'}>Secondary</Button>
            <Button variant={'ghost'}>Ghost</Button>
            <Button variant={'link'}>Link</Button>
        </div>
    ),
}

// All sizes

export const AllSizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div className={'flex flex-wrap items-end gap-3 p-4'}>
            <Button size={'sm'}>Small</Button>
            <Button size={'default'}>Default</Button>
            <Button size={'lg'}>Large</Button>
            <Button
                size={'icon'}
                aria-label={'Icon button'}
            >⚙</Button>
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

// asChild — renders as an anchor tag

export const AsChildLink: Story = {
    name: 'asChild — rendered as <a>',
    parameters: { controls: { disable: true } },
    render: () => (
        <Button asChild>
            <a href={'#'}>Open link</a>
        </Button>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const link = canvas.getByRole('link', { name: 'Open link' })
        await expect(link).toBeInTheDocument()
        await expect(link.tagName.toLowerCase()).toBe('a')
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
