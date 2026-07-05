import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Tabs } from '@/components/navigation/tabs'
import { md } from '@stories/utils/markdown'

const meta = {
    title: 'Navigation/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled tab interface built on top of \`@radix-ui/react-tabs\`.

Composes \`Tabs\`, \`Tabs.List\`, \`Tabs.Trigger\`, and \`Tabs.Content\`.
Supports controlled (\`value\` + \`onValueChange\`) and uncontrolled (\`defaultValue\`) modes,
disabled triggers, and keyboard navigation.

**Usage**

~~~tsx
<Tabs defaultValue="account">
  <Tabs.List aria-label="User settings">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account settings</Tabs.Content>
  <Tabs.Content value="password">Password settings</Tabs.Content>
</Tabs>
~~~

**Sub-components**

| Sub-component    | Description                                              |
| ---------------- | -------------------------------------------------------- |
| \`Tabs\`          | Root context provider that manages the active tab state. |
| \`Tabs.List\`     | Container for tab triggers. Requires an accessible name. |
| \`Tabs.Trigger\`  | Activates its associated tab panel.                      |
| \`Tabs.Content\`  | Panel shown when its trigger is active.                  |

**Accessibility**

| Prop / Attribute                 | Required    | Type      | Notes                                                   |
| -------------------------------- | ----------- | --------- | ------------------------------------------------------- |
| \`aria-label\` / \`aria-labelledby\` | Yes         | \`string\`  | Required on \`Tabs.List\` to describe the tab set.        |
| \`value\`                          | Conditional | \`string\`  | Controlled active tab value; pair with \`onValueChange\`. |
| \`defaultValue\`                   | Conditional | \`string\`  | Uncontrolled initial active tab value.                  |
| \`disabled\`                       | No          | \`boolean\` | Prevents a trigger from being activated.                |

- Keyboard: \`ArrowLeft\` / \`ArrowRight\` moves focus between tabs; \`Home\` / \`End\` jump to first / last tab; \`Space\` / \`Enter\` activates the focused tab.
- Active state is exposed to assistive technology via Radix's built-in ARIA semantics.
        `,
            },
        },
    },
    argTypes: {
        defaultValue: { control: 'text' },
        value: { control: 'text' },
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
        activationMode: {
            control: 'select',
            options: ['automatic', 'manual'],
        },
    },
    args: {
        defaultValue: 'account',
        orientation: 'horizontal',
        activationMode: 'automatic',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with orientation and activation mode.',
            },
        },
    },
    render: (args) => {
        const [value, setValue] = useState(args.defaultValue as string)

        return (
            <Tabs
                {...args}
                value={value}
                onValueChange={setValue}
            >
                <Tabs.List aria-label={'User settings'}>
                    <Tabs.Trigger value={'account'}>Account</Tabs.Trigger>
                    <Tabs.Trigger value={'password'}>Password</Tabs.Trigger>
                    <Tabs.Trigger
                        value={'billing'}
                        disabled
                    >
                        Billing
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value={'account'}>
                    <p>Manage your account details and preferences.</p>
                </Tabs.Content>
                <Tabs.Content value={'password'}>
                    <p>Update your password and security settings.</p>
                </Tabs.Content>
                <Tabs.Content value={'billing'}>
                    <p>View and manage your billing information.</p>
                </Tabs.Content>
            </Tabs>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const accountTab = canvas.getByRole('tab', { name: 'Account' })
        const passwordTab = canvas.getByRole('tab', { name: 'Password' })

        await expect(accountTab).toBeInTheDocument()
        await expect(accountTab).toHaveAttribute('data-state', 'active')
        await expect(passwordTab).toHaveAttribute('data-state', 'inactive')

        await userEvent.click(passwordTab)
        await expect(passwordTab).toHaveAttribute('data-state', 'active')
        await expect(
            canvas.getByText('Update your password and security settings.'),
        ).toBeInTheDocument()
    },
}

export const Uncontrolled: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Tabs manage their own state using `defaultValue`.',
            },
        },
    },
    render: () => (
        <Tabs defaultValue={'password'}>
            <Tabs.List aria-label={'Uncontrolled tabs'}>
                <Tabs.Trigger value={'account'}>Account</Tabs.Trigger>
                <Tabs.Trigger value={'password'}>Password</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={'account'}>Account settings</Tabs.Content>
            <Tabs.Content value={'password'}>Password settings</Tabs.Content>
        </Tabs>
    ),
}

export const DisabledTrigger: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A disabled trigger cannot be activated by click or keyboard.',
            },
        },
    },
    render: () => (
        <Tabs defaultValue={'account'}>
            <Tabs.List aria-label={'Tabs with disabled item'}>
                <Tabs.Trigger value={'account'}>Account</Tabs.Trigger>
                <Tabs.Trigger value={'password'}>Password</Tabs.Trigger>
                <Tabs.Trigger
                    value={'billing'}
                    disabled
                >
                    Billing
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={'account'}>Account settings</Tabs.Content>
            <Tabs.Content value={'password'}>Password settings</Tabs.Content>
            <Tabs.Content value={'billing'}>Billing settings</Tabs.Content>
        </Tabs>
    ),
}
