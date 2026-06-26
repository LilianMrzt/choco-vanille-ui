import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { RadioGroup } from '@/components/forms/radio-group'
import { RadioItem } from '@/components/forms/radio-group'
import { Box } from '@/components/layout/box'
import { Flex } from '@/components/layout/flex'

const meta = {
    title: 'Forms/RadioGroup',
    component: RadioGroup,
    parameters: { layout: 'centered' },
    decorators: [
        (Story) => (
            <Box p={'lg'} style={{ minWidth: '12rem' }}>
                <Story />
            </Box>
        ),
    ],
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

// Default

export const Default: Story = {
    render: () => (
        <RadioGroup defaultValue={'system'}>
            <RadioItem
                value={'light'}
                label={'Light'}
            />
            <RadioItem
                value={'dark'}
                label={'Dark'}
            />
            <RadioItem
                value={'system'}
                label={'System'}
            />
        </RadioGroup>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const radios = canvas.getAllByRole('radio')
        await expect(radios).toHaveLength(3)
        await expect(canvas.getByRole('radio', { name: 'System' })).toBeChecked()
    },
}

// Without labels

export const WithoutLabels: Story = {
    render: () => (
        <RadioGroup
            defaultValue={'b'}
            aria-label={'Pick option'}
        >
            <RadioItem
                value={'a'}
                aria-label={'Option A'}
            />
            <RadioItem
                value={'b'}
                aria-label={'Option B'}
            />
            <RadioItem
                value={'c'}
                aria-label={'Option C'}
            />
        </RadioGroup>
    ),
}

// Horizontal

export const Horizontal: Story = {
    render: () => (
        <RadioGroup
            defaultValue={'md'}
            orientation={'horizontal'}
            style={{ flexDirection: 'row', gap: '1.5rem' }}
        >
            <RadioItem
                value={'sm'}
                label={'Small'}
            />
            <RadioItem
                value={'md'}
                label={'Medium'}
            />
            <RadioItem
                value={'lg'}
                label={'Large'}
            />
        </RadioGroup>
    ),
}

// Disabled items

export const WithDisabledItem: Story = {
    render: () => (
        <RadioGroup defaultValue={'enabled'}>
            <RadioItem
                value={'enabled'}
                label={'Enabled'}
            />
            <RadioItem
                value={'also-enabled'}
                label={'Also enabled'}
            />
            <RadioItem
                value={'unavailable'}
                label={'Unavailable (disabled)'}
                disabled
            />
        </RadioGroup>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('radio', { name: 'Unavailable (disabled)' })).toBeDisabled()
    },
}

// Fully disabled group

export const Disabled: Story = {
    render: () => (
        <RadioGroup
            defaultValue={'a'}
            disabled
        >
            <RadioItem
                value={'a'}
                label={'Option A'}
            />
            <RadioItem
                value={'b'}
                label={'Option B'}
            />
        </RadioGroup>
    ),
}

// Controlled

export const Controlled: Story = {
    parameters: { controls: { disable: true } },
    render: () => {
        const [value, setValue] = useState('standard')
        return (
            <Flex direction={'column'} align={'stretch'} gap={'md'}>
                <RadioGroup
                    value={value}
                    onValueChange={setValue}
                >
                    <RadioItem
                        value={'free'}
                        label={'Free'}
                    />
                    <RadioItem
                        value={'standard'}
                        label={'Standard'}
                    />
                    <RadioItem
                        value={'premium'}
                        label={'Premium'}
                    />
                </RadioGroup>
                <span style={{ fontSize: '0.75rem', color: '#666' }}>
                    Selected: {value}
                </span>
            </Flex>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('radio', { name: 'Standard' })).toBeChecked()
        await userEvent.click(canvas.getByRole('radio', { name: 'Free' }))
        await expect(canvas.getByRole('radio', { name: 'Free' })).toBeChecked()
    },
}
