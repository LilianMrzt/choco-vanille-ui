import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Checkbox } from '@/components/forms/checkbox'
import { Flex } from '@/components/layout/flex'

const meta = {
    title: 'Forms/Checkbox',
    component: Checkbox,
    parameters: { layout: 'centered' },
    argTypes: {
        label: { control: 'text' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    args: {
        label: 'Accept terms and conditions',
    },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

// Default

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('checkbox')).toBeInTheDocument()
    },
}

// Without label

export const WithoutLabel: Story = {
    args: { label: undefined },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('checkbox')).toBeInTheDocument()
    },
}

// Checked

export const Checked: Story = {
    args: { checked: true },
}

// Disabled unchecked

export const Disabled: Story = {
    args: { disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('checkbox')).toBeDisabled()
    },
}

// Disabled checked

export const DisabledChecked: Story = {
    args: { disabled: true, checked: true },
}

// All states

export const AllStates: Story = {
    parameters: { controls: { disable: true } },
    render: () => (
        <Flex direction={'column'} align={'stretch'} gap={'lg'} p={'lg'}>
            <Checkbox label={'Unchecked'} />
            <Checkbox
                label={'Checked'}
                defaultChecked
            />
            <Checkbox
                label={'Disabled'}
                disabled
            />
            <Checkbox
                label={'Disabled + checked'}
                disabled
                defaultChecked
            />
        </Flex>
    ),
}

// Controlled

export const Controlled: Story = {
    parameters: { controls: { disable: true } },
    render: () => {
        const [checked, setChecked] = useState(false)
        return (
            <Flex direction={'column'} align={'start'} gap={'md'}>
                <Checkbox
                    label={checked ? 'Checked ✓' : 'Unchecked'}
                    checked={checked}
                    onCheckedChange={(val) => setChecked(val === true)}
                />
                <span style={{ fontSize: '0.75rem', color: '#666' }}>
                    State: {String(checked)}
                </span>
            </Flex>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const checkbox = canvas.getByRole('checkbox')
        await expect(checkbox).not.toBeChecked()
        await userEvent.click(checkbox)
        await expect(checkbox).toBeChecked()
        await userEvent.click(checkbox)
        await expect(checkbox).not.toBeChecked()
    },
}
