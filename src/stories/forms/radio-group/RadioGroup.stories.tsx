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
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A group of mutually exclusive radio options built on top of [\`@radix-ui/react-radio-group\`](https://www.radix-ui.com/docs/primitives/components/radio-group).
Compose \`RadioGroup\` with one or more \`RadioItem\` children. Each item renders a radio control with an optional visible label.

**Usage**
\`\`\`tsx
// Uncontrolled
<RadioGroup defaultValue="system">
  <RadioItem value="light" label="Light" />
  <RadioItem value="dark"  label="Dark" />
  <RadioItem value="system" label="System" />
</RadioGroup>

// Controlled
const [theme, setTheme] = useState('system')
<RadioGroup value={theme} onValueChange={setTheme}>
  <RadioItem value="light"  label="Light" />
  <RadioItem value="dark"   label="Dark" />
  <RadioItem value="system" label="System" />
</RadioGroup>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`aria-label\` / \`aria-labelledby\` on \`RadioGroup\` | ✅ Yes | \`string\` | Announces the group purpose to screen readers when no visible group label is present. |
| \`label\` on \`RadioItem\` | Conditional | \`string\` | Visible label for the option; auto-associated via a generated \`id\`. |
| \`aria-label\` on \`RadioItem\` | Conditional | \`string\` | Required when \`label\` is omitted to give each option an accessible name. |
| \`disabled\` (item) | No | \`boolean\` | Marks a single option as unavailable; skipped by keyboard navigation. |
| \`disabled\` (group) | No | \`boolean\` | Disables every child item at once. |
| \`orientation\` | No | \`'horizontal' \| 'vertical'\` | Informs assistive technology of layout; affects expected arrow-key direction. |

- Keyboard navigation is handled automatically: **Arrow keys** move between options; **Space** selects the focused option.
                `,
            },
        },
    },
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
    parameters: {
        docs: {
            description: {
                story: 'Uncontrolled radio group with a pre-selected default value. Three labelled options render in a vertical stack. Arrow keys navigate between them.',
            },
        },
    },
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
    parameters: {
        docs: {
            description: {
                story: 'When no visible label is rendered for each item, provide an `aria-label` on every `RadioItem` and an `aria-label` on the `RadioGroup` itself to give screen readers full context.',
            },
        },
    },
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
    parameters: {
        docs: {
            description: {
                story: 'Horizontal layout via `orientation="horizontal"` and a custom `style`. This is useful for compact filter bars or size selectors. Arrow keys still navigate between items as expected.',
            },
        },
    },
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
    parameters: {
        docs: {
            description: {
                story: 'Individual options can be disabled without disabling the whole group. Disabled items are skipped by keyboard navigation and announced as unavailable by screen readers.',
            },
        },
    },
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
    parameters: {
        docs: {
            description: {
                story: 'Setting `disabled` on the `RadioGroup` disables every child item at once. Use this when the entire selection is read-only or when the form section is locked.',
            },
        },
    },
}

// Controlled

export const Controlled: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Controlled mode: the parent owns the selected value via `value` + `onValueChange`. The interaction test below verifies that clicking an option updates the selection.',
            },
        },
    },
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
