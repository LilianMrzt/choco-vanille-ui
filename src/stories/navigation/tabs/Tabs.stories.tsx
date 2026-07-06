import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Tabs } from '@/components/navigation/tabs'
import type { TabsVariant } from '@components/navigation/tabs'
import { IconRegistry } from '@constants/icons'
import { md } from '@stories/utils/markdown'

type TabsPlaygroundArgs = ComponentProps<typeof Tabs> & {
    listVariant?: TabsVariant
    listBordered?: boolean
    billingDisabled?: boolean
    billingWidth?: string
    billingStartIcon?: string
    billingEndIcon?: string
    activationMode?: 'automatic' | 'manual'
}

const VARIANTS: TabsVariant[] = ['default', 'pills']

const meta: Meta<TabsPlaygroundArgs> = {
    title: 'Navigation/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled tab interface built on top of \`@base-ui/react/tabs\`.
Use it to switch between related panels of content without leaving the page.
Compose \`Tabs\`, \`Tabs.List\`, \`Tabs.Trigger\`, and \`Tabs.Content\`.

**Usage**

~~~tsx
<Tabs defaultValue="account">
    <Tabs.List aria-label="User settings">
        <Tabs.Trigger value="account" label="Account" />
        <Tabs.Trigger value="password" label="Password" />
    </Tabs.List>
    <Tabs.Content value="account">Account settings</Tabs.Content>
    <Tabs.Content value="password">Password settings</Tabs.Content>
</Tabs>
~~~

**Accessibility**

| Prop / Attribute                          | Required    | Type      | Notes                                                           |
| ----------------------------------------- | ----------- | --------- | --------------------------------------------------------------- |
| \`aria-label\` / \`aria-labelledby\`          | Yes         | \`string\`  | Required on \`Tabs.List\` to describe the tab set.                |
| \`value\`                                   | Conditional | \`string\`  | Controlled active tab value; pair with \`onValueChange\`.         |
| \`defaultValue\`                            | Conditional | \`string\`  | Uncontrolled initial active tab value.                          |
| \`disabled\` on \`Tabs.Trigger\`              | No          | \`boolean\` | Prevents a trigger from being activated.                        |
| \`bordered\` on \`Tabs.List\`                 | No          | \`boolean\` | Shows a bottom divider under the list (\`default\` variant only). |
| \`width\` on \`Tabs.Trigger\`                 | No          | \`string\`  | Overrides the trigger's default content-based width.            |
| \`startIcon\` / \`endIcon\` on \`Tabs.Trigger\` | No          | \`string\`  | Iconify icon name rendered before/after the label.              |

- Keyboard: \`ArrowLeft\` / \`ArrowRight\` moves focus between tabs; \`Home\` / \`End\` jump to first / last tab; \`Space\` / \`Enter\` activates the focused tab.
- Active state is exposed to assistive technology via Radix's built-in ARIA semantics.

**Sub-components**

| Sub-component  | Description                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| \`Tabs\`         | Root context provider that manages the active tab state.                      |
| \`Tabs.List\`    | Container for tab triggers. Requires an accessible name. Accepts a \`variant\`. |
| \`Tabs.Trigger\` | Activates its associated tab panel.                                           |
| \`Tabs.Content\` | Panel shown when its trigger is active.                                       |
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
        listVariant: {
            control: 'select',
            options: VARIANTS,
            table: { category: 'Tabs.List' },
        },
        listBordered: {
            control: 'boolean',
            table: { category: 'Tabs.List' },
        },
        billingDisabled: {
            control: 'boolean',
            table: { category: 'Tabs.Trigger' },
        },
        billingWidth: {
            control: 'text',
            table: { category: 'Tabs.Trigger' },
        },
        billingStartIcon: {
            control: 'text',
            table: { category: 'Tabs.Trigger' },
        },
        billingEndIcon: {
            control: 'text',
            table: { category: 'Tabs.Trigger' },
        },
    },
    args: {
        defaultValue: 'account',
        orientation: 'horizontal',
        activationMode: 'automatic' as const,
        listVariant: 'default',
        listBordered: false,
        billingDisabled: true,
        billingWidth: '',
        billingStartIcon: IconRegistry.creditCard,
        billingEndIcon: '',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    "Interactive playground — use the Controls panel to experiment with orientation, activation mode, the list variant, its bottom divider, and the Billing trigger's disabled state, width, and icons.",
            },
        },
    },
    render: ({
        listVariant,
        listBordered,
        billingDisabled,
        billingWidth,
        billingStartIcon,
        billingEndIcon,
        ...args
    }) => {
        const [value, setValue] = useState(args.defaultValue as string)

        return (
            <Tabs
                {...args}
                value={value}
                onValueChange={setValue}
            >
                <Tabs.List
                    variant={listVariant}
                    bordered={listBordered}
                    aria-label={'User settings'}
                >
                    <Tabs.Trigger
                        value={'account'}
                        label={'Account'}
                    />
                    <Tabs.Trigger
                        value={'password'}
                        label={'Password'}
                    />
                    <Tabs.Trigger
                        value={'billing'}
                        label={'Billing'}
                        disabled={billingDisabled}
                        width={billingWidth || undefined}
                        startIcon={billingStartIcon || undefined}
                        endIcon={billingEndIcon || undefined}
                    />
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
        const billingTab = canvas.getByRole('tab', { name: 'Billing' })

        await expect(accountTab).toBeInTheDocument()
        await expect(accountTab).toHaveAttribute('data-active')
        await expect(passwordTab).not.toHaveAttribute('data-active')

        await userEvent.click(passwordTab)
        await expect(passwordTab).toHaveAttribute('data-active')
        await expect(
            canvas.getByText('Update your password and security settings.'),
        ).toBeInTheDocument()

        await expect(billingTab).toHaveAttribute('data-disabled')
        await userEvent.click(billingTab)
        await expect(passwordTab).toHaveAttribute('data-active')
    },
}