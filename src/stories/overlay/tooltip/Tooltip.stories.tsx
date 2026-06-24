import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, waitFor } from 'storybook/test'

import { Tooltip } from '@/components/overlay/tooltip'
import { Button } from '@/components/actions/button'
import type { TooltipSide, TooltipAlign } from '@components/overlay/tooltip'

const SIDES: TooltipSide[] = ['top', 'right', 'bottom', 'left']
const ALIGNS: TooltipAlign[] = ['start', 'center', 'end']

const meta = {
    title: 'Overlay/Tooltip',
    component: Tooltip,
    parameters: { layout: 'centered' },
    argTypes: {
        content: { control: 'text' },
        side: { control: 'select', options: SIDES },
        align: { control: 'select', options: ALIGNS },
        delayDuration: { control: 'number' },
        disabled: { control: 'boolean' },
    },
    args: {
        content: 'Tooltip content',
        side: 'top',
        align: 'center',
        delayDuration: 0,
        children: <Button label={'Hover me'} />,
    },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>;

// Default

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: 'Hover me' })
        await expect(trigger).toBeInTheDocument()
        await userEvent.hover(trigger)
        await waitFor(() =>
            expect(document.querySelector('[role="tooltip"]')).toBeTruthy(),
        )
    },
}

// All sides

export const AllSides: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <div className={'flex flex-wrap items-center justify-center gap-6 p-16'}>
            {SIDES.map((side) => (
                <Tooltip
                    key={side}
                    content={`Side: ${side}`}
                    side={side}
                    delayDuration={0}
                >
                    <Button
                        variant={'outline'}
                        label={side}
                    />
                </Tooltip>
            ))}
        </div>
    ),
}

// Disabled state

export const Disabled: Story = {
    args: { disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: 'Hover me' })
        await userEvent.hover(trigger)
        await expect(document.querySelector('[role="tooltip"]')).toBeNull()
    },
}

// Controlled open

export const AlwaysOpen: Story = {
    args: { open: true },
}
