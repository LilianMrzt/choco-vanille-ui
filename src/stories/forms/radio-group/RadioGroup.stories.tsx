import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { RadioGroup } from '@/components/forms/radio-group'
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
Compose \`RadioGroup\` with one or more \`RadioGroup.Item\` children. Each item renders a radio control with an optional visible label.

**Usage**
\`\`\`tsx
// Uncontrolled
<RadioGroup defaultValue="system">
  <RadioGroup.Item value="light" label="Light" />
  <RadioGroup.Item value="dark"  label="Dark" />
  <RadioGroup.Item value="system" label="System" />
</RadioGroup>

// Controlled
const [theme, setTheme] = useState('system')
<RadioGroup value={theme} onValueChange={setTheme}>
  <RadioGroup.Item value="light"  label="Light" />
  <RadioGroup.Item value="dark"   label="Dark" />
  <RadioGroup.Item value="system" label="System" />
</RadioGroup>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`aria-label\` / \`aria-labelledby\` on \`RadioGroup\` | ✅ Yes | \`string\` | Announces the group purpose to screen readers when no visible group label is present. |
| \`label\` on \`RadioGroup.Item\` | Conditional | \`string\` | Visible label for the option; auto-associated via a generated \`id\`. |
| \`aria-label\` on \`RadioGroup.Item\` | Conditional | \`string\` | Required when \`label\` is omitted to give each option an accessible name. |
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
            <Box
                p={'lg'}
                style={{ minWidth: '12rem' }}
            >
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
            <RadioGroup.Item
                value={'light'}
                label={'Light'}
            />
            <RadioGroup.Item
                value={'dark'}
                label={'Dark'}
            />
            <RadioGroup.Item
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
            <RadioGroup.Item
                value={'a'}
                aria-label={'Option A'}
            />
            <RadioGroup.Item
                value={'b'}
                aria-label={'Option B'}
            />
            <RadioGroup.Item
                value={'c'}
                aria-label={'Option C'}
            />
        </RadioGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: 'When no visible label is rendered for each item, provide an `aria-label` on every `RadioGroup.Item` and an `aria-label` on the `RadioGroup` itself to give screen readers full context.',
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
            <RadioGroup.Item
                value={'sm'}
                label={'Small'}
            />
            <RadioGroup.Item
                value={'md'}
                label={'Medium'}
            />
            <RadioGroup.Item
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
            <RadioGroup.Item
                value={'enabled'}
                label={'Enabled'}
            />
            <RadioGroup.Item
                value={'also-enabled'}
                label={'Also enabled'}
            />
            <RadioGroup.Item
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
            <RadioGroup.Item
                value={'a'}
                label={'Option A'}
            />
            <RadioGroup.Item
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
            <Flex
                direction={'column'}
                align={'stretch'}
                gap={'md'}
            >
                <RadioGroup
                    value={value}
                    onValueChange={setValue}
                >
                    <RadioGroup.Item
                        value={'free'}
                        label={'Free'}
                    />
                    <RadioGroup.Item
                        value={'standard'}
                        label={'Standard'}
                    />
                    <RadioGroup.Item
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
